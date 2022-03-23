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

    const {
        setError,
        selectSection,
        sectionId,
        setSelectSection,
        setSectionId,
        subSectionId,
        setSubSectionId,
        componentsData,
        setComponentsData,
        fieldResponses,
        setFieldResponses,
        editStatus
    } = useContext(FormContext);

    const { fieldData } = props

    const [fieldStyles, setFieldStyles] = useState(0)
    const [sectionDialog, setSectionDialog] = useState(false)
    const [display, setDisplay] = useState('hidden');

    useEffect(() => {
        setFieldStyles(sectionId===fieldData.id?3:0)
    }, [sectionId, componentsData, editStatus])

    const handleSectionField = () => {
        setSectionDialog(true)
    }

    const getSectionId = () => {
        if(editStatus){
            if(selectSection) {
                setError(false)
                setSelectSection(false)
                setSectionId(false)
                setSubSectionId(false)
            } else {
                setError(false)
                setSelectSection(true)
                setSectionId(fieldData.id)
                setSubSectionId(false)
            }
        }
    }

    const handleClose = () => {
        setSectionDialog(false)
    }

    const smallBtn = smallBtns();
    let classes = formStyles();

    return (
        fieldData.conditional && fieldResponses.find(item => item.fieldId === fieldData.conditional.when).value === fieldData.conditional.value?
            editStatus?
                <Grid key={fieldData.id} container className={fieldStyles===0?classes.section:fieldStyles===2?classes.section2:classes.section3}>
                    <Section open={sectionDialog} fieldData={fieldData} handleClose={handleClose} />
                    <Typography
                        onMouseOver={() => { setDisplay('visible') }}
                        onMouseOut={() => { setDisplay('hidden') }}
                        className={classes.sectionLabel}
                        variant='h5'
                    >
                        {fieldData.label}{fieldData.tooltip != '' ? <GeneralTooltip tipData={fieldData.tooltip} /> : false}
                        {editStatus?
                            <small style={{ float: 'right', visibility: display, paddingTop: '5px' }}>
                                <EditIcon
                                    onClick={handleSectionField}
                                    className={smallBtn.editBtn}
                                />
                                <HighlightOffIcon
                                    onClick={() => {
                                        setComponentsData(componentsData.filter(section => section.id !== fieldData.id))
                                    }}
                                    className={smallBtn.deleteBtn}
                                />
                            </small>
                        :
                            ""
                        }
                    </Typography>
                    <DescriptionCard description={fieldData.description} helperText={true} />
                    {fieldData.components.map((componentData, index) => (
                        <FormField fieldKey={index} fieldData={componentData}  fieldResponses={fieldResponses}/>
                    ))}
                </Grid>
                : ''
            :
            <Grid key={fieldData.id} container className={editStatus?fieldStyles===0?classes.section:fieldStyles===2?classes.section2:classes.section3:classes.section2}>
                <Section open={sectionDialog} fieldData={fieldData} handleClose={handleClose} />
                <Typography
                    onClick={getSectionId}
                    onMouseOver={() => { setDisplay('visible') }}
                    onMouseOut={() => { setDisplay('hidden') }}
                    className={classes.sectionLabel}
                    variant='h5'
                >
                    {fieldData.label}{fieldData.tooltip != '' ? <GeneralTooltip tipData={fieldData.tooltip} /> : false}
                    {editStatus ?
                        <small style={{ float: 'right', visibility: display, paddingTop: '5px' }}>
                            <EditIcon
                                onClick={handleSectionField}
                                className={smallBtn.editBtn}
                            />
                            <HighlightOffIcon
                                className={smallBtn.deleteBtn}
                                onClick={() => {
                                    setComponentsData(componentsData.filter(section => section.id !== fieldData.id))
                                }}
                            />
                        </small>
                        : ''}
                </Typography>
                <DescriptionCard description={fieldData.description} helperText={true} />
                {fieldData.components.map((comp, index) => (
                    <FormField fieldKey={index} fieldData={comp} fieldResponses={fieldResponses}/>
                ))}
            </Grid>
    )
}

export default SectionField
