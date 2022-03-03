import { useState, useContext } from 'react'
import formStyles from '../../styles/FormStyles'
import { smallBtns } from '../../styles/FormStyles'
import {
    Grid,
    TextField,
    Typography
} from "@mui/material"
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import EditIcon from '@mui/icons-material/Edit';

import { FormContext } from '../../context'
import { DescriptionCard } from '../../utils'
import GeneralTooltip from '../../previews/GeneralTooltip'

const numberField = (props) => {

    const { editStatus } = useContext(FormContext);

    const { fieldData } = props

    const [display, setDisplay] = useState('hidden');

    const classes = formStyles();
    const smallBtn = smallBtns();

    return (
        <Grid key={fieldData.id} container onMouseOver={() => { setDisplay('visible') }} onMouseOut={() => { setDisplay('hidden') }} className={!editStatus ? classes.section : classes.section2}>
            {!editStatus?
                <Typography style={{ width: '100%', paddingBottom: '2px', visibility: display }} align={'right'} >
                    <EditIcon className={smallBtn.editBtn} />
                    <HighlightOffIcon className={smallBtn.deleteBtn} />
                </Typography>
            : '' }
            <TextField
                fullWidth
                type={'number'}
                variant={'outlined'}
                label={fieldData.label}
                helperText={<DescriptionCard description={fieldData.description} helperText={true}/>}
                style={formStyles.textfield}
                InputProps={{
                    endAdornment: <GeneralTooltip tipData={fieldData.tooltip} />
                }}
            />
        </Grid>
    )
}

export default numberField
