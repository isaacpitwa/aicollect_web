import { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Box, Divider, Typography, Container, Stack, styled } from "@mui/material";
import { gtm } from "../../lib/gtm";
import { GuestGuard } from "../../components/authentication/guest-guard";
import { ClientRegistration } from "../../components/clients/registration";

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const ContentStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(8, 4)
}));

const RegisterClient = () => {
  const router = useRouter();
  const { disableGuard, token } = router.query;

  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);

  return (
    <>
      <Head>
        <title>Client | AiCollect</title>
      </Head>
      <RootStyle sx={{height:'100vh'}}>
        <Container>
          <ContentStyle sx={{maxWidth:'60%'}}>
            <Stack sx={{ mb: 2,textAlign:'center' }}>
              <Typography variant="h4" gutterBottom>
                <img src="/images/logo.svg" alt="aicollect-login" style={{width:'16rem'}} />
              </Typography> 
            <Typography sx={{ color: 'text.secondary' }}>Welcome aboard! Complete   Organisation Registration </Typography>           
            </Stack>
            <Divider sx={{ mb: 2, mt: 1 }} />
            <ClientRegistration/>
          </ContentStyle>
        </Container>
      </RootStyle>
    </>
  );
};

RegisterClient.getLayout = (page) => <GuestGuard>{page}</GuestGuard>;

export default RegisterClient;
