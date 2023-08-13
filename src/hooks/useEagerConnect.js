import { useEffect } from "react";
import useAuth from "./useAuth";

const useEagerConnect = () => {
  const { login } = useAuth();
  const { location } = window;
  useEffect(() => {
    const connectorId = window.localStorage.getItem("connectorId");

    // Disable eager connect for BSC Wallet. Currently the BSC Wallet extension does not inject BinanceChain
    // into the Window object in time causing it to throw an error
    // TODO: Figure out an elegant way to listen for when the BinanceChain object is ready
    if (connectorId && connectorId) {
      login(connectorId);
    } else {
      login("injected");
    }
  }, [login, location]);
};

export default useEagerConnect;
