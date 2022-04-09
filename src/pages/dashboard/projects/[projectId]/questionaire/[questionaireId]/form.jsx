import React, { useState, useEffect } from "react";
import Head from "next/head";
import { Box, Container } from "@mui/material";
import { useRouter } from "next/router";

import { AuthGuard } from "../../../../../../components/authentication/auth-guard";
import { DashboardLayout } from "../../../../../../components/dashboard/dashboard-layout";
import Questionaire from "../../../../../../components/dashboard/questionaire";
import FormProvider from "../../../../../../components/dashboard/questionaire/context";

// To be used when modules folder structure is fixed
// import { AuthGuard } from "../../../../../../../../components/authentication/auth-guard";
// import { DashboardLayout } from "../../../../../../../../components/dashboard/dashboard-layout";
// import Questionaire from "../../../../../../../../components/dashboard/questionaire";
// import FormProvider from "../../../../../../../../components/dashboard/questionaire/context";

const Form = () => {
  const router = useRouter();
  const { questionaireId } = router.query;

  return (
    <>
      <Head>
        <title>Dashboard: Form Builder</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ mb: 4 }}>
            <FormProvider questionaireId={questionaireId}>
              <Questionaire />
            </FormProvider>
          </Box>
        </Container>
      </Box>
    </>
  );
};
Form.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default Form;
