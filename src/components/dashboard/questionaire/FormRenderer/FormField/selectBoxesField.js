import { useState, useContext } from 'react'
import formStyles from '../../styles/FormStyles'
import { smallBtns } from '../../styles/FormStyles'
import {
    Grid,
    Typography,
    Checkbox
} from "@mui/material"
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import EditIcon from '@mui/icons-material/Edit';

import { FormContext } from '../../context'
import { DescriptionCard } from '../../utils'
import GeneralTooltip from '../../previews/GeneralTooltip'

const selectBoxesField = (props) => {

    const { editStatus } = useContext(FormContext);

    const { fieldData } = props

    const [checkOptions, setCheckOptions] = useState(fieldData.values)
    const [display, setDisplay] = useState('hidden');

    const classes = formStyles();
    const smallBtn = smallBtns();

    return (
        <Grid key={fieldData.id} item sm={12} onMouseOver={()=>{setDisplay('visible')}} onMouseOut={()=>{setDisplay('hidden')}} className={editStatus?classes.section:classes.section2}>
            {editStatus?
                <Typography style={{ width: '100%', paddingBottom: '2px', visibility: display }} align={'right'} >
                    <EditIcon className={smallBtn.editBtn} />
                    <HighlightOffIcon className={smallBtn.deleteBtn} />
                </Typography>
            : '' }
            <Typography style={{ fontSize: '18px', color: '#5048E5' }}>
                {fieldData.label}<GeneralTooltip tipData={fieldData.tooltip} />
            </Typography>
            <DescriptionCard description={fieldData.description} helperText={true}/>
            {checkOptions.map(option => (
                <Typography key={option.id}>
                    <Checkbox
                        name={option.label}
                        checked={option.checked}
                        // Switching state of a perticular check box
                        onChange={(e) => {
                            option.checked = !option.checked;
                            setCheckOptions([...checkOptions]);
                        }}/>
                        {option.label}
                </Typography>
            ))}
        </Grid>

    )
}

export default selectBoxesField
