import { useState, useCallback, useEffect } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Avatar, Box, Chip, Container, Link, Typography,Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { AuthGuard } from '../../../components/authentication/auth-guard';
import { DashboardLayout } from '../../../components/dashboard/dashboard-layout';
import { AccountEditForm } from '../../../components/dashboard/account/account-edit';
import { useMounted } from '../../../hooks/use-mounted';
import { gtm } from '../../../lib/gtm';
import { getInitials } from '../../../utils/get-initials';
import { useAuth } from '../../../hooks/use-auth';
import { UserCircle as UserCircleIcon } from "../../../icons/user-circle";


const AccountEdit = () => {
  const isMounted = useMounted();
  const { user } = useAuth();
  // Log Id

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);


  if (!user) {
    return null;
  }

  return (
    <>
      <Head>
        <title>
          Dashboard: Edit Account | AiCollect
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          backgroundColor: 'background.default',
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ mb: 4 }}>
            <NextLink
              href="/dashboard/account"
              passHref
            >
              <Link
                color="textPrimary"
                component="a"
                sx={{
                  alignItems: 'center',
                  display: 'flex'
                }}
              >
                <ArrowBackIcon
                  fontSize="small"
                  sx={{ mr: 1 }}
                />
                <Typography variant="subtitle2">
                  Account
                </Typography>
              </Link>
            </NextLink>
          </Box>
          <Box
                sx={{
                  alignItems: "center",
                  display: "flex",
                  px: 3,
                  py: 2,
                }}
              >
                <Avatar
                  src={user.Profile?.profileImage ? user.Profile.profileImage : "N/A"}
                  sx={{
                    height: 180,
                    mr: 2,
                    width: 180,
                    border: "2px solid #E0E0E0",
                  }}
                >
                  <UserCircleIcon fontSize="small" />
                </Avatar>
                <Button>Change Profile Image</Button>
          </Box>
          <Box mt={3}>
            <AccountEditForm customer={user} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

AccountEdit.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>
      {page}
    </DashboardLayout>
  </AuthGuard>
);

export default AccountEdit;
