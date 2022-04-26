import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api';
import formStyles from '../styles/FormStyles'
import {
    Typography,
    IconButton,
    Tooltip,
    Grid,
} from '@mui/material';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import InfoIcon from '@mui/icons-material/Info';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

/**
 * @function getFieldsValues
 * @desc This method gets form data from the API response and updates the form builder state.
 * @arg {Array} formFields - An array of form field objects.
 * @returns {Array} Returns an array of form field objects.
 * @author Atama Zack <atama.zack@gmail.com>
 * @version 1.0.0
 */
 export const getFieldsValues = (formFields) => {
    let sections = formFields;
    let allFields = []
    if(sections) sections.forEach(section=>{
        if(section.components) section.components.map(field=>allFields.push(...getField(field)))
    })
    return allFields
}

/**
 * @function getField
 * @desc This method helps to get form fields within a sub-section field.
 * @arg {Object} fieldData - The data of a form field.
 * @returns {Array} Returns an array of form field objects.
 * @author Atama Zack <atama.zack@gmail.com>
 * @version 1.0.0
 */
export const getField = (fieldData) => {
    return fieldData.type==='sub-section'?fieldData.components.map(field => {
        return { id: field.id, type: field.type, value: field.value, values: field.values?field.values:[] }
    }):[{ id: field.id, type: field.type, value: field.value, values: field.values?field.values:[] }];
}

/**
 * @function FieldTooltip
 * @desc This is a tooltip component for displaying tooltips of form fields.
 * @arg {Object} props - The properties passed to the component.
 * @arg {String} props.tooltip - The tooltip property from a field object.
 * @returns {Component} - Returns a tooltip JSX component.
 * @author Atama Zack <atama.zack@gmail.com>
 * @version 1.0.0
 */
 export const FieldTooltip = (props) => {

    const { tooltip } = props

    return (
        tooltip!==''?
            <Tooltip title={tooltip}>
            <IconButton>
                <HelpOutlineIcon/>
            </IconButton>
            </Tooltip>
        : false
    )
}

/**
 * @function DescriptionCard
 * @desc This is a description component for displaying descriptions of form fields.
 * @arg {Object} props - The properties passed to the component.
 * @arg {String} props.description - The description property from a field object.
 * @arg {Boolean} props.helperText - The MUI form field property that shows helping text below a field, if True then use the property.
 * @returns {Component} - Returns a description JSX component.
 * @author Atama Zack <atama.zack@gmail.com>
 * @version 1.0.0
 */
export const DescriptionCard = (props) => {

    const { description, helperText } = props

    return (
        description?
            helperText?
                <span>
                    <InfoIcon
                        style={{ fontSize: '24px', marginBottom: '-7px' }}
                    />
                    {description}
                </span>
            :
                <Typography>
                    <i style={{ fontSize: '15px' }}><InfoIcon style={{ fontSize: '22px', marginBottom: '-7px', color: '#5F768A' }} /> {description}</i>
                </Typography>
            :
            ''

    )
}

/**
 * @function FormBuildHelp
 * @desc This is a component with quick steps on how to build a form.
 * @returns {Component} - Returns the FormBuildHelp component.
 * @author Atama Zack <atama.zack@gmail.com>
 * @version 1.0.0
 */
 export const FormBuildHelp = () => {

    const classes = formStyles();

    return (
        // <Grid
        //     container
        // >
            <Alert
                severity="info"
                className={classes.alertContainer}
            >
                <AlertTitle
                    className={classes.alertTitle}
                >This Form has no fields.</AlertTitle>
                <Typography
                    className={classes.alertHeader1}
                >
                    <strong>Quick Start</strong><br/>
                </Typography>
                <Typography
                    className={classes.alertBody}
                >
                    To add fields to this form, follow the steps listed below;<br/>
                    <strong>Step 1:</strong> Check if you are in <strong>Form Builder: </strong>Edit Mode at the top, if not, click on the <strong>Edit Form</strong> button.<br/>
                    <strong>Step 2:</strong> Click on the <strong>Section</strong> button to add a section to the form.<br/>
                    <strong>Step 3:</strong> Other buttons will appear after creating a form Section field.
                </Typography>
            </Alert>
        // </Grid>
    )
}

