import React, { useEffect, useState, useCallback,useRef } from "react";
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
import Map, { Marker, Popup, Layer } from "react-map-gl";
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
import {ImUser} from 'react-icons/im';
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

  const onMarkerClicked = ({response, location}) => {
    if(response.gps) {
      setSelectedMarker({ response: response, location: location });
      setShowPopup(true);
      console.log(`Marker clicked  Before: ${showPopup}`);
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
    if(searchValue) {
      const results = responses.filter(response => 
        response.person && response.person.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredResponses(results);
    }
   else setFilteredResponses(responses);
  }

  const handleRepondentClick =(response)=>{
    // Fly to  location
    if(response.gps) {
      mapRef.current.flyTo({
        center: [response.gps.longitude,response.gps.latitude],
        zoom: 20,
        // speed: 1,
        // curve: 1,
        essential: true, // this animation is considered essential with respect to prefers-reduced-motion
        easing: (t) => t,
      });
      setSelectedMarker({ response: response, location: {longitude: response.gps.longitude, latitude:response.gps.latitude} });
      setShowPopup(true);
    } else {
      toast.error('No GPS location found for this respondent')
    }
  }

const  handleFilterByRegionChange = (event) => {
  const region  = event.target.value;
  setFilterRegion(region);
  if(region) {
    console.log("Selected region: ", region);
    const results = responses.filter(response => 
      response.region && Utils.isInRegion(response, region)
    );
    setFilteredResponses(results);
  }else setFilteredResponses(responses);

  }

  const filter = (event) => {
    setFilterStatus(!filterStatus);
  }

  return (
    <>
      <Head>
        <title>Dashboard: Questionaire - Map </title>
        <link
          rel="stylesheet"
          href="https://api.tiles.mapbox.com/mapbox-gl-js/v2.7.0/mapbox-gl.css"
        />
      </Head>
      <Main open={open}>
      <React.Fragment key={'drawer'}>
          <IconButton onClick={toggleDrawer()} style={{position:'fixed'}}>
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
                sx={{ width: 320,padding:2 }}
                role="presentation"
              >
                <Typography  variant="h6" style={{fontSize:'16px'}}>
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
                <IconButton type="button" onClick={filter} ><MdFilterListAlt/> </IconButton>
              </Box>
              {
                filterStatus && (<Box>
                  <FormControl fullWidth  size="small">
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
              <Box sx={{ my: 2,display:'flex',alignItems:'center' }}>
              <MdLocationPin style={{
                              color: '#ff0000',
                              fontSize: '24px',
                            }} />
                <Typography variant="h6" style={{fontSize:'14px',marginLeft:'8px'}}>All Respondents ({filteredResponses.length})</Typography>

              </Box>
              <Divider />
                <List>
                  {filteredResponses.map((response, index) => (
                    <>
                    <ListItem key={response._id} disablePadding>
                      <ListItemButton onClick={()=>handleRepondentClick(response)}>
                        <ListItemIcon>
                          <ImUser style={{
                              fontSize: '24px',
                            }} />
                        </ListItemIcon>
                        <ListItemText>
                          <Box>
                          <Typography variant="h6" style={{fontSize:'14px'}}>
                            {response.person && Utils.formatIdPrefix(response)}
                          </Typography>
                          <Typography variant="caption" style={{fontSize:'14px'}}>
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
              <Box
                sx={{
                  backgroundColor: "neatral.100",
                  px: 0,
                  py: 0,
                  width: "100vw",
                  height: "90vh",
                }}
              >
                <Map
                  initialViewState={{
                    longitude: centerLocation ? centerLocation.longitude : 32.513311,
                    latitude: centerLocation ? centerLocation.latitude : 0.3899683,
                    zoom: 10,
                    width: "100%",
                    
                  }}
                  mapboxAccessToken={process.env.NEXT_PUBLIC_GOOGLE_MAP_TOKEN}
                  mapStyle="mapbox://styles/mapbox/streets-v9"
                  terrain={{
                    source: "mapbox-raster-dem",
                    exaggeration: 2
                  }}
                  ref={mapRef}
                  
                >
                 <Layer {...parkLayer} />
                  {
                    responses.length > 0 ? responses.map((response, index) => {
                      return response.gps ?
                        response.gps.coords ?
                          <Marker longitude={response.gps.coords.longitude} latitude={response.gps.coords.latitude}
                            anchor="bottom" key={index} onClick={() => onMarkerClicked({response: response, location: { longitude: response.gps.coords.longitude, latitude: response.gps.coords.latitude }}) }>
                            <MdLocationPin style={{
                              color: '#ff0000',
                              fontSize: '24px',
                            }} />
                          </Marker>
                          :
                          <Marker longitude={response.gps.longitude} latitude={response.gps.latitude} anchor="bottom" key={index} onClick={() => { onMarkerClicked(response, { longitude: response.gps.longitude, latitude: response.gps.latitude }) }}>
                            <MdLocationPin style={{
                              color: '#ff0000',
                              fontSize: '24px',
                            }} />
                          </Marker> : null

                    }
                    ) : null
                  }

                  {showPopup && (
                    <Popup longitude={selectedMarker.location.longitude} latitude={selectedMarker.location.latitude}
                      anchor="top"
                      onClose={() => setShowPopup(false)}
                      offset={1}
                      >
                      <Box>
                        <Typography variant="h6" style={{fontSize:'14px'}}>ID: {Utils.formatIdPrefix(selectedMarker.response)} </Typography>
                        <Typography variant="h6" style={{fontSize:'14px'}}>NAME: {selectedMarker.response.person.toUpperCase()} </Typography>
                        <Typography variant="h6" style={{fontSize:'14px'}}>REGION: {selectedMarker.response.region.region} </Typography>
                      </Box>
                    </Popup>)}
                </Map>
              </Box>
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
