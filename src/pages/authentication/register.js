import { useEffect, useState } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Box, Card, Container, Divider, Link, Typography } from '@mui/material';
import { GuestGuard } from '../../components/authentication/guest-guard';
import { AuthBanner } from '../../components/authentication/auth-banner';
import { AmplifyRegister } from '../../components/authentication/amplify-register';
import { Auth0Register } from '../../components/authentication/auth0-register';
import { FirebaseRegister } from '../../components/authentication/firebase-register';
import { JWTRegister } from '../../components/authentication/jwt-register';
import { Logo } from '../../components/logo';
import { useAuth } from '../../hooks/use-auth';
import { gtm } from '../../lib/gtm';
import { clientsApi } from '../../api/clients-api';


const Register = () => {
  const router = useRouter();
  const { platform } = useAuth();
  const [clientInfo, setClientInfo] = useState({})
  const { disableGuard, clientId } = router.query;

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  useEffect(() => {
    const decodeToken = async () => {
      if (clientId) {
        const data = await clientsApi.getClient(clientId);
        console.log('Data Fetched', data);
        setClientInfo(data ? data : {});
      }
      else{
        router.push({pathname:'/'})
      }
    };
    decodeToken();
  }, [setClientInfo]);

  return (
    <>
      <Head>
        <title>
          Register | AiCollect
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
        <AuthBanner message="Complete Registration by  Create Personal Profile" />
        <Container
          maxWidth="sm"
          sx={{
            py: {
              xs: '40px',
              md: '80px'
            }
          }}
        >
          <Box sx={{ mb: 2, textAlign: 'center' }}>
            <Typography variant="h4" gutterBottom>
              <img src="/images/logo.svg" alt="aicollect-login" style={{ width: '12rem' }} />
            </Typography>
          </Box>
          <Card
            elevation={16}
            sx={{ p: 4 }}
          >
            <Box
              sx={{
                flexGrow: 1,
                mt: 3
              }}
            >
              <JWTRegister clientInfo={clientInfo} />
            </Box>
            <Divider sx={{ my: 3 }} />
          </Card>
        </Container>
      </Box>
    </>
  );
};

Register.getLayout = (page) => (
  <GuestGuard>
    {page}
  </GuestGuard>
);

export default Register;
