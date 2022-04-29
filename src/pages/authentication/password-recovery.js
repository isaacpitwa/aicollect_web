import { useEffect, useState } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Box, Button, Card, Container, Divider, Link, TextField, Typography, Alert, Stack } from '@mui/material';
import { GuestGuard } from '../../components/authentication/guest-guard';
// import { AuthBanner } from '../../components/authentication/auth-banner';
import { AmplifyPasswordReset } from '../../components/authentication/amplify-password-reset';
import { Logo } from '../../components/logo';
import { useAuth } from '../../hooks/use-auth';
import { gtm } from '../../lib/gtm';
import { authenticationApi } from '../../api/auth-api';
import toast from 'react-hot-toast';

const platformIcons = {
  Amplify: '/static/icons/amplify.svg',
  Auth0: '/static/icons/auth0.svg',
  Firebase: '/static/icons/firebase.svg',
  JWT: '/static/icons/jwt.svg'
};

const PasswordRecovery = () => {
  const router = useRouter();
  const { platform } = useAuth();
  const { disableGuard, userId, token } = router.query;
  const [state, setState] = useState({
    password: '',
    confirmPassword: ''
  });

  const [loading, setLoading] = useState(false);
  const [passwordReset, setPasswordReset] = useState(null);

  const handleChange = (e) => {
    e.preventDefault();
    setState((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  const handlePasswordReset = async () => {
    setLoading(true);
    try {
      const { password, confirmPassword } = state;
      const data = await authenticationApi.resetForgottenPassword(password, confirmPassword, token, userId);
      if (data?.status === 200) {
        setPasswordReset(`Password has been reset successfully`);
        toast.success('Redirecting to login....', { duration: 7000 });
        router.push('/');
      } else {
        setPasswordReset(data?.message)
      }
    } catch (error) {
      console.log(error);
      setPasswordReset('Something went wrong, please try again later');
    }
    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>
          Password Reset | AiCollect
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
        {/* <AuthBanner /> */}
        <Container
          maxWidth="sm"
          sx={{
            py: {
              xs: '60px',
              md: '120px'
            }
          }}
        >
          <Box
            sx={{
              alignItems: 'center',
              backgroundColor: (theme) => theme.palette.mode === 'dark'
                ? 'neutral.900'
                : 'neutral.100',
              borderColor: 'divider',
              borderRadius: 1,
              borderStyle: 'solid',
              borderWidth: 1,
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              mb: 4,
              p: 2,
              '& > img': {
                height: 32,
                width: 'auto',
                flexGrow: 0,
                flexShrink: 0
              }
            }}
          >
            <Typography
              color="textSecondary"
              variant="caption"
            >
              Password reset Page
            </Typography>
          </Box>
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
                Password Reset
              </Typography>
              <Typography
                color="textSecondary"
                sx={{ mt: 2, mb: 4 }}
                variant="body2"
              >
                Please enter your new Password.
              </Typography>
              { passwordReset && <Alert severity={ passwordReset === 'Password has been reset successfully' ? 'success' : 'error'  } sx={{ width: '100%', mb: 3 }}>{passwordReset}</Alert> }
              <TextField
                label='Enter New Password'
                type='password'
                name="password"
                onChange={handleChange}
                value={state.password}
                placeholder='Password' fullWidth
              />
              <TextField
                sx={{ mt: 3, mb: 2 }}
                label='Confirm Password'
                type='password'
                name="confirmPassword"
                onChange={handleChange}
                value={state.confirmPassword}
                placeholder='Confirm Password' fullWidth
              />
              <Button
                variant='contained'
                style={{ marginTop: 15 }}
                onClick={handlePasswordReset}
                disabled={loading}
                fullWidth
                >
                  { loading ? 'loading ...' : 'Reset Password' }
              </Button>
            </Box>
          </Card>
        </Container>
      </Box>
    </>
  );
};

PasswordRecovery.getLayout = (page) => (
  <GuestGuard>
    {page}
  </GuestGuard>
);

export default PasswordRecovery;
