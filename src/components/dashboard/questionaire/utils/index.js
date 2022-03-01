import FormStyles from '../styles/FormStyles'
import InfoIcon from '@mui/icons-material/Info'

export const DescriptionCard = (props) => {

    const Styles = FormStyles.sectionStyles

    const { description, helperText } = props

    return (
        description ?
            helperText ?
                <span><InfoIcon style={{ fontSize: '24px', marginBottom: '-7px' }} /> {description}</span>
                :
                <Typography style={{ marginLeft: '20px' }}>
                    <i><InfoIcon style={{ fontSize: '22px', marginBottom: '-7px', color: '#5F768A' }} /> {description}</i>
                </Typography>
            :
            ''

    )
}

export function allFormFields(data) {

    let allFields = [];

    data.forEach((item) => {
        if (item.type == 'section' || item.type == 'sub-section') {
            item.components.forEach((comp) => {
                allFields.push(comp);
            });
        } else {
            allFields.push(item);
        }
    });
    return allFields
}
