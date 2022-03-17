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
import { DescriptionCard, FieldIndex } from '../../utils';
import GeneralTooltip from '../../previews/GeneralTooltip';

const textField = (props) => {

    const { setFieldResponses, editStatus } = useContext(FormContext);

    const { fieldKey, fieldData, fieldResponses, fieldUpdated } = props;

    const [display, setDisplay] = useState('hidden');
    const [value, setValue] = useState(fieldData.value?fieldData.value:'');
    const [textFieldDialog, setTextFieldDialog] = useState(false);
    const [dependantField] = useState(fieldData.conditional?fieldResponses.find(item => item.fieldId === fieldData.conditional.when):false)

    useEffect(() => {
    }, [fieldResponses])

    const handleFieldValue = (e) => {
        setValue(e.target.value)
        let newFieldResponses = fieldResponses
        newFieldResponses[FieldIndex(fieldData.id, fieldResponses)] = { fieldId: fieldData.id, value: e.target.value.toLowerCase() }
        setFieldResponses(newFieldResponses)
    }

    const handleTextField = () => {
        setTextFieldDialog(true)
    }

    const createTextField = () => {
        setTextFieldDialog(false)
    }

    const handleClose = () => {
        setTextFieldDialog(false)
        fieldUpdated()
    }

    const classes = formStyles();
    const smallBtn = smallBtns();


    return (        
        dependantField&&dependantField.value===fieldData.conditional.value?
            <Grid key={fieldKey} style={{ display: 'block' }} container onMouseOver={() => { setDisplay('visible') }} onMouseOut={() => { setDisplay('hidden') }} className={editStatus ? classes.section2 : classes.section}>
                <TextField_ open={textFieldDialog} createTextField={createTextField} fieldData={fieldData} handleClose={handleClose} />
                {!editStatus ?
                    <Typography style={{ width: '100%', paddingBottom: '2px', visibility: display }} align={'right'} >
                        <EditIcon
                            onClick={handleTextField}
                            className={smallBtn.editBtn}
                        />
                        <HighlightOffIcon className={smallBtn.deleteBtn} />
                    </Typography>
                    : ''}
                <TextField
                    required={fieldData.required}
                    fullWidth
                    type={'text'}
                    variant={'outlined'}
                    label={fieldData.label}
                    helperText={<DescriptionCard description={fieldData.description} helperText={true} />}
                    InputProps={{
                        endAdornment: fieldData.tooltip != '' ? <GeneralTooltip tipData={fieldData.tooltip} /> : false
                    }}
                />
            </Grid>
            : 
            <Grid key={fieldKey} style={{ display: 'block' }} container onMouseOver={() => { setDisplay('visible') }} onMouseOut={() => { setDisplay('hidden') }} className={editStatus ? classes.section2 : classes.section}>
                <TextField_ open={textFieldDialog} createTextField={createTextField} fieldData={fieldData} handleClose={handleClose} />
                {!editStatus ?
                    <Typography style={{ width: '100%', paddingBottom: '2px', visibility: display }} align={'right'} >
                        <EditIcon
                            onClick={handleTextField}
                            className={smallBtn.editBtn}
                        />
                        <HighlightOffIcon className={smallBtn.deleteBtn} />
                    </Typography>
                    : ''}
                <TextField
                    required={fieldData.required}
                    fullWidth
                    type={'text'}
                    variant={'outlined'}
                    label={fieldData.label}
                    value={value}
                    onChange={handleFieldValue}
                    helperText={<DescriptionCard description={fieldData.description} helperText={true} />}
                    InputProps={{
                        endAdornment: fieldData.tooltip != '' ? <GeneralTooltip tipData={fieldData.tooltip} /> : false
                    }}
                />
            </Grid>
    )
}

export default textField
