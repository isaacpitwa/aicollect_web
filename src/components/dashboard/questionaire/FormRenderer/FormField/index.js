
import SectionField from './sectionField'
import SubSectionField from './sectionField'
import TextField from './textField'
import TextAreaField from './textAreaField'
import NumberField from './numberField'

const FormField = (props) => {
    const { fieldData } = props

    const Field = () => {
        switch (fieldData.type) {
            case 'sub-section':
                return <SubSectionField fieldData={fieldData}/>
                break;
            case 'text':
                return <TextField fieldData={fieldData}/>
                break;
            case 'text-area':
                return <TextAreaField fieldData={fieldData}/>
                break;
            case 'number':
                return <NumberField fieldData={fieldData}/>
                break;
            case 'select-box':
                return 'selectBox Component'
                break;
            case 'select':
                return 'selectOption Component'
                break;
            case 'radio':
                return 'selectRadio Component'
                break;
            case 'email':
                return 'emailAddress Component'
                break;
            case 'phone-number':
                return 'phoneNumber Component'
                break;
            default:
                return <SectionField fieldData={fieldData}/>
                break
        }
    }

    return (
        <Field/>
    )
}

export default FormField
