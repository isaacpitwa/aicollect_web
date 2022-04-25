import React, { useState, useEffect, createContext, useCallback } from "react";

import { FormsApi } from '../../../../api/forms-api'
import {
    allFormFields,
    getSectionsSubSections,
} from '../utils';

// Initialization of the Form Context
export const FormContext = createContext();

/**
 * @function FormProvider
 * @desc This is the Form Context Provider component that manages the overall state of the form being built.
 * @arg {Object} props - The properties passed to the form provider.
 * @arg {String} props.questionaireId - The form Id, passed through props.
 * @returns {Component} The Form Provider component.
 * @author Atama Zack <atama.zack@gmail.com>
 * @version 1.0.0
 */
const FormProvider = (props) => {

    const { questionaireId } = props;

    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(false);
    const [selectSection, setSelectSection] = useState(false);
    const [sectionId, setSectionId] = useState(null);
    const [subSectionId, setSubSectionId] = useState(null);
    const [componentsData, setComponentsData] = useState([]);
    const [fieldResponses, setFieldResponses] = useState([]);
    const [formData, setFormData] = useState({});
    const [sectionCreated, setSectionCreated] = useState(false);
    const [formPreview, setFormPreview] = useState(false);
    const [editStatus, setEditStatus] = useState(true);
    const [dependantId, setDependantId] = useState("");
    const [dependecyValue, setDependecyValue] = useState("");
    const [conditionalId, setConditionalId] = useState("");
    const [conditionalValue, setConditionalValue] = useState("");
    const [formFieldValues, setFormFieldValues] = useState([]);


    const getFormData = async () => {
        setIsLoaded(false)
        try {
            let data = await FormsApi.getFormDetails(questionaireId);
            if (data) {
                getFormDetails(data);
            }
        } catch (error) {
            console.log('DEBUG error --> \n', error);
        }
        setIsLoaded(true)
    }

    useEffect(() => {
        getFormData();
    }, [])

    /**
     * @function getFormDetails
     * @desc This method gets form data from the API response and updates the form builder state.
     * @arg {Object} data - The data of a form containing all form details.
     * @returns {Void} Nothing is returned.
     * @author Atama Zack <atama.zack@gmail.com>
     * @version 1.0.0
     */
    const getFormDetails = (data) => {
        setComponentsData(data.formFields);
        setFormData(data);
        setSectionCreated(data.formFields[0]&&data.formFields[0].type === 'section' ? true : false);
        setFormFieldValues(getFieldsValues(data));
        setFieldResponses(allFormFields(data.formFields).map(item => { return { id: item.id, value: item.value }}));
    }

    /**
     * @function getFieldsValues
     * @desc This method gets form data from the API response and updates the form builder state.
     * @arg {Object} data - The data of a form containing all form details.
     * @returns {Void} Nothing is returned.
     * @author Atama Zack <atama.zack@gmail.com>
     * @version 1.0.0
     */
    const getFieldsValues = (data) => {
        let sections = data.formFields;
        let allFields = []
        if(sections) sections.forEach(section=>{
            if(section.components) section.components.map(field=>allFields.push(...getField(field)))
        })
        return allFields
    }

    const getField = (field) => {
        return field.type==='sub-section'?field.components.map(field => {
            return { id: field.id, type: field.type, value: field.value, values: field.values?field.values:[] }
        }):[{ id: field.id, type: field.type, value: field.value, values: field.values?field.values:[] }];
    }

    /**
     * @function addDependency
     * @desc This method adds a dependency between the field using it (Dependee) and the field (Dependant) whose display depends on the value of the Dependee.
     * @arg {Object} fieldData - A field Object containing all field properties.
     * @returns {Boolean} A Boolean value, True if successfully linked dependency and False if not
     * @author Atama Zack <atama.zack@gmail.com>
     * @version 1.0.0
     */
    const addDependency = (fieldData) => {
        let newComponentsData = componentsData;
        let dependantField = getSectionsSubSections(fieldData.parentId, componentsData).find(field=>field.id===fieldData.dependency);
        let dependantFieldIndex = "";
        dependantField.display = "hidden";
        dependantField.dependency = fieldData.id
        if(dependantField.type==="section") {
            dependantFieldIndex = newComponentsData.findIndex(section=>section.id===fieldData.dependency);
            newComponentsData[dependantFieldIndex] = dependantField;
        } else {
            let section = newComponentsData.find(section=>section.id===fieldData.parentId);
            let sectionIndex = newComponentsData.findIndex(section=>section.id===fieldData.parentId);
            dependantFieldIndex = section.components.findIndex(field=>field.id===dependantField.id)
            section.components[dependantFieldIndex] = dependantField
            newComponentsData[sectionIndex] = section;
        }
        setComponentsData(newComponentsData)
    }

    const conditionalDisplay = (fieldData) => {
        let dependee = fieldData.conditional?formFieldValues.find(field=>field.id===fieldData.conditional.when):null;
        if(dependee) {
            if(dependee.type==='select-box') {
                let values = []
                dependee.values.map(item=>{ if(item.checked) values.push(item.label.toLowerCase()) })
                return values.includes(fieldData.conditional.value);
            } else {
                return fieldData.conditional.when===dependee.id&&fieldData.conditional.value===dependee.value&&!editStatus?true:false;
            }
        } else {
            return false;
        }
    };

    /**
     * @function addComponentToSection
     * @desc This method adds a field to the form being built.
     * @arg {Object} field - A field Object containing all field properties.
     * @returns {Void} Nothing is returned.
     * @author Atama Zack <atama.zack@gmail.com>
     * @version 1.0.0
     */
    const addComponentToSection = (field) => {
        
        let newComponentsData = componentsData;
        let newSection = newComponentsData.find(section=>section.id===field.parentId);
        let sectionIndex = newComponentsData.findIndex(section => section.id === field.parentId);
        let newSubSection = field.subParentId?newSection.components.find(subSec => subSec.id === field.subParentId):null;
        let subSectionIndex = field.subParentId?newSection.components.findIndex(subSec => subSec.id === field.subParentId):null;

        if(field.subParentId) {
            newSubSection.components.push(field);
            newSection.components[subSectionIndex] = newSubSection;
            newComponentsData[sectionIndex] = newSection;
        } else {
            newSection.components.push(field);
            newComponentsData[sectionIndex] = newSection;
        }

        setComponentsData(newComponentsData)
        if(field&&field.type==="number"&&field.dependency) addDependency(field);
        setIsLoaded(true)

    }

    /**
     * @function updateFieldInSection
     * @desc This method edits a particular field that exists in the form being built.
     * @arg {Object} fieldData - A field Object containing all field properties.
     * @returns {Void} Nothing is returned.
     * @author Atama Zack <atama.zack@gmail.com>
     * @version 1.0.0
     */
    const updateFieldInSection = (fieldData) => {

        let newFormFields = componentsData;
        let section = componentsData.find(section => section.id === fieldData.parentId);
        let sectionIndex = componentsData.findIndex(section => section.id === fieldData.parentId);

        if(fieldData.subParentId) {
            let subSection = section.components.find(subSection => subSection.id === fieldData.subParentId);
            let subSectionIndex = section.components.findIndex(subSection => subSection.id === fieldData.subParentId);
            let fieldIndex = subSection.components.findIndex(field => field.id === fieldData.id);
            section.components[subSectionIndex].components[fieldIndex] = fieldData;
        } else {
            let fieldIndex = section.components.findIndex(field => field.id === fieldData.id);
            section.components[fieldIndex] = fieldData;
        }

        newFormFields[sectionIndex] = section;
        setComponentsData(newFormFields);
        if(fieldData.type==="number"&&fieldData.dependency) addDependency(fieldData);
        updateFormData()
    }

    const updateFormData = async () => {
        let newForm = formData
        newForm.formFields = componentsData
        setFormData(newForm)
        const updatedForm = await FormsApi.addFieldsToNewForm({formId: newForm._id, ...newForm});
        getFormData(updatedForm.formId);
    }

    /**
     * @function deleteFieldData
     * @desc This method is used to delete any form fields expect a section.
     * @arg {Object} fieldData - The field to be deleted.
     * @returns {Void} Nothing is returned.
     * @author Atama Zack <atama.zack@gmail.com>.
     * @version 1.0.0
     */
    const deleteFieldData = (fieldData) => {
        let newFields = componentsData;
        let section = newFields.find(field=>field.id===fieldData.parentId);
        let sectionIndex = newFields.findIndex(field=>field.id===fieldData.parentId);
        
        if(fieldData.subParentId) {
            let subSection = section.components.find(field=>field.id===fieldData.subParentId);
            let subSectionIndex = section.components.findIndex(field=>field.id===fieldData.subParentId);
            subSection.components = subSection.components.filter(field=>field.id!==fieldData.id);
            section.components[subSectionIndex] = subSection;
            newFields[sectionIndex] = section;
        } else {
            section.components = section.components.filter(field=>field.id!==fieldData.id)
            newFields[sectionIndex] = section
        }

        setComponentsData(newFields)
    }

    const handleFormPreview = () => {
        setFormPreview(!formPreview)
        setEditStatus(!editStatus)
        setSelectSection(false)
        setSectionId(null)
        setSubSectionId(null)
    }

    return (
        <FormContext.Provider
            value={{
                isLoaded,
                setIsLoaded,
                getFormData,
                error,
                setError,
                selectSection,
                setSelectSection,
                sectionId,
                subSectionId,
                setSectionCreated,
                setSectionId,
                setSubSectionId,
                sectionCreated,
                formData,
                setFormData,
                componentsData,
                setComponentsData,
                fieldResponses,
                setFieldResponses,
                addComponentToSection,
                updateFieldInSection,
                addDependency,
                updateFormData,
                formPreview,
                editStatus,
                handleFormPreview,
                dependantId,
                setDependantId,
                dependecyValue,
                setDependecyValue,
                conditionalId,
                setConditionalId,
                conditionalValue,
                setConditionalValue,
                conditionalDisplay,
                formFieldValues,
                setFormFieldValues,
                deleteFieldData,
            }}
        >
            {props.children}
        </FormContext.Provider>
    )
}

export default FormProvider
