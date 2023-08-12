// @ts-nocheck
import React from 'react';
// import Lottie from 'react-lottie';
import { ThemeProvider, createTheme } from '@mui/material/styles';
// import { createConfig, configureChains } from '@wagmi/core'
// import { WagmiConfig } from 'wagmi'
// import { baseGoerli, optimismGoerli, polygonMumbai } from '@wagmi/core/chains'
// import { publicProvider } from '@wagmi/core/providers/public'
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
  return (
    // <WagmiConfig config={config}>
      <ThemeProvider theme={theme}>
        <Header />
        <Home />
      </ThemeProvider>
    // </WagmiConfig>
  );
}

export default App;
