import { useEffect, useState } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Box, Button, Card, Container, Divider, Link, TextField, Typography, Alert, Stack, Avatar, CircularProgress } from '@mui/material';
import { GuestGuard } from '../../components/authentication/guest-guard';
// import { AuthBanner } from '../../components/authentication/auth-banner';
import { AmplifyPasswordReset } from '../../components/authentication/amplify-password-reset';
import { Logo } from '../../components/logo';
import { useAuth } from '../../hooks/use-auth';
import { gtm } from '../../lib/gtm';
import { authenticationApi } from '../../api/auth-api';
import toast from 'react-hot-toast';
import { AuthGuard } from '../../components/authentication/auth-guard';
import { UserCircle as UserCircleIcon } from '../../icons/user-circle';


const platformIcons = {
    Amplify: '/static/icons/amplify.svg',
    Auth0: '/static/icons/auth0.svg',
    Firebase: '/static/icons/firebase.svg',
    JWT: '/static/icons/jwt.svg'
};

const LockAccess = () => {
    const router = useRouter();
    const { platform } = useAuth();
    const { disableGuard, userId, token } = router.query;
    const [state, setState] = useState({
        password: '',
        confirmPassword: ''
    });

    const [loading, setLoading] = useState(false);
    const [passwordReset, setPasswordReset] = useState(null);
    const { user } = useAuth();

    const handleChange = (e) => {
        e.preventDefault();
        setState((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
    };

    useEffect(() => {
        gtm.push({ event: 'page_view' });
    }, []);

    const handleUnlock = async () => {
        setLoading(true);
        try {
            const { password, confirmPassword } = state;
            const data = await authenticationApi.updateSession({ email: user.email, password: password });
            if (data?.status === 200) {
                setPasswordReset(`Unlock made successfully`);
                window.localStorage.setItem('accessToken', data.data);
                const returnUrl = router.query.returnUrl || "/dashboard";
                router.push(returnUrl);
            } else {
                setPasswordReset(data?.message)
            }
        } catch (error) {
            console.log(error);
            setPasswordReset(error.message ? "Wrong password" : 'Something went wrong, please try again later');
        }
        setLoading(false);
    };

    return (
        <>
            <Head>
                <title>
                    Lock Screen | AiCollect
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
                            <Avatar
                                sx={{
                                    height: 90,
                                    width: 90
                                }}
                                src={user?.Profile?.profileImage ? user.Profile.profileImage : 'https://www.kindpng.com/picc/m/163-1636340_user-avatar-icon-avatar-transparent-user-icon-png.png'}
                            >          <UserCircleIcon fontSize="small" />
                            </Avatar>
                            <Typography variant="h4">
                                {`${user?.firstname} ${user?.lastname}`}
                            </Typography>
                            <Typography
                                color="textSecondary"
                                sx={{ mt: 2, mb: 4 }}
                                variant="body2"
                            >
                                Please enter your  Password.
                            </Typography>
                            {passwordReset && <Alert severity={passwordReset === 'Password has been reset successfully' ? 'success' : 'error'} sx={{ width: '100%', mb: 3 }}>{passwordReset}</Alert>}
                            <TextField
                                label='Enter  Password'
                                type='password'
                                name="password"
                                onChange={handleChange}
                                value={state.password}
                                placeholder='Password' fullWidth
                            />
                            {
                                loading ?
                                    <Button variant="contained" disabled startIcon={<CircularProgress color="inherit"  size={16}/>} fullWidth style={{ marginTop: 15 }}>
                                        Loading...
                                    </Button> :
                                    <Button
                                        variant='contained'
                                        style={{ marginTop: 15 }}
                                        onClick={handleUnlock}
                                        disabled={loading || !state.password}
                                        fullWidth
                                    >

                                        Unlock
                                    </Button>

                            }

                        </Box>
                    </Card>
                </Container>
            </Box>
        </>
    );
};

LockAccess.getLayout = (page) => (
    <AuthGuard>
        {page}
    </AuthGuard>
);

export default LockAccess;
