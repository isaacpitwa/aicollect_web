import React, { useState, useEffect, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
    Box,
    Paper,
    Button,
    ButtonGroup,
    Grid,
    Typography,
    Stack,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    Select,
    MenuItem,
    InputLabel,
    FormControl
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

import { FormContext } from '../context';
import {
    allFormFields,
} from '../utils';
import {
    FieldError,
} from '../utils/ErrorCards';
import PhoneFieldPreview from '../previews/PhoneFieldPreview'

// This is the field for type=TextField
const PhoneField = (props) => {

    const {
        setError,
        sectionId,
        subSectionId,
        componentsData,
        addComponentToSection,
        updateFieldInSection,
    } = useContext(FormContext)

    const { open, fieldData, handleClose } = props
    
    const [errorTag, setErrorTag] = useState(false)
    const [buttonFocused, setButtonFocused] = useState('display')
    const [id] = useState(fieldData ? fieldData.id : uuidv4())
    const [type] = useState(fieldData ? fieldData.type : 'text')
    const [fieldLabel, setFieldLabel] = useState(fieldData ? fieldData.label : '')
    const [fieldValue, setFieldValue] = useState(fieldData ? fieldData.value : '')
    const [fieldDescription, setFieldDescription] = useState(fieldData ? fieldData.description : '')
    const [tooltip, setTooltip] = useState(fieldData ? fieldData.tooltip : '')
    const [isRequired, setIsRequired] = useState(fieldData ? fieldData.required : false )
    const [conditional, setConditional] = useState(false)
    const [display, setDisplay] = useState(fieldData&&fieldData.conditional?fieldData.conditional.display:'')
    const [when, setWhen] = useState(fieldData&&fieldData.conditional?fieldData.conditional.when:'')
    const [compValue, setCompValue] = useState(fieldData&&fieldData.conditional?fieldData.conditional.value:'')

    const handleLabel = (event) => {
        setFieldLabel(event.target.value);
        setError(false)
        setErrorTag(false);
    }

    const handleFieldValue = (e) => {
        setFieldValue(e.target.value)
    }

    const handleDescription = (event) => {
        setFieldDescription(event.target.value);
    };

    const handleTooltip = (e) => {
        setTooltip(e.target.value)
    }

    const handleIsRequired = (e) => {
        setIsRequired(!isRequired)
    }

    const handleDisplay = (e) => {
        setButtonFocused("display")
        setConditional(false)
    }

    const handleConditional = (e) => {
        setButtonFocused("conditional")
        setConditional(true)
    }

    const handleLogic = (e) => {
        setButtonFocused("logic")
        setConditional(false)
    }

    const handleDiplayValue = (e) => {
        setDisplay(e.target.value)
    }

    const handleWhen = (e) => {
        setWhen(e.target.value)
    }

    const handleCompValue = (e) => {
        setCompValue(e.target.value)
    }

    const conditionalLogic = () => {
        if(display!==''&&when!==''&&compValue!==''){
            return {
                display: display,
                when: when,
                value: compValue.toLowerCase()                
            }
        } else {
            return false
        }
    }

    const addTextField = () => {

        let newFieldObj = {
            id: id,
            parentId: sectionId,
            subParentId: subSectionId,
            type: type,
            value: fieldValue,
            required: isRequired,
            label: fieldLabel,
            description: fieldDescription,
            tooltip: tooltip,
            conditional: conditionalLogic()
        }

        if(sectionId&&fieldLabel!=='') {
            addComponentToSection(newFieldObj)
            setError(false)
            setErrorTag(false)
            setFieldLabel('')
            setFieldDescription('')
            setTooltip('')
            setIsRequired(false)
            setButtonFocused('Display')
            setConditional(false)
            handleClose()
        } else {
            setError(true)
            if(fieldLabel===''){
                setErrorTag('Label')
            }
        }
    }

    const handleUpdate = () => {

        let newField = {
            id: id,
            parentId: sectionId,
            subParentId: subSectionId,
            type: type,
            value: fieldValue,
            required: isRequired,
            label: fieldLabel,
            description: fieldDescription,
            tooltip: tooltip,
            conditional: {
                display: display,
                when: when,
                value: compValue.toLowerCase()
            }
        }

        updateFieldInSection(newField)
        handleClose()

    }

    const cancel = () => {
        setError(false)
        setErrorTag(false)
        setFieldLabel('')
        setFieldValue('')
        setFieldDescription('')
        setTooltip('')
        setIsRequired(!isRequired)
        setButtonFocused('Display')
        setConditional(false)
        handleClose()
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth={true}
            maxWidth={'lg'}
        >
            <DialogTitle                
                style={{
                    backgroundColor: '#5048E5',
                    color: 'white',
                    padding: '20px 40px'
                }}
            >
                Phone Number Component
                <CancelIcon color='error' style={{ float: 'right', cursor: 'pointer' }} onClick={handleClose}/>
            </DialogTitle>
            <DialogContent>
                <Grid container>
                    <Grid item xs={12} md={6} style={{ padding: '30px 20px' }}>
                        <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'left',
                            '& > *': {
                            m: 0,
                            },
                        }}
                        >
                        <ButtonGroup variant="outlined" size='small' aria-label="outlined button group">
                            <Button variant="contained" style={{ borderRadius: '8px 0px 0px 0px' }}>Display</Button>
                            <Button disabled>Data</Button>
                            <Button disabled>Validation</Button>
                            <Button disabled>Conditional</Button>
                            <Button disabled style={{ borderRadius: '0px 8px 0px 0px' }}>Logic</Button>
                        </ButtonGroup>
                        </Box>
                        <Box
                            component="form"
                            style={{ padding: '20px', border: '1px #5048E5 solid', borderRadius: '0px 8px 8px 8px', marginTop: '-1px' }}
                        >
                            <TextField
                                margin="dense"
                                id="outlined-multiline-static"
                                label="Description (Optional)"
                                size="small"
                                multiline
                                rows={4}
                                variant="outlined"
                                fullWidth
                                value={fieldDescription}
                                onChange={handleDescription}
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="tooltip"
                                label="Tooltip (Optional)"
                                type="text"
                                size="small"
                                fullWidth
                                variant="outlined"
                                value={tooltip}
                                onChange={handleTooltip}
                            />

                        </Box>
                    </Grid>
                    <PhoneFieldPreview
                        defaultCountry={'ug'}
                        fieldDescription={fieldDescription}
                        tooltip={tooltip}
                        isRequired={isRequired}
                    />
                </Grid>
            </DialogContent>
            <DialogActions>
                <Grid
                    item
                    xs={12}
                    md={12}
                    style={{ padding: '30px' }}
                    align='right'
                >
                    <Button
                        onClick={cancel}
                        variant="outlined"
                        size='small'
                        style={{ margin: '0px 20px' }}
                        color="error"
                    >Cancel</Button>
                    <Button
                        onClick={fieldData?handleUpdate:addTextField}
                        variant="outlined"
                        size='small'
                        color="success"
                    >{fieldData?"Save Changes":"Add Field"}</Button>
                </Grid>
            </DialogActions>
        </Dialog>
    )
}

export default PhoneField
