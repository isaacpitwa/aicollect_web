import { useEffect } from "react";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { Box, Divider, Typography, Grid, Button, Container, Card, Stack } from "@mui/material";
import { styled } from '@mui/styles';
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";

import MHidden from '../components/theme/MHidden';
import { GuestGuard } from "../components/authentication/guest-guard";
import { AmplifyLogin } from "../components/authentication/amplify-login";
import { Auth0Login } from "../components/authentication/auth0-login";
import { FirebaseLogin } from "../components/authentication/firebase-login";
import { JWTLogin } from "../components/authentication/jwt-login";
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

const Login = () => {
  const router = useRouter();
  const { platform } = useAuth();
  const { disableGuard } = router.query;

  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);

  const handleLoginWithGoogle = async () => {
    router.push('http://localhost:5000/api/v1/authService/google');
    // window.open('http://localhost:5000/api/v1/authService/google', '_blank')
  };
  return (
    <>
      <Head>
        <title>Login | AI Collect</title>
      </Head>

      <RootStyle>
        <MHidden width="mdDown">
          <SectionStyle>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              AiCollect
            </Typography>
            <img src="/login.jpg" alt="aicollect-login" />
          </SectionStyle>
        </MHidden>

        <Container maxWidth="sm">
          <ContentStyle>
            <Stack sx={{ mb: 5 }}>
              <Typography variant="h4" gutterBottom>
                Sign in to AiCollect
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>Enter your details below</Typography>
            </Stack>
            <JWTLogin />
            <Divider sx={{ my: 3 }} />
            <Typography
              color="textSecondary"
              variant="body2">
              Or sign in with
            </Typography>
            <Box
              display="flex"
              flexDirection="row"
              mt={2}>
              <Button
                size="large"
                color="error"
                onClick={handleLoginWithGoogle}>
                <GoogleIcon /> oogle
              </Button>
              <Button size="large">
                <FacebookIcon /> acebook
              </Button>
              <Button size="large">
                <TwitterIcon />
                Twitter
              </Button>
            </Box>
          </ContentStyle>
        </Container>
      </RootStyle>

      {/* <Box
        component="main"
        sx={{
          backgroundColor: "background.default",
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          height: '100vh',
          overflow: 'hidden'
        }}
      >
        <Grid container>
          <Grid
            item
            md={5}
            sm={12}
            style={{ backgroundImage: 'url("/login.jpg")' }}
          ></Grid>
          <Grid
            item
            md={7}
            sm={12}
            sx={{ p: 30 }}
            display="flex"
            justifyContent="center"
            flexDirection="column"
            alignItems="center"
          >
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <NextLink
                href="/"
                passHref>
                <a>
                  <img
                    src="/logo.png"
                    alt="aicollect"
                    width={40}
                    height={40} />
                </a>
              </NextLink>
              <Typography variant="h4">AiCollect</Typography>
              <Typography
                color="textSecondary"
                sx={{ mt: 2 }}
                variant="body2">
                Don&#39;t have an Account? Register Here.
              </Typography>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                mt: 3,
              }}
            >
              {platform === "Amplify" && <AmplifyLogin />}
              {platform === "Auth0" && <Auth0Login />}
              {platform === "Firebase" && <FirebaseLogin />}
              {platform === "JWT" && <JWTLogin />}
            </Box>

            <Divider sx={{ my: 3 }} />

            <Typography
              color="textSecondary"
              variant="body2">
              Or sign in with
            </Typography>

            <Box
              display="flex"
              flexDirection="row"
              mt={2}>
              <Button
                size="large"
                color="error"
                onClick={handleLoginWithGoogle}>
                <GoogleIcon /> oogle
              </Button>
              <Button size="large">
                <FacebookIcon /> acebook
              </Button>
              <Button size="large">
                <TwitterIcon />
                Twitter
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box> */}
    </>
  );
};

Login.getLayout = (page) => <GuestGuard>{page}</GuestGuard>;

export default Login;
