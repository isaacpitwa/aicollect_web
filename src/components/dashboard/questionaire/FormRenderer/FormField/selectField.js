import { useState, useContext } from 'react';
import formStyles from '../../styles/FormStyles';
import { smallBtns } from '../../styles/FormStyles';
import {
    Grid,
    Typography,
    TextField,
    MenuItem
} from "@mui/material";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import EditIcon from '@mui/icons-material/Edit';

import { FormContext } from '../../context';
import SelectField from '../../dialogs/SelectField';
import { DescriptionCard } from '../../utils';
import GeneralTooltip from '../../previews/GeneralTooltip';

/**
 * @function SelectFieldComp
 * @desc This is the Select Field component, it is the Select field displayed in the form.
 * @arg {Object} fieldData - The data of the field which contains all the properties of the Select field.
 * @returns {Component} - Returns a Select field JSX component.
 * @author Atama Zack <atama.zack@gmail.com>
 * @version 1.0.0
 */
const SelectFieldComp = (props) => {

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

    const { fieldData } = props;

    const [display, setDisplay] = useState('hidden');
    const [selectValue, setSelectValue] = useState('')
    const [selectDialog, setSelectDialog] = useState(false)

    const handleSelectField = () => {
        setError(false)
        setSelectSection(true)
        setSectionId(fieldData.parentId)
        setSubSectionId(fieldData.subParentId)
        setSelectDialog(true)
    }

    const handleSelect = (e) => {
        setConditionalId(fieldData.id);
        setConditionalValue(e.target.value.toLowerCase());
        setSelectValue(e.target.value);
    }

    const deleteField = () => {
        deleteFieldData(fieldData)
    }

    const handleClose = () => {
        setSelectDialog(false)
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
                onMouseOver={()=>{setDisplay('visible')}}
                onMouseOut={()=>{setDisplay('hidden')}}
                className={fieldStyle()}
            >
                {editStatus?
                    <Typography
                        className={smallBtn.fieldBtns}
                        style={{ visibility: display }}
                        align={'right'}
                    >
                        <SelectField
                            open={selectDialog}
                            fieldData={fieldData}
                            handleClose={handleClose}
                        />
                        <EditIcon
                            onClick={handleSelectField}
                            className={smallBtn.editBtn}
                        />
                        <HighlightOffIcon
                            onClick={deleteField}
                            className={smallBtn.deleteBtn}
                        />
                    </Typography>
                : '' }
                <Typography style={{ fontSize: '18px', color: '#5048E5' }}>
                    {fieldData.label}<GeneralTooltip tipData={fieldData.tooltip}/>
                </Typography>
                <TextField
                    fullWidth
                    select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectValue}
                    onChange={handleSelect}
                    helperText={<DescriptionCard description={fieldData.description} helperText={true}/>}
                >
                    {fieldData.options.map((option, index) => (
                        <MenuItem
                            key={index}
                            value={option.label}
                        >{option.label}</MenuItem>
                    ))}
                </TextField>
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

export default SelectFieldComp
