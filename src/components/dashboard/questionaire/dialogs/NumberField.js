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
    Select,
    MenuItem,
    Checkbox
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

import { FormContext } from '../context';
import {
    DescriptionCard,
    allFormFields,
    findComponentIndex,
    allHiddenSubSections
} from '../utils';
import {
    FieldError,
} from '../utils/ErrorCards';
import GeneralTooltip from '../previews/GeneralTooltip'
import NumberfieldPreview from '../previews/NumberfieldPreview'

// This is the field for type=TextField
const NumberField = (props) => {

    const {
        setError,
        selectSection,
        sectionId,
        subSectionId,
        componentsData,
        addComponentToSection,
        updateComponentsData
    } = useContext(FormContext)

    const { open, fieldData, handleClose } = props
    
    const [errorTag, setErrorTag] = useState(false)
    const [compsData, setCompsData] = useState([]);
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
    const [dependency, setDependency] = useState(false)
    const [subSectionDisplay, setSubSectionDisplay] = useState('')

    useEffect(() => {
        setCompsData(componentsData);
    }, [updateComponentsData])

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

    const handleChecked = (e) => {
        setIsRequired(!isRequired)
    }

    const handleDisplay = (e) => {
        setButtonFocused("display")
        setConditional(false)
        setDependency(false)
    }

    const handleConditional = (e) => {
        setButtonFocused("conditional")
        setConditional(true)
        setDependency(false)
    }

    const handleLogic = (e) => {
        setButtonFocused("logic")
        setConditional(false)
        setDependency(false)
    }

    const handleDependency = (e) => {
        setButtonFocused("dependency")
        setDependency(true)
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

    const handleSubSectionDisplay = (e) => {
        setSubSectionDisplay(e.target.value)
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


    const addNumberField = () => {

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
            dependency: dependency,
            conditional: conditionalLogic()
        }

        if(sectionId&&fieldLabel!=='') {
            addComponentToSection(newFieldObj)
            setError(false)
            setErrorTag(false)
            setFieldLabel('')
            setFieldDescription('')
            setTooltip('')
            setIsRequired(!isRequired)
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
            value: value,
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
        updateComponentsData(findComponentIndex(fieldData, compsData), newField)
        handleClose()
    }

    const cancel = () => {
        setError(false)
        setErrorTag(false)
        setFieldLabel('')
        setFieldDescription('')
        setTooltip('')
        setIsRequired(!isRequired)
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
                Number Field Component
                <CancelIcon color='error' style={{ float: 'right', cursor: 'pointer' }} onClick={handleClose}/>
            </DialogTitle>
            <DialogContent>
                <Grid container>
                    <Grid item xs={12} md={6} style={{ padding: '20px' }}>
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
                        <ButtonGroup variant="outlined" size='small' aria-label="outlined button group">
                            <Button variant={buttonFocused == "display" ? "contained" : "outlined"} onClick={handleDisplay} style={{ borderRadius: '8px 0px 0px 0px' }}>Display</Button>
                            <Button variant={buttonFocused == "conditional" ? "contained" : "outlined"} onClick={handleConditional}>Conditional</Button>
                            <Button variant={buttonFocused == "logic" ? "contained" : "outlined"} onClick={handleLogic}>Logic</Button>
                            <Button variant={buttonFocused == "dependency" ? "contained" : "outlined"} onClick={handleDependency} style={{ borderRadius: '0px 8px 0px 0px' }}>Dependency</Button>
                        </ButtonGroup>
                        </Box>
                        <Box
                            component="form"
                            style={{ padding: '20px', border: '1px #5048E5 solid', borderRadius: '0px 8px 8px 8px', marginTop: '-1px' }}
                        >
                            {conditional?
                                <>
                                    <Typography style={{ fontSize: '15px', color: '#5048E5' }}>
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
                                    <Typography style={{ marginTop: '20px', fontSize: '15px', marginTop: '20px', color: '#5048E5' }}>
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
                                        {allFormFields(compsData).map(option => (
                                            <MenuItem value={option.id}>{option.label}</MenuItem>
                                        ))}
                                    </Select>
                                    <Typography style={{ marginTop: '10px', fontSize: '15px', marginTop: '20px', color: '#5048E5' }}>
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
                            :dependency?
                                <>
                                    <Typography style={{ fontSize: '15px', color: '#5048E5' }}>
                                        For Sub-Section:
                                    </Typography>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={subSectionId}
                                        fullWidth
                                        size={'small'}
                                        onChange={handleSubSectionId}
                                    >
                                        {allHiddenSubSections(fieldData.parentId, componentsData).map(option => (
                                            <MenuItem value={option.id}>{option.label}</MenuItem>
                                        ))}
                                    </Select>
                                    <DescriptionCard description={'Only applies for hidden Sub-Sections'} helperText={true} />
                                    <Typography style={{ marginTop: '20px', fontSize: '15px', color: '#5048E5' }}>
                                        Display by field value:
                                    </Typography>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={subSectionDisplay}
                                        fullWidth
                                        size={'small'}
                                        onChange={handleSubSectionDisplay}
                                    >
                                        <MenuItem value={'hidden'}>True</MenuItem>
                                        <MenuItem value={'visible'}>False</MenuItem>
                                    </Select>
                                    <Typography style={{ marginTop: '10px', fontSize: '15px', marginTop: '20px', color: '#5048E5' }}>
                                        Offset Value:
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        type={'number'}
                                        variant={'outlined'}
                                        value={value}
                                        size={'small'}
                                        onChange={handleFieldValue}
                                    />
                                </>                                        
                            :
                                <>
                                    <TextField
                                        required
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
                                        style={{ marginTop: '15px' }}
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
                                        style={{ marginTop: '25px' }}
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
                                        style={{ marginTop: '25px' }}
                                    />
                                    <Typography style={{ marginTop: '10px', color: '#5048E5' }}>
                                        <Checkbox size={'small'} checked={isRequired} onChange={handleChecked}/>Required<GeneralTooltip tipData={'A required field must be filled.'}/>
                                    </Typography>
                                </>
                            }
                        </Box>
                    </Grid>
                    <NumberfieldPreview fieldLabel={fieldLabel} fieldDescription={fieldDescription} tooltip={tooltip} isRequired={isRequired}/>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Grid item xs={12} md={12} style={{ padding: '30px' }} align='right'>
                    <Button onClick={cancel} variant="outlined" size='small' style={{ margin: '0px 20px' }} color="error">Cancel</Button>
                    <Button onClick={fieldData?handleUpdate:addNumberField} variant="outlined" size='small' color="success">{fieldData?"Save Changes":"Add Field"}</Button>
                </Grid>
            </DialogActions>
        </Dialog>
    )
}

export default NumberField
