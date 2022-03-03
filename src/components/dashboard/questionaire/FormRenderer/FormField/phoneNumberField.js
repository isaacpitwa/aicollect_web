import { useState, useContext } from 'react'
import formStyles from '../../styles/FormStyles'
import { smallBtns } from '../../styles/FormStyles'
import {
    Grid,
    TextField,
    Typography
} from "@mui/material"
import MuiPhoneNumber from 'material-ui-phone-number'
import 'react-phone-number-input/style.css'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import EditIcon from '@mui/icons-material/Edit';

import { FormContext } from '../../context'
import { DescriptionCard } from '../../utils'
import GeneralTooltip from '../../previews/GeneralTooltip'

const phoneNumberField = (props) => {

    const { editStatus } = useContext(FormContext);

    const { fieldData } = props;

    const [display, setDisplay] = useState('hidden');

    const classes = formStyles();
    const smallBtn = smallBtns();

    return (
        <Grid key={fieldData.id} container onMouseOver={()=>{setDisplay('visible')}} onMouseOut={()=>{setDisplay('hidden')}} className={editStatus?classes.section2:classes.section}>
            {!editStatus?
                <Typography style={{ width: '100%', paddingBottom: '2px', visibility: display }} align={'right'} >
                    <EditIcon className={smallBtn.editBtn} />
                    <HighlightOffIcon className={smallBtn.deleteBtn} />
                </Typography>
            : '' }
            <MuiPhoneNumber
                fullWidth
                margin="dense"
                variant='outlined'
                defaultCountry={'ug'}
                label={fieldData.label}
                style={formStyles.textfield}
                helperText={<DescriptionCard description={fieldData.description} helperText={true}/>}
                InputProps={{
                    endAdornment: fieldData.tooltip != '' ?<GeneralTooltip tipData={fieldData.tooltip} />:false
                }}
            />
        </Grid>
    )
}

export default phoneNumberField
