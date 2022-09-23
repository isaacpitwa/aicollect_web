// 

import { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Box,Divider, Typography, Container, Card, Stack, styled } from "@mui/material";

import MHidden from '../components/theme/MHidden';
import { AuthGuard } from '../components/authentication/auth-guard';
import { Password } from "../components/authentication/createPassword";
// import { Logo } from '../components/logo';
import { useAuth } from "../hooks/use-auth";
import { gtm } from "../lib/gtm";

// const platformIcons = {
//   Amplify: '/static/icons/amplify.svg',
//   Auth0: '/static/icons/auth0.svg',
//   Firebase: '/static/icons/firebase.svg',
//   JWT: '/static/icons/jwt.svg'
// };

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

const CreatePassword = () => {
  const router = useRouter();
  const { user } = useAuth();
  // const { disableGuard } = router.query;

  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);

  useEffect(() => {
    if (user.password) {
      router.push('/createProfile');
    }
  }, [router, user]);
  
  return (
    <>
      <Head>
        <title>Create Password | AiCollect</title>
      </Head>

      <RootStyle sx={{height:'100vh'}}>
      <MHidden width="mdDown">
          <SectionStyle sx={{
            backgroundColor: '#1971b9', margin: 0,
            maxWidth: '50%',
            borderRadius: 0, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', color: '#282BD3', padding: '0 12%'
          }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
              <img src="/images/illustration.svg" alt="aicollect-login" style={{ width: '21rem' }} />
            </Box>

            <Typography variant="h5" sx={{ color: 'white', fontWeight: '600', mt: '32px' }}>
              Go beyond data collection achieve amazing things with your data
            </Typography>
            <Typography variant="p" sx={{ color: '#282BD3', fontWeight: '400', color: 'white', fontSize: '14px', mt: '4px' }}>
              Deploy custom forms to field teams to conduct assessments for your business. Transform your data in powerful insights.
              its 100% customizable to suit your specific needs.
            </Typography>
          </SectionStyle>
        </MHidden>

        <Container sx={{overflowY:'scroll'}}>
          <ContentStyle>
            <Stack sx={{ mb: 5 }}>
              <Typography variant="h4" gutterBottom>
                Create your Password
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>Create a strong password :)</Typography>
            </Stack>
            <Password user={user} />
            <Divider sx={{ my: 3 }} />
            
          </ContentStyle>
        </Container>
      </RootStyle>

      
    </>
  );
};

CreatePassword.getLayout = (page) => <AuthGuard>{page}</AuthGuard>;

export default CreatePassword;
