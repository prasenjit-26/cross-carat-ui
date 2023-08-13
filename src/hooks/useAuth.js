import { useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import { injected } from "../utils/injected";

const connectorsByName = {
  injected: injected,
};

const useAuth = () => {
  const { activate, deactivate } = useWeb3React();

  const login = useCallback(
    (connectorID) => {
      const connector = connectorsByName[connectorID];
      if (connector) {
        activate(connector, async (error) => {
          console.log("Error in login: ", error, error.name, error.message);
        });
      } else {
        console.log("Error in login: ", "Can't find connector", "The connector config is wrong");
      }
    },
    [activate]
  );

  return {
    login,
    logout: deactivate,
  };
};

export default useAuth;
