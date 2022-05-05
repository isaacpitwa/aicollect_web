import Image from 'next/image';
import {
    Box,
    Grid,
    Button,
    Typography,
    TextField,
    Checkbox,
    MenuItem,
    Select,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    InputAdornment,
    IconButton,
    OutlinedInput,
    FormHelperText
} from '@mui/material';
import MuiPhoneNumber from 'material-ui-phone-number';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';

import {
    FieldTooltip,
    DescriptionCard,
    CurrentLocation,
} from '../utils';
import AreaMappingImg from '../../../../../public/static/form/areaMap1.jpg';

/**
 * @function FieldPreview
 * @desc This is the Field preview component that displays how a particular field will look like when added to the form.
 * @arg {Object} props - The properties passed to the field preview.
 * @arg {String} props.fieldLabel - The field label passed through props.
 * @arg {String} props.fieldValue - The field value passed through props.
 * @arg {Object} props.options - The field options passed through props.
 * @arg {String} props.fieldDescription - The field description passed through props.
 * @arg {String} props.tooltip - The field passed tooltip through props.
 * @arg {Boolean} props.isRequired - The field required passed through props.
 * @returns {Component} The Field preview component
 * @author Atama Zack <atama.zack@gmail.com>
 * @version 1.0.0
 */
const FieldPreview = (props) => {

    const {
        type,
        fieldLabel,
        fieldValue,
        handleFieldValue,
        values,
        options,
        radios,
        fieldDescription,
        tooltip,
        isRequired,
        defaultCountry,
    } = props

    const PreviewCard = () => {
        switch(type) {
            case 'text': case 'text-area': case 'number': case 'email': case 'image':
                return (
                    <TextField
                        required={isRequired}
                        fullWidth
                        variant="outlined"
                        margin="dense"
                        type={type==='number'?'number':type==='email'?'email':type==='image'?'file':'text'}
                        multiline={type==='text-area'?true:false}
                        rows={type==='text-area'?4:1}
                        label={fieldLabel}
                        value={fieldValue}
                        onChange={handleFieldValue}
                        helperText={<DescriptionCard description={fieldDescription} helperText={true} />}
                        InputProps={{
                            endAdornment: <FieldTooltip tooltip={tooltip}/>
                        }}
                    />
                );
            case 'select-box':
                return (
                    <>
                        <Typography
                        style={{ fontSize: '18px', color: '#5048E5' }}>
                            {fieldLabel}{isRequired?<small style={{ color: 'red' }}>*</small>:''}<FieldTooltip tooltip={tooltip}/>
                        </Typography>
                        {values.map(checkbox=>(
                            <Typography key={checkbox.id}>
                                <Checkbox checked={checkbox.checked} />
                                {checkbox.label}
                            </Typography>
                        ))}
                    </>
                );
            case 'select':
                return (
                    <>
                    <Typography
                        style={{ fontSize: '18px', color: '#5048E5' }}
                    >
                        {fieldLabel}{isRequired?
                            <small style={{ color: 'red' }}>*</small>
                        :''}<FieldTooltip tooltip={tooltip}/>
                    </Typography>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={options[0]?options[0].optionLabel:fieldValue}
                        fullWidth
                        size={'small'}
                    >
                        {options.map((option, index)=>(
                            <MenuItem
                                key={index}
                                value={option.label}
                            >{option.label}</MenuItem>
                        ))}
                    </Select>
                    </>
                );
            case 'radio':
                return (
                    <>
                        <Typography
                            style={{ fontSize: '18px', color: '#5048E5' }}
                        >
                            {fieldLabel}{isRequired?<small style={{ color: 'red' }}>*</small>:''}<FieldTooltip tooltip={tooltip}/>
                        </Typography>
                        <FormControl>
                            <RadioGroup
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                name="controlled-radio-buttons-group"
                                value={fieldValue}
                            >
                                {radios.map((radio, index)=>(
                                    <FormControlLabel
                                        key={index}
                                        value={radio.id}
                                        control={<Radio />}
                                        label={radio.label}
                                    />
                                ))}
                            </RadioGroup>
                        </FormControl>
                    </>
                );
            case 'phone-number':
                return (
                    <MuiPhoneNumber
                        fullWidth
                        size={'small'}
                        label={fieldLabel?fieldLabel:'Phone Number'}
                        margin="dense"
                        variant='outlined'
                        defaultCountry={defaultCountry}
                        value={fieldValue}
                        onChange={handleFieldValue}
                        helperText={<DescriptionCard description={fieldDescription} helperText={true} />}
                        InputProps={{
                            endAdornment: <FieldTooltip tooltip={tooltip}/>
                          }}
                    />
                );
            case 'location':
                return (
                    <>
                        <Typography style={{ width: '100%', fontSize: '18px', color: '#5048E5' }}>
                            {fieldLabel} <FieldTooltip tooltip={tooltip}/>
                        </Typography>
                        <Typography
                            style={{ width: '100%', padding: '5px 0px' }}
                        >
                            {loadMap?
                                gpsValues?
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
                        <FormHelperText id="outlined-weight-helper-text">
                            <DescriptionCard description={fieldDescription} helperText={false}/>
                        </FormHelperText>
                    </>
                );
            case 'date':
                return (
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                            label={fieldLabel}
                            value={fieldValue}
                            onChange={handleFieldValue}
                            renderInput={(params) => <TextField {...params} fullWidth/>}
                            helperText={<DescriptionCard description={fieldDescription} helperText={true} />}
                            InputProps={{
                                endAdornment: <FieldTooltip tooltip={tooltip} />
                            }}
                        />
                    </LocalizationProvider>
                );
            case 'area-mapping':
                return (
                    <Grid
                        container
                    >
                        <Grid
                            item
                            xs={12}
                            sm={12}
                            md={12}
                            lg={12}
                            xl={12}
                            style={{ padding: '2px 0px' }}
                        >
                            <Typography style={{ fontSize: '18px', color: '#5048E5' }}>
                                {fieldLabel} <FieldTooltip tooltip={tooltip} />
                            </Typography>
                            <DescriptionCard description={fieldDescription} helperText={true}/>                            
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            sm={12}
                            md={6}
                            lg={6}
                            xl={6}
                            style={{ padding: '0px 10px' }}
                        >
                                <Image
                                    src={AreaMappingImg}
                                    alt="Area Mapping Image"
                                    style={{
                                        width: '100%',
                                        borderRadius: '8px',
                                    }}
                                />
                        </Grid>
                        <Grid item xs={12} sm={12} md={4} lg={6} xl={6}>
                            <Typography variant="h5">
                                Please walk around the boundary of the area to be mapped
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                GPS coordinates can only be collected when you&aposre mobile
                            </Typography>
                            <Button
                                variant="contained"
                                color={'primary'}
                            >
                                Start Mapping
                            </Button>
                        </Grid>
                    </Grid>
                );
        }
    }

    return (
        <Grid
            item
            xs={12}
            md={6}
            style={{ padding: '30px 20px' }}
        >
            <Typography
                style={{ backgroundColor: '#5048E5', padding: '5px 10px', color: 'white', marginTop: '2px', borderRadius: '8px 8px 0px 0px' }}
                size='small'
            >
                <strong>Preview</strong>
            </Typography>
            <Box
                component="form"
                style={{ padding: '20px', border: '1px #5048E5 solid', borderRadius: '0px 0px 8px 8px', marginTop: '-1px', minHeight: '200px' }}
            >
                <PreviewCard/>
            </Box>
        </Grid>

    )
}

export default FieldPreview
                    