import { useContext } from 'react'
import formStyles from '../../styles/FormStyles'
import {
    Grid,
    TextField
} from "@mui/material"

import { FormContext } from '../../context'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import { DescriptionCard } from '../../utils'
import GeneralTooltip from '../../previews/GeneralTooltip'

const imageField = (props) => {

    const { editStatus } = useContext(FormContext);
    
    const { fieldData } = props

    const classes = formStyles();

    return (
        <Grid key={fieldData.id} container className={editStatus?classes.section2:classes.section}>
            <TextField
                fullWidth
                type={'file'}
                variant={'outlined'}
                label={fieldData.label}
                helperText={<DescriptionCard description={fieldData.description} helperText={true}/>}
                InputProps={{
                    startAdornment: <AddPhotoAlternateIcon style={{ color: '#5F768A', marginRight: '10px' }}/>,
                    endAdornment: fieldData.tooltip != '' ?<GeneralTooltip tipData={fieldData.tooltip} />:false,
                }}
            />
        </Grid>
    )
}

export default imageField
