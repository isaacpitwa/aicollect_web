import { useState, useEffect } from 'react';
import Head from 'next/head';
import { Box, Container, Divider, Tab, Tabs, Typography } from '@mui/material';
import { AuthGuard } from '../../../components/authentication/auth-guard';
import { DashboardLayout } from '../../../components/dashboard/dashboard-layout';
import { AccountGeneralSettings } from '../../../components/dashboard/account/account-general-settings';

import { gtm } from '../../../lib/gtm';
import { useAuth } from '../../../hooks/use-auth';

const tabs = [
  { label: 'General', value: 'general' },
];

const Account = () => {
  const { user } = useAuth();
  const [currentTab, setCurrentTab] = useState('general');

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  return (
    <>
      <Head>
        <title>
          Dashboard: Account | AiCollect
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h4">
            Account
          </Typography>
          <Tabs
            indicatorColor="primary"
            onChange={handleTabsChange}
            scrollButtons="auto"
            textColor="primary"
            value={currentTab}
            variant="scrollable"
            sx={{ mt: 3 }}
          >
            {tabs.map((tab) => (
              <Tab
                key={tab.value}
                label={tab.label}
                value={tab.value}
              />
            ))}
          </Tabs>
          <Divider sx={{ mb: 3 }} />
          {currentTab === 'general' && <AccountGeneralSettings user={user} />}
        </Container>
      </Box>
    </>
  );
};

Account.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>
      {page}
    </DashboardLayout>
  </AuthGuard>
);

export default Account;
