import { useState, useContext } from 'react';
import formStyles from '../../styles/FormStyles';
import { smallBtns } from '../../styles/FormStyles';
import {
    Grid,
    Typography,
    Checkbox
} from "@mui/material";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import EditIcon from '@mui/icons-material/Edit';

import { FormContext } from '../../context';
import SelectBoxField from '../../dialogs/SelectBoxField';
import {
    DescriptionCard,
    FieldTooltip
} from '../../utils';

/**
 * @function SelectBoxesField
 * @desc This is the Select Checkbox Field component, it is the Select Checkbox field displayed in the form.
 * @arg {Object} fieldData - The data of the field which contains all the properties of the Select Checkbox field.
 * @returns {Component} - Returns a Select Checkbox field JSX component.
 * @author Atama Zack <atama.zack@gmail.com>
 * @version 1.0.0
 */
const SelectBoxesField = (props) => {

    const {
        setError,
        setSelectSection,
        setSectionId,
        setSubSectionId,
        editStatus,
        setConditionalId,
        setConditionalValue,
        conditionalDisplay,
        formFieldValues,
        setFormFieldValues,
        deleteFieldData
    } = useContext(FormContext);

    const { fieldData } = props

    const [selectBoxDialog, setSelectBoxDialog] = useState(false)
    const [checkOptions, setCheckOptions] = useState(fieldData.values)
    const [field, setField] = useState(formFieldValues.find(field=>field.id===fieldData.id))
    const [fieldIndex, setFieldIndex] = useState(formFieldValues.findIndex(field=>field.id===fieldData.id))
    const [display, setDisplay] = useState('hidden');

    const handleSelectBoxField = () => {
        setError(false)
        setSelectSection(true)
        setSectionId(fieldData.parentId)
        setSubSectionId(fieldData.subParentId)
        setSelectBoxDialog(true)
    }

    const updateFieldValue = (values) => {
        let fields = formFieldValues;
        let thisField = field;
        thisField.values = values;
        fields[fieldIndex] = thisField;
        setFormFieldValues(fields);
    }

    const deleteField = () => {
        deleteFieldData(fieldData)
    }

    const handleClose = () => {
        setSelectBoxDialog(false)
    }

    const classes = formStyles();
    const smallBtn = smallBtns();

    const fieldStyle = () => {
        return editStatus?classes.section:classes.section2
    };

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
                    <Typography
                        className={smallBtn.fieldBtns}
                        style={{ visibility: display }}
						align={'right'}
                    >
                        <SelectBoxField open={selectBoxDialog} fieldData={fieldData} handleClose={handleClose} />
                        <EditIcon
                            onClick={handleSelectBoxField}
                            className={smallBtn.editBtn}
                        />
                        <HighlightOffIcon
                            onClick={deleteField}
                            className={smallBtn.deleteBtn}
                        />
                    </Typography>
                : ""}
                <Typography style={{ fontSize: '18px', color: '#5048E5' }}>
                    {fieldData.label}<FieldTooltip tooltip={fieldData.tooltip} />
                </Typography>
                <DescriptionCard description={fieldData.description} helperText={true}/>
                {checkOptions.map(option => (
                    <Typography key={option.id}>
                        <Checkbox
                            name={option.label}
                            checked={option.checked}
                            // Switching state of a perticular check box
                            onChange={(e) => {
                                option.checked = !option.checked;
                                setCheckOptions([...checkOptions]);
                                setConditionalId(fieldData.id);
                                setConditionalValue(e.target.value.toLowerCase());
                                updateFieldValue(checkOptions);
                            }}/>
                            {option.label}
                    </Typography>
                ))}
            </Grid>
        )
    }

    return (
        fieldData.display==='visible'||conditionalDisplay(fieldData)?
            fieldDisplay()
        : fieldData.display==='hidden'&&editStatus?
            fieldDisplay()
        : ""
    )
}

export default SelectBoxesField
