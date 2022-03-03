import React, { useState, useEffect, useCallback, createContext } from "react";
import { v4 as uuidv4 } from 'uuid'

import {
    compsData
} from './formData';

export const FormContext = createContext();

const FormProvider = (props) => {

    const [componentsData, setComponentsData] = useState([])
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
    const [sectionCreated, setSectionCreated] = useState(componentsData[0]&&componentsData[0].type==='section'?true:false)
    const [formPreview, setFormPreview] = useState(false)
    const [editStatus, setEditStatus] = useState(false)

    useEffect(()=>{
        setComponentsData(compsData);
    }, [componentsData])

    const updateField = (fieldIndex, fieldData) => {

    }

    const updateComponentsData = useCallback((updatedComponent) => {
        setComponentsData(updatedComponent)
    }, []);

    const addComponent = (newComponent) => {
        setComponentsData(componentsData => [...componentsData, newComponent])
        setSectionCreated(true)
    }

    const createForm = () => {
        let newForm = formData
        newForm.components = componentsData
        setFormData(newForm)
        console.log({'New Form': formData})
    }

    const handleFormPreview = () => {
        setFormPreview(!formPreview)
        setEditStatus(!editStatus)
    }

    return (
        <FormContext.Provider
            value={{
                sectionCreated,
                formData,
                componentsData,
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
