import { Box, Button, Card, Container, Divider, Link, TextField, Typography, Alert, Stack, Avatar } from '@mui/material';
import Head from 'next/head';

function DataShare(props) {
    return         <>
    <Head>
        <title>
            Collections  | AiCollect
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
                        Hey External User 👋🏽
                    </Typography>
                    <Typography
                        color="textSecondary"
                        sx={{ mt: 2, mb: 4 }}
                        variant="body2"
                    >
                       Your Viewing  shared Data is coming up.
                    </Typography>
                </Box>
            </Card>
        </Container>
    </Box>
</>;
  }
export default DataShare;