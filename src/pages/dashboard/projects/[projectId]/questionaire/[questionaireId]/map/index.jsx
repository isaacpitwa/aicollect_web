import React, { useEffect, useState, useCallback, useRef } from "react";
import Head from "next/head";
import { GoogleMap, useJsApiLoader, Polygon, InfoWindow, Marker } from '@react-google-maps/api';

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
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  Divider,
  IconButton,
  TextField,
  InputAdornment,
  InputLabel,
} from "@mui/material";
// import Map, { Marker, Popup, Layer } from "react-map-gl";
import { useRouter } from 'next/router'
import NextLink from 'next/link';
import { AuthGuard } from "../../../../../../../components/authentication/auth-guard";
import { DashboardLayout } from "../../../../../../../components/dashboard/dashboard-layout";
import { gtm } from "../../../../../../../lib/gtm";
import { projectsApi } from '../../../../../../../api/projects-api';
import { FormsApi } from '../../../../../../../api/forms-api'
import { MdLocationPin, MdFilterListAlt } from 'react-icons/md';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Search as SearchIcon } from '../../../../../../../icons/search';
import { ImUser } from 'react-icons/im';
import { Utils } from "../../../../../../../utils/main";
import toast from 'react-hot-toast';
import { styled, useTheme } from '@mui/material/styles';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CssBaseline from '@mui/material/CssBaseline';

const drawerWidth = 320;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    // padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `0`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: `${drawerWidth}px`,
    }),
  }),
);

const parkLayer = {
  id: 'landuse_park',
  type: 'fill',
  source: 'mapbox',
  'source-layer': 'landuse',
  filter: ['==', 'class', 'park'],
  paint: {
    'fill-color': '#4E3FC8'
  }
};

