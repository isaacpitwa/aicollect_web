import { useState, useEffect, useContext } from 'react';
import formStyles from '../../styles/FormStyles';
import { smallBtns } from '../../styles/FormStyles';
import {
    Grid,
    TextField,
    Typography
} from "@mui/material";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import EditIcon from '@mui/icons-material/Edit';

import { FormContext } from '../../context';
import TextAreaField from '../../dialogs/TextAreaField';
import {
    FieldTooltip,
    DescriptionCard,
} from '../../utils';

/**
 * @function TextAreaFieldComp
 * @desc This is the Text Area Field component, it is the Text Area field displayed in the form.
 * @arg {Object} fieldData - The data of the field which contains all the properties of the Text Area field.
 * @returns {Component} - Returns a Text Area field JSX component.
 * @author Atama Zack <atama.zack@gmail.com>
 * @version 1.0.0
 */
const TextAreaFieldComp = (props) => {

    const {
        setError,
        editStatus,
        setSelectSection,
        setSectionId,
        setSubSectionId,
        conditionalDisplay,
        deleteFieldData,
    } = useContext(FormContext);

    const { fieldData } = props

    const [display, setDisplay] = useState('hidden');
    const [textAreaFieldDialog, setTextAreaFieldDialog] = useState(false)

    const handleTextAreaField = () => {
        setError(false)
        setSelectSection(true)
        setSectionId(fieldData.parentId)
        setSubSectionId(fieldData.subParentId)
        setTextAreaFieldDialog(true)
    }

    const deleteField = () => {
        deleteFieldData(fieldData)
    }

    const handleClose = () => {
        setTextAreaFieldDialog(false)
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
                        <TextAreaField
                            open={textAreaFieldDialog}
                            fieldData={fieldData}
                            handleClose={handleClose}
                        />
                        <EditIcon
                            onClick={handleTextAreaField}
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
                    multiline
                    variant="outlined"
                    type={'text'}
                    label={fieldData.label}
                    helperText={<DescriptionCard description={fieldData.description} helperText={true}/>}
                    style={formStyles.textfield}
                    rows={4}
                    InputProps={{
                        endAdornment: <FieldTooltip tipData={fieldData.tooltip}/>
                    }}
                />
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

export default TextAreaFieldComp
