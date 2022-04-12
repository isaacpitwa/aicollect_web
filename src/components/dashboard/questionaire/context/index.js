import React, { useState, useEffect, createContext, useCallback } from "react";

import { FormsApi } from '../../../../api/forms-api'
import {
    allFormFields,
    getSectionsSubSections
} from '../utils';

// Initialization of the Form Context
export const FormContext = createContext();

/**
 * @function FormProvider
 * @desc This is the Form Context Provider
 * @arg {String} questionaireId - The Questionaire/Form Id
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

    const getFormDetails = (data) => {
        setComponentsData(data.formFields);
        setFormData(data);
        setSectionCreated(data.formFields[0]&&data.formFields[0].type === 'section' ? true : false)
        setFieldResponses(allFormFields(data.formFields).map(item => { return { id: item.id, value: item.value }}));
    }

    const addDependency = (fieldData) => {
        let newComponentsData = componentsData;
        let dependantField = {};
        let dependantFieldIndex = "";
        try {
            dependantField = getSectionsSubSections(parentId, componentsData).find(field=>field.id===dependency)
            dependantField.display = "hidden";
            dependantField.dependency = fieldData.id
            if(dependantField.type==="section") {
                dependantFieldIndex = newComponentsData.findIndex(section=>section.id===dependantField.id);
                newComponentsData[dependantFieldIndex] = dependantField;
            } else {
                let section = newComponentsData.find(section=>section.id===dependantField.parentId);
                let sectionIndex = newComponentsData.findIndex(section=>section.id===dependantField.parentId);
                dependantFieldIndex = section.components.findIndex(field=>field.id===dependantField.id)
                section.components[dependantFieldIndex] = dependantField;
                newComponentsData[sectionIndex] = section;
            }
            if(setComponentsData(newComponentsData)) return true
        } catch (error) {
            return false
        }
    }

    const conditionalDisplay = (field) => {
        return field.conditional&&field.conditional.when===conditionalId&&field.conditional.value===conditionalValue&&!editStatus?true:false
    };

    const updateComponentsData = (fieldIndex, newFieldData) => {

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

        setComponentsData(newComponentsData)
    }

    const addComponentToSection = (field) => {
        
        let newComponentsData = componentsData;
        let newSection = newComponentsData.find(section=>section.id===field.parentId);
        let sectionIndex = newComponentsData.findIndex(section => section.id === field.parentId);

        if(field.subParentId) {
            let newSubSection = newSection.components.find(subSec => subSec.id === field.subParentId)
            let subSectionIndex = newSection.components.findIndex(subSec => subSec.id === field.subParentId)
            newSubSection.components.push(field)
            newSection.components[subSectionIndex] = newSubSection
            newComponentsData[sectionIndex] = newSection
        } else {
            newSection.components.push(field)
            newComponentsData[sectionIndex] = newSection
        }

        setComponentsData(newComponentsData)

    }

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

        newFormFields[sectionIndex] = section
        setComponentsData(newFormFields)
        if(fieldData.type==="number") addDependency(fieldData)
        updateFormData()        
    }

    const updateFormData = async () => {
        let newForm = formData
        newForm.formFields = componentsData
        setFormData(newForm)
        const updatedForm = await FormsApi.addFieldsToNewForm({formId: newForm._id, ...newForm});
        getFormData(updatedForm.formId);
    }

    const deleteFieldData = (fieldData) => {

        let newFormFields = componentsData;

        let section = newFormFields.find(section=>section.id===fieldData.parentId);
        let sectionIndex = newFormFields.findIndex(section=>section.id===fieldData.parentId);

        try {
            if(fieldData.subParentId) {
                let subSection = section.components.find(subSection=subSection.id===fieldData.subParentId);
                let subSectionIndex = section.components.findIndex(subSection=>subSection.id===fieldData.subParentId);
                subSection = subSection.components.filter(field=>field.id!==fieldData.id);
                section.components[subSectionIndex] = subSection;
            } else {
                section.components = section.components.filter(field=>field.id!==fieldData.id);
            }

            newFormFields[sectionIndex] = section;

        } catch (error) {
            console.log('DEBUG ERROR: ', error)
        }

        setComponentsData(newFormFields)
        // updateFormData()

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
                updateComponentsData,
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
