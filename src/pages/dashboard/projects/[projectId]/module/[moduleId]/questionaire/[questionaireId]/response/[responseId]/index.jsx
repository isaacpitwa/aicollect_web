import { useState, useEffect } from "react";
import Head from "next/head";
import {
  Card,
  Box,
  Container,
  Grid,
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Map from "react-map-gl";

import { AuthGuard } from "../../../../../../../../components/authentication/auth-guard";
import { DashboardLayout } from "../../../../../../../../components/dashboard/dashboard-layout";
import { gtm } from "../../../../../../../../lib/gtm";
import FarmerDetails from "../../../../../../../../components/dashboard/projectDetails/questionairesDetails/FarmerDetails";

const SingleFormResponse = () => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);

  return (
    <>
      <Head>
        <title>Dashboard: Questionaire - Response</title>
        <link
          rel="stylesheet"
          href="https://api.tiles.mapbox.com/mapbox-gl-js/v2.7.0/mapbox-gl.css"
        />
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
          <Grid container spacing={3}>
            <Grid
              item
              md={6}
              xs={6}
              position="absolute"
              width={800}
              right={40}
              bottom={110}
              zIndex={1}
            >
              <Card elevation={5}>
                <Accordion
                  elevation={5}
                  expanded={expanded === "panel1"}
                  onChange={handleChange("panel1")}
                >
                  <AccordionSummary
                    expandedIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <Typography sx={{ width: "33%", flexShrink: 0 }}>
                      Musoke Dan
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <FarmerDetails />
                  </AccordionDetails>
                </Accordion>
              </Card>
            </Grid>
            <Grid item md={12} xs={12} mr={3}>
              <Box
                sx={{
                  backgroundColor: "neatral.100",
                  // display: 'none',
                  px: 2,
                  py: 0.5,
                  width: "100vw",
                  height: "700px",
                }}
              >
                <Map
                  initialViewState={{
                    longitude: -122.45,
                    latitude: 37.78,
                    zoom: 14,
                    width: "100%",
                  }}
                  mapboxAccessToken={process.env.NEXT_PUBLIC_GOOGLE_MAP_TOKEN}
                  mapStyle="mapbox://styles/mapbox/streets-v9"
                />
              </Box>
            </Grid>
          </Grid>
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
