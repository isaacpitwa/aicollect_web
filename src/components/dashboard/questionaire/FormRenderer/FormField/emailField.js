import { useState, useContext } from 'react'
import formStyles from '../../styles/FormStyles'
import {smallBtns} from '../../styles/FormStyles'
import {
    Grid,
    TextField,
    Button,
    Typography
} from "@mui/material"

import { FormContext } from '../../context'
import { DescriptionCard } from '../../utils'
import GeneralTooltip from '../../previews/GeneralTooltip'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import EditIcon from '@mui/icons-material/Edit';

const emailField = (props) => {

    const { editStatus } = useContext(FormContext);
    const [display, setDisplay] = useState('hidden')
    
    const { fieldData } = props

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
        <Grid key={fieldData.id} container onMouseOver={()=>{setDisplay('visible')}} onMouseOut={()=>{setDisplay('hidden')}} className={editStatus?classes.section2:classes.section}>
            <Typography style={{ width: '100%', paddingBottom: '5px', visibility: display }} align={'right'} >
                    <EditIcon className={smallBtn.btn} />
                    <HighlightOffIcon className={smallBtn.btn} />
            </Typography>
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
