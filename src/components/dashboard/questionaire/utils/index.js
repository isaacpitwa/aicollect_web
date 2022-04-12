import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api';

import {
    Typography
} from '@mui/material';

import FormStyles from '../styles/FormStyles';
import InfoIcon from '@mui/icons-material/Info';

/**
 * @function DescriptionCard
 * @desc This is a description component for displaying descriptions of form fields.
 * @arg {String} description - The description property from a field object.
 * @arg {Boolean} helperText - The MUI form field property that shows helping text below a field, if True then use the property.
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
export const allFormFields = (data, fieldData=null) => {

    let allFields = [];

    if(fieldData.type==='section'){
        data.filter(item=>item.id!==fieldData.id).forEach((item) => {
            allFields.push(...item.components.filter(field=>field.type==="select"||field.type==="radio"))
        });
    } else {
        if(fieldData.subParentId) {
            let subSection = data.find(item=>item.id===fieldData.parentId).components.find(field=>field.id===fieldData.subParentId)
            allFields = subSection.components.filter(field=>field.id!==fieldData.id&&(field.type==="select"||field.type==="radio"))
        } else {
            allFields = data.find(item=>item.id===fieldData.parentId).components.filter(field=>field.id!==fieldData.id&&(field.type==="select"||field.type==="radio"))
        }
    }

    return allFields
}

/**
 * @function getSectionsSubSections
 * @desc This method gets EITHER all Sub-Sections in the same Section with the field using it OR all form Sections except the section the field using it exists.
 * @arg {String} parentId - The id of the section in which the field exists
 * @arg {Object} componentsData - All form fields.
 * @returns {Array} An array of sections and sub-sections.
 * @author Atama Zack <atama.zack@gmail.com>.
 * @version 1.0.0
 */
export const getSectionsSubSections = (parentId, componentsData) => {
    let sections = componentsData.filter(section=>section.id!==parentId)
    let subSections = componentsData.find(section=>section.id===parentId).components.filter(field=>field.type==='sub-section');
    return sections.concat(subSections)
}

export const getDependantField = (allFields, fieldId) => {
    let dependantField = allFields.find(field => field.id === fieldId)
    return dependantField
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

// This function gets the index of a form field from the form data set
export const findComponentIndex = (newFieldData, componentsData) => {

    let compIndex = null;
    let sectionField = {};
    let sectionComponents = []

    if (newFieldData.parentId && newFieldData.subParentId) {
        sectionComponents = componentsData.find(comp => comp.id === newFieldData.parentId).components;
        subSectionComponents = sectionComponents.find(comp => comp.id === newFieldData.subParentId).components;
        compIndex = subSectionComponents.findIndex(comp => comp.id === newFieldData.id)
    } else if (newFieldData.parentId && !newFieldData.subParentId) {
        sectionField = componentsData.find(comp => comp.id === newFieldData.parentId);
        sectionComponents = sectionField.components
        compIndex = sectionComponents.findIndex(comp => comp.id === newFieldData.id)
    } else {
        compIndex = componentsData.findIndex(comp => comp.id === newFieldData.id)
    }

    return compIndex
}
