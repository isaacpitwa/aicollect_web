import React, { useState, useEffect, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid'
import {
    Box,
    Checkbox,
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
    FormControl,
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

import { FormContext } from '../context';
import {
    allFormFields,
    findComponentIndex,
} from '../utils';
import {
    FieldError,
} from '../utils/ErrorCards';
import GeneralTooltip from '../previews/GeneralTooltip';
import SelectBoxesPreview from '../previews/SelectBoxesPreview';

// This is the field for type=TextField
const SelectBoxField = (props) => {

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
    const [parentId] = useState(fieldData ? fieldData.parentId : false)
    const [subParentId] = useState(fieldData ? fieldData.subParentId : false)
    const [type] = useState(fieldData ? fieldData.type : 'select-box')
    const [fieldLabel, setFieldLabel] = useState(fieldData ? fieldData.label : '')
    const [fieldValue, setFieldValue] = useState(fieldData ? fieldData.value : '')
    const [fieldDescription, setFieldDescription] = useState(fieldData ? fieldData.description : '')
    const [tooltip, setTooltip] = useState(fieldData ? fieldData.tooltip : '')
    const [values, setValues] = useState([
        {
            'id': uuidv4(),
            'label': '',
            'checked': false,
        }
    ])
    const [isRequired, setIsRequired] = useState(fieldData ? fieldData.required : '')
    const [conditional, setConditional] = useState(false)
    const [display, setDisplay] = useState(fieldData&&fieldData.conditional?fieldData.conditional.display:'')
    const [when, setWhen] = useState(fieldData&&fieldData.conditional?fieldData.conditional.when:'')
    const [compValue, setCompValue] = useState(fieldData&&fieldData.conditional?fieldData.conditional.value:'')

    const handleLabel = (event) => {
        setFieldLabel(event.target.value);
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

    const addCheckBox = () => {
        let data = {
            'id': uuidv4(),
            'label': '',
            'checked': false
        }
        setValues(values => [...values, data])
    }

    const handleCheckbox = (e) => {
        const { name, value } = e.target;
        setValues(values=>[...values, { [name]: value }])
    };

    const removeCheckbox = (e) => {
        setValues(values.filter(item => item.id !== e.target.value));
    };  

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
    };

    const valuesLabelStatus = () => {
        let status = true
        values.map((value) => {
            if(value.label==='') {
                status = false
            }
        })
        return status
    }

    const addSelectBoxField = () => {

        let labelStatus = valuesLabelStatus()

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
            values: values,
            conditional: conditionalLogic()
        }

        if(sectionId&&fieldLabel!==''&&labelStatus) {
            addComponentToSection(newFieldObj)
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
        } else {
            setError(true)
            if(fieldLabel===''){
                setErrorTag('Label')
            }
            if(!labelStatus){
                setErrorTag('Options Label')
            }
        }
    }

    const cancel = () => {
        setError(false)
        setErrorTag(false)
        setFieldLabel('')
        setFieldValue('')
        setFieldDescription('')
        setTooltip('')
        setValues([
            {
                'id': uuidv4(),
                'label': '',
                'checked': false,
            }
        ])
        setIsRequired(false)
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
                Select values Component
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
                            <Button variant={buttonFocused == "conditional" ? "contained" : "outlined"} onClick={handleConditional} style={{ borderRadius: '0px 8px 0px 0px' }}>Conditional</Button>
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
                                        {allFormFields(componentsData, fieldData.id, 'text').map(option => (
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
                                    <TableContainer style={{ marginTop: '20px' }}>
                                        <Table
                                            size="small"
                                            aria-label="a dense table"
                                        >
                                            <TableHead color='primary'>
                                                <TableRow>
                                                    <TableCell>Default</TableCell>
                                                    <TableCell align="left">Option</TableCell>
                                                    <TableCell align="left">Value</TableCell>
                                                    <TableCell align="left"></TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {values.map(row=>(
                                                    <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                        <TableCell padding="checkbox">
                                                            <Checkbox
                                                                color="primary"
                                                                label='Default Value'
                                                                checked={row.checked}
                                                                onChange={(e) => {
                                                                    row.checked = !row.checked;
                                                                    setValues([...values]);
                                                                }}
                                                                inputProps={{
                                                                    'aria-labelledby': row.id,
                                                                }}
                                                            />
                                                        </TableCell>
                                                        <TableCell>
                                                            <TextField                                                        
                                                                margin="dense"
                                                                id="outlined-multiline-static"
                                                                label="Label"
                                                                size="small"
                                                                variant="outlined"
                                                                fullWidth
                                                                value={row.label}
                                                                onChange={(e) => {
                                                                    setError(false)
                                                                    setErrorTag(false)
                                                                    row.label = e.target.value;
                                                                    setValues([...values]);
                                                                }}
                                                            />
                                                        </TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                margin="dense"
                                                                id="outlined-multiline-static"
                                                                label="Value"
                                                                size="small"
                                                                variant="outlined"
                                                                fullWidth
                                                                value={row.label.toLowerCase()}
                                                            />
                                                        </TableCell>
                                                        <TableCell>
                                                            <Button
                                                                disabled={values.length<=1}
                                                                variant='contained'
                                                                size='small'
                                                                color='error'
                                                                value={row.id}
                                                                onClick={(e) => {
                                                                    setValues([...values]);
                                                                    if(values.length !== 1){
                                                                        setValues(values.filter(item => item.id !== e.target.value));
                                                                    }
                                                                }}
                                                            >
                                                                Remove
                                                            </Button>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    <Typography align='right'>
                                        <Button variant='contained' size='small' color='primary' onClick={addCheckBox}>Add Another</Button>
                                    </Typography>
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
                                        <Checkbox size={'small'} checked={isRequired} onChange={handleIsRequired}/>Required<GeneralTooltip tipData={'A required field must be filled.'}/>
                                    </Typography>
                                </>
                            }
                        </Box>
                    </Grid>
                    <SelectBoxesPreview fieldLabel={fieldLabel} fieldDescription={fieldDescription} tooltip={tooltip} values={values} isRequired={isRequired}/>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Grid item xs={12} md={12} style={{ padding: '30px' }} align='right'>
                    <Button onClick={cancel} variant="outlined" size='small' style={{ margin: '0px 20px' }} color="error">Cancel</Button>
                    <Button onClick={fieldData?handleUpdate:addSelectBoxField} variant="outlined" size='small' color="success">{fieldData?"Save Changes":"Add Field"}</Button>
                </Grid>
            </DialogActions>
        </Dialog>
    )
}

export default SelectBoxField
