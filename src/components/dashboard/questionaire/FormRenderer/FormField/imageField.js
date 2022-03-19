import { useState, useContext } from 'react'
import formStyles from '../../styles/FormStyles'
import { smallBtns } from '../../styles/FormStyles'
import {
    Grid,
    TextField,
    Typography
} from "@mui/material"
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import EditIcon from '@mui/icons-material/Edit';

import { FormContext } from '../../context'
import { DescriptionCard } from '../../utils'
import GeneralTooltip from '../../previews/GeneralTooltip'

const imageField = (props) => {

    const { editStatus } = useContext(FormContext);

    const { fieldData } = props

    const [display, setDisplay] = useState('hidden');

    const classes = formStyles();
    const smallBtn = smallBtns();

    return (
        <Grid key={fieldData.id} container onMouseOver={() => { setDisplay('visible') }} onMouseOut={() => { setDisplay('hidden') }} className={editStatus ? classes.section : classes.section2}>
            {editStatus?
                <Typography style={{ width: '100%', paddingBottom: '2px', visibility: display }} align={'right'} >
                    <EditIcon className={smallBtn.editBtn} />
                    <HighlightOffIcon className={smallBtn.deleteBtn} />
                </Typography>
            : '' }
            <TextField
                fullWidth
                type={'file'}
                variant={'outlined'}
                label={fieldData.label}
                helperText={<DescriptionCard description={fieldData.description} helperText={true} />}
                InputProps={{
                    startAdornment: <AddPhotoAlternateIcon style={{ color: '#5F768A', marginRight: '10px' }} />,
                    endAdornment: fieldData.tooltip != '' ? <GeneralTooltip tipData={fieldData.tooltip} /> : false,
                }}
            />
        </Grid>
    )
}

export default imageField