/**
 * @function CurrentLocation
 * @desc This component displays a Google map of the current location using coordinates provided
 * @arg {Object} props - The properties passed to the component.
 * @arg {Object} props.coordinates - The entire form object with all the components/form fields.
 * @arg {Boolean} props.isMarkerShown - The id of the form field using this method.
 * @returns {Component} A Google Map JSX component.
 * @author Atama Zack <atama.zack@gmail.com>
 * @version 1.0.0
 */
 export const CurrentLocation = (props) => {

	const { coordinates, isMarkerShown } = props

    const containerStyle = {
        width: '100%',
        height: '200px'
    };

	return (
        <LoadScript
            googleMapsApiKey="AIzaSyCt86FQK_WYrNu6SN0yoB6YRh_CzNaypGI"
        >      
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={{ lat: coordinates.lat, lng: coordinates.lng }}
                zoom={10}
            >
                {isMarkerShown && (
                    <Marker position={{ lat: coordinates.lat, lng: coordinates.lng }} />
                )}
            </GoogleMap>
        </LoadScript>
	)
};

/**
 * @function allFormFields
 * @desc This function only gets all form fields in which the field using it exists.
 * @arg {Object} data - The entire form object with all the components/form fields.
 * @arg {Object} fieldData - The id of the form field using this method.
 * @returns {Array} - Returns an array of form fields
 * @author Atama Zack <atama.zack@gmail.com>
 * @version 1.0.0
 */
export const allFormFields = (data, fieldData) => {
    let allFields = [];
    if(fieldData) {
        if(fieldData.type==='section'){
            data.filter(item=>item.id!==fieldData.id).forEach((item) => {
                allFields.push(...item.components.filter(field=>field.type==="select"||field.type==="radio"||field.type==="select-box"))
            });
        } else {
            if(fieldData.subParentId) {
                let subSection = data.find(item=>item.id===fieldData.parentId).components.find(field=>field.id===fieldData.subParentId)
                allFields = subSection.components.filter(field=>field.id!==fieldData.id&&(field.type==="select"||field.type==="radio"||field.type==="select-box"))
            } else {
                allFields = data.find(item=>item.id===fieldData.parentId).components.filter(field=>field.id!==fieldData.id&&(field.type==="select"||field.type==="radio"||field.type==="select-box"))
            }
        }
    }
    return allFields
}

/**
 * @function getSectionsSubSections
 * @desc This method gets all form Sections except the Section in which the field using the method exists and all Sub-Sections within the same Section as the field that uses the method.
 * @arg {Object} field - The field properties of the field using the method.
 * @arg {Object} componentsData - All form fields.
 * @returns {Array} An array of sections and sub-sections.
 * @author Atama Zack <atama.zack@gmail.com>.
 * @version 1.0.0
 */
export const getSectionsSubSections = (field, componentsData) => {
    let section = componentsData.find(section=>section.id===field.parentId);
    let sectionSubsection = [];
    let sections = [];
    let subSections = field.subParentId===null?section.components.filter(subField=>subField.type==='sub-section'):[];
    if(subSections) sectionSubsection.push(...subSections);
    if(field) {
        sections = componentsData.filter(section=>section.id!==field.parentId);
        if(sections) sectionSubsection.push(...sections);
        if(field.subParentId) {
            subSections = section.components.filter(subField=>subField.type==='sub-section'&&subField.id!==field.subParentId);
            if(subSections) sectionSubsection.push(...subSections);
        }
        return sectionSubsection;
    } else {
        return []
    }
}

/**
 * @function conditionalLogic
 * @desc This method is used to capture conditional diplay values.
 * @arg {Object} data - All form fields.
 * @arg {String} data.when - The id of the dependant field.
 * @arg {String} data.value - The value only which entered will the dependant field display.
 * @returns {Object} An array of Sections and Sub-sections.
 * @author Atama Zack <atama.zack@gmail.com>.
 * @version 1.0.0
 */
export const conditionalLogic = data => data.when!==''&&data.value!==''?{
    when: data.when,
    value: data.value.toLowerCase()                
}:null
