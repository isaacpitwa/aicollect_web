import { useState, useContext } from 'react';
import formStyles from '../../styles/FormStyles';
import { smallBtns } from '../../styles/FormStyles';
import {
    Grid,
    TextField,
    Typography
} from "@mui/material";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import EditIcon from '@mui/icons-material/Edit';

import { FormContext } from '../../context';
import NumberField from '../../dialogs/NumberField';
import {
    FieldTooltip,
    DescriptionCard,
} from '../../utils';
import { format } from 'date-fns';

/**
 * @function NumberFieldComp
 * @desc This is the Number Field component, it is the Number field displayed in the form.
 * @arg {Object} fieldData - The data of the field which contains all the properties of the Number field.
 * @returns {Component} - Returns a Number field JSX component.
 * @author Atama Zack <atama.zack@gmail.com>  IsaacPitwa <isaacpitwa256@gmail.com> 
 * @version 1.0.0
 */
const NumberFieldComp = (props) => {

    const {
        setError,
        setSelectSection,
        setSectionId,
        setSubSectionId,
        conditionalDisplay,
        editStatus,
        setDependantId,
        setDependecyValue,
        deleteFieldData
    } = useContext(FormContext);

    const { fieldData } = props;

    const [display, setDisplay] = useState('hidden');
    const [fieldValue, setFieldValue] = useState('');
    const [numberFieldDialog, setNumberFieldDialog] = useState(false)

    const handleNumberField = () => {
        setError(false)
        setSelectSection(true)
        setSectionId(fieldData.parentId)
        setSubSectionId(fieldData.subParentId)
        setNumberFieldDialog(true)
    }

    const handleFieldValue = (e) => {
        setFieldValue(formatValue(e.target.value))
        if(fieldData.dependency) {
            setDependantId(fieldData.id)
            setDependecyValue(e.target.value)
        }
    }

    const deleteField = () => {
        deleteFieldData(fieldData)
    }

    const handleClose = () => {
        setNumberFieldDialog(false)
    }

    const classes = formStyles();
    const smallBtn = smallBtns();

    const fieldStyle = () => {
        return editStatus?classes.section:classes.section2
    };
    
    const formatValue = (value) => {
        if(fieldData.displayConfigs && fieldData.displayConfigs.inputMask) {
            return value.toString().replace(/\B(?=(\d{18})+(?!\d))/g, " ");
        }
        return value.toString().replace(/\B(?=(\d{18})+(?!\d))/g, ",")
    }

    const fieldDisplay = () => {

        return (
            <Grid
                container
                onMouseOver={() => { setDisplay('visible') }}
                onMouseOut={() => { setDisplay('hidden') }}
                className={fieldStyle()}
                style={{ display: 'block' }}
            >
                {editStatus?
                    <NumberField
                        open={numberFieldDialog}
                        fieldData={fieldData}
                        handleClose={handleClose}
                    />
                : "" }
                {editStatus?
                    <Typography
                        className={smallBtn.fieldBtns}
                        style={{ visibility: display }}
                        align={'right'}
                    >
                        <EditIcon
                            onClick={handleNumberField}
                            className={smallBtn.editBtn}
                        />
                        <HighlightOffIcon
                            onClick={deleteField}
                            className={smallBtn.deleteBtn}
                        />
                    </Typography>
                    : ""}
                    <TextField
                        required={fieldData.required}
                        fullWidth
                        variant="outlined"
                        type={'number'}
                        label={fieldData.label}
                        value={fieldValue}
                        onChange={handleFieldValue}
                        helperText={<DescriptionCard description={fieldData.description} helperText={true}/>}
                        style={formStyles.textfield}
                        InputProps={{
                            endAdornment: <FieldTooltip tipData={fieldData.tooltip}/>
                        }}
                    />
            </Grid>
        )
    }

    return (
        !fieldData.display||fieldData.display==='visible'||conditionalDisplay(fieldData)?
            fieldDisplay()
        : fieldData.display==='hidden'&&editStatus?
            fieldDisplay()
        : ""
    )
}

export default NumberFieldComp
