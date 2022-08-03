import { useState, useContext, useEffect } from 'react'
import formStyles from '../../styles/FormStyles'
import { smallBtns } from '../../styles/FormStyles'
import {
    Grid,
    TextField,
    Typography
} from "@mui/material"
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import EditIcon from '@mui/icons-material/Edit';

import { FormContext } from '../../context';
import TextField_ from '../../dialogs/TextField';
import { DescriptionCard } from '../../utils';
import GeneralTooltip from '../../previews/GeneralTooltip';

/**
 * @function TextFieldComp
 * @desc This is the Text Field component, it is the Text field displayed in the form.
 * @arg {Object} fieldData - The data of the field which contains all the properties of the Text field.
 * @returns {Component} - Returns a Text field JSX component.
 * @author Atama Zack <atama.zack@gmail.com>
 * @version 1.0.0
 */
const FieldLayout = (props) => {

    const {
        setError,
        editStatus,
        setSelectSection,
        setSectionId,
        setSubSectionId,
        conditionalDisplay,
        deleteFieldData,
    } = useContext(FormContext);

    const { fieldData } = props;

    const [display, setDisplay] = useState('hidden');
    const [fieldValue, setFieldValue] = useState('');
    const [textFieldDialog, setTextFieldDialog] = useState(false);

    const handleTextField = () => {
        setError(false)
        setSelectSection(true)
        setSectionId(fieldData.parentId)
        setSubSectionId(fieldData.subParentId)
        setTextFieldDialog(true)
    };

    const handleFieldValue = (e) => {
        setFieldValue(e.target.value)
    };

    const deleteField = () => {
        deleteFieldData(fieldData)
    };

    const handleClose = () => {
        setTextFieldDialog(false)
    };

    const classes = formStyles();
    const smallBtn = smallBtns();

    const fieldStyle = () => {
        return editStatus?classes.section:classes.section2
    };

    const fieldDisplay = () => {
        return (
            <Grid
                container
                className={fieldStyle()}
                style={{ display: 'block' }}
            >
                <TextField
                    required={fieldData.required}
                    fullWidth
                    type={'text'}
                    variant={'outlined'}
                    label={fieldData.label}
                    value={fieldValue}
                    onChange={handleFieldValue}
                    helperText={<DescriptionCard description={fieldData.description} helperText={true} />}
                    InputProps={{
                        endAdornment: fieldData.tooltip != '' ? <GeneralTooltip tipData={fieldData.tooltip} /> : false
                    }}
                />
            </Grid>
        )
    }

    return (
        !fieldData.display||fieldData.display==='visible'?
            fieldDisplay()
        : fieldData.display==='hidden'&&editStatus?
            fieldDisplay()
        : conditionalDisplay(fieldData)?
            fieldDisplay()
        : ""
    )
}

export default FieldLayout
