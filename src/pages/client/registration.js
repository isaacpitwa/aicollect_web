import { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Card, Divider, Typography, Container, Stack, styled } from "@mui/material";
import { gtm } from "../../lib/gtm";
import { GuestGuard } from "../../components/authentication/guest-guard";
import { ClientRegistration } from "../../components/clients/registration";
import { AuthBanner } from "../../components/authentication/auth-banner";

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
    flexDirection:'column'
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
      <RootStyle sx={{height:'100vh', backgroundColor: 'background.default',}}>
      <AuthBanner message="Complete Registration by  Create Personal Profile" />

        <Container >
          <ContentStyle sx={{maxWidth:'65%'}}>
            <Stack sx={{ mb: 2,textAlign:'center' }}>
              <Typography variant="h4" gutterBottom>
                <img src="/images/logo.svg" alt="aicollect-login" style={{width:'10rem'}} />
              </Typography> 
            <Typography sx={{ color: 'text.secondary' }}>Welcome aboard! Complete   Organisation Registration </Typography>           
            </Stack>
            <Divider sx={{ mb: 2, mt: 1 }} />
            <Card elevation={16}
            sx={{ p: 4 }} >
              <ClientRegistration/>
            </Card>
          </ContentStyle>
        </Container>
      </RootStyle>
    </>
  );
};

RegisterClient.getLayout = (page) => <GuestGuard>{page}</GuestGuard>;

export default RegisterClient;
