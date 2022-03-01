import React, { useState, createContext } from "react";
import { v4 as uuidv4 } from 'uuid'

import {
    compsData
} from './formData';

export const FormContext = createContext();

const FormProvider = (props) => {

    const [formData, setFormData] = useState({
        formId: uuidv4(),
        userId: uuidv4(),
        formName: '',
        type: 'form',
        components: compsData
    })
    const [componentsData, setComponentsData] = useState(compsData)
    const [sectionCreated, setSectionCreated] = useState(componentsData[0]&&componentsData[0].type==='section'?true:false)
    const [formPreview, setFormPreview] = useState(false)
    const [editStatus, setEditStatus] = useState(false)

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
                addComponent,
                componentsData,
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
