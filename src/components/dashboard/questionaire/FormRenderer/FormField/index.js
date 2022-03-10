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

import AreaMappingField from './areaMappingField'
import { FormContext } from '../../context'

const FormField = (props) => {

    const { formPreview, componentsData, fieldResponses } = useContext(FormContext)

    const { fieldData, editStatus } = props

    const [refresh, setRefresh] = useState(false)


    const fieldUpdated = () => {
        setRefresh(true)
    }
    
    switch (fieldData.type) {
        case 'sub-section':
            return <SubSectionField fieldData={fieldData} editStatus={editStatus}/>
        case 'text':
            return <TextField fieldData={fieldData} editStatus={editStatus} fieldUpdated={fieldUpdated}/>
        case 'text-area':
            return <TextAreaField fieldData={fieldData} editStatus={editStatus}/>
        case 'number':
            return <NumberField fieldData={fieldData} editStatus={editStatus}/>
        case 'select-box':
            return <SelectBoxesField fieldData={fieldData} editStatus={editStatus}/>
        case 'select':
            return <SelectField fieldData={fieldData} editStatus={editStatus}/>
        case 'radio':
            return <RadioField fieldData={fieldData} editStatus={editStatus}/>
        case 'email':
            return <EmailField fieldData={fieldData} editStatus={editStatus}/>
        case 'phone-number':
            return <PhoneNumberField fieldData={fieldData} editStatus={editStatus}/>
        case 'image':
            return <ImageField fieldData={fieldData} editStatus={editStatus}/>
        case 'location':
            return <LocationField fieldData={fieldData} editStatus={editStatus}/>
        case 'area-mapping':
            return <AreaMappingField fieldData={fieldData} editStatus={editStatus}/>
    }
}

export default FormField
