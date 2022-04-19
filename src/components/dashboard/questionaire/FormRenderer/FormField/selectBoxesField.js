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
import GeneralTooltip from '../../previews/GeneralTooltip';

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
        deleteFieldData
    } = useContext(FormContext);

    const { fieldData } = props

    const [selectBoxDialog, setSelectBoxDialog] = useState(false)
    const [checkOptions, setCheckOptions] = useState(fieldData.values)
    const [display, setDisplay] = useState('hidden');

    const handleSelectBoxField = () => {
        setError(false)
        setSelectSection(true)
        setSectionId(fieldData.parentId)
        setSubSectionId(fieldData.subParentId)
        setSelectBoxDialog(true)
    }

    const deleteField = () => {
        deleteFieldData(fieldData)
    }

    const handleClose = () => {
        setSelectBoxDialog(false)
    }

    const classes = formStyles();
    const smallBtn = smallBtns();

    return (
        <Grid key={fieldData.id} item sm={12} onMouseOver={()=>{setDisplay('visible')}} onMouseOut={()=>{setDisplay('hidden')}} className={editStatus?classes.section:classes.section2}>
            {editStatus?
                <>
                    <SelectBoxField open={selectBoxDialog} fieldData={fieldData} handleClose={handleClose} />
                    <Typography
                        className={smallBtn.fieldBtns}
                        style={{ visibility: display }}
						align={'right'}
                    >
                        <EditIcon
                            onClick={handleSelectBoxField}
                            className={smallBtn.editBtn}
                        />
                        <HighlightOffIcon
                            onClick={deleteField}
                            className={smallBtn.deleteBtn}
                        />
                    </Typography>
                </>
            : '' }
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
                            console.log('CheckBox Values:===>', checkOptions)
                        }}/>
                        {option.label}
                </Typography>
            ))}
        </Grid>

    )
}

export default SelectBoxesField
