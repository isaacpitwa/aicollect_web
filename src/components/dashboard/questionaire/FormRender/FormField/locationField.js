import { useState, useContext, useEffect, useCallback } from 'react'
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
	Box,

} from '@mui/material';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import EditIcon from '@mui/icons-material/Edit';

import { FormContext } from '../../context';
import LocationFieldDialog from '../../dialogs/LocationField';
import {
	DescriptionCard,
	CurrentLocation
} from '../../utils';
import GeneralTooltip from '../../previews/GeneralTooltip';

/**
 * @function LocationField
 * @desc This is the Location Field component, it is the location field displayed in the form.
 * @arg {Object} fieldData - The data of the field which contains all the properties of the location field.
 * @returns {Component} - Returns a Location field JSX component.
 * @author Atama Zack <atama.zack@gmail.com>
 * @version 1.0.0
 */
const LocationField = (props) => {

	const {
		setError,
		setSelectSection,
		setSectionId,
		setSubSectionId,
		editStatus,
		deleteFieldData,
	} = useContext(FormContext);

	const { fieldData, forGrid } = props;


	const [loadMap, setLoadMap] = useState(true);
	const [errorMsg, setErrorMsg] = useState('');
	const [display, setDisplay] = useState('hidden');
	const [label] = useState(fieldData ? fieldData.label : '');
	const [value, setValue] = useState(fieldData ? fieldData.value : '');
	const [gpsValues, setGpsValues] = useState(null)
	const [locationFieldDialog, setLocationFieldDialog] = useState(false);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const getlocation = async () => {
		setLoadMap(false)
		let GPS = await fieldData.gpsValues
		if (GPS) {
			setGpsValues(GPS);
		}
		setLoadMap(true);
	}

	const getGEOLocation = () => {
		return new Promise(function (resolve, reject) {
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
		forGrid ?
			<Box sx={{
				padding: '6px 0.5rem',
				border: '1px solid #ced4da'
			}}
				onMouseOver={() => { setDisplay('visible') }}
				onMouseOut={() => { setDisplay('hidden') }}>
				{
					editStatus ? <Typography
						className={smallBtn.fieldBtns}
						style={{ visibility: display, margin: '0', paddingTop: '0', fontSize: 'unset' }}
						align={'right'}
					>
						<LocationFieldDialog
							open={locationFieldDialog}
							fieldData={fieldData}
							handleClose={handleClose}
						/>
						<EditIcon
							onClick={handleLocationField}
							className={smallBtn.editBtn}
							style={{ width: '14px', height: '14px', margin: '0', marginRight: '5px' }}
						/>
						<HighlightOffIcon
							onClick={deleteField}
							className={smallBtn.deleteBtn}
							style={{ width: '14px', height: '14px', margin: '0' }}
						/>
					</Typography> : null
				}
				<OutlinedInput
					id="outlined-adornment-password"
					type='text'
					value={
						gpsValues ?
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
			</Box> :
			<Grid
				style={{ display: 'block' }}
				container
				onMouseOver={() => { setDisplay('visible') }}
				onMouseOut={() => { setDisplay('hidden') }}
				className={editStatus ? classes.section : classes.section2}
			>
				<LocationFieldDialog
					open={locationFieldDialog}
					fieldData={fieldData}
					handleClose={handleClose}
				/>
				{editStatus ?
					<Typography
						className={smallBtn.fieldBtns}
						style={{ visibility: display }}
						align={'right'}
					>
						<EditIcon
							onClick={handleLocationField}
							className={smallBtn.editBtn}
						/>
						<HighlightOffIcon
							onClick={deleteField}
							className={smallBtn.deleteBtn}
						/>
					</Typography>
					: ""}
				<Typography style={{ width: '100%', fontSize: '18px', color: '#5048E5' }}>
					{fieldData.label}<GeneralTooltip tipData={fieldData.tooltip} />
				</Typography>
				<Typography
					style={{ width: '100%', padding: '5px 0px' }}
				>
					{loadMap ?
						gpsValues ?
							<CurrentLocation
								coordinates={gpsValues.coordinates}
								isMarkerShown={true}
							/>
							: ""
						:
						<Typography>Location GPS Loading...</Typography>
					}
				</Typography>
				<OutlinedInput
					id="outlined-adornment-password"
					type='text'
					value={
						gpsValues ?
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
				<FormHelperText id="outlined-weight-helper-text">
					<DescriptionCard description={fieldData.description} helperText={true} />
				</FormHelperText>
			</Grid>
	);
}

export default LocationField
