import { useState, useContext } from 'react'
import formStyles from '../../styles/FormStyles'
import { smallBtns } from '../../styles/FormStyles'
import {
    Grid,
    Typography,
    FormControl,
    RadioGroup,
    FormControlLabel,
    Radio
} from '@mui/material'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import EditIcon from '@mui/icons-material/Edit';

import { FormContext } from '../../context'
import { DescriptionCard, FieldIndex } from '../../utils'
import GeneralTooltip from '../../previews/GeneralTooltip'

const radioField = (props) => {

    const { fieldResponses, setFieldResponses, editStatus } = useContext(FormContext);

    const { fieldData } = props

    const [fieldId, setFieldId] = useState(fieldData.id)
    const [radioValue, setRadioValue] = useState(false)
    const [display, setDisplay] = useState('hidden');

    const handleRadio = (e) => {
        setRadioValue(e.target.value)
        let newFieldResponses = fieldResponses
        newFieldResponses[FieldIndex(fieldData.id, fieldResponses)] = { fieldId: fieldData.id, value: e.target.value.toLowerCase() }
        setFieldResponses(newFieldResponses)
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
    const smallBtn = smallBtns();

    return (
        <Grid key={fieldData.id} container onMouseOver={() => { setDisplay('visible') }} onMouseOut={() => { setDisplay('hidden') }} className={!editStatus ? classes.section : classes.section2}>
            {!editStatus?
                <Typography style={{ width: '100%', paddingBottom: '2px', visibility: display }} align={'right'} >
                    <EditIcon className={smallBtn.editBtn} />
                    <HighlightOffIcon className={smallBtn.deleteBtn} />
                </Typography>
            : '' }
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
                        <FormControlLabel value={option.label.toLowerCase()} control={<Radio />} label={option.label} />
                    ))}
                </RadioGroup>
            </FormControl>
        </Grid>

    )
}

export default radioField
