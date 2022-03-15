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

    const [sectionId, setSectionId] = useState(false)
    const [subSectionId, setSubSectionId] = useState(false)
    const [componentsData, setComponentsData] = useState([])
    const [fieldResponses, setFieldResponses] = useState([])
    const [formData, setFormData] = useState({
        id: 1,
        name: '',
        type: 'form',
        version: 1,
        createdBy: 111000,
        createdAt: Date.now(),
        submittedBy: '',
        submittedAt: '',
        timeSpent: '',
        components: componentsData
    })
    const [sectionCreated, setSectionCreated] = useState(false)
    const [formPreview, setFormPreview] = useState(false)
    const [editStatus, setEditStatus] = useState(false)

    useEffect(() => {
        getFormJson()
        setFieldResponses(allFormFields(compsData).map(item => { return { fieldId: item.id, value: item.value }}))
    }, [])

    const getFormJson = async () => {
        await setComponentsData(compsData)
        setSectionCreated(compsData[0] && compsData[0].type === 'section' ? true : false)
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
                sectionId,
                setSectionId,
                subSectionId,
                setSubSectionId,
                sectionCreated,
                formData,
                componentsData,
                setComponentsData,
                fieldResponses,
                setFieldResponses,
                addComponent,
                updateComponentsData,
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
