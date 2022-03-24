import { useCallback, useState, useEffect } from 'react';
import NextLink from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import {
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Grid,
  Link,
  Tab,
  Tabs,
  Typography
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { userApi } from '../../../../api/users-api';
import { AuthGuard } from '../../../../components/authentication/auth-guard';
import { DashboardLayout } from '../../../../components/dashboard/dashboard-layout';
import { UserBasicDetails } from '../../../../components/dashboard/user/user-basic-details';
import { UserDataManagement } from '../../../../components/dashboard/user/user-data-management';
// import { CustomerEmailsSummary } from '../../../../components/dashboard/customer/customer-emails-summary';
// import { CustomerInvoices } from '../../../../components/dashboard/customer/customer-invoices';
// import { CustomerPayment } from '../../../../components/dashboard/customer/customer-payment';
import { UserLogs } from '../../../../components/dashboard/user/user-logs';
import { useMounted } from '../../../../hooks/use-mounted';
import { ChevronDown as ChevronDownIcon } from '../../../../icons/chevron-down';
import { PencilAlt as PencilAltIcon } from '../../../../icons/pencil-alt';
import { gtm } from '../../../../lib/gtm';
import { getInitials } from '../../../../utils/get-initials';

const tabs = [
  { label: 'Details', value: 'details' },
  // { label: 'Invoices', value: 'invoices' },
  { label: 'Recent Activity', value: 'logs' }
];

const UserDetails = () => {
  const isMounted = useMounted();
  const [customer, setCustomer] = useState(null);
  const [currentTab, setCurrentTab] = useState('details');
  const router = useRouter();
  const { userId } = router.query;
  // Log
  // console.log(customerId);

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  const getCustomer = useCallback(async () => {
    try {

      const data = await userApi.getUserDetails(userId);

      if (isMounted()) {
        setCustomer(data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted, userId]);

  useEffect(() => {
      getCustomer();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  if (!customer) {
    return null;
  }

  return (
    <>
      <Head>
        <title>
          Dashboard: User Details | AiCollect
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
          <div>
            <Box sx={{ mb: 4 }}>
              <NextLink
                href="/dashboard/users"
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
                    Users
                  </Typography>
                </Link>
              </NextLink>
            </Box>
            <Grid
              container
              justifyContent="space-between"
              spacing={3}
            >
              <Grid
                item
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                  overflow: 'hidden'
                }}
              >
                <Avatar
                  src={customer.avatar}
                  sx={{
                    height: 64,
                    mr: 2,
                    width: 64
                  }}
                >
                  {getInitials(`${customer.firstname} ${customer.lastname}`)}
                </Avatar>
                <div>
                  <Typography variant="h4">
                    {customer.email}
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <Typography variant="subtitle2">
                      user_id:
                    </Typography>
                    <Chip
                      label={customer.id}
                      size="small"
                      sx={{ ml: 1 }}
                    />
                  </Box>
                </div>
              </Grid>
              <Grid
                item
                sx={{ m: -1 }}
              >
                <NextLink
                  href="/dashboard/customers/1/edit"
                  passHref
                >
                  <Button
                    component="a"
                    endIcon={(
                      <PencilAltIcon fontSize="small" />
                    )}
                    sx={{ m: 1 }}
                    variant="outlined"
                  >
                    Edit
                  </Button>
                </NextLink>
                <Button
                  endIcon={(
                    <ChevronDownIcon fontSize="small" />
                  )}
                  sx={{ m: 1 }}
                  variant="contained"
                >
                  Actions
                </Button>
              </Grid>
            </Grid>
            <Tabs
              indicatorColor="primary"
              onChange={handleTabsChange}
              scrollButtons="auto"
              sx={{ mt: 3 }}
              textColor="primary"
              value={currentTab}
              variant="scrollable"
            >
              {tabs.map((tab) => (
                <Tab
                  key={tab.value}
                  label={tab.label}
                  value={tab.value}
                />
              ))}
            </Tabs>
          </div>
          <Divider />
          <Box sx={{ mt: 3 }}>
            {currentTab === 'details' && (
              <Grid
                container
                spacing={3}
              >
                <Grid
                  item
                  xs={12}
                >
                  <UserBasicDetails
                    firstname={customer.firstname}
                    lastname={customer.lastname}
                    roles={customer.roles}
                    address1={customer.address1}
                    address2={customer.address2}
                    country={customer.country}
                    email={customer.email}
                    isVerified={customer.isVerified}
                    phone={customer.phone}
                    state={customer.state}
                  />
                </Grid>
                {/* <Grid
                  item
                  xs={12}
                >
                  <CustomerPayment />
                </Grid> */}
                {/* <Grid
                  item
                  xs={12}
                >
                  <CustomerEmailsSummary />
                </Grid> */}
                <Grid
                  item
                  xs={12}
                >
                  <UserDataManagement id={userId} />
                </Grid>
              </Grid>
            )}
            {/* {currentTab === 'invoices' && <CustomerInvoices />} */}
            {currentTab === 'logs' && <UserLogs />}
          </Box>
        </Container>
      </Box>
    </>
  );
};

UserDetails.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>
      {page}
    </DashboardLayout>
  </AuthGuard>
);

export default UserDetails;

