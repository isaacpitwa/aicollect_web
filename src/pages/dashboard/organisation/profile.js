import { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import { Box, Container, Divider, Tab, Tabs, Typography, Avatar, CircularProgress } from '@mui/material';
import { AuthGuard } from '../../../components/authentication/auth-guard';
import { DashboardLayout } from '../../../components/dashboard/dashboard-layout';
import { AccountGeneralSettings } from '../../../components/dashboard/account/account-general-settings';
import { UserCircle as UserCircleIcon } from "../../../icons/user-circle";
import { useAuth } from '../../../hooks/use-auth';
import moment from 'moment';
import { OrganisationGeneralSettings } from '../../../components/dashboard/account/organisation-account';
import { clientsApi } from '../../../api/clients-api';
import toast from 'react-hot-toast';


const tabs = [
    { label: 'Organisation', value: 'general' },
];

const OrganisationProfile = () => {
    const { user } = useAuth();
    const [currentTab, setCurrentTab] = useState('general');
    const [organisation, setOrganisation] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleTabsChange = (event, value) => {
        setCurrentTab(value);
    };

    const getClientProfile = useCallback(async () => {
        if (user.client) {
            setLoading(true);
            try {
                const data = await clientsApi.getClientProfile(user.client);
                console.log("data", data);
                if (data?.status === 200 ||  data?.status === 304) {
                    toast.success(data.message, { duration: 10000 });
                    setOrganisation(data.data);
                    console.log(data);
                } else {
                    toast.error(data.data.message)
                }
            } catch (error) {
                console.log(error);
                toast.error('Sorry, can not load project details right now, try again later', { duration: 6000 });
            }
            setLoading(false);
        } else {
            toast.error('You are not attached to any client', { duration: 6000 });
            setLoading(false);
        }
    }, [setOrganisation, setLoading, user.client]);

    useEffect(() => {
        getClientProfile();
    }, [])

    return (
        <>
            <Head>
                <title>
                    Dashboard: Client Account | AiCollect
                </title>
            </Head>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8
                }}
            >
                {organisation && !loading ? (<Container maxWidth="md">
                    <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                        <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>

                            <Avatar
                                src={organisation.logo ? organisation.logo : "N/A"}
                                sx={{
                                    height: 100,
                                    mr: 2,
                                    width: 100,
                                }}
                            >
                                <UserCircleIcon fontSize="small" />
                            </Avatar>
                            <Typography variant="h6">
                                {organisation.name ?? "N/A"}
                            </Typography>
                        </Box>



                        <Box >
                            <Typography variant="body2">
                                Status:{' '} {organisation.status}
                            </Typography>
                            <Typography variant="body2">
                                Subscription plan: { organisation && organisation.BillingPlan ? organisation.BillingPlan.name :  "..."}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant="body2">
                                Expiry Date: {moment(organisation.subscribedAt).add(organisation.BillingPlan.period,'months').format('DD/MM/YYYY')}
                            </Typography>
                            <Typography variant="body2">
                                Members: {organisation.Users.length}
                            </Typography>
                        </Box>
                    </Box>
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
                    <OrganisationGeneralSettings user={user} organisation={organisation} />
                </Container>) : (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '50vh' }}>
                        <CircularProgress />
                    </Box>)
                }
            </Box>
        </>
    );
};

OrganisationProfile.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout>
            {page}
        </DashboardLayout>
    </AuthGuard>
);

export default OrganisationProfile;
