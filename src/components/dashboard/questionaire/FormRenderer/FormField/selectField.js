import { useState, useContext } from 'react'
import formStyles from '../../styles/FormStyles'
import { smallBtns } from '../../styles/FormStyles'
import {
    Grid,
    Typography,
    TextField,
    MenuItem
} from "@mui/material"
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import EditIcon from '@mui/icons-material/Edit';

import { FormContext } from '../../context'
import { DescriptionCard } from '../../utils'
import GeneralTooltip from '../../previews/GeneralTooltip'

const selectField = (props) => {

    const { editStatus } = useContext(FormContext);

    const { fieldData } = props;

    const [display, setDisplay] = useState('hidden');

    const classes = formStyles();
    const smallBtn = smallBtns();

    return (
        <Grid key={fieldData.id} container onMouseOver={()=>{setDisplay('visible')}} onMouseOut={()=>{setDisplay('hidden')}} className={editStatus?classes.section:classes.section2}>
            {editStatus?
                <Typography style={{ width: '100%', paddingBottom: '2px', visibility: display }} align={'right'} >
                    <EditIcon className={smallBtn.editBtn} />
                    <HighlightOffIcon className={smallBtn.deleteBtn} />
                </Typography>
            : '' }
            <Typography style={{ fontSize: '18px', color: '#5048E5' }}>
                {fieldData.label}<GeneralTooltip tipData={fieldData.tooltip}/>
            </Typography>
            <TextField
                fullWidth
                select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={fieldData.values[0].label}
                helperText={<DescriptionCard description={fieldData.description} helperText={true}/>}
            >
                {fieldData.values.map(option => (
                    <MenuItem value={option.label}>{option.label}</MenuItem>
                ))}
            </TextField>
        </Grid>

    )
}

export default selectField
