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
import EmailField from '../../dialogs/EmailField'
import { DescriptionCard } from '../../utils'
import GeneralTooltip from '../../previews/GeneralTooltip'

const EmailFieldComp = (props) => {

    const { setFieldResponses, editStatus, deleteFieldData } = useContext(FormContext);
    
    const { fieldData, fieldResponses } = props;

    const [error, setError] = useState(false);
    const [display, setDisplay] = useState('hidden');
    const [fieldValue, setFieldValue] = useState(fieldData?fieldData.value:'');
    const [emailFieldDialog, setEmailFieldDialog] = useState(false)
    const [dependantField] = useState(fieldData.conditional?fieldResponses.find(item => item.fieldId === fieldData.conditional.when):false)

    const handlEmail = (e) => {
        const pattern = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        setFieldValue(e.target.value)
        setError(pattern.test(e.target.value))
    }

    const openDialog = () => {
        setError(false)
        setSelectSection(true)
        setSectionId(fieldData.parentId)
        setSubSectionId(fieldData.subParentId)
        setEmailFieldDialog(true)
    }

    const deleteField = () => {
        deleteFieldData(fieldData)
    }

    const handleClose = () => {
        setEmailFieldDialog(false)
    }

    const classes = formStyles();
    const smallBtn = smallBtns();

    return (
        dependantField&&dependantField.value===fieldData.conditional.value?
            <Grid
                style={{ display: 'block' }}
                container
                className={classes.section}
            >
                <TextField
                    error={!error||fieldValue!==''}
                    fullWidth
                    type={'email'}
                    variant={'outlined'}
                    label={fieldData.label}
                    value={fieldValue}
                    onChange={handlEmail}
                    helperText={!error&&fieldValue!==''?'Invalid Email Format':<DescriptionCard description={fieldData.description} helperText={true}/>}
                    style={formStyles.textfield}
                    InputProps={{
                        endAdornment: fieldData.tooltip != '' ?<GeneralTooltip tipData={fieldData.tooltip} />:false
                    }}
                />
            </Grid>
        :
            <Grid
                style={{ display: 'block' }}
                container
                onMouseOver={() => { setDisplay('visible') }}
                onMouseOut={() => { setDisplay('hidden') }}
                className={editStatus?classes.section:classes.section2}
            >
                <EmailField
                    open={emailFieldDialog}
                    fieldData={fieldData}
                    handleClose={handleClose}
                />
                {editStatus ?
                    <Typography
                        style={{ width: '100%', paddingBottom: '2px', visibility: display }}
                        align={'right'}
                    >
                        <EditIcon
                            onClick={openDialog}
                            className={smallBtn.editBtn}
                        />
                        <HighlightOffIcon
                            onClick={deleteField}
                            className={smallBtn.deleteBtn}
                        />
                    </Typography>
                : ''}
                <TextField
                    error={!error||fieldValue!==''}
                    fullWidth
                    type={'email'}
                    variant={'outlined'}
                    label={fieldData.label}
                    value={fieldValue}
                    onChange={handlEmail}
                    helperText={!error&&fieldValue!==''?'Invalid Email Format':<DescriptionCard description={fieldData.description} helperText={true}/>}
                    style={formStyles.textfield}
                    InputProps={{
                        endAdornment: fieldData.tooltip != '' ?<GeneralTooltip tipData={fieldData.tooltip} />:false
                    }}
                />
            </Grid>
    )
}

export default EmailFieldComp
