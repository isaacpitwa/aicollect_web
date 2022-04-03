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
import SelectRadioField from '../../dialogs/SelectRadioField'
import { DescriptionCard, FieldIndex } from '../../utils'
import GeneralTooltip from '../../previews/GeneralTooltip'

const RadioField = (props) => {

    const {
        setError,
        setSelectSection,
        fieldResponses,
        setFieldResponses,
        setSectionId,
        setSubSectionId,
        editStatus
    } = useContext(FormContext);

    const { fieldData } = props

    const [selectRadioDialog, setSelectRadioDialog] = useState(false)
    const [radioValue, setRadioValue] = useState(false)
    const [display, setDisplay] = useState('hidden');

    const handleSelectRadioField = () => {
        setSelectRadioDialog(true)
    }

    const handleRadio = (e) => {
        setRadioValue(e.target.value)
        let newFieldResponses = fieldResponses
        newFieldResponses[FieldIndex(fieldData.id, fieldResponses)] = { fieldId: fieldData.id, value: e.target.value.toLowerCase() }
        setFieldResponses(newFieldResponses)
        console.log('FIELD VALUES: ', newFieldResponses)
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

    const handleClose = () => {
        setSelectRadioDialog(false)
    }

    const classes = formStyles();
    const smallBtn = smallBtns();

    return (
        <Grid key={fieldData.id} container onMouseOver={() => { setDisplay('visible') }} onMouseOut={() => { setDisplay('hidden') }} className={editStatus ? classes.section : classes.section2}>
            {editStatus?
                <>
                    <SelectRadioField open={selectRadioDialog} fieldData={fieldData} handleClose={handleClose} />
                    <Typography style={{ width: '100%', paddingBottom: '2px', visibility: display }} align={'right'} >
                        <EditIcon
                            onClick={handleSelectRadioField}
                            className={smallBtn.editBtn}
                        />
                        <HighlightOffIcon className={smallBtn.deleteBtn} />
                    </Typography>
                </>
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
                    {fieldData.radios.map((radio, index) => (
                        <FormControlLabel key={index} value={radio.label.toLowerCase()} control={<Radio />} label={radio.label} />
                    ))}
                </RadioGroup>
            </FormControl>
        </Grid>

    )
}

export default RadioField
