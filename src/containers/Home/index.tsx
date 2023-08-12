import React from 'react';
// import Lottie from 'react-lottie';
import styled from 'styled-components';
import Container from '@mui/material/Container';
import InfoIcon from '@mui/icons-material/Info';
import Tooltip from '@mui/material/Tooltip';
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
import blockchain from '../../data/images/blockchain.gif';
import config from '../../data/config';

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
  width: 100%;
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
  // const defaultOptions = {
  //   loop: true,
  //   autoplay: true,
  //   animationData: "https://lottie.host/?file=84d418cb-699d-40fb-9825-fd2259783116/tSuZY5yz2E.json",
  // };
  const [sourceChain, setSourceChain] = React.useState('420');
  const [destinationChain, setDestinationChain] = React.useState('80001');
  const [acknoledgement, setAcknoledgement] = React.useState('Withacknoledgement');

  const handleAcknoledgementChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAcknoledgement((event.target as HTMLInputElement).value);
  };
  const handleSourceChainhange = (event: { target: { value: string } }) => {
    setSourceChain(event.target.value);
  };
  const handleDestinationChainhange = (event: { target: { value: string } }) => {
    setDestinationChain(event.target.value);
  };
  let brideges = config.bridges;
  if ((sourceChain.toString() === '84531' || destinationChain.toString() === '84531')) {
    brideges = config.bridges.filter((bridge: { id: string; }) => bridge.id === 'layerzero')
  }
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
          <Grid item xs={12} sm={12} md={6} lg={6}>
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
                  value={destinationChain}
                  onChange={handleDestinationChainhange}
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
                  variant="outlined"
                  placeholder='0x0000000'
                />
              </Stack>
              <Stack spacing={2} sx={{ marginTop: '20px' }}>
                <Stack spacing={1} alignItems="center" direction="row">
                  <SubTitleText style={{ margin: '0px', fontWeight: '600', fontSize: '16px' }}>
                    Function call
                  </SubTitleText>
                  <Tooltip title="The Function call with the passed parameter eg. Mint(500)">
                    <InfoIcon sx={{ fontSize: '17px', color: '#435B66' }} />
                  </Tooltip>
                </Stack>
                <TextField
                  fullWidth
                  id="standard-search"
                  type="search"
                  variant="outlined"
                  InputProps={{ sx: { borderRadius: '15px' } }}
                  placeholder='0x0000000'
                />
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
                  disabled={acknoledgement === 'withoutacknoledgement'}
                  variant="outlined"
                  InputProps={{ sx: { borderRadius: '15px' } }}
                  placeholder='0x0000000'
                />
              </Stack>
              <Stack justifyContent="center">
                <Button variant="contained" sx={{ marginTop: '20px', textAlign: 'center', borderRadius: '15px', fontWeight: '600', fontSize: '18px' }}>Process Transcation</Button>
              </Stack>
            </FormConatiners>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home;
