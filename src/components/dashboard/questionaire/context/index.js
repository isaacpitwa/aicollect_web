import React, { useState, useEffect, createContext, useCallback } from "react";
import { v4 as uuidv4 } from 'uuid'
import {
    compsData
} from './formData';

import { FormsApi } from '../../../../api/forms-api'
import {
    allFormFields,
} from '../utils';

export const FormContext = createContext();

const FormProvider = (props) => {

    const { questionaireId } = props
    console.log(questionaireId)
    let formsData = [
        {
            id: 1,
            name: '',
            type: 'form',
            version: 1,
            createdBy: 111000,
            createdAt: Date.now(),
            submittedBy: '',
            submittedAt: '',
            timeSpent: '',
            formFields: []
        }
    ]    

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
        const formDets = data && getFormDetails(data)
        formDets && getformsDataData()
        setIsLoaded(true)
    }, [])

    useEffect(() => {
        getFormData();
    }, [])

    const getformsDataData = () => {
        console.log(componentsData)
        setSectionCreated(componentsData[0]&&componentsData[0].type === 'section' ? true : false)
        setFieldResponses(allFormFields(componentsData).map(item => { return { id: item.id, value: item.value }}))
    }

    const getFormDetails = (data) => {
        setComponentsData(data.formFields);
        setFormData(data);

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

    const addComponent = (newComponent) => {
        setComponentsData(componentsData => [...componentsData, newComponent])
        setSectionCreated(true)
    }

    const createForm = async () => {
        let newForm = formData
        newForm.formFields = componentsData
        setFormData(newForm)
        const updatedForm = await FormsApi.addFieldsToNewForm({formId: newForm._id, ...newForm});
        console.log('UPDATED FORM: ', updatedForm)
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
                componentsData,
                setComponentsData,
                fieldResponses,
                setFieldResponses,
                addComponent,
                updateComponentsData,
                addComponentToSection,
                createForm,
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