const TaskMapArea = ({ questionaireResponses }) => {
  const router = useRouter()
  const { projectId, questionaireId } = router.query;
  const [project, setProject] = useState(null);
  const [questionaire, setQuestionaire] = useState(null);
  const [responses, setResponses] = useState([]);
  const [centerLocation, setCenterLocation] = useState(null);
  const [showPopup, setShowPopup] = React.useState(false);
  const [selectedMarker, setSelectedMarker] = useState({});
  const [open, setOpen] = React.useState(false);
  const [filteredResponses, setFilteredResponses] = useState([]);
  const [filterRegion, setFilterRegion] = useState('');
  const [filterStatus, setFilterStatus] = useState(false);

  const queryRef = useRef(null);
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);


  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyCt86FQK_WYrNu6SN0yoB6YRh_CzNaypGI"
  })

  const onMapLoad = (map) => {
    setMap(map);
  }

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
    apiReponses.reverse();
    setResponses(apiReponses);
    const sumLongitude = apiReponses.map(response => response.gps ? response.gps.longitude : 0).reduce((a, b) => a + b, 0);
    const sumLatitude = apiReponses.map(response => response.gps ? response.gps.latitude : 0).reduce((a, b) => a + b, 0);
    setCenterLocation({ longitude: sumLongitude / apiReponses.length, latitude: sumLatitude / apiReponses.length });
    setFilteredResponses(apiReponses);
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

  const onMarkerClicked = ({ response, location }) => {
    if (response && response.gps) {
      setSelectedMarker({ response: response, location: location });
      setShowPopup(true);
    }
  }

  const toggleDrawer = () => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(!open);
  };


  const handleSearch = (event) => {
    event.preventDefault();
    const searchValue = queryRef.current?.value;
    if (searchValue) {
      const results = responses.filter(response =>
        response.person && response.person.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredResponses(results);
    }
    else setFilteredResponses(responses);
  }

  const handleRepondentClick = (response) => {
    // Fly to  location
    if (response.gps) {
      const center = {
        lat: response.gps.coords ? response.gps.coords.latitude : response.gps.latitude,
        lng: response.gps.coords ? response.gps.coords.longitude : response.gps.longitude
      };
      map.moveCamera({
        center: center,
        zoom: 20,
      });
      setSelectedMarker({ response: response, location: center });
      setShowPopup(true);
    } else {
      toast.error('No GPS location found for this respondent')
    }
  }

  const handleFilterByRegionChange = (event) => {
    const region = event.target.value;
    setFilterRegion(region);
    if (region) {
      const results = responses.filter(response =>
        response.region && Utils.isInRegion(response, region)
      );
      setFilteredResponses(results);
    } else
      setFilteredResponses(responses);
    ;

  }

  const filter = (event) => {
    setFilterStatus(!filterStatus);
  }

  return (
    <>
      <Head>
        <title>Dashboard: Questionaire - Map </title>
      </Head>
      <Main open={open}>
        <React.Fragment key={'drawer'}>
          <IconButton onClick={toggleDrawer()} style={{ position: 'fixed' }}>
            {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
          <Drawer
            variant="persistent"
            open={open}
            anchor='left'
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
              },
            }}
            onClose={toggleDrawer()}
          >
            <Box
              sx={{ width: 320, padding: 2 }}
              role="presentation"
            >
              <Typography variant="h6" style={{ fontSize: '16px' }}>
                {questionaire && questionaire.name}
              </Typography>
              <Box
                component="form"
                onSubmit={handleSearch}
                sx={{
                  flexGrow: 1,
                  my: 1.5,
                  display: 'flex',
                }}
              >
                <TextField
                  defaultValue=""
                  fullWidth
                  inputProps={{ ref: queryRef }}
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="end">
                        <SearchIcon fontSize="small" />
                      </InputAdornment>
                    )
                  }}
                  placeholder="Search"
                  onChange={handleSearch}
                />
                <IconButton type="button" onClick={filter} ><MdFilterListAlt /> </IconButton>
              </Box>
              {
                filterStatus && (<Box>
                  <FormControl fullWidth size="small">
                    <InputLabel id="region-select">Filter by Region</InputLabel>
                    <Select
                      labelId="region-select"
                      id="region-select"
                      value={filterRegion}
                      label="Filter by Region"
                      onChange={handleFilterByRegionChange}
                      size="small"
                    >
                      <MenuItem key={'Place holder'} value={''}>Select Region</MenuItem>

                      {
                        questionaire && questionaire.regions.map(region => (
                          <MenuItem key={region.prefix} value={region.prefix}> {Utils.capitalizeFirstLetter(region.region)}</MenuItem>
                        ))
                      }
                    </Select>
                  </FormControl>
                </Box>)
              }
              <Box sx={{ my: 2, display: 'flex', alignItems: 'center' }}>
                <MdLocationPin style={{
                  color: '#ff0000',
                  fontSize: '24px',
                }} />
                <Typography variant="h6" style={{ fontSize: '14px', marginLeft: '8px' }}>All Respondents ({filteredResponses.length})</Typography>

              </Box>
              <Divider />
              <List>
                {filteredResponses.map((response, index) => (
                  <>
                    <ListItem key={response._id} disablePadding>
                      <ListItemButton onClick={() => handleRepondentClick(response)}>
                        <ListItemIcon>
                          <ImUser style={{
                            fontSize: '24px',
                          }} />
                        </ListItemIcon>
                        <ListItemText>
                          <Box>
                            <Typography variant="h6" style={{ fontSize: '14px' }}>
                              {response.person && Utils.formatIdPrefix(response)}
                            </Typography>
                            <Typography variant="caption" style={{ fontSize: '14px' }}>
                              {response.person && Utils.capitalizeFirstLetter(response.person)}
                            </Typography>
                          </Box>
                        </ListItemText>
                      </ListItemButton>

                    </ListItem>
                    <Divider />
                  </>
                ))}
              </List>
            </Box>
          </Drawer>
        </React.Fragment>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 2,
            paddingTop: '32px',
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
              <Grid item md={12} xs={12} sx={{
                paddingLeft: 0,
              }}>
                {isLoaded ?
                  <GoogleMap
                    mapContainerStyle={{
                      width: "100vw",
                      height: "90vh",
                    }}
                    center={showPopup ? selectedMarker.location : {
                      lat: 0.3438034017562465,
                      lng: 32.59025009716529,
                    }}
                    zoom={7}
                    onLoad={onMapLoad}
                    mapTypeId={'satellite'}
                  >
                    {
                      filteredResponses.length > 0 ? filteredResponses.map((response, index) => {
                        return response.gps ?
                          response.gps.coords ?
                            <Marker longitude={response.gps.coords.longitude} latitude={response.gps.coords.latitude}
                              position={{ lat: response.gps.coords.latitude, lng: response.gps.coords.longitude }}
                              key={index}
                              onClick={() => {
                                onMarkerClicked({ 
                                  response: response, location: { lng: response.gps.coords.longitude, lat: response.gps.coords.latitude }
                                 })
                              }}
                            >
                              <MdLocationPin style={{
                                color: '#ff0000',
                                fontSize: '24px',
                              }} />
                            </Marker>
                            :
                            <Marker
                              longitude={response.gps.longitude} latitude={response.gps.latitude} anchor="bottom" key={index}
                              position={{ lat: response.gps.latitude, lng: response.gps.longitude }}
                              onClick={() => { 
                                onMarkerClicked({response:response,location: { lng: response.gps.longitude, lat: response.gps.latitude }}) 
                              }
                            }
                            >
                              <MdLocationPin style={{
                                color: '#ff0000',
                                fontSize: '24px',
                              }} />
                            </Marker> : null

                      }
                      ) : null
                    }

                    {showPopup && (
                      <InfoWindow
                        position={selectedMarker.location}
                        key={selectedMarker.location.longitude}
                      >
                        <Box>
                          <Typography variant="h6" style={{ fontSize: '14px' }}>ID: {Utils.formatIdPrefix(selectedMarker.response)} </Typography>
                          <Typography variant="h6" style={{ fontSize: '14px' }}>NAME: {selectedMarker.response.person.toUpperCase()} </Typography>
                          <Typography variant="h6" style={{ fontSize: '14px' }}>REGION: {selectedMarker.response.region.region} </Typography>
                        </Box>
                      </InfoWindow>)}
                  </GoogleMap> : null}
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Main>
    </>
  );
};

TaskMapArea.getLayout = (page) => (
  <AuthGuard>
    {/* <DashboardLayout> */}
    {page}
    {/* </DashboardLayout> */}
  </AuthGuard>
);

export default TaskMapArea;
