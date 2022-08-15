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
import {
    FieldTooltip,
    DescriptionCard,
} from '../../utils';
import MultipleValuesField from './MultipleValuesField';

/**
 * @function TextFieldComp
 * @desc This is the Text Field component, it is the Text field displayed in the form.
 * @arg {Object} fieldData - The data of the field which contains all the properties of the Text field.
 * @returns {Component} - Returns a Text field JSX component.
 * @author Atama Zack <atama.zack@gmail.com>
 * @version 1.0.0
 */
const TextFieldComp = (props) => {

    const {
        setError,
        editStatus,
        setSelectSection,
        setSectionId,
        setSubSectionId,
        conditionalDisplay,
        deleteFieldData,
    } = useContext(FormContext);

    const { fieldData, forGrid } = props;

    const [display, setDisplay] = useState('hidden');
    const [fieldValue, setFieldValue] = useState('');
    const [textFieldDialog, setTextFieldDialog] = useState(false);
    const [multipleValues, setMultipleValues] = useState(fieldData && fieldData.multipleValues ? fieldData.multipleValues : false)
    const [multipleValuesData, setMultipleValuesData] = useState(fieldData && fieldData.multipleValuesData ? fieldData.multipleValuesData : [])

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
        return editStatus ? classes.section : classes.section2
    };

    const fieldDisplay = () => {
        return forGrid ?
            <TextField
                required={fieldData.required}
                fullWidth
                variant="outlined"
                type={'text'}
                size={'small'}
                value={fieldValue}
                onChange={handleFieldValue}
                helperText={<DescriptionCard description={fieldData.description} helperText={true} />}
                InputProps={{
                    endAdornment: <FieldTooltip tooltip={fieldData.tooltip} />
                }}
            /> : (

                <Grid
                    container
                    onMouseOver={() => { setDisplay('visible') }}
                    onMouseOut={() => { setDisplay('hidden') }}
                    className={fieldStyle()}
                    style={{ display: 'block' }}
                >
                    {editStatus ?
                        <Typography
                            className={smallBtn.fieldBtns}
                            style={{ visibility: display }}
                            align={'right'}
                        >
                            <TextField_
                                open={textFieldDialog}
                                fieldData={fieldData}
                                handleClose={handleClose}
                            />
                            <EditIcon
                                onClick={handleTextField}
                                className={smallBtn.editBtn}
                            />
                            <HighlightOffIcon
                                onClick={deleteField}
                                className={smallBtn.deleteBtn}
                            />
                        </Typography>
                        : ""}

                    {
                        multipleValues ?
                            <MultipleValuesField  {...props} component={
                                <TextField
                                    required={fieldData.required}
                                    fullWidth
                                    variant="outlined"
                                    type={'text'}
                                    label={!forGrid ? fieldData.label : ''}
                                    value={fieldValue}
                                    onChange={handleFieldValue}
                                    helperText={<DescriptionCard description={fieldData.description} helperText={true} />}
                                    InputProps={{
                                        endAdornment: <FieldTooltip tooltip={fieldData.tooltip} />
                                    }}
                                />
                            }
                                onChange={setMultipleValuesData}
                                multipleValuesData={multipleValuesData}
                                multipleValues={multipleValues}
                            />
                            : <TextField
                                required={fieldData.required}
                                fullWidth
                                variant="outlined"
                                type={'text'}
                                label={!forGrid ? fieldData.label : ''}
                                value={fieldValue}
                                size={'small'}
                                onChange={handleFieldValue}
                                helperText={<DescriptionCard description={fieldData.description} helperText={true} />}
                                InputProps={{
                                    endAdornment: <FieldTooltip tooltip={fieldData.tooltip} />
                                }}
                            />

                    }

                </Grid>
            )
    }

    return (
        fieldData.display === 'visible' || conditionalDisplay(fieldData) ?
            fieldDisplay()
            : fieldData.display === 'hidden' && editStatus ?
                fieldDisplay()
                : ""
    )
}

export default TextFieldComp
