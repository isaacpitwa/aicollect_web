import { Box, Button, Card, Container, Divider, Link, TextField, Typography, Alert, Stack, Avatar } from '@mui/material';
import Head from 'next/head';

function TimeOut(props) {
    return         <>
    <Head>
        <title>
            Time out  | AiCollect
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
                    <Typography variant="h4">
                        Time Out 😫
                    </Typography>
                    <Typography
                        color="textSecondary"
                        sx={{ mt: 2, mb: 4 }}
                        variant="body2"
                    >
                       Time for  Viewing  shared Data is out.
                    </Typography>
                </Box>
            </Card>
        </Container>
    </Box>
</>;
  }
export default TimeOut;