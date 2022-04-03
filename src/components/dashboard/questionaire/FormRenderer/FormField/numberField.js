import { useState, useContext } from 'react'
import formStyles from '../../styles/FormStyles'
import { smallBtns } from '../../styles/FormStyles'
import {
    Grid,
    TextField,
    Typography
} from "@mui/material"
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import EditIcon from '@mui/icons-material/Edit';

import { FormContext } from '../../context'
import NumberField from '../../dialogs/NumberField';
import {
    DescriptionCard,
    FieldIndex,
} from '../../utils';
import GeneralTooltip from '../../previews/GeneralTooltip'

const NumberFieldComp = (props) => {

    const {
        setError,
        setSelectSection,
        setSectionId,
        setSubSectionId,
        fieldResponses,
        setFieldResponses,
        editStatus,
        setDependantId,
        setDependecyValue,
        deleteFieldData
    } = useContext(FormContext);

    const { fieldData, fieldUpdated } = props;

    const [display, setDisplay] = useState('hidden');
    const [value, setValue] = useState('');
    const [numberFieldDialog, setNumberFieldDialog] = useState(false)

    const handleNumberField = () => {
        setError(false)
        setSelectSection(true)
        setSectionId(fieldData.parentId)
        setSubSectionId(fieldData.subParentId)
        setNumberFieldDialog(true)
    }

    const handleFieldValue = (e) => {
        setValue(e.target.value)
        if(fieldData.dependency) {
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

    return (
        <Grid key={fieldData.id} container onMouseOver={() => { setDisplay('visible') }} onMouseOut={() => { setDisplay('hidden') }} className={editStatus ? classes.section : classes.section2}>
            <NumberField open={numberFieldDialog} fieldData={fieldData} handleClose={handleClose} />
            {editStatus?
                <Typography style={{ width: '100%', paddingBottom: '2px', visibility: display }} align={'right'} >
                    <EditIcon
                        onClick={handleNumberField}
                        className={smallBtn.editBtn}
                    />
                    <HighlightOffIcon
                        onClick={deleteField}
                        className={smallBtn.deleteBtn}
                    />
                </Typography>
            : '' }
            <TextField
                fullWidth
                type={'number'}
                variant={'outlined'}
                label={fieldData.label}
                value={value}
                onChange={handleFieldValue}
                helperText={<DescriptionCard description={fieldData.description} helperText={true}/>}
                style={formStyles.textfield}
                InputProps={{
                    endAdornment: <GeneralTooltip tipData={fieldData.tooltip} />
                }}
            />
        </Grid>
    )
}

export default NumberFieldComp
