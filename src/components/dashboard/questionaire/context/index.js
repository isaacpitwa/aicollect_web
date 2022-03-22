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

    const updateSection = (sectionData) => {

        let newFormFields = componentsData;
        let sectionIndex = componentsData.findIndex(section => section.id === sectionData.id);
        newFormFields[sectionIndex] = sectionData

        setComponentsData(newFormFields)
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
