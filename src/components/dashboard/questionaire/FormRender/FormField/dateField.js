import { useState, useContext, useEffect } from 'react';
import formStyles from '../../styles/FormStyles';
import { smallBtns } from '../../styles/FormStyles';
import {
    Grid,
    TextField,
    Typography
} from "@mui/material";
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import EditIcon from '@mui/icons-material/Edit';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';

import { FormContext } from '../../context';
import DateField from '../../dialogs/DateField';
import {
    FieldTooltip,
    DescriptionCard,
} from '../../utils';

/**
 * @function DatefieldComp
 * @desc This is the Date Field component, it is the Date field displayed in the form.
 * @arg {Object} fieldData - The data of the field which contains all the properties of the Date field.
 * @returns {Component} - Returns a Date field JSX component.
 * @author Atama Zack <atama.zack@gmail.com>
 * @version 1.0.0
 */
const DatefieldComp = (props) => {

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
    const [fieldValue, setFieldValue] = useState(fieldData.value?fieldData.value:new Date().toLocaleDateString());
    const [dateFieldDialog, setDateFieldDialog] = useState(false);

    const handleDateField = () => {
        setError(false)
        setSelectSection(true)
        setSectionId(fieldData.parentId)
        setSubSectionId(fieldData.subParentId)
        setDateFieldDialog(true)
    };

    const deleteField = () => {
        deleteFieldData(fieldData)
    }

    const handleClose = () => {
        setDateFieldDialog(false)
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
                        <DateField
                            open={dateFieldDialog}
                            fieldData={fieldData}
                            handleClose={handleClose}
                        />
                        <EditIcon
                            onClick={handleDateField}
                            className={smallBtn.editBtn}
                        />
                        <HighlightOffIcon
                            onClick={deleteField}
                            className={smallBtn.deleteBtn}
                        />
                    </Typography>
                : ""}
				<LocalizationProvider dateAdapter={AdapterDateFns}>
					<DesktopDatePicker
						label={fieldData.label}
						value={fieldValue}
                        helperText={<DescriptionCard description={fieldData.description} helperText={true} />}
						onChange={(newValue) => {
							setFieldValue(newValue);
						}}
						renderInput={(params) => <TextField {...params} fullWidth/>}
                        InputProps={{
                            endAdornment: <FieldTooltip tooltip={fieldData.tooltip} />
                        }}
                        minDate={( fieldData.validations && fieldData.validations.min)? new Date(fieldData.validations.min): null}
                        maxDate={( fieldData.validations && fieldData.validations.max)? new Date(fieldData.validations.max): null}
					/>
				</LocalizationProvider>
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

export default DatefieldComp
