import { useContext } from 'react'
import formStyles from '../../styles/FormStyles'
import { smallBtns } from '../../styles/FormStyles'
import {
    Grid,
    Typography
} from "@mui/material"
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import EditIcon from '@mui/icons-material/Edit';

import { FormContext } from '../../context'
import { DescriptionCard } from '../../utils'
import GeneralTooltip from '../../previews/GeneralTooltip'
import FormField from '../FormField'

const SubSectionField = (props) => {

    const { editStatus } = useContext(FormContext);

    const { fieldData } = props

    const [display, setDisplay] = useState('hidden');

    const classes = formStyles();
    const smallBtn = smallBtns();

    return (
        <Grid key={fieldData.id} container className={classes.subSection}>
            <Typography
                onMouseOver={() => { setDisplay('visible') }}
                onMouseOut={() => { setDisplay('hidden') }}
                className={classes.sectionLabel}
                variant='h5'
            >
                {fieldData.label}{fieldData.tooltip != '' ? <GeneralTooltip tipData={fieldData.tooltip} /> : false}
                <small style={{ float: 'right', visibility: display }}>
                    <EditIcon className={smallBtn.editBtn} />
                    <HighlightOffIcon className={smallBtn.deleteBtn} />
                </small>
            </Typography>
            <DescriptionCard description={fieldData.description} helperText={true}/>
            {fieldData.components.map(componentData => (
                <FormField fieldData={componentData} />
            ))}
        </Grid>
    )
}

export default SubSectionField
