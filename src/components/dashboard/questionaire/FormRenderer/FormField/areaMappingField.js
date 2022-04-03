import React, { useState, useContext } from 'react'
import Image from 'next/image'
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
import AreaMappingImg from '../../../../../../public/static/form/area-mapping.jpg';

const AreaMappingField = (props) => {

    const {
        setError,
        setSelectSection,
        setSectionId,
        setSubSectionId,
        editStatus,
		deleteFieldData,
    } = useContext(FormContext);

    const { fieldData } = props;

    const [display, setDisplay] = useState('hidden');

    const deleteField = () => {
        deleteFieldData(fieldData)
    };

    const classes = formStyles();
    const smallBtn = smallBtns();

    return (
        <Grid key={fieldData.id} container onMouseOver={()=>{setDisplay('visible')}} onMouseOut={()=>{setDisplay('hidden')}} className={editStatus?classes.section:classes.section2}>
            {editStatus?
                <Typography style={{ width: '100%', paddingBottom: '2px', visibility: display }} align={'right'} >
                    <EditIcon className={smallBtn.editBtn} />
                    <HighlightOffIcon
                        onClick={deleteField}
                        className={smallBtn.deleteBtn}
                    />
                </Typography>
            : '' }
            <Grid
                item
                xs={12}
                sm={12}
                md={6}
                lg={6}
                xl={6}
                style={{ padding: '0px 10px' }}
            >
                    <Image
                        src={AreaMappingImg}
                        alt="Area Mapping Image"
                        style={{
                            width: '100%',
                            borderRadius: '8px',
                        }}
                    />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={6} xl={6}>
                <Typography variant="h5">
                    Please walk around the boundary of the area to be mapped
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    GPS coordinates can only be collected when you&aposre mobile
                </Typography>
                <Button
                    variant="contained"
                    color={'primary'}
                >
                    Start Mapping
                </Button>
            </Grid>
        </Grid>
    )
}

export default AreaMappingField;
