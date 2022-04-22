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

const FormField = (props) => {

    const { fieldData } = props
    
    switch (fieldData.type) {
        case 'sub-section':
            return <SubSectionField fieldData={fieldData} />
        case 'text':
            return <TextField fieldData={fieldData} />
        case 'text-area':
            return <TextAreaField fieldData={fieldData} />
        case 'number':
            return <NumberField fieldData={fieldData} />
        case 'select-box':
            return <SelectBoxesField fieldData={fieldData} />
        case 'select':
            return <SelectField fieldData={fieldData} />
        case 'radio':
            return <RadioField fieldData={fieldData} />
        case 'email':
            return <EmailField fieldData={fieldData} />
        case 'phone-number':
            return <PhoneNumberField fieldData={fieldData} />
        case 'image':
            return <ImageField fieldData={fieldData} />
        case 'location':
            return <LocationField fieldData={fieldData} />
        case 'date':
            return <DateField fieldData={fieldData} />
        case 'area-mapping':
            return <AreaMappingField fieldData={fieldData} />
    }
}

export default FormField
