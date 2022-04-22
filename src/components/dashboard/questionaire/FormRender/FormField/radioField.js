import { useContext, useState } from 'react';
import formStyles from '../../styles/FormStyles';
import { smallBtns } from '../../styles/FormStyles';
import {
    Grid,
    Typography,
    FormControl,
    RadioGroup,
    FormControlLabel,
    Radio
} from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import EditIcon from '@mui/icons-material/Edit';

import { FormContext } from '../../context';
import SelectRadioField from '../../dialogs/SelectRadioField';
import { DescriptionCard } from '../../utils';
import GeneralTooltip from '../../previews/GeneralTooltip';

/**
 * @function RadioField
 * @desc This is the Radio Field component, it is the Radio field displayed in the form.
 * @arg {Object} fieldData - The data of the field which contains all the properties of the Radio field.
 * @returns {Component} - Returns a Radio field JSX component.
 * @author Atama Zack <atama.zack@gmail.com>
 * @version 1.0.0
 */
const RadioField = (props) => {

    const {
        setError,
        editStatus,
        setSelectSection,
        setSectionId,
        setSubSectionId,
        conditionalDisplay,
        setConditionalId,
        setConditionalValue,
        deleteFieldData,
    } = useContext(FormContext);

    const { fieldData } = props

    const [display, setDisplay] = useState('hidden');
    const [radioValue, setRadioValue] = useState(fieldData.value)
    const [selectRadioDialog, setSelectRadioDialog] = useState(false)

    const handleSelectRadioField = () => {
        setError(false)
        setSelectSection(true)
        setSectionId(fieldData.parentId)
        setSubSectionId(fieldData.subParentId)
        setSelectRadioDialog(true)
    }

    const handleRadio = (e) => {
        setConditionalId(fieldData.id);
        setConditionalValue(e.target.value.toLowerCase());
        setRadioValue(e.target.value);
    }

    const deleteField = () => {
        deleteFieldData(fieldData)
    }

    const handleClose = () => {
        setSelectRadioDialog(false)
    }

    const classes = formStyles();
    const smallBtn = smallBtns();

    const fieldStyle = () => {
        return editStatus?classes.section:classes.section2
    };

    const fieldDisplay = (key) => {

        return (
            <Grid
                key={key}
                container
                onMouseOver={() => { setDisplay('visible') }}
                onMouseOut={() => { setDisplay('hidden') }}
                className={fieldStyle()}
            >
                {editStatus?
                    <Typography
                        className={smallBtn.fieldBtns}
                        style={{ visibility: display }}
                        align={'right'}
                    >
                        <SelectRadioField
                            open={selectRadioDialog}
                            fieldData={fieldData}
                            handleClose={handleClose}
                        />
                        <EditIcon
                            onClick={handleSelectRadioField}
                            className={smallBtn.editBtn}
                        />
                        <HighlightOffIcon
                            onClick={deleteField}
                            className={smallBtn.deleteBtn}
                        />
                    </Typography>
                : '' }
                <Typography style={{ width: '100%', fontSize: '18px', color: '#5048E5' }}>
                    {fieldData.label}<GeneralTooltip tipData={fieldData.tooltip} />
                </Typography>
                <DescriptionCard description={fieldData.description} helperText={false}/>
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

    return (
        !fieldData.display||fieldData.display==='visible'?
            fieldDisplay(fieldData.id)
        : fieldData.display==='hidden'&&editStatus?
            fieldDisplay(fieldData.id)
        : conditionalDisplay(fieldData)?
            fieldDisplay(fieldData.id)
        : ""
    )
}

export default RadioField
