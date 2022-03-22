import React, { useState, useEffect, createContext, useCallback } from "react";

import { FormsApi } from '../../../../api/forms-api'
import {
    allFormFields,
} from '../utils';

export const FormContext = createContext();

const FormProvider = (props) => {

    const { questionaireId } = props 

    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(false)
    const [selectSection, setSelectSection] = useState(false)
    const [sectionId, setSectionId] = useState(false)
    const [subSectionId, setSubSectionId] = useState(false)
    const [componentsData, setComponentsData] = useState([])
    const [fieldResponses, setFieldResponses] = useState([])
    const [formData, setFormData] = useState({})
    const [sectionCreated, setSectionCreated] = useState(false)
    const [formPreview, setFormPreview] = useState(false)
    const [editStatus, setEditStatus] = useState(true)


    const getFormData = useCallback(async () => {
        setIsLoaded(false)
        let data = await FormsApi.getFormDetails(questionaireId);
        data && getFormDetails(data)
        setIsLoaded(true)
    }, [])

    useEffect(() => {
        getFormData();
    }, [])

    const getFormDetails = (data) => {
        setComponentsData(data.formFields);
        setFormData(data);
        setSectionCreated(data.formFields[0]&&data.formFields[0].type === 'section' ? true : false)
        setFieldResponses(allFormFields(data.formFields).map(item => { return { id: item.id, value: item.value }}))

    }

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

    const addComponentToSection = (compData) => {
        
        let newComponentsData = componentsData;
        let newSection = newComponentsData.find(section => section.id === compData.parentId);
        let sectionIndex = newComponentsData.findIndex(section => section.id === compData.parentId);

        if(compData.subParentId) {
            let newSubSection = newSection.components.find(subSec => subSec.id === compData.subParentId)
            let subSectionIndex = newSection.components.findIndex(subSec => subSec.id === compData.subParentId)
            newSubSection.components.push(compData)
            newSection.components[subSectionIndex] = newSubSection
            newComponentsData[sectionIndex] = newSection
        } else {
            newSection.components.push(compData)
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

        updateFormData()        
    }

    const updateSection = (sectionData) => {

        let newFormFields = componentsData;
        let sectionIndex = componentsData.findIndex(section => section.id === sectionData.id);
        newFormFields[sectionIndex] = sectionData

        setComponentsData(newFormFields)

        updateFormData()
    }

    const updateFormData = async () => {
        let newForm = formData
        newForm.formFields = componentsData
        setFormData(newForm)
        const updatedForm = await FormsApi.addFieldsToNewForm({formId: newForm._id, ...newForm});
        getFormData(updatedForm.formId);
    }

    const handleFormPreview = () => {
        setFormPreview(!formPreview)
        setEditStatus(!editStatus)
        setSelectSection(false)
        setSectionId(false)
        setSubSectionId(false)
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
                updateSection,
                updateComponentsData,
                addComponentToSection,
                updateFieldInSection,
                updateFormData,
                formPreview,
                editStatus,
                handleFormPreview
            }}
        >
            {props.children}
        </FormContext.Provider>
    )
}

export default FormProvider
