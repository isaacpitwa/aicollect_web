import React, { useState, useEffect, createContext } from "react";
import { v4 as uuidv4 } from 'uuid'

import {
    compsData
} from './formData';

import {
    allFormFields,
} from '../utils';

export const FormContext = createContext();

const FormProvider = (props) => {

    const formsData = [
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
            formFields: compsData
        }
    ]

    localStorage.setItem('forms', JSON.stringify(formsData))


    const forms = JSON.parse(localStorage.getItem('forms'));

    const [isLoaded, setIsLoaded] = useState(false);
    const [sectionId, setSectionId] = useState(false)
    const [subSectionId, setSubSectionId] = useState(false)
    const [componentsData, setComponentsData] = useState([])
    const [fieldResponses, setFieldResponses] = useState([])
    const [formData, setFormData] = useState()
    const [sectionCreated, setSectionCreated] = useState(false)
    const [formPreview, setFormPreview] = useState(false)
    const [editStatus, setEditStatus] = useState(false)

    useEffect(async () => {
        setIsLoaded(false)
        await getFormsData()
        await getFormFields()
        // setSectionCreated(componentsData[0] && componentsData[0].type === 'section' ? true : false)
        // setFieldResponses(allFormFields(componentsData).map(item => { return { id: item.id, value: item.value }}))
        setIsLoaded(true)
    }, [componentsData])

    const getFormsData = async () => {
        setFormData(forms)
        setComponentsData(forms[0].formFields)
        setSectionCreated(forms[0].formFields[0] && forms[0].formFields[0].type === 'section' ? true : false)
        setFieldResponses(allFormFields(forms[0].formFields).map(item => { return { id: item.id, value: item.value }}))
        // console.log('Forms Data: ', forms);
        // console.log('Forms Fields: ', forms[0].formFields);
        // console.log('Forms Field Responses: ', allFormFields(forms[0].formFields).map(item => { return { fieldId: item.id, value: item.value }}));
    }

    const getFormFields = async () => {
        setComponentsData(forms[0].formFields)
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

        let allSections = componentsData;
        let newSection = allSections.find(section => section.id === compData.parentId);
        let sectionIndex = allSections.findIndex(section => section.id === compData.parentId);

        if(compData.subParentId) {
            let newSubSection = newSection.components.find(subSec => subSec.id === compData.subParentId)
            let subSectionIndex = newSection.components.findIndex(subSec => subSec.id === compData.subParentId)
            newSubSection = newSubSection.push(compData)
            newSection[subSectionIndex] = newSubSection
            allSections[sectionIndex] = newSection
        } else {
            newSection = newSection.push(compData)
            allSections[sectionIndex] = newSection
        }

        setComponentsData(allSections)

    }

    const addComponent = (newComponent) => {
        setComponentsData(componentsData => [...componentsData, newComponent])
        setSectionCreated(true)
    }

    const createForm = () => {
        let newForm = formData
        newForm.components = componentsData
        setFormData(newForm)
    }

    const handleFormPreview = () => {
        setFormPreview(!formPreview)
        setEditStatus(!editStatus)
    }

    return (
        <FormContext.Provider
            value={{
                isLoaded,
                sectionId,
                subSectionId,
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
