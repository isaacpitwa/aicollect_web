import { useEffect } from "react";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { Box, Divider, Typography, Grid, Button } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";

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
      <Box
        component="main"
        sx={{
          backgroundColor: "background.default",
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Grid container>
          <Grid
            item
            md={6}
            sm={12}
            style={{ backgroundImage: 'url("/login.jpg")' }}
          ></Grid>
          <Grid
            item
            md={6}
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
              <Typography variant="h4">Welcome to AiCollect</Typography>
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
      </Box>
    </>
  );
};

Login.getLayout = (page) => <GuestGuard>{page}</GuestGuard>;

export default Login;
