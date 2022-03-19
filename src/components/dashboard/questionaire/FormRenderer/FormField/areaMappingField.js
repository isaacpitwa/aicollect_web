import { useState, useContext } from 'react'
import formStyles from '../../styles/FormStyles'
import { smallBtns } from '../../styles/FormStyles'
import {
    Card,
    Grid,
    Button,
    TextField,
    Typography
} from "@mui/material"
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import EditIcon from '@mui/icons-material/Edit';

import { FormContext } from '../../context'
import AreaMapImg from "./areaMap.jpeg"

const areaMappingField = (props) => {
    
    const { editStatus } = useContext(FormContext);

    const { fieldData } = props;

    const [display, setDisplay] = useState('hidden');

    const classes = formStyles();
    const smallBtn = smallBtns();

    return (
        <Grid key={fieldData.id} container onMouseOver={()=>{setDisplay('visible')}} onMouseOut={()=>{setDisplay('hidden')}} className={editStatus?classes.section:classes.section2}>
            {editStatus?
                <Typography style={{ width: '100%', paddingBottom: '2px', visibility: display }} align={'right'} >
                    <EditIcon className={smallBtn.editBtn} />
                    <HighlightOffIcon className={smallBtn.deleteBtn} />
                </Typography>
            : '' }
            <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
                <img src={AreaMapImg} style={{ width: '100%' }} />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                <Typography variant="h6">
                    Please walk around the boundary of the area to be mapped
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    GPS coordinates can only be collected when you're mobile
                </Typography>
                <Button color={'primary'}>
                    Start Mapping
                </Button>
            </Grid>
        </Grid>
    )
}

export default areaMappingField;
