import { useState, useEffect, useCallback, useRef } from "react";
import Head from "next/head";
import {
  Box,
  Container,
  Grid,
  Typography
} from "@mui/material";
import Map from "react-map-gl";

import { AuthGuard } from "../../../../../../../components/authentication/auth-guard";
import { DashboardLayout } from "../../../../../../../components/dashboard/dashboard-layout";
import { gtm } from "../../../../../../../lib/gtm";
import { ResponseDetailsButton } from "../../../../../../../components/dashboard/projectDetails/questionairesDetails/responseDetailsButton";

const SingleFormResponse = () => {
  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);

  return (
    <>
      <Head>
        <title>Dashboard: Questionaire - Response</title>
        <link rel="stylesheet" href="https://api.tiles.mapbox.com/mapbox-gl-js/v2.7.0/mapbox-gl.css" />
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
            <Grid container justifyContent="space-between" spacing={3}>
              <Grid item>
                <Typography variant="h4">
                  Project XYZ - Questionaire X - Response J
                </Typography>
              </Grid>
            </Grid>
          </Box>
          
          <Box
            sx={{
              backgroundColor: 'neatral.100',
              // display: 'none',
              px: 2,
              py: 0.5,
              width: '100vw',
              height: "700px"
            }}>
              <Map
                initialViewState={{
                  longitude: -122.4,
                  latitude: 37.8,
                  zoom: 14,
                  width: "100%"
                }}
                mapboxAccessToken="pk.eyJ1Ijoicm9ja3NpZGUiLCJhIjoiY2tnajRkMzZtMDQxMzJybW5odTQxenYzYSJ9.yVkHVntUXJzsNh5wTL2CVg"
                style={{ width: 600, height: 400 }}
                mapStyle="mapbox://styles/mapbox/streets-v9"
              />
              <ResponseDetailsButton />
          </Box>
          
        </Container>
      </Box>
    </>
  );
};

SingleFormResponse.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default SingleFormResponse;
