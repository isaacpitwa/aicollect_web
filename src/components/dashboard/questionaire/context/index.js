import React, { useState, createContext } from "react";
import { v4 as uuidv4 } from 'uuid'

export const FormContext = createContext();

const FormProvider = (props) => {

    const [formData, setFormData] = useState({
        type: 'form',
        formId: uuidv4(),
        userId: uuidv4(),
        components: []
    })
    const [componentsData, setComponentsData] = useState([])

    const addComponent = (newComponent) => {
        setComponentsData(componentsData => [...componentsData, newComponent])
    }

    const createForm = () => {
        let newForm = formData
        newForm.components = componentsData
        setFormData(newForm)
        console.log({'New Form': formData})
    }

    return (
        <FormContext.Provider
            value={{
                formData,
                addComponent,
                componentsData,
                createForm
            }}
        >
            {props.children}
        </FormContext.Provider>
    )
}

export default FormProvider
