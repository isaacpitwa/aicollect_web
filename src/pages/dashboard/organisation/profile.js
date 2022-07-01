import { useState, useEffect } from 'react';
import Head from 'next/head';
import { Box, Container, Divider, Tab, Tabs, Typography, Avatar } from '@mui/material';
import { AuthGuard } from '../../../components/authentication/auth-guard';
import { DashboardLayout } from '../../../components/dashboard/dashboard-layout';
import { AccountGeneralSettings } from '../../../components/dashboard/account/account-general-settings';
import { UserCircle as UserCircleIcon } from "../../../icons/user-circle";
import { useAuth } from '../../../hooks/use-auth';
import moment from 'moment';
import { OrganisationGeneralSettings } from '../../../components/dashboard/account/organisation-account';


const tabs = [
    { label: 'Organisation', value: 'general' },
];

const OrganisationProfile = () => {
    const { user } = useAuth();
    const [currentTab, setCurrentTab] = useState('general');


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
                    <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                        <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>

                            <Avatar
                                src={user.Profile?.companyLogo ? user.Profile.companyLogo : "N/A"}
                                sx={{
                                    height: 100,
                                    mr: 2,
                                    width: 100,
                                }}
                            >
                                <UserCircleIcon fontSize="small" />
                            </Avatar>
                            <Typography variant="h6">
                                {user.Profile?.companyName}
                            </Typography>
                        </Box>



                        <Box >
                            <Typography variant="body2">
                                Status:{' '} {user.status}
                            </Typography>
                            <Typography variant="body2">
                                Subscription plan: { 'Free Plan'}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant="body2">
                                Expiry Date: { moment(user.Profile?.createdAt).format('DD/MM/YYYY')}
                            </Typography>
                            <Typography variant="body2">
                                Members: {'N/A'}
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
                    <OrganisationGeneralSettings user={user} />
                </Container>
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
