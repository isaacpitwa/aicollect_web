import { useEffect } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
// import * as Yup from "yup";
// import { useFormik } from "formik";
import { Box, Button, Card, Container, Divider, Link, Typography } from '@mui/material';
import { GuestGuard } from '../../components/authentication/guest-guard';
import { AuthBanner } from '../../components/authentication/auth-banner';
// import { AmplifyVerifyCode } from '../../components/authentication/amplify-verify-code';
import { Logo } from '../../components/logo';
import { useAuth } from '../../hooks/use-auth';
import { gtm } from '../../lib/gtm';
import { useMounted } from '../../hooks/use-mounted';
import { useState } from 'react';


const VerifyCode = () => {
  const router = useRouter();
  const { authenticateAfterEmailVerify, user } = useAuth();
  const { disableGuard, token } = router.query;
  const [loading, setLoading] = useState(false);
  const isMounted = useMounted();

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  const handleVerifyEmail = async () => {
    setLoading(true);
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_AUTH_URL}/authService/verifyEmail?token=${token}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'Application/json'
          }
        });
        const data = await response.json();
        console.log(data);
        if (data.status === 201) {
          localStorage.setItem('accessToken', data.data.token);
          await authenticateAfterEmailVerify();
          if (isMounted()) {
            router.push('/createPassword');
          }
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
  }

  return (
    <>
      <Head>
        <title>
          Verify Email | AiCollect
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh'
        }}
      >
        <AuthBanner />
        <Container
          maxWidth="sm"
          sx={{
            py: {
              xs: '60px',
              md: '120px'
            }
          }}
        >
          <Card
            elevation={16}
            sx={{ p: 4 }}
          >
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}
            >
              <NextLink
                href="/"
                passHref
              >
                <a>
                  <Logo
                    sx={{
                      height: 40,
                      width: 40
                    }}
                  />
                </a>
              </NextLink>
              <Typography variant="h4">
                Verify Email
              </Typography>
              <Typography
                color="textSecondary"
                sx={{ mt: 2, mb: 4 }}
                variant="body2"
              >
                Click button below to verify your email
              </Typography>
              <Button
                variant="contained"
                type="submit"
                disabled={loading}
                onClick={handleVerifyEmail}
                >
                  Verify Account
              </Button>
              
            </Box>
            <Divider sx={{ my: 3 }} />
          </Card>
        </Container>
      </Box>
    </>
  );
};

VerifyCode.getLayout = (page) => (
  <GuestGuard>
    {page}
  </GuestGuard>
);

export default VerifyCode;
