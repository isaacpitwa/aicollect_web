import { useState, useContext } from 'react'
import formStyles from '../../styles/FormStyles'
import { smallBtns } from '../../styles/FormStyles'
import {
    Grid,
    TextField,
    Typography,
    MenuItem
} from '@mui/material'
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import EditIcon from '@mui/icons-material/Edit';

import { FormContext } from '../../context'
import { DescriptionCard } from '../../utils'
import GeneralTooltip from '../../previews/GeneralTooltip'

const LocationField = (props) => {

    const { editStatus } = useContext(FormContext);

    const { fieldKey, fieldData } = props;

    const [display, setDisplay] = useState('hidden');

    const classes = formStyles();
    const smallBtn = smallBtns();

    return (
        <Grid key={fieldKey} container onMouseOver={()=>{setDisplay('visible')}} onMouseOut={()=>{setDisplay('hidden')}} className={editStatus?classes.section:classes.section2}>
            {editStatus?
                <Typography style={{ width: '100%', paddingBottom: '2px', visibility: display }} align={'right'} >
                    <EditIcon className={smallBtn.editBtn} />
                    <HighlightOffIcon className={smallBtn.deleteBtn} />
                </Typography>
            : '' }
            <TextField
                fullWidth
                select
                type={'text'}
                variant={'outlined'}
                label={fieldData.label}
                helperText={<DescriptionCard description={fieldData.description} helperText={true}/>}
                style={formStyles.textfield}
                InputProps={{
                    startAdornment: <AddLocationAltIcon style={{ color: '#5F768A', marginRight: '10px' }}/>,
                    endAdornment: fieldData.tooltip != '' ?<GeneralTooltip tipData={fieldData.tooltip} />:false,
                }}
            >
                <MenuItem disabled>Select Location</MenuItem>
                {fieldData.values.map((option, index) => (
                    <MenuItem key={index} value={option.label}>{option.label}</MenuItem>
                ))}
            </TextField>
        </Grid>
    )
}

export default LocationField
