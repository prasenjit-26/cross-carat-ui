import React from "react";
import styled from "styled-components";
import AppBar from "@mui/material/AppBar";
import { useWeb3React } from "@web3-react/core";
import Container from "@mui/material/Container";
import { Button, Stack } from "@mui/material";
import logo from "../../data/images/logoHorizontal.png";
import { injected } from "../../utils/injected";
import useEagerConnect from "../../hooks/useEagerConnect";

const AccountDiv = styled.div`
  background: #2d4356;
  padding: 10px 20px;
  border-radius: 16px;
  font-size: 18px;
  font-weight: 700;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`;
export default function Header() {
  const { account, activate } = useWeb3React();
  const handleConect = async () => {
    console.log("connecting");
    try {
      await activate(injected);
    } catch (error) {
      console.log("Error in connect: ", error);
    }
  };
  useEagerConnect();
  return (
    <AppBar position="static">
      <Container>
        <Stack
          direction="row"
          spacing={2}
          justifyContent="space-between"
          alignItems="center"
        >
          <img src={logo} alt="crosscarat" width="200px" />
          {account ? (
            <AccountDiv>
              {account.slice(0, 6)}...{account.slice(-4)}
            </AccountDiv>
          ) : (
            <Button
              sx={{
                textAlign: "center",
                borderRadius: "15px",
                fontWeight: "600",
                fontSize: "18px",
                maxHeight: "50px",
              }}
              variant="contained"
              color="secondary"
              onClick={handleConect}
            >
              Connect Wallet
            </Button>
          )}
        </Stack>
      </Container>
    </AppBar>
  );
}
