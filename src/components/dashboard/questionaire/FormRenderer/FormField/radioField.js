import { useState, useContext } from 'react'
import formStyles from '../../styles/FormStyles'
import {
    Grid,
    Typography,
    FormControl,
    RadioGroup,
    FormControlLabel,
    Radio
} from '@mui/material'

import { FormContext } from '../../context'
import { DescriptionCard } from '../../utils'
import GeneralTooltip from '../../previews/GeneralTooltip'

const radioField = (props) => {

    const { editStatus } = useContext(FormContext);

    const { fieldData } = props

    const [radioValue, setRadioValue] = useState(fieldData.fieldData)
    
    const handleRadio = (e) => {
        setRadioValue(e.target.value)
    }

    const RadioOption = (valueSelected) => {

        return (
            <Radio
                checked={radioValue === `${valueSelected}`}
                onChange={handleRadio}
                value={valueSelected}
                name="radio-buttons"
                inputProps={{ 'aria-label': `${valueSelected}` }}
            />
        )
    }

    const classes = formStyles();

    return (
        <Grid key={fieldData.id} container className={editStatus?classes.section2:classes.section}>
            <Typography style={{ width: '100%', fontSize: '18px', color: '#5048E5' }}>
                {fieldData.label}<GeneralTooltip tipData={fieldData.tooltip} />
            </Typography>
            <DescriptionCard description={fieldData.description} helperText={true}/>
            <FormControl style={{ width: '100%' }}>
                <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={radioValue}
                    onChange={handleRadio}
                >
                    {fieldData.values.map(option => (
                        <FormControlLabel value={option.id} control={<Radio />} label={option.label} />
                    ))}
                </RadioGroup>
            </FormControl>
        </Grid>

    )
}

export default radioField
