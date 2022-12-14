// 

import { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Box, Divider, Typography, Grid, Button, Container, Card, Stack, styled } from "@mui/material";
// import {  } from '@mui/styles';

import MHidden from '../components/theme/MHidden';
import { AuthGuard } from '../components/authentication/auth-guard';
import { Profile } from "../components/authentication/profile";
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
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(8, 4)
}));

const CreateProfile = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { disableGuard } = router.query;

  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);

  console.log("User: ", user);
  return (
    <>
      <Head>
        <title>User Profile | AiCollect</title>
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

        <Container  sx={{overflowY:'scroll'}} >
          <ContentStyle>
            <Stack sx={{ mb: 2 }}>
              <Typography variant="h4" sx={{ color: "text.secondary",fontSize:'14px' }}>
                Welcome back!
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>Complete your Profile</Typography>
            </Stack>
            <Profile user={user} />
         

          </ContentStyle>
        </Container>
      </RootStyle>


    </>
  );
};

CreateProfile.getLayout = (page) => <AuthGuard>{page}</AuthGuard>;

export default CreateProfile;
