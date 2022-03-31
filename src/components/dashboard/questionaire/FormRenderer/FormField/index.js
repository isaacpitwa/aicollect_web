import { useEffect, useState, useContext } from 'react'
import SectionField from './sectionField'
import SubSectionField from './subSectionField'
import TextField from './textField'
import TextAreaField from './textAreaField'
import NumberField from './numberField'
import SelectBoxesField from './selectBoxesField'
import SelectField from './selectField'
import RadioField from './radioField'
import EmailField from './emailField'
import PhoneNumberField from './phoneNumberField'
import ImageField from './imageField'
import LocationField from './locationField'
import DateField from './dateField'

import AreaMappingField from './areaMappingField'
import { FormContext } from '../../context'

const FormField = (props) => {

    const { fieldResponses } = useContext(FormContext)

    const { fieldKey, fieldData, editStatus } = props
    
    switch (fieldData.type) {
        case 'sub-section':
            return <SubSectionField fieldKey={fieldKey} fieldData={fieldData} fieldResponses={fieldResponses} editStatus={editStatus}/>
        case 'text':
            return <TextField fieldKey={fieldKey} fieldData={fieldData} fieldResponses={fieldResponses} editStatus={editStatus}/>
        case 'text-area':
            return <TextAreaField fieldKey={fieldKey} fieldData={fieldData} fieldResponses={fieldResponses} editStatus={editStatus}/>
        case 'number':
            return <NumberField fieldKey={fieldKey} fieldData={fieldData} fieldResponses={fieldResponses} editStatus={editStatus}/>
        case 'select-box':
            return <SelectBoxesField fieldKey={fieldKey} fieldData={fieldData} fieldResponses={fieldResponses} editStatus={editStatus}/>
        case 'select':
            return <SelectField fieldKey={fieldKey} fieldData={fieldData} fieldResponses={fieldResponses} editStatus={editStatus}/>
        case 'radio':
            return <RadioField fieldKey={fieldKey} fieldData={fieldData} fieldResponses={fieldResponses} editStatus={editStatus}/>
        case 'email':
            return <EmailField fieldData={fieldData} fieldResponses={fieldResponses} editStatus={editStatus}/>
        case 'phone-number':
            return <PhoneNumberField fieldKey={fieldKey} fieldData={fieldData} fieldResponses={fieldResponses} editStatus={editStatus}/>
        case 'image':
            return <ImageField fieldKey={fieldKey} fieldData={fieldData} fieldResponses={fieldResponses} editStatus={editStatus}/>
        case 'location':
            return <LocationField fieldKey={fieldKey} fieldData={fieldData} fieldResponses={fieldResponses} editStatus={editStatus}/>
        case 'date':
            return <DateField fieldKey={fieldKey} fieldData={fieldData} fieldResponses={fieldResponses} editStatus={editStatus}/>
        case 'area-mapping':
            return <AreaMappingField fieldKey={fieldKey} fieldData={fieldData} fieldResponses={fieldResponses} editStatus={editStatus}/>
    }
}

export default FormField
