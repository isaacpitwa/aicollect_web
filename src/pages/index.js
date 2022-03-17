import { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  Box,
  Divider,
  Typography,
  Grid,
  Button,
  Container,
  Card,
  Stack,
  styled
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";

import MHidden from "../components/theme/MHidden";
import { GuestGuard } from "../components/authentication/guest-guard";
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

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: "100%",
  maxWidth: 464,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  display: "flex",
  minHeight: "100vh",
  flexDirection: "column",
  justifyContent: "center",
  padding: theme.spacing(12, 0),
}));

const Login = () => {
  const router = useRouter();
  const { platform } = useAuth();
  const { disableGuard } = router.query;

  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);

  const handleLoginWithGoogle = async () => {
    router.push(`${process.env.NEXT_PUBLIC_BACKEND_URL}/authService/google`);
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
              <Typography sx={{ color: "text.secondary" }}>
                Enter your details below
              </Typography>
            </Stack>
            <JWTLogin />
            <Divider sx={{ my: 3 }} />
            <Typography color="textSecondary" variant="body2">
              Or sign in with
            </Typography>
            <Box display="flex" flexDirection="row" mt={2}>
              <Button
                size="large"
                color="error"
                onClick={handleLoginWithGoogle}
              >
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
    </>
  );
};

Login.getLayout = (page) => <GuestGuard>{page}</GuestGuard>;

export default Login;
