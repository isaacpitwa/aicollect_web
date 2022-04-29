import { useEffect } from "react";
import Head from "next/head";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Container,
  FormControl,
  FormLabel,
  Grid,
  MenuItem,
  Select,
  Switch,
  Typography,
} from "@mui/material";
import Map from "react-map-gl";

// import { AuthGuard } from "../../../../../../../../../components/authentication/auth-guard";
import { AuthGuard } from "../../../../../../../components/authentication/auth-guard";
import { DashboardLayout } from "../../../../../../../components/dashboard/dashboard-layout";
import { gtm } from "../../../../../../../lib/gtm";

const TaskMapArea = () => {
  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);

  return (
    <>
      <Head>
        <title>Dashboard: Questionaire - Map </title>
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
                  Project XYZ - Explore your coverage
                </Typography>
              </Grid>
            </Grid>
          </Box>

          <Grid container display="flex" flexDirection="row" justifyContent="space-around" spacing={3}>
            <Grid item md={4}>
              <Card elevate={3}>
                <CardContent>
                <Typography variant="h6" mb={3}>Boundaries Explorer</Typography>
                <Grid item>
                <FormControl fullWidth>
                  <FormLabel>Country / Territory</FormLabel>
                  <Select value="kampala">
                    <MenuItem value="kampala">Kampala</MenuItem>
                    <MenuItem value="wakiso">Wakiso</MenuItem>
                  </Select>
                </FormControl>
                </Grid>
                <Grid item mt={3}>
                <FormControl fullWidth>
                  <FormLabel>World View for <Typography variant="caption">disputed areas</Typography></FormLabel>
                  <Select value="">
                    <MenuItem value="kampala">Kampala</MenuItem>
                    <MenuItem value="wakiso">Wakiso</MenuItem>
                  </Select>
                </FormControl>
                </Grid>
                <Grid item mt={3}>
                <FormControl fullWidth>
                  <FormLabel>Boundary <Typography variant="caption">by type and levels</Typography></FormLabel>
                  <Select value="">
                    <MenuItem value="kampala">Kampala</MenuItem>
                    <MenuItem value="wakiso">Wakiso</MenuItem>
                  </Select>
                </FormControl>
                </Grid>
                </CardContent>
                <CardActions style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Typography>35 Boundaries</Typography>
                  <Switch defaultChecked />
                </CardActions>
              </Card>
            </Grid>
            <Grid item md={8} xs={12}>
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
                <div
                  style={{
                    backgroundColor: '#404040',
                    display: 'inline-block',
                    padding: "6px",
                    zIndex: '1 !important',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    margin: 12,
                    borderRadius: '4px'
                  }}
                >
                  <h4>Hello there</h4>
                </div>
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

TaskMapArea.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default TaskMapArea;
