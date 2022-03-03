import { useContext, useEffect } from 'react'
import SectionField from './sectionField'
import SubSectionField from './sectionField'
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

    const { formPreview, componentsData } = useContext(FormContext)

    const { fieldData, editStatus } = props

    useEffect(() => {

    }, [componentsData])

    const Field = () => {
        switch (fieldData.type) {
            case 'sub-section':
                return <SubSectionField fieldData={fieldData} editStatus={editStatus}/>
                break;
            case 'text':
                return <TextField fieldData={fieldData} editStatus={editStatus}/>
                break;
            case 'text-area':
                return <TextAreaField fieldData={fieldData} editStatus={editStatus}/>
                break;
            case 'number':
                return <NumberField fieldData={fieldData} editStatus={editStatus}/>
                break;
            case 'select-box':
                return <SelectBoxesField fieldData={fieldData} editStatus={editStatus}/>
                break;
            case 'select':
                return <SelectField fieldData={fieldData} editStatus={editStatus}/>
                break;
            case 'radio':
                return <RadioField fieldData={fieldData} editStatus={editStatus}/>
                break;
            case 'email':
                return <EmailField fieldData={fieldData} editStatus={editStatus}/>
                break;
            case 'phone-number':
                return <PhoneNumberField fieldData={fieldData} editStatus={editStatus}/>
                break;
            case 'image':
                return <ImageField fieldData={fieldData} editStatus={editStatus}/>
                break;
            case 'location':
                return <LocationField fieldData={fieldData} editStatus={editStatus}/>
                break;
            case 'area-mapping':
                return <AreaMappingField fieldData={fieldData} editStatus={editStatus}/>
                break;
            default:
                return <SectionField fieldData={fieldData} editStatus={formPreview}/>
                break
        }
    }

    return (
        <Field/>
    )
}

export default FormField
