import React, { useState, useEffect, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
    Box,
    Button,
    ButtonGroup,
    Grid,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Typography,
    Checkbox,
    Select,
    MenuItem
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers'
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';

import { FormContext } from '../context';
import {
    FieldTooltip,
    allFormFields,
} from '../utils';
import {
    FieldError,
} from '../utils/ErrorCards';
import DatefieldPreview from '../previews/DatefieldPreview';
import GeneralTooltip from '../previews/GeneralTooltip'


// This is the field for type=TextField
const DateField = (props) => {

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
    const [type] = useState(fieldData ? fieldData.type : 'date')
    const [fieldLabel, setFieldLabel] = useState(fieldData ? fieldData.label : '')
    const [fieldValue, setFieldValue] = useState(fieldData ? fieldData.value : new Date().toLocaleDateString())
    const [fieldDescription, setFieldDescription] = useState(fieldData ? fieldData.description : '')
    const [tooltip, setTooltip] = useState(fieldData ? fieldData.tooltip : '')
    const [isRequired, setIsRequired] = useState(fieldData ? fieldData.required : false )
    const [conditional, setConditional] = useState(false)
    const [display, setDisplay] = useState(fieldData&&fieldData.conditional?fieldData.conditional.display:'')
    const [when, setWhen] = useState(fieldData&&fieldData.conditional?fieldData.conditional.when:'')
    const [compValue, setCompValue] = useState(fieldData&&fieldData.conditional?fieldData.conditional.value:'')
    const [validations, setValidations] = useState(fieldData && fieldData.validations ? fieldData.validations : null)


    useEffect(() => {

    }, [componentsData])

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

    const handleValidations = (key,value) => {
        setValidations({ ...validations, [key]: value });
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

    const addDateField = () => {

        let newFieldObj = {
            id: uuidv4(),
            parentId: sectionId,
            subParentId: subSectionId,
            type: type,
            value: fieldValue,
            required: isRequired,
            label: fieldLabel,
            description: fieldDescription,
            tooltip: tooltip,
            conditional: conditionalLogic(),
            validations: validations
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
            setValidations(null)
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
            },
            validations: validations
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
        setValidations(fieldData && fieldData.validations ? fieldData.validations : null)
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
                Date Field Component
                <CancelIcon
                    color='error'
                    style={{ float: 'right', cursor: 'pointer' }}
                    onClick={handleClose}
                />
            </DialogTitle>
            <DialogContent>
                <Grid container>
                    <Grid
                        item
                        xs={12}
                        md={6}
                        style={{ padding: '20px' }}
                    >
                        <FieldError errorTag={errorTag}/>
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
                            <ButtonGroup
                                variant="outlined"
                                size='small'
                                aria-label="outlined button group"
                            >
                                <Button
                                    variant={buttonFocused == "display" ? "contained" : "outlined"}
                                    onClick={handleDisplay}
                                    style={{ borderRadius: '8px 0px 0px 0px' }}>Display</Button>
                                <Button
                                    variant={buttonFocused == "conditional" ? "contained" : "outlined"}
                                    onClick={handleConditional}>Conditional</Button>
                                <Button
                                    variant={buttonFocused == "logic" ? "contained" : "outlined"}
                                    onClick={handleLogic}
                                    style={{ borderRadius: '0px 8px 0px 0px' }}>Logic</Button>
                            </ButtonGroup>
                        </Box>
                        <Box
                            component="form"
                            style={{ padding: '20px', border: '1px #5048E5 solid', borderRadius: '0px 8px 8px 8px', marginTop: '-1px' }}
                        >
                            {conditional ?
                                <>
                                    <Typography
                                        style={{ fontSize: '18px', color: '#5048E5' }}
                                    >
                                        This component should Display:
                                    </Typography>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={display}
                                        fullWidth
                                        size={'small'}
                                        onChange={handleDiplayValue}
                                    >
                                        <MenuItem value={true}>True</MenuItem>
                                        <MenuItem value={false}>False</MenuItem>
                                    </Select>
                                    <Typography style={{ fontSize: '18px', marginTop: '20px', color: '#5048E5' }}>
                                        When the form component:
                                    </Typography>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={when}
                                        fullWidth
                                        size={'small'}
                                        onChange={handleWhen}
                                    >
                                        {allFormFields(componentsData, fieldData).map((option, index) => (
                                            <MenuItem key={index} value={option.id}>{option.label}</MenuItem>
                                        ))}
                                    </Select>
                                    <Typography style={{ fontSize: '18px', marginTop: '20px', color: '#5048E5' }}>
                                        Has the value:
                                    </Typography>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="tooltip"
                                        type="text"
                                        size="small"
                                        fullWidth
                                        variant="outlined"
                                        value={compValue}
                                        onChange={handleCompValue}
                                    />
                                </>
                                :
                                <>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="label"
                                        label="Label"
                                        type="text"
                                        size="small"
                                        fullWidth
                                        variant="outlined"
                                        value={fieldLabel}
                                        onChange={handleLabel}
                                    />
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
                                    <Typography style={{ color: '#5048E5' }}>
                                        <Checkbox
                                            size={'small'}
                                            checked={isRequired}
                                            onChange={handleIsRequired}
                                        />Required <FieldTooltip tooltip={'A required field must be filled.'}/>
                                    </Typography>
                                    <Box style={{padding: '8px 16px'}}>
                                            <Typography
                                                style={{ marginTop: '10px', color: '#000' }}
                                            >
                                                Minimum Value
                                                <GeneralTooltip tipData={`Add Minimum Data Restriction for ${fieldData.label} `} />
                                            </Typography>
                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                <DesktopDatePicker
                                                   onChange={(newValue) => {
                                                        handleValidations('min',newValue);
                                                    }}
                                                    renderInput={(params) => <TextField {...params} fullWidth/>}
                                                    InputProps={{
                                                        endAdornment: <FieldTooltip tooltip={fieldData.tooltip} />
                                                    }}
                                                    name='min'
                                                    value={validations && validations.min ? validations.min : null}
                                                    inputFormat='dd/MM/yyyy'
                                                    maxDate={(validations  && validations.max) ? new Date(validations.max) : null}
                                                />
                                            </LocalizationProvider>
                                            
                                            <Typography
                                                style={{ marginTop: '10px', color: '#000' }}
                                            >
                                                Maximum Value
                                                <GeneralTooltip tipData={`Add Maximum Data Restriction for ${fieldData.label} `} />
                                            </Typography>

                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                <DesktopDatePicker
                                                    onChange={(newValue) => {
                                                        handleValidations('max',newValue);
                                                    }}
                                                    renderInput={(params) => <TextField {...params} fullWidth/>}
                                                    InputProps={{
                                                        endAdornment: <FieldTooltip tooltip={fieldData.tooltip} />
                                                    }}
                                                    name='max'
                                                    value={validations ? validations.max : null}
                                                    inputFormat='dd/MM/yyyy'
                                                    minDate={(validations  && validations.min) ? new Date(validations.min) : null}
                                                />
                                            </LocalizationProvider>
                                        </Box>
                                </>
                            }
                        </Box>
                    </Grid>
                    <DatefieldPreview
                        fieldLabel={fieldLabel}
                        fieldValue={fieldValue}
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
                        onClick={fieldData?handleUpdate:addDateField}
                        variant="outlined"
                        size='small'
                        color="success"
                    >{fieldData?"Save Changes":"Add Field"}</Button>
                </Grid>
            </DialogActions>
        </Dialog>
    )
}

export default DateField
