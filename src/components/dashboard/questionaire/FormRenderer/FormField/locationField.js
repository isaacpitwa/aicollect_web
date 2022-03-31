import { useState, useContext, useEffect, useCallback } from 'react'

// GPS/GeoLocation libraries
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

import formStyles from '../../styles/FormStyles'
import { smallBtns } from '../../styles/FormStyles'
import {
	Grid,
	IconButton,
	FormControl,
	InputLabel,
	Input,
	InputAdornment,
	FormHelperText,
	Typography,
	FilledInput,
	OutlinedInput,

} from '@mui/material';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import EditIcon from '@mui/icons-material/Edit';

import { FormContext } from '../../context';
import LocationFieldDialog from '../../dialogs/LocationField';
import { DescriptionCard } from '../../utils';
import GeneralTooltip from '../../previews/GeneralTooltip';



export const CurrentLocation = compose(
	withProps({
	  googleMapURL:
		`https://maps.googleapis.com/maps/api/js?key=AIzaSyC6AHCMOU6Uiew2mDrT0zlByh5u2SDiZic&libraries=geometry,drawing,places`,
		loadingElement: <div style={{ height: `100%` }} />,
		containerElement: <div style={{ height: `150px` }} />,
		mapElement: <div style={{ height: `100%`, borderRadius: '8px' }} />
	}),
	withScriptjs,
	withGoogleMap
  )(props => {

	const { isMarkerShown, coordinates } = props

	return (
		<GoogleMap
			defaultZoom={10}
			defaultCenter={{ lat: coordinates.lat, lng: coordinates.lng }}
		>
		{isMarkerShown && (
			<Marker position={{ lat: coordinates.lat, lng: coordinates.lng }} />
		)}
		</GoogleMap>
	)
});

const LocationField = (props) => {

    const {
        setError,
        setSelectSection,
        setSectionId,
        setSubSectionId,
        editStatus
    } = useContext(FormContext);

    const { fieldData } = props;


    const [loadMap, setLoadMap] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [display, setDisplay] = useState('hidden');
    const [label] = useState(fieldData?fieldData.label:'');
    const [value, setValue] = useState(fieldData?fieldData.value:'');
    const [gpsValues, setGpsValues] = useState(null)
    const [locationFieldDialog, setLocationFieldDialog] = useState(false);
    const [dependantField] = useState(fieldData.conditional?fieldResponses.find(item => item.fieldId === fieldData.conditional.when):false)

	useEffect(() => {
		getlocation()
	}, [])

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const  getlocation = async () => {
		setLoadMap(false)
        let GPS = await fieldData.gpsValues
		if(GPS) {
            setGpsValues(GPS);
        }
        setLoadMap(true);
	}

	const  getGEOLocation = () => {
        return new Promise(function(resolve, reject) {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
	};

    const addLocation = async (e) => {
        e.preventDefault();
		setLoadMap(false)
        try {
            const gpsDetails = await getGEOLocation();
            let accuracy = gpsDetails.coords.accuracy;
            let latitude = gpsDetails.coords.latitude;
            let longitude = gpsDetails.coords.longitude;
            setGpsValues({
                locationName: '',
                accuracy: `${accuracy} Meters`,
                coordinates: {
                    lat: latitude,
                    lng: longitude
                }
            })
            setLoadMap(true)
        } catch (error) {
            setGpsValues(null)
            setErrorMsg(error)
            console.log('======== DEBUG (Error)========\n', error)
        }
    }

	const errHand = (err) => {
		switch (err.code) {
			case err.PERMISSION_DENIED:
				result.innerHTML =
				"The application doesn't have the permission" +
				"to make use of location services";
				break;
			case err.POSITION_UNAVAILABLE:
				result.innerHTML = "The location of the device is uncertain";
				break;
			case err.TIMEOUT:
				result.innerHTML = "The request to get user location timed out";
				break;
			case err.UNKNOWN_ERROR:
				result.innerHTML =
				"Time to fetch location information exceeded" +
				"the maximum timeout interval";
				break;
		}
	};

    const handleLocationField = () => {
        setError(false)
        setSelectSection(true)
        setSectionId(fieldData.parentId)
        setSubSectionId(fieldData.subParentId)
        setLocationFieldDialog(true)
    };

    const deleteField = () => {
        deleteFieldData(fieldData)
    };

    const handleClose = () => {
        setLocationFieldDialog(false)
    };

    const classes = formStyles();
    const smallBtn = smallBtns();
	
	return (
        dependantField&&dependantField.value===fieldData.conditional.value&&!editStatus?
			<Grid
				style={{ display: 'block' }}
				container
				className={classes.section}
			>
				{/* <InputBase
					sx={{ ml: 1, flex: 1 }}
					placeholder="Search Google Maps"
					inputProps={{ 'aria-label': 'search google maps' }}
				/>
				<Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
				<IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
					<AddLocationAltIcon />
				</IconButton> */}
			</Grid>
		:
			<Grid
				style={{ display: 'block' }}
				container
				onMouseOver={() => { setDisplay('visible') }}
				onMouseOut={() => { setDisplay('hidden') }}
				className={classes.section}
			>
				<LocationFieldDialog
					open={locationFieldDialog}
					fieldData={fieldData}
					handleClose={handleClose} 
				/>
				<Typography
					style={{ width: '100%', paddingBottom: '2px', visibility: display }}
					align={'right'}
				>
					<EditIcon
						onClick={handleLocationField}
						className={smallBtn.editBtn}
					/>
					<HighlightOffIcon
						onClick={() => {
							deleteFieldData(fieldData)
						}}
						className={smallBtn.deleteBtn}
					/>
				</Typography>
				<InputLabel htmlFor="outlined-adornment-password">
					{label}
				</InputLabel>
				<OutlinedInput
					id="outlined-adornment-password"
					type='text'
					value={
                        gpsValues?
                            `GPS Coordinates: [ Latitude = ${gpsValues.coordinates.lat}, Longititude = ${gpsValues.coordinates.lng} ]`
                        : 'No GPS Coordinates added.'
                    }
					style={{ width: '100%' }}
					endAdornment={
					<InputAdornment position="end">
						<IconButton
                            aria-label="toggle password visibility"
							onClick={addLocation}
                            edge="end"
                            style={{ fontSize: '14px' }}
						>
							<AddLocationAltIcon /> Add Location
						</IconButton>
					</InputAdornment>
					}
				/>
				<Typography
					style={{ width: '100%', paddingTop: '5px' }}
				>
					{loadMap?
						gpsValues?
                            <>
                                <small>Current Location</small>
                                <CurrentLocation
                                    isMarkerShown={true}
                                    coordinates={gpsValues.coordinates}
                                />
                            </>
						: ""
					: 
						<Typography>Location GPS Loading...</Typography>
					}
				</Typography>
			</Grid>
	);
}

export default LocationField
