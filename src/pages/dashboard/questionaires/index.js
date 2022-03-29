import { useState, useEffect } from 'react';
import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { AuthGuard } from '../../../components/authentication/auth-guard';
import { DashboardLayout } from '../../../components/dashboard/dashboard-layout';
import Questionaire from '../../../components/dashboard/questionaire';
import { gtm } from '../../../lib/gtm';

import FormProvider from '../../../components/dashboard/questionaire/context'

const Questionaires = () => {

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, [])

  return (
    <>
      <Head>
        <title>
          Dashboard: Questionaires
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
            <FormProvider>
              <Questionaire/>
            </FormProvider>
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
