import React, { useState, createContext } from "react";
import { v4 as uuidv4 } from 'uuid'

export const FormContext = createContext();

const compsData = [	
	{
		id: '1213',
		title: 'Section 1',
		description: 'Section Description 1',
		type: 'section',
		components: [
			{
                id: '12345',
				title: 'Text Field'
			},
			{
                id: '123456',
				title: 'TextArea Field'
			}
		],
	}
]

const FormProvider = (props) => {

    const [sectionCreated, setSectionCreated] = useState(false)
    const [formData, setFormData] = useState({
        type: 'form',
        formId: uuidv4(),
        userId: uuidv4(),
        components: []
    })

    const [componentsData, setComponentsData] = useState(compsData)

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

    return (
        <FormContext.Provider
            value={{
                sectionCreated,
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
