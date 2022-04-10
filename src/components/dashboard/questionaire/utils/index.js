import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

import {
    Typography
} from '@mui/material'

import FormStyles from '../styles/FormStyles'
import InfoIcon from '@mui/icons-material/Info'

// This is a description component for displaying descriptions of form fields

/**
 * @function DescriptionCard
 * @desc This is a description component for displaying descriptions of form fields
 * @arg {Object} description - The description property from a field object.
 * @arg {Boolean} helperText - The MUI form field property that shows helping text below a field, if True then use the property
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
 * @arg {Object} coordinates - The entire form object with all the components/form fields.
 * @arg {Boolean} isMarkerShown - The id of the form field using this method.
 * @author Atama Zack <atama.zack@gmail.com>
 * @version 1.0.0
 */
 export const CurrentLocation = compose(
	withProps({
	  googleMapURL:
		`https://maps.googleapis.com/maps/api/js?key=AIzaSyCt86FQK_WYrNu6SN0yoB6YRh_CzNaypGI&libraries=geometry,drawing,places`,
		loadingElement: <div style={{ height: `100%` }} />,
		containerElement: <div style={{ height: `150px` }} />,
		mapElement: <div style={{ height: `100%`, borderRadius: '8px' }} />
	}),
	withScriptjs,
	withGoogleMap
  )(props => {

	const { coordinates, isMarkerShown } = props

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

/**
 * @function allFormFields
 * @desc This function only gets all form fields in which the field using it exists.
 * @arg {Object} data - The entire form object with all the components/form fields.
 * @arg {Object} fieldData - The id of the form field using this method.
 * @returns {Array} - An array of form fields
 * @author Atama Zack <atama.zack@gmail.com>
 * @version 1.0.0
 */
export const allFormFields = (data, fieldData=null) => {

    let allFields = [];

    if(fieldData.type==='section'){
        data.filter(item=>item.id!==fieldData.id).forEach((item) => {
            allFields.push(...item.components.filter(field=>field.type!=="sub-section"))
        });
    } else {
        if(fieldData.subParentId) {
            let subSection = data.find(item=>item.id===fieldData.parentId).components.find(field=>field.id===fieldData.subParentId)
            allFields = subSection.components.filter(field=>field.id!==fieldData.id)
        } else {
            allFields = data.find(item=>item.id===fieldData.parentId).components.filter(field=>field.type!=="sub-section"&&field.id!==fieldData.id)
        }
    }

    return allFields
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

// This function edits a form field by it's index
export const editField = (componentsData, fieldIndex, newFieldData) => {
    
    let newComponentsData = componentsData;
    
    if (newFieldData.parentId && newFieldData.subParentId) {
        let sectionIndex = newComponentsData.components.findIndex(comp => comp.id === newFieldData.parentId);
        let sectionFieldComponents = newComponentsData.find(comp => comp.id === newFieldData.parentId).components;
        let subSectionIndex = sectionFieldComponents.findIndex(comp => comp.id === newFieldData.subParentId);
        newComponentsData[sectionIndex].components[subSectionIndex].components[fieldIndex] = newFieldData;
    } else if (newFieldData.parentId && !newFieldData.subParentId) {
        let sectionIndex = newComponentsData.findIndex(comp => comp.id === newFieldData.parentId);
        newComponentsData[sectionIndex].components[fieldIndex] = newFieldData;
    } else {
        newComponentsData[fieldIndex] = newFieldData;
    }
    return newComponentsData
}

export const FieldIndex = (fieldId, fieldsData) => {
    let fieldIndex = fieldsData.findIndex(comp => comp.fieldId === fieldId)
    return fieldIndex
}

export const getSectionsSubSections = (parentId, componentsData) => {
    let sections = componentsData.filter(section=>section.id!==parentId)
    let subSections = componentsData.find(section=>section.id===parentId).components.filter(field=>field.type==='sub-section');
    return sections.concat(subSections)
}

export const getDependantField = (allFields, fieldId) => {
    let dependantField = allFields.find(field => field.id === fieldId)
    return dependantField
}

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
