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
import { getRowEl } from '@mui/x-data-grid/utils/domUtils';
import MultipleValuesField from './MultipleValuesField';

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
    const [multipleValuesData, setMultipleValuesData] = useState(fieldData && fieldData.multipleValuesData ? fieldData.multipleValuesData : [1]);

    const handleSubSection = () => {
        setSubSectionDialog(true)
    }
    const getRowComponent = () => {
        return (<Box sx={{ display: 'flex', alignItems: 'stretch', width: '100%' }}>
            {fieldData.components.map((field, index) => (
                <Box key={index}  sx={{width:'100%'}}>
                    <FormField key={index} fieldData={field} forGrid={true} />
                </Box>
            ))}
        </Box>)

    };

    const getSectionIds = () => {
        if (editStatus) {
            if (subSectionId === fieldData.id) {
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
        if (editStatus) {
            if (subSectionId === fieldData.id) {
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
                style={{ border: 0, paddingTop: '8px' }}
            >
                <Typography
                    onMouseOver={() => { setDisplay('visible'); }}
                    onMouseOut={() => { setDisplay('hidden'); }}
                // className={classes.subSectionLabel}
                >
                    {editStatus ?
                        <DataGridDialog
                            open={subSectionDialog}
                            fieldData={fieldData}
                            handleClose={handleClose}
                        />
                        : ""}
                    {fieldData.label}
                    {fieldData.tooltip != '' ? <GeneralTooltip tipData={fieldData.tooltip} /> : false}
                    {editStatus ?
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
                        : ""}
                </Typography>
                <DescriptionCard description={fieldData.description} helperText={false} />

                <Box sx={{display:'flex', flexDirection:'column', border:'1px solid #D8DEE4',width:'100%'}}>
                    <Box sx={{display:"flex", borderBottom:'1px solid #D8DEE4'}}>
                        <Box sx={{ display:'flex',borderRight:'1px solid #D8DEE4',padding:'0 8px',width:"80%"}} >
                            {fieldData.components.map((field, index) => (
                            <Box sx={{ padding: '8px 14px', border: '1px solid #ced4da',width:'100%' }}><Typography key={index} sx={{ fontWeight: '600', color: '#000' }}>{field.label}</Typography></Box>
                            ))}
                        </Box>
                    <Box sx={{ padding: '8px 0px', border: '1px solid #ced4da', width:'20%' }}><Typography sx={{ fontWeight: '600', color: '#000' }}>&nbsp;</Typography></Box>
                        
                    </Box>
                </Box>
                <MultipleValuesField
                        onChange={setMultipleValuesData}
                        multipleValuesData={multipleValuesData}
                        {...props} component={getRowComponent()}
                    />
            </Grid>
        )
    }

    return (
        fieldData.display === 'visible' || conditionalDisplay(fieldData) ?
            fieldDisplay(fieldData.id)
            : fieldData.display === 'hidden' && editStatus ?
                fieldDisplay(fieldData.id)
                : fieldData.dependency === dependantId && dependecyValue > 0 ?
                    [...Array(parseInt(dependecyValue)).keys()].map((field, index) => (
                        fieldDisplay(index)
                    ))
                    : ""
    )
}

export default DataGridField
