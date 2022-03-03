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

const emailField = (props) => {

    const { editStatus } = useContext(FormContext);
    
    const { fieldData } = props

    const [display, setDisplay] = useState('hidden')
    const [email, setEmail] = useState('')
    const [error, setError] = useState(false)

    const handlEmail = (e) => {
        const pattern = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        setEmail(e.target.value)
        setError(pattern.test(e.target.value))
    }

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
                error={!error&&email!==''}
                fullWidth
                type={'email'}
                variant={'outlined'}
                label={fieldData.label}
                value={email}
                onChange={handlEmail}
                helperText={!error&&email!==''?'Invalid Email Format':<DescriptionCard description={fieldData.description} helperText={true}/>}
                style={formStyles.textfield}
                InputProps={{
                    endAdornment: fieldData.tooltip != '' ?<GeneralTooltip tipData={fieldData.tooltip} />:false
                }}
            />
        </Grid>
    )
}

export default emailField
