import { useState, useEffect, useCallback, useRef } from 'react';
import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { AuthGuard } from '../../../components/authentication/auth-guard';
import { DashboardLayout } from '../../../components/dashboard/dashboard-layout';
import Questionaire from '../../../components/dashboard/questionaire';
import { gtm } from '../../../lib/gtm';

const Questionaires = () => {

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, [])

  return (
    <>
      <Head>
        <title>
          Dashboard: Customer List | Material Kit Pro
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
            <Questionaire/>
          </Box>
        </Container>
      </Box>
    </>
  )
}

Questionaires.getLayout = (page) => (
  <AuthGuard>
      <DashboardLayout>
        {page}
      </DashboardLayout>
    </AuthGuard>
  );

export default Questionaires
