import NextLink from 'next/link';
import { Box, Chip, Container, Link, Tooltip, Typography } from '@mui/material';

const platformIcons = {
  Amplify: '/static/icons/amplify.svg',
  Auth0: '/static/icons/auth0.svg',
  Firebase: '/static/icons/firebase.svg',
  JWT: '/static/icons/jwt.svg'
};

export const AuthBanner = () => (
  <Box
    sx={{
      backgroundColor: 'background.paper',
      borderBottom: 1,
      borderColor: 'divider',
      py: 1
    }}
  >
    <Container maxWidth="md">
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}
      >
        <Chip
          color="primary"
          label="NEW"
          sx={{ mr: 2 }}
          size="small"
        />
        <Typography variant="subtitle2">
          Welcome to
          {' '}
          <NextLink
            href="/docs/welcome"
            passHref
          >
            <Link variant="subtitle2">
              AiCollect.
            </Link>
          </NextLink>
          {' '}
          Verify email and continue to use Platform
        </Typography>
        
      </Box>
    </Container>
  </Box>
);
