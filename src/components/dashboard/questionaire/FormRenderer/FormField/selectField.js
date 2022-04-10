import { useState, useContext } from 'react'
import formStyles from '../../styles/FormStyles'
import { smallBtns } from '../../styles/FormStyles'
import {
    Grid,
    Typography,
    TextField,
    MenuItem
} from "@mui/material"
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import EditIcon from '@mui/icons-material/Edit';

import { FormContext } from '../../context'
import SelectField from '../../dialogs/SelectField'
import { DescriptionCard } from '../../utils'
import GeneralTooltip from '../../previews/GeneralTooltip'

const SelectFieldComp = (props) => {

    const {
        setError,
        setSelectSection,
        setSectionId,
        setSubSectionId,
        editStatus,
        deleteFieldData
    } = useContext(FormContext);

    const { fieldData } = props;

    const [selectDialog, setSelectDialog] = useState(false)
    const [display, setDisplay] = useState('hidden');

    const handleSelectField = () => {
        setError(false)
        setSelectSection(true)
        setSectionId(fieldData.parentId)
        setSubSectionId(fieldData.subParentId)
        setSelectDialog(true)
    }

    const deleteField = () => {
        deleteFieldData(fieldData)
    }

    const handleClose = () => {
        setSelectDialog(false)
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
                    <SelectField open={selectDialog} fieldData={fieldData} handleClose={handleClose} />
                    <Typography
                        className={smallBtn.fieldBtns}
                        style={{ visibility: display }}
						align={'right'}
                    >
                        <EditIcon
                            onClick={handleSelectField}
                            className={smallBtn.editBtn}
                        />
                        <HighlightOffIcon
                            onClick={deleteField}
                            className={smallBtn.deleteBtn}
                        />
                    </Typography>
                </>
            : '' }
            <Typography style={{ fontSize: '18px', color: '#5048E5' }}>
                {fieldData.label}<GeneralTooltip tipData={fieldData.tooltip}/>
            </Typography>
            <TextField
                fullWidth
                select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={fieldData.options[0].label}
                helperText={<DescriptionCard description={fieldData.description} helperText={true}/>}
            >
                {fieldData.options.map((option, index) => (
                    <MenuItem key={index} value={option.label}>{option.label}</MenuItem>
                ))}
            </TextField>
        </Grid>

    )
}

export default SelectFieldComp
