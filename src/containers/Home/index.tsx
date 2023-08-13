// @ts-nocheck

import React from 'react';
// import Lottie from 'react-lottie';
import styled from 'styled-components';
import Container from '@mui/material/Container';
import InfoIcon from '@mui/icons-material/Info';
// import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Tooltip from '@mui/material/Tooltip';
import { useWeb3React } from "@web3-react/core";
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { ethers } from 'ethers';
import blockchain from '../../data/images/blockchain.gif';
import config from '../../data/config';
import { wrapperContracts } from '../../data/contracts';
import wrapperAbi from '../../data/abi/wrapperContract.json';
// import diamondContractAbi from '../../data/abi/diamondContract.json';

import '../../App.css';

const TitleText = styled.p`
  font-size: 50px;
  color: #2D4356;
  font-weight: 800;
  margin: 0px;
`;
const SubTitleText = styled.p`
  color: #435B66;
  font-size: 18px;
  line-height: 27px;
`;
const FormConatiners = styled.div`
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 20px;
  padding: 20px;
`
const IconConatiner = styled.div`
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 50%;
  width: 120px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`
function Home() {
  const { account, chainId } = useWeb3React();
  const [sourceChain, setSourceChain] = React.useState('420');
  // const [transactionLogs, setTransactionLogs] = React.useState(null);
  // const [trxDoneWithOutAck, setTrxDoneWithOutAck] = React.useState(false);
  const [pendingTx, setPendingTx] = React.useState(false);
  const [destinationChain, setDestinationChain] = React.useState('80001');
  const [selectedBridge, setSelectedBridge] = React.useState('layerzero');
  const [acknoledgement, setAcknoledgement] = React.useState('withacknoledgement');
  const [abiData, setAbiData] = React.useState(null);
  const [crossChainData, setCrossChainData] = React.useState(
    {
      destinationContract: null,
      functionName: null,
      functionParameters: null,
      callBackAddress: null,
      crossChainData: null,
    }
  );
  const handleAcknoledgementChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAcknoledgement((event.target as HTMLInputElement).value);
  };
  const handleSourceChainhange = async (event: { target: { value: string } }) => {
    setSourceChain(event.target.value);
    if (chainId?.toString() !== event.target.value) {
      const network = config.souceChains.find((chain: { chainId: string | number | readonly string[] | undefined; }) => chain.chainId?.toString() === event.target.value.toString());
      console.log({ network }, event.target.value);
      if (network) {
        try {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            // params: [{ chainId: '0x1' }],
            params: [
              { chainId: `0x${parseFloat(network.chainId).toString(16)}` },
            ],
          });
        } catch (switchError) {
          // This error code indicates that the chain has not been added to MetaMask.
          if (switchError) {
            try {
              await window.ethereum.request({
                method: "wallet_addEthereumChain",
                params: [
                  {
                    chainId: `0x${parseFloat(network.chainId).toString(16)}`,
                    rpcUrls: [network.rpcUrl],
                    chainName: network.name,
                    nativeCurrency: {
                      name: 'ETH',
                      symbol: 'ETH',
                      decimals: 18,
                    },
                  },
                ],
              });
            } catch (addError) {
              // handle "add" error
              console.error({ addError });
            }
          }
          // handle other "switch" errors
        }
      }
    }
  };
  const handleDestinationChainhange = (event: { target: { value: string } }) => {
    setDestinationChain(event.target.value);
  };
  const handleBridgeChange = (event: { target: { value: string } }) => {
    setSelectedBridge(event.target.value);
  };
  const handleFile = (event) => {
    console.log('file', event.target.files[0]);
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const parsedData = JSON.parse(e.target.result);
          console.log({ parsedData })
          setAbiData({
            abi: parsedData,
            name: file.name
          })
        } catch (error) {
          console.log('Error parsing JSON:', error);
        }
      };
      reader.readAsText(file);
    }
  }
  const handleTextChange = (event, title) => {
    setCrossChainData(data => ({
      ...data,
      [title]: event.target.value
    }))
  }
  const doCrossChainTx = async () => {
    try {
      setPendingTx(true)
      const provider = new ethers.providers.Web3Provider(
        // @ts-ignore
        (window as WindowChain).ethereum
      );
      const signer = provider.getSigner();
      console.log({ signer });
      const abiCoder = new ethers.utils.AbiCoder();
      let iface = new ethers.utils.Interface(abiData.abi);
      const contractCalldata = iface.encodeFunctionData(crossChainData.functionName, [crossChainData.functionParameters]);
      console.log({ contractCalldata, crossChainData });
      const bridge = config.bridges.find((bridge: { id: string; }) => bridge.id.toString() === selectedBridge.toString());
      console.log({ bridge, selectedBridge });
      let bridgeSelector = 0; // Layerzero
      let bridgeParams;
      if (bridge) {
        bridgeSelector = bridge.value;
        if (bridge.value === 0) {
          bridgeParams = abiCoder.encode(
            ["address", "address", "uint256", "bytes"],
            [
              account, //source chain refund address
              "0x10855704d1Dde09d90C0D1afEe4E1e6626e45Bb7", //destination chain refund address
              ethers.utils.parseEther("6"), //relayer fees to be used on destination chain
              ethers.utils.solidityPack(["uint16", "uint256"], [1, 600000]), //gas limit for tx on destination chain
            ]
          );
        } else if (bridge.value === 1) {
          bridgeParams = abiCoder.encode(
            ["address", "address", "uint256", "uint256"],
            [
              account,
              "0x10855704d1Dde09d90C0D1afEe4E1e6626e45Bb7",
              ethers.utils.parseEther("2"),
              "600000",
            ]
          );
        }
      }
      const wrapperContract = new ethers.Contract(wrapperContracts[chainId], wrapperAbi, signer);
      const callbackAddress =
        acknoledgement === 'withacknoledgement'
          ? crossChainData.callBackAddress
          : ethers.constants.AddressZero;
      const acknowledgement = abiCoder.encode(["bool"], [acknoledgement === 'withacknoledgement' ? true : false,]);
      const payload = abiCoder.encode(
        ["bytes", "bytes", "address", "address"],
        [
          acknowledgement,
          contractCalldata, //constructed from ABI and params
          crossChainData.destinationContract, //destination chain contract address
          callbackAddress, //callback address calculated above
        ]
      );
      console.log({ bridgeSelector })
      const tx = await wrapperContract.doCCTrx(
        bridgeSelector,
        sourceChain,
        destinationChain,
        payload,
        bridgeParams,
        {
          value: '100000000000000000'
        }
      );
      // listenToEvents()
      await tx.wait();
      console.log({ tx });
      setPendingTx(false)
    } catch (e) {
      console.log({ e })
      setPendingTx(false)
    }
  }
  let brideges = config.bridges;
  if ((sourceChain.toString() === '84531' || destinationChain.toString() === '84531')) {
    brideges = config.bridges.filter((bridge: { id: string; }) => bridge.id === 'layerzero')
  }
  // const manageLogs = async (event, chainId, address, id) => {
  //   if (chainId.toString() === sourceChain.toString() && event === 'CrossChainCalled') {
  //     setTransactionLogs(id)
  //   }
  //   if (acknoledgement === 'withacknoledgement' && chainId.toString() === destinationChain.toString() && event === 'CrossChainReceived' && id === transactionLogs) {
  //     setTrxDoneWithOutAck(true)
  //   }
  // }
  // const listenToEvents = async () => {
  //   const providerMumbai = new ethers.providers.JsonRpcProvider(
  //     config.destinationChains[2].rpcUrl
  //   );
  //   const providerBase = new ethers.providers.JsonRpcProvider(
  //     config.destinationChains[0].rpcUrl
  //   );
  //   const providerOptism = new ethers.providers.JsonRpcProvider(
  //     config.destinationChains[1].rpcUrl
  //   );
  //   const diamondContractMumbai = new ethers.Contract(diamondContracts[80001], diamondContractAbi, providerMumbai);
  //   const diamondContractBase = new ethers.Contract(diamondContracts[84531], diamondContractAbi, providerBase);
  //   const diamondContractOptism = new ethers.Contract(diamondContracts[420], diamondContractAbi, providerOptism);
  //   let eventFilterMumbai = diamondContractMumbai.filters.CrossChainCalled()
  //   await diamondContractMumbai.queryFilter(eventFilterMumbai)
  //   diamondContractMumbai.on("CrossChainCalled", (address, id, bridgeName, souceDomain, modifiedPayload, updatedAcknowledgment) => { manageLogs('CrossChainCalled', 80001, address, id, bridgeName, souceDomain, modifiedPayload, updatedAcknowledgment) });
  //   diamondContractMumbai.on("CrossChainReceived", (address, id, bridgeName, souceDomain, modifiedPayload, updatedAcknowledgment) => { manageLogs('CrossChainReceived', 80001, address, id, bridgeName, souceDomain, modifiedPayload, updatedAcknowledgment) });
  //   let eventFilterBase = diamondContractBase.filters.CrossChainCalled()
  //   await diamondContractBase.queryFilter(eventFilterBase)
  //   diamondContractBase.on("CrossChainCalled", (address, id, bridgeName, souceDomain, modifiedPayload, updatedAcknowledgment) => { manageLogs('CrossChainCalled', 84531, address, id, bridgeName, souceDomain, modifiedPayload, updatedAcknowledgment) });
  //   diamondContractBase.on("CrossChainReceived", (address, id, bridgeName, souceDomain, modifiedPayload, updatedAcknowledgment) => { manageLogs('CrossChainReceived', 84531, address, id, bridgeName, souceDomain, modifiedPayload, updatedAcknowledgment) });
  //   let eventFilterOptism = diamondContractOptism.filters.CrossChainCalled()
  //   await diamondContractOptism.queryFilter(eventFilterOptism)
  //   diamondContractOptism.on("CrossChainCalled", (address, id, bridgeName, souceDomain, modifiedPayload, updatedAcknowledgment) => { manageLogs('CrossChainCalled', 420, address, id, bridgeName, souceDomain, modifiedPayload, updatedAcknowledgment) });
  //   diamondContractOptism.on("CrossChainReceived", (address, id, bridgeName, souceDomain, modifiedPayload, updatedAcknowledgment) => {
  //     manageLogs('CrossChainCalled', 420, address, id, bridgeName, souceDomain, modifiedPayload, updatedAcknowledgment)
  //   });
  // };

  return (
    <Container maxWidth="lg" sx={{ marginTop: '30px', marginBottom: '30px' }}>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Stack justifyContent="center" sx={{ height: '100%' }}>
            <TitleText>CrossCarat</TitleText>
            <SubTitleText>
              CrossCarat bridges the gap between EVM-based blockchains, enabling seamless and secure cross-chain communication. Instantly connect and collaborate across networks, opening new doors for decentralized innovation. Experience frictionless data exchange, tamper-proof messaging, and limitless possibilities. Unite EVM blockchains with CrossCarat.
            </SubTitleText>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Stack alignItems="center" justifyContent="center">
            <img src={blockchain} alt="crosscarat" width="350px" />
          </Stack>
        </Grid>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <FormConatiners>
              <TitleText style={{ color: '#2D4356', fontSize: '25px', textAlign: 'center' }}>
                Enter the Details
              </TitleText>
              <SubTitleText style={{ margin: '20px 0px', color: '#A76F6F', fontWeight: '600' }}>
                Select Source and Destination Chain
              </SubTitleText>
              <Stack direction="row" spacing={3} sx={{ width: '100%' }}>
                <FormControl variant="standard" fullWidth>
                  <InputLabel id="demo-customized-select-label">Select Source Chain</InputLabel>
                  <Select
                    labelId="demo-customized-select-label"
                    id="demo-customized-select"
                    value={sourceChain}
                    defaultValue='80001'
                    onChange={handleSourceChainhange}
                  // input={<BootstrapInput />}
                  >
                    {config.souceChains.map((chain: { chainId: string | number | readonly string[] | undefined; image: string | undefined; name: string }) => (
                      <MenuItem value={chain.chainId}>
                        <Stack direction="row" spacing={2}>
                          <img src={chain.image} alt={chain.name} width="20px" />
                          <span>
                            {chain.name}
                          </span>
                        </Stack>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <IconConatiner>
                  <ChevronRightIcon sx={{ fontSize: '35px' }} />
                </IconConatiner>
                <FormControl variant="standard" fullWidth>
                  <InputLabel id="demo-customized-select-label">Select Destination Chain</InputLabel>
                  <Select
                    labelId="demo-customized-select-label"
                    id="demo-customized-select"
                    value={destinationChain}
                    onChange={handleDestinationChainhange}
                    defaultValue='80001'
                  // input={<BootstrapInput />}
                  >
                    {config.destinationChains.map((chain: { chainId: string | number | readonly string[] | undefined; image: string | undefined; name: string }) => (
                      <MenuItem value={chain.chainId}>
                        <Stack direction="row" spacing={2}>
                          <img src={chain.image} alt={chain.name} width="20px" style={{ objectFit: 'contain' }} />
                          <span>
                            {chain.name}
                          </span>
                        </Stack>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Stack>
              <SubTitleText style={{ margin: '20px 0px', color: '#A76F6F', fontWeight: '600' }}>
                Bride Service To be Used
              </SubTitleText>
              <FormControl variant="standard" fullWidth>
                <InputLabel id="demo-customized-select-label">Select Bridge</InputLabel>
                <Select
                  labelId="demo-customized-select-label"
                  id="demo-customized-select"
                  value={selectedBridge}
                  onChange={handleBridgeChange}
                // input={<BootstrapInput />}
                >
                  {brideges.map((bridge: { id: string | number | readonly string[] | undefined; image: string | undefined; name: string }) => (
                    <MenuItem value={bridge.id}>
                      <Stack direction="row" spacing={2}>
                        <img src={bridge.image} alt={bridge.name} width="20px" />
                        <span>
                          {bridge.name}
                        </span>
                      </Stack>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Stack spacing={1} alignItems="center" direction="row">
                <SubTitleText style={{ marginTop: '20px', marginBottom: '10px', color: '#A76F6F', fontWeight: '600' }}>
                  Acknoledgement
                </SubTitleText>
                <Tooltip title="When acknoledgement is enabled a secondary cross chain transaction is executed to send an ack to the source chain.">
                  <InfoIcon sx={{ fontSize: '17px', color: '#A76F6F' }} />
                </Tooltip>
              </Stack>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={acknoledgement}
                onChange={handleAcknoledgementChange}
              >
                <FormControlLabel value="withacknoledgement" control={<Radio />} label="With Acknoledgement" />
                <FormControlLabel value="withoutacknoledgement" control={<Radio />} label="Without Acknoledgement" />
              </RadioGroup>
              <SubTitleText style={{ marginTop: '20px', marginBottom: '20px', color: '#A76F6F', fontWeight: '600' }}>
                Data Parameters
              </SubTitleText>
              <Stack spacing={2}>
                <Stack spacing={1} alignItems="center" direction="row">
                  <SubTitleText style={{ margin: '0px', fontWeight: '600', fontSize: '16px' }}>
                    Destination contract
                  </SubTitleText>
                  <Tooltip title="The contract where the function is to be called">
                    <InfoIcon sx={{ fontSize: '17px', color: '#435B66' }} />
                  </Tooltip>
                </Stack>
                <TextField
                  fullWidth
                  id="standard-search"
                  InputProps={{ sx: { borderRadius: '15px' } }}
                  type="search"
                  value={crossChainData.destinationContract}
                  onChange={(event) => handleTextChange(event, 'destinationContract')}
                  variant="outlined"
                  placeholder='0x0000000'
                />
              </Stack>
              <Stack spacing={2} sx={{ marginTop: '20px' }}>
                <Stack spacing={1} alignItems="center" direction="row">
                  <SubTitleText style={{ margin: '0px', fontWeight: '600', fontSize: '16px' }}>
                    Function Name
                  </SubTitleText>
                  <Tooltip title="The Function name that needs to be called eg. Mint">
                    <InfoIcon sx={{ fontSize: '17px', color: '#435B66' }} />
                  </Tooltip>
                </Stack>
                <TextField
                  fullWidth
                  id="standard-search"
                  type="search"
                  value={crossChainData.functionName}
                  onChange={(event) => handleTextChange(event, 'functionName')}
                  variant="outlined"
                  InputProps={{ sx: { borderRadius: '15px' } }}
                  placeholder='0x0000000'
                />
              </Stack>
              <Stack spacing={2} sx={{ marginTop: '20px' }}>
                <Stack spacing={1} alignItems="center" direction="row">
                  <SubTitleText style={{ margin: '0px', fontWeight: '600', fontSize: '16px' }}>
                    Function Parameters
                  </SubTitleText>
                  <Tooltip title="The parameters that needs to be passed 500">
                    <InfoIcon sx={{ fontSize: '17px', color: '#435B66' }} />
                  </Tooltip>
                </Stack>
                <TextField
                  fullWidth
                  id="standard-search"
                  type="search"
                  variant="outlined"
                  value={crossChainData.functionParameters}
                  onChange={(event) => handleTextChange(event, 'functionParameters')}
                  InputProps={{ sx: { borderRadius: '15px' } }}
                  placeholder='0x0000000'
                />
              </Stack>
              <Stack spacing={2} sx={{ marginTop: '20px' }}>
                <SubTitleText style={{ margin: '0px', fontWeight: '600', fontSize: '16px' }}>
                  Function ABI
                </SubTitleText>
                <Button
                  variant="outlined"
                  component="label"
                  onChange={handleFile}
                  sx={{ borderRadius: '15px', fontWeight: '600', fontSize: '18px' }}
                >
                  Upload ABI File
                  <input
                    type="file"
                    hidden
                  />
                </Button>
                {abiData && (
                  <SubTitleText style={{ margin: '0px', fontWeight: '600', fontSize: '12px' }}>
                    ABi File : {abiData.name}
                  </SubTitleText>)}
              </Stack>
              <Stack spacing={2} sx={{ marginTop: '20px' }}>
                <Stack spacing={1} alignItems="center" direction="row">
                  <SubTitleText style={{ margin: '0px', fontWeight: '600', fontSize: '16px' }}>
                    CallBack Address
                  </SubTitleText>
                  <Tooltip title="When ACK is enabled you can a call back function on the source chain. The address where the call back function resides.">
                    <InfoIcon sx={{ fontSize: '17px', color: '#435B66' }} />
                  </Tooltip>
                </Stack>
                <TextField
                  fullWidth
                  id="standard-search"
                  type="search"
                  value={crossChainData.callBackAddress}
                  onChange={(event) => handleTextChange(event, 'callBackAddress')}
                  disabled={acknoledgement === 'withoutacknoledgement'}
                  variant="outlined"
                  InputProps={{ sx: { borderRadius: '15px' } }}
                  placeholder='0x0000000'
                />
              </Stack>
              <Stack justifyContent="center">
                <Button
                  onClick={doCrossChainTx}
                  disabled={pendingTx}
                  variant="contained" sx={{ marginTop: '20px', textAlign: 'center', borderRadius: '15px', fontWeight: '600', fontSize: '18px' }}>
                  {pendingTx ? 'Processing...' : 'Process Transcation'}
                </Button>
              </Stack>
            </FormConatiners>
          </Grid>
           {/* <Grid item xs={12} sm={12} md={6} lg={6}>
            <FormConatiners>
              <TitleText style={{ color: '#2D4356', fontSize: '25px', textAlign: 'center' }}>
                Cross Chain Transcation Logs
              </TitleText>
              {transactionLogs &&
                <Stack spacing={2}>
                  <Stack direction="row" alignItems="center" justifyContent="center" spacing={2}>
                    <CheckCircleIcon />
                    <SubTitleText style={{ margin: '0px', fontWeight: '600', fontSize: '16px' }}>
                      Transcation Successfull on Source Chain
                    </SubTitleText>
                  </Stack>
                  <ArrowDownwardIcon />
                </Stack>
              }
              {trxDoneWithOutAck &&
                <Stack direction="row" alignItems="center" justifyContent="center" spacing={2}>
                  <CheckCircleIcon />
                  <SubTitleText style={{ margin: '0px', fontWeight: '600', fontSize: '16px' }}>
                    Transcation Successfull on Destination Chain
                  </SubTitleText>
                </Stack>
              }
            </FormConatiners>
          </Grid> */}
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home;
