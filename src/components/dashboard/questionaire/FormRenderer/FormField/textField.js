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

const TextFieldComp = (props) => {

    const {
        setError,
        setSelectSection,
        setSectionId,
        setSubSectionId,
        conditionalDisplay,
        editStatus,
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
        // let newFieldResponses = fieldResponses
        // newFieldResponses[FieldIndex(fieldData.id, fieldResponses)] = { fieldId: fieldData.id, value: e.target.value.toLowerCase() }
        // setFieldResponses(newFieldResponses)
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
                onMouseOver={() => { setDisplay('visible') }}
                onMouseOut={() => { setDisplay('hidden') }}
                className={fieldStyle()}
                style={{ display: 'block' }}
            >
                {editStatus?
                    <TextField_
                        open={textFieldDialog}
                        fieldData={fieldData}
                        handleClose={handleClose}
                    />
                : "" }
                {editStatus?
                    <Typography
                        style={{ width: '100%', paddingTop: '5px', visibility: display }}
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
                    : ""}
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
        fieldData.display==='visible'?
            fieldDisplay()
        : fieldData.display==='hidden'&&editStatus?
            fieldDisplay()
        : conditionalDisplay(fieldData)?
            fieldDisplay()
        : ""
    )
}

export default TextFieldComp
