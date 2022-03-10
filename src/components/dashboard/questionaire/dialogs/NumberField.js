import React, { useState, useEffect, useContext } from 'react';
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
import GeneralTooltip from '../previews/GeneralTooltip'
import NumberfieldPreview from '../previews/NumberfieldPreview'

// This is the field for type=TextField
const NumberField = (props) => {

    const { componentsData, updateComponentsData } = useContext(FormContext)

    const { open, createNumberField, fieldData, handleClose } = props
    
    const [compsData, setCompsData] = useState([]);
    const [buttonFocused, setButtonFocused] = useState('display')
    const [id, setId] = useState(fieldData ? fieldData.id : '')
    const [parentId, setParentId] = useState(fieldData ? fieldData.parentId : '')
    const [subParentId, setSubParentId] = useState(fieldData ? fieldData.subParentId : '')
    const [type, setType] = useState(fieldData ? fieldData.type : '')
    const [value, setValue] = useState(fieldData ? fieldData.value : '')
    const [fieldLabel, setFieldLabel] = useState(fieldData ? fieldData.label : '')
    const [fieldDescription, setFieldDescription] = useState(fieldData ? fieldData.description : '')
    const [tooltip, setTooltip] = useState(fieldData ? fieldData.tooltip : '')
    const [isRequired, setIsRequired] = useState(fieldData ? fieldData.required : '')
    const [conditional, setConditional] = useState(false)
    const [display, setDisplay] = useState(fieldData&&fieldData.conditional?fieldData.conditional.display:'')
    const [when, setWhen] = useState(fieldData&&fieldData.conditional?fieldData.conditional.when:'')
    const [compValue, setCompValue] = useState(fieldData&&fieldData.conditional?fieldData.conditional.value:'')

    const [dependency, setDependency] = useState(false)
    const [subSectionId, setSubSectionId] = useState('')
    const [subSectionDisplay, setSubSectionDisplay] = useState('')

    useEffect(() => {
        setCompsData(componentsData);
    }, [updateComponentsData])

    const handleLabel = (event) => {
        setFieldLabel(event.target.value);
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

    const handleSubSectionId = (e) => {
        setSubSectionId(e.target.value)
    }

    const handleSubSectionDisplay = (e) => {
        setSubSectionDisplay(e.target.value)
    }

    const handleFieldValue = (e) => {
        setValue(e.target.value)
    }

    const handleUpdate = () => {
        let newField = {
            id: id,
            parentId: parentId,
            subParentId: subParentId,
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
                    <Button onClick={handleUpdate} variant="outlined" size='small' color="success">Save</Button>
                </Grid>
            </DialogActions>
        </Dialog>
    )
}

export default NumberField
