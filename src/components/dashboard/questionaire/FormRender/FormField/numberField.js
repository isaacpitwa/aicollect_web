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
import NumberField from '../../dialogs/NumberField';
import {
    FieldTooltip,
    DescriptionCard,
} from '../../utils';
import { format } from 'date-fns';
import NumberFormat from 'react-number-format';
import MultipleValuesField from './MultipleValuesField';

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
        deleteFieldData,
    } = useContext(FormContext);

    const { fieldData,forGrid } = props;

    const [display, setDisplay] = useState('hidden');
    const [fieldValue, setFieldValue] = useState('');
    const [numberFieldDialog, setNumberFieldDialog] = useState(false)
    const [multipleValues, setMultipleValues] = useState(fieldData && fieldData.multipleValues ? fieldData.multipleValues : false)
    const [multipleValuesData, setMultipleValuesData] = useState(fieldData && fieldData.multipleValuesData ? fieldData.multipleValuesData : [])


    const handleNumberField = () => {
        setError(false)
        setSelectSection(true)
        setSectionId(fieldData.parentId)
        setSubSectionId(fieldData.subParentId)
        setNumberFieldDialog(true)
    }

    const handleFieldValue = (e) => {
        setFieldValue(e.target.value)
        if (fieldData.dependency) {
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
        return editStatus ? classes.section : classes.section2
    };

    const placeholder = () => {
        if (fieldData.displayConfigs && fieldData.displayConfigs.inputMask) {
            var result = fieldData.displayConfigs.inputMask.split('').map(function (item, index) {
                if (item === '#') {
                    return '-'
                } else {
                    return item
                }
            }).join('');
            return result
        }
        return forGrid ? '': fieldData.label;
    }

    const withValueLimit = ({ floatValue }) => (fieldData.validations ?
        (fieldData.validations.max ? floatValue <= fieldData.validations.max : true
            && fieldData.validations.min ? floatValue >= fieldData.validations.min : true)
        : true);
        
    const withValueCap = (inputObj) => {
        const { value } = inputObj;
        if (fieldData.validations && fieldData.validations.max) {
            return value <= fieldData.validations.max;
        }
        return false;
    };

    const fieldDisplay = () => {
        return forGrid? 
        (
        <Box sx={{
            padding: '5px 0.5rem',
            border:'1px solid #ced4da'
        }}
        onMouseOver={() => { setDisplay('visible') }}
        onMouseOut={() => { setDisplay('hidden') }}> 
            {
                editStatus ? <Typography
                className={smallBtn.fieldBtns}
                style={{ visibility: display , margin:'0',paddingTop:'0',fontSize:'unset' }}
                align={'right'}
            >
                 <NumberField
                        open={numberFieldDialog}
                        fieldData={fieldData}
                        handleClose={handleClose}
                    />
                <EditIcon
                    onClick={handleNumberField}
                    className={smallBtn.editBtn}
                    style={{width:'14px', height:'14px',margin:'0',marginRight:'5px'}}
                />
                <HighlightOffIcon
                    onClick={deleteField}
                    className={smallBtn.deleteBtn}
                    style={{width:'14px', height:'14px',margin:'0'}}
                />
            </Typography>: null
            }
        
        <NumberFormat
            format={(fieldData.displayConfigs && fieldData.displayConfigs.inputMask) ? fieldData.displayConfigs.inputMask : null}
            mask="_"
            required={fieldData.required}
            value={fieldValue}
            onChange={handleFieldValue}
            style={{
                width: '100%',
                border:'1px solid #ced4da',
                borderRadius: '4px',
                marginBottom: '2px'
            }}
            // maxLength={(fieldData.validations && fieldData.validations.maxLength) ? fieldData.validations.maxLength : null}
            placeholder={placeholder()}
             // isAllowed={withValueCap}
             customInput={TextField}
             size="small"
    /></Box>)
        :(
            <Grid
                container
                onMouseOver={() => { setDisplay('visible') }}
                onMouseOut={() => { setDisplay('hidden') }}
                className={fieldStyle()}
                style={{ display: 'block' }}
            >
                {editStatus ?
                    <NumberField
                        open={numberFieldDialog}
                        fieldData={fieldData}
                        handleClose={handleClose}
                    />
                    : ""}
                {editStatus ?
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
               { 
               !forGrid ?
               <Typography>{fieldData.label}</Typography>:
               ''
            }

                {
                    multipleValues ?
                        <MultipleValuesField  {...props} component={
                            <NumberFormat
                                format={(fieldData.displayConfigs && fieldData.displayConfigs.inputMask) ? fieldData.displayConfigs.inputMask : null}
                                mask="_"
                                required={fieldData.required}
                                // value={fieldValue}
                                key={fieldData.id}
                                onChange={handleFieldValue}
                                style={{
                                    width: '100%',
                                    height: '48px',
                                    borderRadius: '4px',
                                    border: '1px solid #ced4da',
                                    padding: '0px 10px',
                                    marginBottom: '10px',
                                    marginTop: '4px',
                                }}
                                // maxLength={(fieldData.validations && fieldData.validations.maxLength) ? fieldData.validations.maxLength : null}
                                placeholder={placeholder()}
                            // isAllowed={withValueCap}
                            />
                        }
                            onChange={setMultipleValuesData}
                            multipleValuesData={multipleValuesData}
                            multipleValues={multipleValues}
                        />
                        : <NumberFormat
                            format={(fieldData.displayConfigs && fieldData.displayConfigs.inputMask) ? fieldData.displayConfigs.inputMask : null}
                            mask="_"
                            required={fieldData.required}
                            value={fieldValue}
                            onChange={handleFieldValue}
                            style={{
                                width: '100%',
                                height: '48px',
                                borderRadius: '4px',
                                border: '1px solid #ced4da',
                                padding: '0px 10px',
                                marginBottom: '10px',
                                marginTop: '4px',
                            }}
                            // maxLength={(fieldData.validations && fieldData.validations.maxLength) ? fieldData.validations.maxLength : null}
                            placeholder={placeholder()}
                        // isAllowed={withValueCap}
                        />

                }
                {!withValueCap ? <Typography style={{ color: 'red' }}>Value is greater than the maximum value</Typography> : null}
            </Grid>
        )
    }

    return (
        !fieldData.display || fieldData.display === 'visible' || conditionalDisplay(fieldData) ?
            fieldDisplay()
            : fieldData.display === 'hidden' && editStatus ?
                fieldDisplay()
                : ""
    )
}

export default NumberFieldComp
