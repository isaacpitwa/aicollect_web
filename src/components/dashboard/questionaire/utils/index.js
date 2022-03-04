import FormStyles from '../styles/FormStyles'
import InfoIcon from '@mui/icons-material/Info'

// This is a description component for displaying descriptions of form fields
export const DescriptionCard = (props) => {

    const Styles = FormStyles.sectionStyles

    const { description, helperText } = props

    return (
        description ?
            helperText ?
                <span><InfoIcon style={{ fontSize: '24px', marginBottom: '-7px' }} /> {description}</span>
                :
                <Typography style={{ marginLeft: '20px' }}>
                    <i><InfoIcon style={{ fontSize: '22px', marginBottom: '-7px', color: '#5F768A' }} /> {description}</i>
                </Typography>
            :
            ''

    )
}

// This function gets all form fields excluding sections and sub-sections
/**
 * 
 * @param {object} data 
 * @returns 
 */
export const allFormFields = (data) => {

    let allFields = [];

    data.forEach((item) => {
        item.components.forEach((comp) => {
            if (comp.type === 'sub-section') {
                allFields.push(...comp.components)
            } else {
                allFields.push(comp);
            }
        });
    });
    return allFields
}

// This function gets the index of a form field from the form data set
export const findComponentIndex = (newFieldData, componentsData) => {

    let compIndex = null;
    let sectionField = {};
    let sectionComponents = []

    if (newFieldData.parentId && newFieldData.subParentId) {
        sectionField = componentsData.find(comp => comp.id === newFieldData.parentId);
        sectionComponents = sectionField.components
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
