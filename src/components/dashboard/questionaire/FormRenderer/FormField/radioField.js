import { useContext, useState, useEffect } from 'react'
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
import { DescriptionCard } from '../../utils'
import GeneralTooltip from '../../previews/GeneralTooltip'

const RadioField = (props) => {

    const {
        setError,
        setSelectSection,
        fieldResponses,
        setFieldResponses,
        setSectionId,
        setSubSectionId,
        editStatus,
        setConditionalId,
        setConditionalValue,
        formFieldValues,
        setFormFieldValues,
        deleteFieldData,
    } = useContext(FormContext);

    const { fieldData } = props

    const [display, setDisplay] = useState('hidden');
    const [radioValue, setRadioValue] = useState(fieldData.value)
    const [selectRadioDialog, setSelectRadioDialog] = useState(false)

    const handleSelectRadioField = () => {
        setSelectRadioDialog(true)
    }

    const handleRadio = (e) => {
        setConditionalId(fieldData.id);
        setConditionalValue(e.target.value.toLowerCase());
        setRadioValue(e.target.value);
    }

    const addFieldValue = () => {
    }

    const deleteField = () => {
        deleteFieldData(fieldData)
    }

    const handleClose = () => {
        setSelectRadioDialog(false)
    }

    const classes = formStyles();
    const smallBtn = smallBtns();

    return (
        <Grid 
            container
            onMouseOver={() => { setDisplay('visible') }}
            onMouseOut={() => { setDisplay('hidden') }}
            className={editStatus ? classes.section : classes.section2}
        >
            {editStatus?
                <>
                    <SelectRadioField open={selectRadioDialog} fieldData={fieldData} handleClose={handleClose} />
                    <Typography
						style={{ width: '100%', paddingTop: '5px', visibility: display }}
						align={'right'}
                    >
                        <EditIcon
                            onClick={handleSelectRadioField}
                            className={smallBtn.editBtn}
                        />
                        <HighlightOffIcon
                            onClick={deleteField}
                            className={smallBtn.deleteBtn}
                        />
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
                        <FormControlLabel
                            key={index}
                            value={radio.label}
                            label={radio.label}
                            control={<Radio size={"small"}/>}
                        />
                    ))}
                </RadioGroup>
            </FormControl>
        </Grid>

    )
}

export default RadioField
