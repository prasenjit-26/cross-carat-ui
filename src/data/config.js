import optimismLogo from "./images/Logo-Optimism.png";
import baseLogo from "./images/Base_Network_Logo.svg";
import polygonLogo from "./images/polygonLogo.png";
import chainLink from './images/chainlink.svg'
import hyperlane from './images/hyperlane.svg'
import layerzero from './images/layerZero.png'

const config = {
  souceChains: [
    {
      name: "Base",
      image: baseLogo,
      chainId: 84531,
      rpcUrl: "https://goerli.base.org",
      blockExplorer: "https://goerli.basescan.org",
      currency: "ETH",
    },
    {
      name: "Optimism",
      image: optimismLogo,
      chainId: 420,
      rpcUrl: "https://goerli.optimism.io",
      blockExplorer: "https://goerli-optimism.etherscan.io",
      currency: "ETH",
    },
  ],
  destinationChains: [
    {
      name: "Base",
      image: baseLogo,
      chainId: 84531,
      rpcUrl: "https://goerli.base.org",
    },
    {
      name: "Optimism",
      image: optimismLogo,
      chainId: 420,
      rpcUrl: "https://goerli.optimism.io",
    },
    {
      name: "Polygon",
      image: polygonLogo,
      chainId: 80001,
      rpcUrl: "https://rpc-mumbai.maticvigil.com",
    },
  ],
  bridges: [
    {
      name: "LayerZero",
      id: "layerzero",
      image: layerzero,
      value: 0,
    },
    {
      name: "Hyperlane",
      id: "hyperlane",
      image: hyperlane,
      value: 0,
    },
    {
      name: "Chainlink",
      id: "chainlink",
      image: chainLink,
      value: 1,
    },
  ],
};
export default config;
