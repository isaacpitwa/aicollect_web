import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api';

import {
    Typography,
    IconButton,
    Tooltip,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

import FormStyles from '../styles/FormStyles';

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

    const Styles = FormStyles.sectionStyles

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
        tooltip!=''?
            <Tooltip title={tooltip}>
            <IconButton>
                <HelpOutlineIcon/>
            </IconButton>
            </Tooltip>
        : ''
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
    let sectionSubsection = []
    let sections = []
    let subSections = []
    if(field) {
        sections = componentsData.filter(section=>section.id!==field.parentId);
        if(sections) sectionSubsection.push(...sections);
        if(field.subParentId) {
            sections = componentsData.find(section=>section.id===field.parentId);
            subSections = sections.components.filter(subField=>subField.type==='sub-section'&&subField.id!==field.subParentId);
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
export const conditionalLogic = (data) => {
    if(data.when!==''&&data.value!==''){
        return {
            when: data.when,
            value: data.value.toLowerCase()                
        }
    } else {
        return null
    }
}
