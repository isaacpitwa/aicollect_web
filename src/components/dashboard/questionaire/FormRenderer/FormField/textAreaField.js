import { useState, useEffect, useContext } from 'react'
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
import TextAreaField from '../../dialogs/TextAreaField';
import {
    DescriptionCard,
} from '../../utils';
import GeneralTooltip from '../../previews/GeneralTooltip';

const textAreaField = (props) => {

    const { editStatus } = useContext(FormContext);

    const { fieldData } = props

    const [display, setDisplay] = useState('hidden');
    const [textAreaFieldDialog, setTextAreaFieldDialog] = useState(false)

    useEffect(()=>{

    }, [textAreaFieldDialog])

    const handleTextAreaField = () => {
        setTextAreaFieldDialog(true)
    }
    
    const createTextField = () => {
        setTextAreaFieldDialog(false)
    }

    const handleClose = () => {
        // Dialog box closing method
        setTextAreaFieldDialog(false)
    }

    const classes = formStyles();
    const smallBtn = smallBtns();

    return (
        <Grid key={fieldData.id} container onMouseOver={() => { setDisplay('visible') }} onMouseOut={() => { setDisplay('hidden') }} className={!editStatus ? classes.section : classes.section2}>
            <TextAreaField open={textAreaFieldDialog} createTextField={createTextField} fieldData={fieldData} handleClose={handleClose} />
            {!editStatus?
                <Typography style={{ width: '100%', paddingBottom: '2px', visibility: display }} align={'right'} >
                    <EditIcon
                        onClick={handleTextAreaField}
                        className={smallBtn.editBtn}
                    />
                    <HighlightOffIcon className={smallBtn.deleteBtn} />
                </Typography>
            : '' }
            <TextField
                required={fieldData.required}
                fullWidth
                multiline
                type={'text'}
                variant={'outlined'}
                label={fieldData.label}
                helperText={<DescriptionCard description={fieldData.description} helperText={true}/>}
                style={formStyles.textfield}
                rows={4}
                InputProps={{
                    endAdornment: fieldData.tooltip != '' ?<GeneralTooltip tipData={fieldData.tooltip} />:false
                }}
            />
        </Grid>
    )
}

export default textAreaField
