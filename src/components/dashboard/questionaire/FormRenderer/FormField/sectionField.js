import { useState, useEffect, useContext } from 'react'
import formStyles from '../../styles/FormStyles'
import { smallBtns } from '../../styles/FormStyles'
import {
    Grid,
    Typography
} from "@mui/material"
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import EditIcon from '@mui/icons-material/Edit';

import { FormContext } from '../../context'
import Section from '../../dialogs/Section';
import { DescriptionCard } from '../../utils'
import GeneralTooltip from '../../previews/GeneralTooltip'
import FormField from '../FormField'

const SectionField = (props) => {

    const { sectionId, setSectionId, fieldResponses, setFieldResponses, editStatus } = useContext(FormContext);

    const { fieldData } = props

    const [sectionDialog, setSectionDialog] = useState(false)
    const [display, setDisplay] = useState('hidden');

    useEffect(() => {
        // setRefresh(false)
    }, [])

    const handleSectionField = () => {
        setSectionDialog(true)
    }

    const getSectionId = () => {
        setSectionId(fieldData.id)
    }

    const handleClose = () => {
        setSectionDialog(false)
    }

    const classes = formStyles();
    const smallBtn = smallBtns();

    return (
        fieldData.conditional ?
            fieldResponses.find(item => item.fieldId === fieldData.conditional.when).value === fieldData.conditional.value ?
                <Grid key={fieldData.id} container className={editStatus ? classes.section2 : classes.section}>
                    <Section open={sectionDialog} fieldData={fieldData} handleClose={handleClose} />
                    <Typography
                        onMouseOver={() => { setDisplay('visible') }}
                        onMouseOut={() => { setDisplay('hidden') }}
                        className={classes.sectionLabel}
                        variant='h5'
                    >
                        {fieldData.label}{fieldData.tooltip != '' ? <GeneralTooltip tipData={fieldData.tooltip} /> : false}
                        {!editStatus ?
                            <small style={{ float: 'right', visibility: display, paddingTop: '5px' }}>
                                <EditIcon
                                    onClick={handleSectionField}
                                    className={smallBtn.editBtn}
                                />
                                <HighlightOffIcon className={smallBtn.deleteBtn} />
                            </small>
                            : ''}
                    </Typography>
                    <DescriptionCard description={fieldData.description} helperText={true} />
                    {fieldData.components.map(componentData => (
                        <FormField fieldData={componentData} />
                    ))}
                </Grid>
                : ''
            :
            <Grid key={fieldData.id} container onMouseOver={getSectionId} className={editStatus ? classes.section2 : classes.section}>
                <Section open={sectionDialog} fieldData={fieldData} handleClose={handleClose} />
                <Typography
                    onMouseOver={() => { setDisplay('visible') }}
                    onMouseOut={() => { setDisplay('hidden') }}
                    className={classes.sectionLabel}
                    variant='h5'
                >
                    {fieldData.label}{fieldData.tooltip != '' ? <GeneralTooltip tipData={fieldData.tooltip} /> : false}
                    {!editStatus ?
                        <small style={{ float: 'right', visibility: display, paddingTop: '5px' }}>
                            <EditIcon
                                onClick={handleSectionField}
                                className={smallBtn.editBtn}
                            />
                            <HighlightOffIcon className={smallBtn.deleteBtn} />
                        </small>
                        : ''}
                </Typography>
                <DescriptionCard description={fieldData.description} helperText={true} />
                {fieldData.components.map(componentData => (
                    <FormField fieldData={componentData} />
                ))}
            </Grid>
    )
}

export default SectionField
