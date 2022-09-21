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
    router.push(`${process.env.NEXT_PUBLIC_AUTH_SERVICE_URL}/google`);
  };
  return (
    <>
      <Head>
        <title>Login | AI Collect</title>
      </Head>

      <RootStyle>
        <MHidden width="mdDown">
          <SectionStyle sx={{
            backgroundColor:'#1971b9',margin:0,
            maxWidth:'50%',
            borderRadius:0,display:'flex',flexDirection:'column',
            alignItems:'center',justifyContent:'center',color:'#282BD3',padding:'0 12%'}}>
            <Box sx={{display:'flex',justifyContent:'center', width:'100%'}}>
            <img src="/images/illustration.svg" alt="aicollect-login" style={{width:'21rem'}} />
            </Box>

            <Typography variant="h5" sx={{color:'white',fontWeight:'600',mt:'32px'}}>
              Go beyond data collection achieve amazing things with your data
            </Typography>
            <Typography variant="p" sx={{color:'#282BD3',fontWeight:'400',color:'white',fontSize:'14px',mt:'4px'}}>
            Deploy custom forms to field teams to conduct assessments for your business. Transform your data in powerful insights.
            its 100% customizable to suit your specific needs.
            </Typography>
          </SectionStyle>
        </MHidden>

        <Container maxWidth="sm">
          <ContentStyle>
            <Stack sx={{ mb: 0,textAlign:'center' }}>
              <Typography variant="h4" gutterBottom>
                <img src="/images/logo.svg" alt="aicollect-login" style={{width:'16rem'}} />
              </Typography>
              <Typography sx={{ color: "text.secondary",fontSize:'14px' }}>
                Welcome back! Please enter your details.
              </Typography>
            </Stack>
            <Divider sx={{ mb: 5, mt:2 }} />
            <JWTLogin />
            {/* <Divider sx={{ my: 3 }} /> */}
            {/* <Typography color="textSecondary" variant="body2">
              Or sign in with
            </Typography> */}
            {/* <Box display="flex" flexDirection="row" mt={2}>
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
            </Box> */}
          </ContentStyle>
        </Container>
      </RootStyle>
    </>
  );
};

Login.getLayout = (page) => <GuestGuard>{page}</GuestGuard>;

export default Login;
