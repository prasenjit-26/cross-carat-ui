import React from 'react';
// import Lottie from 'react-lottie';
import styled from 'styled-components';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import './App.css';

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
  
`

function App() {
  // const defaultOptions = {
  //   loop: true,
  //   autoplay: true,
  //   animationData: "https://lottie.host/?file=84d418cb-699d-40fb-9825-fd2259783116/tSuZY5yz2E.json",
  // };
  return (
    <Container maxWidth="lg" sx={{ marginTop: '30px' }}>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Stack>
            <TitleText>CrossCarat</TitleText>
            <SubTitleText>
              CrossCarat bridges the gap between EVM-based blockchains, enabling seamless and secure cross-chain communication. Instantly connect and collaborate across networks, opening new doors for decentralized innovation. Experience frictionless data exchange, tamper-proof messaging, and limitless possibilities. Unite EVM blockchains with CrossCarat.
            </SubTitleText>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          {/* <Lottie options={defaultOptions}
            height={400}
            width={400} /> */}
        </Grid>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={12} md={6} lg={6}>

          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
