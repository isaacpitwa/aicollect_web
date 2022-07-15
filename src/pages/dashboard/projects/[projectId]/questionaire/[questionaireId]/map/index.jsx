import { useEffect, useState, useCallback, } from "react";
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
  Button,
} from "@mui/material";
import Map, { Marker } from "react-map-gl";
import { useRouter } from 'next/router'
import NextLink from 'next/link';
import { AuthGuard } from "../../../../../../../components/authentication/auth-guard";
import { DashboardLayout } from "../../../../../../../components/dashboard/dashboard-layout";
import { gtm } from "../../../../../../../lib/gtm";
import { projectsApi } from '../../../../../../../api/projects-api';
import { FormsApi } from '../../../../../../../api/forms-api'
import { MdLocationPin } from 'react-icons/md';

const TaskMapArea = () => {
  const router = useRouter()
  const { projectId, questionaireId } = router.query;
  const [project, setProject] = useState(null);
  const [questionaire, setQuestionaire] = useState(null);
  const [responses, setResponses] = useState([]);
  const [centerLocation, setCenterLocation] = useState(null);

  const fetchFieldFormDetails = useCallback(async () => {
    try {
      const data = await FormsApi.getFormDetails(questionaireId);
      if (data) {
        setQuestionaire(data);
      } else {
        toast.error(data?.message)
      }
    } catch (error) {
      console.log(error);
    }
  }, [setQuestionaire, questionaireId]);


  useEffect(() => {
    fetchFieldFormDetails();
  }, []);


  const fetchFormResponses = async () => {
    const apiReponses = await FormsApi.getFormResponses(questionaireId);
    setResponses(apiReponses);
    const sumLongitude = apiReponses.map(response =>  response.gps ? response.gps.longitude: 0).reduce((a, b) => a + b, 0);
    const sumLatitude = apiReponses.map(response =>  response.gps ? response.gps.latitude: 0).reduce((a, b) => a + b, 0);

    setCenterLocation({longitude: sumLongitude / apiReponses.length, latitude: sumLatitude / apiReponses.length});
  }

  useEffect(() => {
    fetchFormResponses()
  }, [])


  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);

  const fetchProjectDetails = useCallback(async () => {
    try {
      const data = await projectsApi.fetchProjectDetails(projectId);
      if (data?.status === 200) {
        setProject(data.data);
      } else {
        toast.error(data?.message)
      }
    } catch (error) {
      console.log(error);
    }
  }, [setProject, projectId]);

  useEffect(() => {
    fetchProjectDetails();
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
          py: 2,

        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ mb: 2 }}>
            <Grid container justifyContent="space-between" spacing={3}>
              <Grid item>
                <Typography variant="h6">
                  <NextLink
                    href={`/dashboard/projects/${project && project._id}`}
                    passHref

                  ><a style={{ textDecoration: 'none' }}>{project && project.projectname}</a></NextLink> {'> '}
                  <NextLink
                    href={`/dashboard/projects/${project && project._id}/questionaire/${questionaire && questionaire._id}`}
                    passHref

                  ><a style={{ textDecoration: 'none' }}>{questionaire && questionaire.name}</a></NextLink>
                </Typography>
              </Grid>
            </Grid>
          </Box>

          <Grid container display="flex" flexDirection="row" justifyContent="space-around" spacing={3}>
            {/* <Grid item md={4}>
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
            </Grid> */}
            <Grid item md={12} xs={12} sx={{
              paddingLeft: 0,
            }}>
              <Box
                sx={{
                  backgroundColor: "neatral.100",
                  // display: 'none',
                  px: 0,
                  py: 0,
                  width: "100vw",
                  height: "90vh",
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
                  <h4 style={{ color: 'GrayText' }}>Hello there</h4>
                </div>
                <Map
                  initialViewState={{
                    longitude:  centerLocation? centerLocation.longitude : 32.513311,
                    latitude:  centerLocation ?  centerLocation.latitude : 0.3899683,
                    zoom: 10,
                    width: "100%",
                  }}
                  mapboxAccessToken={process.env.NEXT_PUBLIC_GOOGLE_MAP_TOKEN}
                  mapStyle="mapbox://styles/mapbox/streets-v9"
                >

                  {
                    responses.length > 0 ? responses.map((response, index) =>
                    { 
                      console.log(response.gps);
                      return response.gps ?  response.gps.coords ? <Marker longitude={response.gps.coords.longitude} latitude={response.gps.coords.latitude} anchor="bottom" key={index}>
                        <MdLocationPin style={{
                          color: '#ff0000',
                          fontSize: '24px',
                        }} />
                      </Marker> :<Marker longitude={response.gps.longitude} latitude={response.gps.latitude} anchor="bottom" key={index}>
                        <MdLocationPin style={{
                          color: '#ff0000',
                          fontSize: '24px',
                        }} />
                      </Marker> : null

                      }
                    ) : null
                  }
                </Map>
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
