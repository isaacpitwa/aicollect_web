import { useState, useContext } from 'react'
import formStyles from '../../styles/FormStyles'
import { smallBtns } from '../../styles/FormStyles'
import {
    Grid,
    TextField,
    Typography
} from "@mui/material"
import MuiPhoneNumber from 'material-ui-phone-number'
import 'react-phone-number-input/style.css'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import EditIcon from '@mui/icons-material/Edit';

import { FormContext } from '../../context'
import PhoneField from '../../dialogs/PhoneField'
import { DescriptionCard } from '../../utils'
import GeneralTooltip from '../../previews/GeneralTooltip'

const PhoneNumberField = (props) => {

    const {
        setError,
        setSelectSection,
        setSectionId,
        setSubSectionId,
        editStatus,
        deleteFieldData,
    } = useContext(FormContext);

    const { fieldData } = props;

    const [phoneFieldDialog, setPhoneFieldDialog] = useState(false)
    const [display, setDisplay] = useState('hidden');

    const handlePhoneField = () => {
        setError(false)
        setSelectSection(true)
        setSectionId(fieldData.parentId)
        setSubSectionId(fieldData.subParentId)
        setPhoneFieldDialog(true)
    }

    const deleteField = () => {
        deleteFieldData(fieldData)
    }

    const handleClose = () => {
        setPhoneFieldDialog(false)
    }

    const classes = formStyles();
    const smallBtn = smallBtns();

    return (
        <Grid
            key={fieldData.id}
            container
            onMouseOver={()=>{setDisplay('visible')}}
            onMouseOut={()=>{setDisplay('hidden')}}
            className={editStatus?classes.section:classes.section2}
        >
            {editStatus?
                <>
                    <PhoneField open={phoneFieldDialog} fieldData={fieldData} handleClose={handleClose} />
                    <Typography
                        className={smallBtn.fieldBtns}
                        style={{ visibility: display }}
						align={'right'}
                    >
                        <EditIcon
                            onClick={handlePhoneField}
                            className={smallBtn.editBtn}
                        />
                        <HighlightOffIcon
                            onClick={deleteField}
                            className={smallBtn.deleteBtn}
                        />
                    </Typography>
                </>
            : '' }
            <MuiPhoneNumber
                fullWidth
                margin="dense"
                variant='outlined'
                defaultCountry={'ug'}
                label={fieldData.label}
                style={formStyles.textfield}
                helperText={<DescriptionCard description={fieldData.description} helperText={true}/>}
                InputProps={{
                    endAdornment: fieldData.tooltip != '' ?<GeneralTooltip tipData={fieldData.tooltip} />:false
                }}
            />
        </Grid>
    )
}

export default PhoneNumberField
