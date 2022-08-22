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
import DataGridField from './dataGridField'

const FormField = (props) => {

    const { fieldData, forGrid } = props

    switch (fieldData.type) {
        case 'sub-section':
            return <SubSectionField fieldData={fieldData} />
        case 'data-grid':
            return <DataGridField fieldData={fieldData} />
        case 'text':
            return <TextField fieldData={fieldData} forGrid={forGrid} />
        case 'text-area':
            return <TextAreaField fieldData={fieldData} forGrid={forGrid} />
        case 'number':
            return <NumberField fieldData={fieldData} forGrid={forGrid} />
        case 'select-box':
            return <SelectBoxesField fieldData={fieldData} forGrid={forGrid} />
        case 'select':
            return <SelectField fieldData={fieldData} forGrid={forGrid} />
        case 'radio':
            return <RadioField fieldData={fieldData} forGrid={forGrid} />
        case 'email':
            return <EmailField fieldData={fieldData} forGrid={forGrid} />
        case 'phone-number':
            return <PhoneNumberField fieldData={fieldData} forGrid={forGrid} />
        case 'image':
            return <ImageField fieldData={fieldData} forGrid={forGrid} />
        case 'location':
            return <LocationField fieldData={fieldData} forGrid={forGrid} />
        case 'date':
            return <DateField fieldData={fieldData} forGrid={forGrid} />
        case 'area-mapping':
            return <AreaMappingField fieldData={fieldData} forGrid={forGrid} />
    }
}

export default FormField
