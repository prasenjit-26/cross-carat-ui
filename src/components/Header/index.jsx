import React from "react";
import { connect } from "@wagmi/core";
import AppBar from "@mui/material/AppBar";
import { InjectedConnector } from "wagmi/connectors/injected";
import Container from "@mui/material/Container";
import { Button, Stack } from "@mui/material";
import logo from "../../data/images/logoHorizontal.png";

export default function Header() {
  const handleConect = async () => {
    const result = await connect({
      connector: new InjectedConnector(),
    });
    console.log(result);
  };
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
            onClick={() => handleConect()}
          >
            Connect Wallet
          </Button>
        </Stack>
      </Container>
    </AppBar>
  );
}
