import { useState, useEffect, useContext } from 'react';
import formStyles from '../../styles/FormStyles';
import { smallBtns } from '../../styles/FormStyles';
import {
    Grid,
    Typography
} from "@mui/material";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import EditIcon from '@mui/icons-material/Edit';

import { FormContext } from '../../context';
import DataGridDialog from '../../dialogs/DataGrid';
import { DescriptionCard } from '../../utils';
import GeneralTooltip from '../../previews/GeneralTooltip';
import FormField from '.';
import { Box } from '@mui/system';

/**
 * @function DataGridField
 * @desc This is the DataGridFieldField component, it is the DataGridField field displayed in the form.
 * @arg {Object} fieldData - The data of the field which contains all the properties of the DataGridFieldfield.
 * @returns {Component} - Returns a DataGridField field JSX component.
 * @author Isaac Pitwa <isaacpitwa@gmail.com>
 * @version 1.0.0
 */
const DataGridField = (props) => {

    const {
        setError,
        componentsData,
        conditionalDisplay,
        setSelectSection,
        setSectionId,
        subSectionId,
        setSubSectionId,
        editStatus,
        dependantId,
        dependecyValue,
        deleteFieldData,
    } = useContext(FormContext);

    const { fieldData } = props

    const [display, setDisplay] = useState('hidden');
    const [subSectionDialog, setSubSectionDialog] = useState(false)

    const handleSubSection = () => {
        setSubSectionDialog(true)
    }

    const getSectionIds = () => {
        if(editStatus){
            if(subSectionId===fieldData.id) {
                setError(false)
                setSubSectionId(null)
            } else {
                setError(false)
                setSelectSection(true)
                setSectionId(fieldData.parentId)
                setSubSectionId(fieldData.id)
            }
        }
    };

    const deleteField = () => {
        deleteFieldData(fieldData);
    };   

    const handleClose = () => {
        setSubSectionDialog(false)
    };
    
    const classes = formStyles();
    const smallBtn = smallBtns();

    const subSectionStyle = () => {
        if(editStatus) {
            if(subSectionId===fieldData.id) {
                return classes.subSection3
            } else {
                return classes.subSection
            }
        } else {
            return classes.subSection2
        }
    };

    const fieldDisplay = (key) => {

        return (
            <Grid
                key={key}
                container
                onClick={getSectionIds}
                className={subSectionStyle()}
                style={{border:0,paddingTop:'8px'}}
            >
                <Typography
                    onMouseOver={() => { setDisplay('visible'); } }
                    onMouseOut={() => { setDisplay('hidden'); } }
                    // className={classes.subSectionLabel}
                >
                    {editStatus?
                        <DataGridDialog
                            open={subSectionDialog}
                            fieldData={fieldData}
                            handleClose={handleClose}
                        />
                    : "" }
                    {fieldData.label}
                    {fieldData.tooltip!=''?<GeneralTooltip tipData={fieldData.tooltip}/>:false}
                    {editStatus?
                        <small
                            className={smallBtn.sectionBtns}
                            style={{ visibility: display }}
                        >
                            <EditIcon
                                onClick={handleSubSection}
                                className={smallBtn.editBtn}
                            />
                            <HighlightOffIcon
                                onClick={deleteField}
                                className={smallBtn.deleteBtn}
                            />
                        </small>
                    : "" }
                </Typography>
                <DescriptionCard description={fieldData.description} helperText={false} />
                
                <Box sx={{display:'flex', alignItems:'stretch', width:'100%'}}>
                    {fieldData.components.map((field, index) => (
                        <Box>
                           <Box sx={{padding:'8px 14px', border:'1px solid #ced4da'}}><Typography key={index} sx={{fontWeight:'600', color:'#000'}}>{field.label}</Typography></Box>
                           <FormField key={index} fieldData={field} forGrid={true}/>
                        </Box>
                    ))}
                </Box>
            </Grid>        
        )
    }

    return (
        fieldData.display==='visible'||conditionalDisplay(fieldData)?
            fieldDisplay(fieldData.id)
        : fieldData.display==='hidden'&&editStatus?
            fieldDisplay(fieldData.id)
        : fieldData.dependency===dependantId&&dependecyValue>0?
            [...Array(parseInt(dependecyValue)).keys()].map((field, index) => (
                fieldDisplay(index)
            ))
        : ""
    )
}

export default DataGridField
