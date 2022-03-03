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

import { FormContext } from '../../context';
import TextField_ from '../../dialogs/TextField';
import { DescriptionCard } from '../../utils';
import GeneralTooltip from '../../previews/GeneralTooltip';

const textField = (props) => {

    const { editStatus } = useContext(FormContext);

    const { fieldData } = props;

    const [display, setDisplay] = useState('hidden');
    const [textFieldDialog, setTextFieldDialog] = useState(false);

    const handleTextField = () => {
        setTextFieldDialog(true)
    }

    const createTextField = () => {
        setTextFieldDialog(false)
    }

    const handleClose = () => {
        // Dialog box closing method
        setTextFieldDialog(false)
    }
    
    const classes = formStyles();
    const smallBtn = smallBtns();


    return (
        <Grid key={fieldData.id} container onMouseOver={() => { setDisplay('visible') }} onMouseOut={() => { setDisplay('hidden') }} className={editStatus ? classes.section2 : classes.section}>
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
    )
}

export default textField
