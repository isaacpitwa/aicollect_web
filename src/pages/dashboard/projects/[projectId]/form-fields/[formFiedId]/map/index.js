import React, { useEffect, useState, useCallback, useRef } from "react";
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
import Map, { Marker, Popup, Layer, Source } from "react-map-gl";
import { useRouter } from 'next/router'
import NextLink from 'next/link';
import { AuthGuard } from "../../../../../../../components/authentication/auth-guard";
import { DashboardLayout } from "../../../../../../../components/dashboard/dashboard-layout";
import { gtm } from "../../../../../../../lib/gtm";
import { projectsApi } from '../../../../../../../api/projects-api';
import { FormsApi } from '../../../../../../../api/forms-api'
import { MdLocationPin, MdFilterListAlt } from 'react-icons/md';
import { Search as SearchIcon } from '../../../../../../../icons/search';
import { ImUser } from 'react-icons/im';
import { Utils } from "../../../../../../../utils/main";
import toast from 'react-hot-toast';
import { styled, useTheme } from '@mui/material/styles';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { FieldFormsApi } from '../../../../../../../api/fieldform-api';
import { GoogleMap, useJsApiLoader, Polygon, InfoWindow } from '@react-google-maps/api';
import { computeArea ,LatLng} from 'spherical-geometry-js';

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
  const { projectId, formFiedId } = router.query;
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
  const [map, setMap] = useState(null);
  const [polygons, setPolygons] = useState([]);
  const [polygonPaths, setPolygonPaths] = useState([]);

  const queryRef = useRef(null);
  // Define refs for Polygon instance and listeners
  const polygonsRef = useRef([]);
  const listenersRef = useRef([]);

  const fetchFieldFormDetails = useCallback(async () => {
    try {
      const data = await projectsApi.fetchFieldFormDetails(formFiedId);
      if (data) {
        setQuestionaire(data.data);
      } else {
        toast.error(data?.message)
      }
    } catch (error) {
      console.log(error);
    }
  }, [setQuestionaire, formFiedId]);


  useEffect(() => {
    fetchFieldFormDetails();
  }, []);


  useEffect(() => {
    fetchFieldFormDetails();
  }, []);


  const fetchFieldFormResponses = async () => {
    const { formFiedId } = router.query
    const apiReponses = await FieldFormsApi.getFieldResponses(formFiedId);
    apiReponses.reverse();
    apiReponses.map(response => {
      const cordinates = Utils.getFieldCordinates(response);
      var latLngs = cordinates.map(function(coord) { 
        return new LatLng(coord.lat, coord.lng);
     });
       response.area = cordinates.length>0 ? `${Math.round(computeArea(latLngs)*0.00025 * 100) / 100 } Acres` : 'Unknown';
       return response;
    });

    setResponses(apiReponses);
    const sumLongitude = apiReponses.map(response => response.gps ? response.gps.longitude : 0).reduce((a, b) => a + b, 0);
    const sumLatitude = apiReponses.map(response => response.gps ? response.gps.latitude : 0).reduce((a, b) => a + b, 0);
    setCenterLocation({ longitude: sumLongitude / apiReponses.length, latitude: sumLatitude / apiReponses.length });
    setFilteredResponses(apiReponses);
  }

  useEffect(() => {
    fetchFieldFormResponses();
  }, []);

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
    if (response.gps) {
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
   const center = Utils.getFieldCenter(response);
   const fieldCordinates = Utils.getFieldCordinates(response);
    if (fieldCordinates.length > 0 && map) {
      map.moveCamera({
        center: center,
        zoom: 20,
      })
      setSelectedMarker({ response: response, location: center });
      setShowPopup(true);
    } else {
      toast.error('No GPS location found for this Field Or Map not Loaded')
    }
  }

  const handleFilterByRegionChange = (event) => {
    const region = event.target.value;
    setFilterRegion(region);
    if (region) {
      console.log("Selected region: ", region);
      const results = responses.filter(response =>
        response.region && Utils.isInRegion(response, region)
      );
      setFilteredResponses(results);
    } else setFilteredResponses(responses);

  }

  const filter = (event) => {
    setFilterStatus(!filterStatus);
  }

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyCt86FQK_WYrNu6SN0yoB6YRh_CzNaypGI"
  })
  const paths = [
    { lat: 25.774, lng: -80.19 },
    { lat: 18.466, lng: -66.118 },
    { lat: 32.321, lng: -64.757 },
    { lat: 25.774, lng: -80.19 }
  ]

  const options = {
    fillColor: "#28B529",
    fillOpacity: 1,
    strokeColor: "#35F801",
    strokeOpacity: 1,
    strokeWeight: 2,
    clickable: false,
    draggable: false,
    editable: false,
    geodesic: false,
    // zIndex: 1,
    fillOpacity: 0.8
  }
  const selectedOptions = {
    fillColor: "#28B529",
    fillOpacity: 1,
    strokeColor: "#D93025",
    strokeOpacity: 1,
    strokeWeight: 2,
    clickable: false,
    draggable: false,
    editable: false,
    geodesic: false,
    // zIndex: 1,
    fillOpacity: 0.8
  }

  const onMapLoad = (map) => {
    setMap(map);
  }
  // // Call setPath with new edited path

  const onEdit = useCallback((index) => {
    console.log("onEdit", index);
    console.log("Polugon",polygonsRef.current[index])
    if (polygons[index]) {
      const nextPath = polygons[index]
        .getPath()
        .getArray()
        .map(latLng => {
          return { lat: latLng.lat(), lng: latLng.lng() };
        });
        polygonPaths[index] = nextPath;
        setPolygonPaths(polygonPaths);
    }
  }, []);

  // // Bind refs to current Polygon and listeners
  const onLoad = useCallback(
    (polygon) => {
      polygonsRef.current.push(polygon);
      console.log("onLoad Componenets", polygonsRef.current.length);
      polygons.push(polygon);
      setPolygons(polygons);
      const path = polygon.getPath();
      console.log('onLoad Path', path);
      listenersRef.current.push(
        path.addListener("set_at", onEdit),
        path.addListener("insert_at", onEdit),
        path.addListener("remove_at", onEdit)
      );
    },
    [onEdit]
  );


  return (
    <>
      <Head>
        <title>{`Dashboard: ${questionaire ? questionaire.name : ''} - Map` } </title>
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
                        //  questionaire && questionaire.regions.map(region => (
                        //     <MenuItem key={region.prefix} value={region.prefix}> {Utils.capitalizeFirstLetter(region.region)}</MenuItem>
                        //   ))
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
                <Typography variant="h6" style={{ fontSize: '14px', marginLeft: '8px' }}>All Fields ({filteredResponses.length})</Typography>

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
                              {response.code + ': ' + response.name || 'Field'}
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
                      href={`/dashboard/projects/${project && project._id}/form-fields/${questionaire && questionaire._id}`}
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
                  {isLoaded ?
                    <GoogleMap
                      mapContainerStyle={{
                        width: "100vw",
                        height: "90vh",
                      }}
                      center={ showPopup ? selectedMarker.location :{
                        lat: 0.3438034017562465,
                        lng: 32.59025009716529,
                      }}
                      zoom={7}
                      onLoad={onMapLoad}
                      mapTypeId={'satellite'}
                    >
                      {
                        responses.length > 0 ? responses.map((response, index) => {
                          const fieldCordinates = Utils.getFieldCordinates(response);
                          return  fieldCordinates.length> 0?
                            <Polygon
                              paths={[fieldCordinates]}
                              options={ selectedMarker.response && (selectedMarker.response._id ===response._id) ? selectedOptions: options}
                              key={index}
                              ref={el => polygonsRef.current[index] = el}
                              editable
                              // onMouseUp={onEdit(index)}
                              onLoad={onLoad}
                            /> : null
                        }) : null
                      }

                          {
                            showPopup && 
                              <InfoWindow
                              position={selectedMarker.location}
                              key={selectedMarker.id}
                            >   
                            <Box>
                              <Typography variant="h6" style={{ fontSize: '14px' }}>ID: {selectedMarker.response.code} </Typography>
                              <Typography variant="h6" style={{ fontSize: '14px' }}>NAME: {selectedMarker.response.person.toUpperCase()} </Typography>
                              <Typography variant="h6" style={{ fontSize: '14px' }}>REGION: {selectedMarker.response.region.region} </Typography>
                              <Typography variant="h6" style={{ fontSize: '14px' }}>FIELD NAME: {selectedMarker.response.name.toUpperCase() ?? 'N/A'} </Typography>
                              <Typography variant="h6" style={{ fontSize: '14px' }}>FIELD SIZE: {selectedMarker.response.area.toUpperCase() ?? 'N/A'} </Typography>
                            </Box>
                            </InfoWindow>
                            
                          }

                    </GoogleMap> :
                    null
                  }
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
