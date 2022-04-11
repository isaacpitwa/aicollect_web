import { useState, useContext, useEffect } from 'react';
import formStyles from '../../styles/FormStyles';
import { smallBtns } from '../../styles/FormStyles';
import {
    Grid,
    TextField,
    Typography
} from "@mui/material";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import EditIcon from '@mui/icons-material/Edit';

import { FormContext } from '../../context';
import ImageFieldDialog from '../../dialogs/ImageField';
import { DescriptionCard } from '../../utils';
import GeneralTooltip from '../../previews/GeneralTooltip';

/**
 * @function ImageField
 * @desc This is the Image Field component, it is the Image field displayed in the form.
 * @arg {Object} fieldData - The data of the field which contains all the properties of the Image field.
 * @returns {Component} - Returns a Image field JSX component.
 * @author Atama Zack <atama.zack@gmail.com>
 * @version 1.0.0
 */
const ImageField = (props) => {

    const {
        setError,
        setSelectSection,
        setSectionId,
        setSubSectionId,
        editStatus,
        deleteFieldData,
    } = useContext(FormContext);

    const { fieldData, fieldResponses } = props;

    const [display, setDisplay] = useState('hidden');
    const [value, setValue] = useState(fieldData.value?fieldData.value:'');
    const [imageFieldDialog, setImageFieldDialog] = useState(false);
    const [dependantField] = useState(fieldData.conditional?fieldResponses.find(item => item.fieldId === fieldData.conditional.when):false)

    useEffect(() => {
    }, [fieldResponses])

    const handleFieldValue = (e) => {
        setValue(e.target.value)
        let newFieldResponses = fieldResponses
        newFieldResponses[FieldIndex(fieldData.id, fieldResponses)] = { fieldId: fieldData.id, value: e.target.value.toLowerCase() }
        setFieldResponses(newFieldResponses)
    }

    const handleImageField = () => {
        setError(false)
        setSelectSection(true)
        setSectionId(fieldData.parentId)
        setSubSectionId(fieldData.subParentId)
        setImageFieldDialog(true)
    }

    const handleClose = () => {
        setImageFieldDialog(false)
    }

    const deleteField = () => {
        deleteFieldData(fieldData)
    }

    const classes = formStyles();
    const smallBtn = smallBtns();

    return (
        <Grid key={fieldData.id} container onMouseOver={() => { setDisplay('visible') }} onMouseOut={() => { setDisplay('hidden') }} className={editStatus ? classes.section : classes.section2}>
            <ImageFieldDialog
                open={imageFieldDialog}
                fieldData={fieldData}
                handleClose={handleClose}
            />
            {editStatus?
                <Typography
                    className={smallBtn.fieldBtns}
                    style={{ visibility: display }}
                    align={'right'}
                >
                    <EditIcon
                        onClick={handleImageField}
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
                type={'file'}
                variant={'outlined'}
                label={fieldData.label}
                onChange={handleFieldValue}
                helperText={<DescriptionCard description={fieldData.description} helperText={true} />}
                InputProps={{
                    startAdornment: <AddPhotoAlternateIcon style={{ color: '#5F768A', marginRight: '10px' }} />,
                    endAdornment: fieldData.tooltip != '' ? <GeneralTooltip tipData={fieldData.tooltip} /> : false,
                }}
            />
        </Grid>
    )
}

export default ImageField
