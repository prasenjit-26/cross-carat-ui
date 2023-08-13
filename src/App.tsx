// @ts-nocheck
import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from "@ethersproject/providers";
// import { InjectedConnector } from "@web3-react/injected-connector";
import Header from './components/Header';
import Home from './containers/Home';
import './App.css';

function App() {
  // const defaultOptions = {
  //   loop: true,
  //   autoplay: true,
  //   animationData: "https://lottie.host/?file=84d418cb-699d-40fb-9825-fd2259783116/tSuZY5yz2E.json",
  // };
  // const { chains, publicClient, webSocketPublicClient } = configureChains(
  //   [baseGoerli, optimismGoerli, polygonMumbai],
  //   [publicProvider()],
  // )
  // const config = createConfig({
  //   autoConnect: true,
  //   publicClient,
  //   webSocketPublicClient,
  // })
  function getLibrary(provider) {
    return new Web3Provider(provider);
  }
  const theme = createTheme({
    palette: {
      primary: {
        main: '#A76F6F',
      },
      secondary: {
        main: '#435B66',
      },
    },
  });
  // const Injected = new InjectedConnector({
  //   supportedChainIds: [84531, 420, 80001]
  // })
  return (
    // <WagmiConfig config={config}>
    <Web3ReactProvider getLibrary={getLibrary}>
      <ThemeProvider theme={theme}>
        <Header />
        <Home />
      </ThemeProvider>
    </Web3ReactProvider>
    // </WagmiConfig>
  );
}

export default App;
