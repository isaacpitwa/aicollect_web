import { useState, useContext } from 'react'
import formStyles from '../../styles/FormStyles'
import {
    Grid,
    Typography,
    Checkbox
} from '@mui/material'

import { FormContext } from '../../context'
import { DescriptionCard } from '../../utils'
import GeneralTooltip from '../../previews/GeneralTooltip'

const selectBoxesField = (props) => {

    const { editStatus } = useContext(FormContext);

    const { fieldData } = props

    const [checkOptions, setCheckOptions] = useState(fieldData.values)

    const classes = formStyles();

    return (
        <Grid key={fieldData.id} item className={editStatus?classes.section2:classes.section}>
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
