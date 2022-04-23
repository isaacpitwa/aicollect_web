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
    DescriptionCard,
    FieldTooltip,
} from '../../utils';
import GeneralTooltip from '../../previews/GeneralTooltip';

/**
 * @function DatefieldComp
 * @desc This is the Date Field component, it is the Date field displayed in the form.
 * @arg {Object} fieldData - The data of the field which contains all the properties of the Date field.
 * @returns {Component} - Returns a Date field JSX component.
 * @author Atama Zack <atama.zack@gmail.com>
 * @version 1.0.0
 */
const DatefieldComp = (props) => {

    const { setFieldResponses, editStatus, deleteFieldData } = useContext(FormContext);

    const { fieldKey, fieldData, fieldResponses } = props;

    const [display, setDisplay] = useState('hidden');
    const [dateValue, setDateValue] = useState(fieldData.value?fieldData.value:new Date().toLocaleDateString());
    const [dateFieldDialog, setDateFieldDialog] = useState(false);
    const [dependantField] = useState(fieldData.conditional?fieldResponses.find(item => item.fieldId === fieldData.conditional.when):false)

    useEffect(() => {
    }, [fieldResponses])

    const handleFieldValue = (e) => {
        setDateValue(e.target.value)
    }

    const handleTextField = () => {
        setDateFieldDialog(true)
    }

    const handleDateValue = (e) => {

    }

    const createTextField = () => {
        setDateFieldDialog(false)
    }

    const handleClose = () => {
        setDateFieldDialog(false)
    }

    const deleteField = () => {
        deleteFieldData(fieldData)
    }

    const classes = formStyles();
    const smallBtn = smallBtns();


    return (
        dependantField&&dependantField.value===fieldData.conditional.value&&!editStatus?
            <Grid
                key={fieldKey}
                style={{ display: 'block' }}
                container
                className={classes.section2}
            >
				<LocalizationProvider dateAdapter={AdapterDateFns}>
					<DesktopDatePicker
						label={fieldData.label}
						value={dateValue}
						onChange={(newValue) => {
							setDateValue(newValue);
						}}
						renderInput={(params) => <TextField {...params} fullWidth/>}
					/>
				</LocalizationProvider>
            </Grid>
        :
            <Grid
                key={fieldKey}
                style={{ display: 'block' }}
                container
                onMouseOver={() => { setDisplay('visible') }}
                onMouseOut={() => { setDisplay('hidden') }}
                className={classes.section}
            >
                <DateField
                    open={dateFieldDialog}
                    fieldData={fieldData} handleClose={handleClose}
                />
                <Typography
                    className={smallBtn.fieldBtns}
                    style={{ visibility: display }}
                    align={'right'}
                >
                    <EditIcon
                        onClick={handleTextField}
                        className={smallBtn.editBtn}
                    />
                    <HighlightOffIcon
                        onClick={deleteField}
                        className={smallBtn.deleteBtn}
                    />
                </Typography>
				<LocalizationProvider dateAdapter={AdapterDateFns}>
					<DesktopDatePicker
						label={fieldData.label}
						value={dateValue}
                        helperText={<DescriptionCard description={fieldData.description} helperText={true} />}
						onChange={(newValue) => {
							setDateValue(newValue);
						}}
						renderInput={(params) => <TextField {...params} fullWidth/>}
                        InputProps={{
                            endAdornment: <FieldTooltip tooltip={fieldData.tooltip} />
                        }}
					/>
				</LocalizationProvider>
            </Grid>
    )
}

export default DatefieldComp
