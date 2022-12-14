import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Divider,
  Grid,
  MenuItem,
  TextField,
  Typography
} from '@mui/material';
import { AuthGuard } from '../../components/authentication/auth-guard';
import { DashboardLayout } from '../../components/dashboard/dashboard-layout';
import { OverviewBanner } from '../../components/dashboard/overview/overview-banner';
import { OverviewTotalBalance } from '../../components/dashboard/overview/overview-total-balance';
import { OverviewTotalTransactions } from '../../components/dashboard/overview/overview-total-transactions';
import { ArrowRight as ArrowRightIcon } from '../../icons/arrow-right';
import { ExternalLink as ExternalLinkIcon } from '../../icons/external-link';
import { InformationCircleOutlined as InformationCircleOutlinedIcon } from '../../icons/information-circle-outlined';
import { Reports as ReportsIcon } from '../../icons/reports';
import { Users as UsersIcon } from '../../icons/users';
import { gtm } from '../../lib/gtm';
import { useAuth } from '../../hooks/use-auth';

const Overview = () => {
  const [displayBanner, setDisplayBanner] = useState(true);
  const { user } = useAuth();
  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  useEffect(() => {
    // Restore the persistent state from local/session storage
    const value = globalThis.sessionStorage.getItem('dismiss-banner');

    if (value === 'true') {
      // setDisplayBanner(false);
    }
  }, []);

  const handleDismissBanner = () => {
    // Update the persistent state
    // globalThis.sessionStorage.setItem('dismiss-banner', 'true');
    setDisplayBanner(false);
  };

  return (
    <>
      <Head>
        <title>
          Dashboard: Overview | AI Collect
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ mb: 4 }}>
            <Grid
              container
              justifyContent="space-between"
              spacing={3}
            >
              <Grid item>
                <Typography variant="h4">
                  Good Morning
                </Typography>
                <Typography variant='caption'>
                  Welcome back {user?.firstname}, We&apos;ve missed you ????
                </Typography>
              </Grid>
              <Grid
                item
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  m: -1
                }}
              >
                <Button
                  startIcon={<ReportsIcon fontSize="small" />}
                  sx={{ m: 1 }}
                  variant="outlined"
                >
                  Reports
                </Button>
                <TextField
                  defaultValue="week"
                  label="Period"
                  select
                  size="small"
                  sx={{ m: 1 }}
                >
                  <MenuItem value="week">
                    Last week
                  </MenuItem>
                  <MenuItem value="month">
                    Last month
                  </MenuItem>
                  <MenuItem value="year">
                    Last year
                  </MenuItem>
                </TextField>
              </Grid>
            </Grid>
          </Box>
          <Grid
            container
            spacing={4}
          >
            {displayBanner && (
              <Grid
                item
                xs={12}
              >
                <OverviewBanner onDismiss={handleDismissBanner} />
              </Grid>
            )}

            <Grid
              item
              md={8}
              xs={12}
            >
              <OverviewTotalTransactions />
            </Grid>
            <Grid
              item
              md={4}
              xs={12}
            >
              <OverviewTotalBalance />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <Card>
                <CardContent>
                  <Box
                    sx={{
                      alignItems: 'center',
                      display: 'flex'
                    }}
                  >
                    <InformationCircleOutlinedIcon color="primary" />
                    <Typography
                      color="primary.main"
                      sx={{ pl: 1 }}
                      variant="subtitle2"
                    >
                      Help Center
                    </Typography>
                  </Box>
                  <Typography
                    sx={{ mt: 2 }}
                    variant="h6"
                  >
                    Need help figuring things out?
                  </Typography>
                  <Typography
                    color="textSecondary"
                    variant="body2"
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing
                    elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </Typography>
                </CardContent>
                <Divider />
                <CardActions>
                  <Button
                    endIcon={<ExternalLinkIcon fontSize="small" />}
                    size="small"
                  >
                    Help Center
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <Card>
                <CardContent>
                  <Box
                    sx={{
                      alignItems: 'center',
                      display: 'flex'
                    }}
                  >
                    <UsersIcon color="primary" />
                    <Typography
                      color="primary.main"
                      sx={{ pl: 1 }}
                      variant="subtitle2"
                    >
                      Projects
                    </Typography>
                  </Box>
                  <Typography
                    sx={{ mt: 2 }}
                    variant="h6"
                  >
                    Projects allow you to create your Projects
                  </Typography>
                  <Typography
                    color="textSecondary"
                    variant="body2"
                  >
                    Manage all your data collection projects from this section, assign team to tasks,
                    create questonaires and many more!
                  </Typography>
                </CardContent>
                <Divider />
                <CardActions>
                  <NextLink href='/dashboard/projects'>
                  <Button
                    endIcon={<ArrowRightIcon fontSize="small" />}
                    size="small"
                    variant="outlined"
                  >
                    My Projects
                  </Button>
                  </NextLink>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Overview.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>
      {page}
    </DashboardLayout>
  </AuthGuard>
);

export default Overview;
