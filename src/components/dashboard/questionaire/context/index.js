import React, { useState, createContext } from "react";
import { v4 as uuidv4 } from 'uuid'

export const FormContext = createContext();

const compsData = [
	{
		id: uuidv4(),
		label: 'Personal Information',
		type: 'section',
		description: 'Personal Information Description',
        tooltip: '',
		components: [
			{
                id: uuidv4(),
                type: 'text',
                defaultValue: null,
				label: 'Label (Text Field)',
                description: '',
                tooltip: ''
			},
			{
                id: uuidv4(),
                type: 'text-area',
                defaultValue: null,
				label: 'Label (Text Area)',
                description: '',
                tooltip: ''
			},
			{
                id: uuidv4(),
                type: 'number',
                defaultValue: null,
				label: 'Label (Number Field)',
                description: '',
                tooltip: ''
			},
            {
                id: uuidv4(),
                label: 'Sub Section 1',
                type: 'sub-section',
                description: 'Section Description 1',
                components: [
                    {
                        id: uuidv4(),
                        type: 'text',
                        defaultValue: null,
                        label: 'Label (Text Field)',
                        description: '',
                        tooltip: ''
                    },
                    {
                        id: uuidv4(),
                        type: 'text',
                        defaultValue: null,
                        label: 'Label (Text Field)',
                        description: '',
                        tooltip: ''
                    },
                ]
            }
		],
	},
	{
		id: uuidv4(),
		label: 'Farm Information',
		type: 'section',
		description: 'Farm Information Description',
        tooltip: '',
		components: []
    }
]

const FormProvider = (props) => {

    const [sectionCreated, setSectionCreated] = useState(false)
    const [formData, setFormData] = useState({
        formId: uuidv4(),
        userId: uuidv4(),
        formName: '',
        type: 'form',
        components: compsData
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
