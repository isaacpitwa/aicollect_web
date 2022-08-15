import { useState, useContext } from 'react';
import formStyles from '../../styles/FormStyles';
import { smallBtns } from '../../styles/FormStyles';
import {
    Grid,
    TextField,
    Typography,
    Box,
} from "@mui/material";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import EditIcon from '@mui/icons-material/Edit';

import { FormContext } from '../../context';
import EmailField from '../../dialogs/EmailField';
import { DescriptionCard } from '../../utils';
import GeneralTooltip from '../../previews/GeneralTooltip';
import MultipleValuesField from './MultipleValuesField';
import styles from '../../styles/gridfield.module.css';

/**
 * @function EmailFieldComp
 * @desc This is the Email Field component, it is the Email field displayed in the form.
 * @arg {Object} fieldData - The data of the field which contains all the properties of the Email field.
 * @returns {Component} - Returns a Email field JSX component.
 * @author Atama Zack <atama.zack@gmail.com>
 * @version 1.0.0
 */
const EmailFieldComp = (props) => {

    const { setFieldResponses, editStatus, deleteFieldData } = useContext(FormContext);

    const { fieldData, fieldResponses,forGrid } = props;

    const [error, setError] = useState(false);
    const [display, setDisplay] = useState('hidden');
    const [fieldValue, setFieldValue] = useState(fieldData ? fieldData.value : '');
    const [emailFieldDialog, setEmailFieldDialog] = useState(false)
    const [dependantField] = useState(fieldData.conditional ? fieldResponses.find(item => item.fieldId === fieldData.conditional.when) : false)
    const [multipleValues, setMultipleValues] = useState(fieldData && fieldData.multipleValues ? fieldData.multipleValues : false)
    const [multipleValuesData, setMultipleValuesData] = useState(fieldData && fieldData.multipleValuesData ? fieldData.multipleValuesData : [])

    const handlEmail = (e) => {
        const pattern = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        setFieldValue(e.target.value)
        setError(pattern.test(e.target.value))
    }

    const openDialog = () => {
        setError(false)
        setSelectSection(true)
        setSectionId(fieldData.parentId)
        setSubSectionId(fieldData.subParentId)
        setEmailFieldDialog(true)
    }

    const deleteField = () => {
        deleteFieldData(fieldData)
    }

    const handleClose = () => {
        setEmailFieldDialog(false)
    }

    const classes = formStyles();
    const smallBtn = smallBtns();

    return (
        dependantField && dependantField.value === fieldData.conditional.value ?
            <Grid
                style={{ display: 'block' }}
                container
                className={classes.section}
            >
                <TextField
                    error={!error && fieldValue !== ''}
                    fullWidth
                    type={'email'}
                    variant={'outlined'}
                    label={fieldData.label}
                    value={fieldValue}
                    onChange={handlEmail}
                    helperText={!error && fieldValue !== '' ? 'Invalid Email Format' : <DescriptionCard description={fieldData.description} helperText={true} />}
                    style={formStyles.textfield}
                    InputProps={{
                        endAdornment: fieldData.tooltip != '' ? <GeneralTooltip tipData={fieldData.tooltip} /> : false
                    }}
                />
            </Grid>
            :

            forGrid ?
               (
                <Box sx={{
                    padding: ' 4px 0.5rem',
                    border:'1px solid #ced4da'
                }}>
                     <TextField
                        required={fieldData.required}
                        fullWidth
                        type={'email'}
                        variant={'outlined'}
                        label={ !forGrid ? fieldData.label:''}
                        size={'small'}
                        // value={fieldValue}
                        onChange={handlEmail}
                        error={!error && fieldValue !== ''}
                        helperText={!error && fieldValue !== '' ? 'Invalid Email Format' : <DescriptionCard description={fieldData.description} helperText={true} />}
                        style={formStyles.textfield}
                        InputProps={{
                            endAdornment: fieldData.tooltip != '' ? <GeneralTooltip tipData={fieldData.tooltip} /> : false,
                            style: {
                                border:'1px solid #ced4da',
                                borderRadius: '4px'
                            }
                        }}
            />
                </Box>
               )
            :
            <Grid
                style={{ display: 'block' }}
                container
                onMouseOver={() => { setDisplay('visible') }}
                onMouseOut={() => { setDisplay('hidden') }}
                className={editStatus ? classes.section : classes.section2}
            >
                <EmailField
                    open={emailFieldDialog}
                    fieldData={fieldData}
                    handleClose={handleClose}
                />
                {editStatus ?
                    <Typography
                        className={smallBtn.fieldBtns}
                        style={{ visibility: display }}
                        align={'right'}
                    >
                        <EditIcon
                            onClick={openDialog}
                            className={smallBtn.editBtn}
                        />
                        <HighlightOffIcon
                            onClick={deleteField}
                            className={smallBtn.deleteBtn}
                        />
                    </Typography>
                    : ''}

                {
                    multipleValues ?
                        <MultipleValuesField  {...props} component={
                            <TextField
                                required={fieldData.required}
                                fullWidth
                                type={'email'}
                                variant={'outlined'}
                                label={ !forGrid ? fieldData.label:''}
                                // value={fieldValue}
                                onChange={handlEmail}
                                error={!error && fieldValue !== ''}
                                helperText={!error && fieldValue !== '' ? 'Invalid Email Format' : <DescriptionCard description={fieldData.description} helperText={true} />}
                                style={formStyles.textfield}
                                InputProps={{
                                    endAdornment: fieldData.tooltip != '' ? <GeneralTooltip tipData={fieldData.tooltip} /> : false
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
                            type={'email'}
                            variant={'outlined'}
                            label={ !forGrid ? fieldData.label:''}
                            value={fieldValue}
                            onChange={handlEmail}
                            error={!error && fieldValue !== ''}
                            helperText={!error && fieldValue !== '' ? 'Invalid Email Format' : <DescriptionCard description={fieldData.description} helperText={true} />}
                            style={formStyles.textfield}
                            InputProps={{
                                endAdornment: fieldData.tooltip != '' ? <GeneralTooltip tipData={fieldData.tooltip} /> : false
                            }}
                        />

                }

            </Grid>
    )
}

export default EmailFieldComp
