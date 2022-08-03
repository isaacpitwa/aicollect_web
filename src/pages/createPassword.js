// 

import { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Divider, Typography, Container, Card, Stack, styled } from "@mui/material";

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

      <RootStyle>
        <MHidden width="mdDown">
          <SectionStyle>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              AiCollect
            </Typography>
            <img src="https://d35fo82fjcw0y8.cloudfront.net/2018/02/08143500/app-onboarding-header-1024x433.png" alt="aicollect-login" />
          </SectionStyle>
        </MHidden>

        <Container maxWidth="sm">
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
