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


const CompleteRegistration = ({email}) => {
  const router = useRouter();
  const isMounted = useMounted();

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);


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
              <Typography variant="h5">
                Confirm Email Address
              </Typography>
              <Typography
                color="textSecondary"
                sx={{ mt: 1, mb: 4 }}
                variant="body2"
              >
               An Email  has been sent to your email Address.
              </Typography>
              
              
            </Box>
            <Divider sx={{ my: 3 }} />
          </Card>
        </Container>
      </Box>
    </>
  );
};

CompleteRegistration.getLayout = (page) => (
  <GuestGuard>
    {page}
  </GuestGuard>
);

export default CompleteRegistration;
