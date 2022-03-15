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
    Checkbox,
    Select,
    MenuItem
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

import { FormContext } from '../context';
import {
    allFormFields,
    findComponentIndex,
} from '../utils';
import GeneralTooltip from '../previews/GeneralTooltip';
import TextfieldPreview from '../previews/TextfieldPreview';

// This is the field for type=TextField
const TextField_ = (props) => {

    const { sectionId, setSectionId, subSectionId, setSubSectionId, componentsData, updateComponentsData } = useContext(FormContext)

    const { open, createTextField, fieldData, handleClose } = props

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

    useEffect(() => {
        setCompsData(componentsData);
    }, [compsData])

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

    const getSectionId = () => {
        setSectionId(sectionId)
        setSubSectionId(subSectionId)
    }
    
    const addTextField = () => {

        let sectionObj = componentsData.find(comp => comp.id === sectionId )
        let newSectionObj = componentsData.find(comp => comp.id === sectionId )
        let newSubSectionObj = sectionObj.components.find(comp => comp.id === sectionId )

        const newFieldData = {
            id: id?id:uuidv4(),
            parentId: sectionId,
            subParentId: subSectionId,
            required: isRequired,
            display: 'visible',
            type: 'sub-section',
            label: fieldLabel,
            description: fieldDescription,
            tooltip: tooltip,
            dependency: dependency,
            conditional: conditional
        }

        newSectionObj.components.push(newFieldData)
        updateComponentsData(findComponentIndex(sectionObj, componentsData), newSectionObj)
        handleClose()
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
                Text Field Component
                <CancelIcon color='error' style={{ float: 'right', cursor: 'pointer' }} onClick={handleClose} />
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
                                <Button variant={buttonFocused == "logic" ? "contained" : "outlined"} onClick={handleLogic} style={{ borderRadius: '0px 8px 0px 0px' }}>Logic</Button>
                            </ButtonGroup>
                        </Box>
                        <Box
                            component="form"
                            style={{ padding: '20px', border: '1px #5048E5 solid', borderRadius: '0px 8px 8px 8px', marginTop: '-1px' }}
                        >
                            {conditional ?
                                <>
                                    <Typography style={{ fontSize: '18px', color: '#5048E5' }}>
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
                                        {allFormFields(compsData, fieldData.id, 'text').map(option => (
                                            <MenuItem value={option.id}>{option.label}</MenuItem>
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
                                        <Checkbox size={'small'} checked={isRequired} onChange={handleChecked} />Required<GeneralTooltip tipData={'A required field must be filled.'} />
                                    </Typography>
                                </>
                            }
                        </Box>
                    </Grid>
                    <TextfieldPreview fieldLabel={fieldLabel} fieldDescription={fieldDescription} tooltip={tooltip} isRequired={isRequired} />
                </Grid>
            </DialogContent>
            <DialogActions>
                <Grid item xs={12} md={12} style={{ padding: '30px' }} align='right'>
                    <Button onClick={cancel} variant="outlined" size='small' style={{ margin: '0px 20px' }} color="error">Cancel</Button>
                    <Button onClick={addTextField} variant="outlined" size='small' color="success">Save</Button>
                </Grid>
            </DialogActions>
        </Dialog>
    )
}

export default TextField_
