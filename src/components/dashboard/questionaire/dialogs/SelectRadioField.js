import React, { useState, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid'
import {
    Box,
    Checkbox,
    Button,
    ButtonGroup,
    Grid,
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Radio,
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Select,
    MenuItem
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

import { FormContext } from '../context';
import {
    allFormFields,
} from '../utils';
import {
    FieldError,
} from '../utils/ErrorCards';
import GeneralTooltip from '../previews/GeneralTooltip';
import SelectRadioPreview from '../previews/SelectRadioPreview';

// This is the field for type=TextField
const SelectRadioField = (props) => {

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
    const [type] = useState(fieldData ? fieldData.type : 'radio')
    const [fieldLabel, setFieldLabel] = useState(fieldData ? fieldData.label : '')
    const [fieldValue, setFieldValue] = useState(fieldData ? fieldData.value : '')
    const [fieldDescription, setFieldDescription] = useState(fieldData ? fieldData.description : '')
    const [tooltip, setTooltip] = useState(fieldData ? fieldData.tooltip : '')
    const [radios, setRadios] = useState(fieldData? fieldData.radios : [
        {
            'id': uuidv4(),
            'label': '',
            'value': '',
        }
    ])
    const [isRequired, setIsRequired] = useState(fieldData ? fieldData.required : false )
    const [conditional, setConditional] = useState(false)
    const [display, setDisplay] = useState(fieldData&&fieldData.conditional?fieldData.conditional.display:'')
    const [when, setWhen] = useState(fieldData&&fieldData.conditional?fieldData.conditional.when:'')
    const [compValue, setCompValue] = useState(fieldData&&fieldData.conditional?fieldData.conditional.value:'')

    const handleRemoveItem = (e) => {
        setradios(radios.filter(item => item.id !== e.target.value));
    };

    const handleLabel = (e) => {
        setFieldLabel(e.target.value);
    }
    
    const handleRadio = (e) => {
        setRadioValue(e.target.value)
    }

    const handleDescription = (event) => {
        setFieldDescription(event.target.value);
    }

    const handleTooltip = (e) => {
        setTooltip(e.target.value)
    }

    const addRadio = () => {
        let data = {
            'id': uuidv4(),
            'label': '',
            'values': ''
        }
        setRadios(radios => [...radios, data])
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

    const optionsLabelStatus = () => {
        let status = true
        radios.map((radio) => {
            if(radio.label==='') {
                status = false
            }
        })
        return status
    }

    const addRadioField = () => {

        let labelStatus = optionsLabelStatus()

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
            radios: radios,
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
            setRadios([
                {
                    'id': uuidv4(),
                    'label': '',
                    'value': '',
                }
            ])
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

    const handleUpdate = () => {

        let labelStatus = optionsLabelStatus()

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
            radios: radios,
            conditional: conditionalLogic()
        }

        if(sectionId&&fieldLabel!==''&&labelStatus) {
            updateFieldInSection(newFieldObj)
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
        setFieldLabel('')
        setFieldValue('')
        setFieldDescription('')
        setTooltip('')
        setRadios([
            {
                'id': uuidv4(),
                'label': '',
                'value': '',
            }
        ])
        setIsRequired(!isRequired)
        handleClose()
    }

    const RadioOption = (valueSelected) => {

        return (
            <Radio
                checked={fieldValue === `${valueSelected}`}
                onChange={handleRadio}
                value={valueSelected}
                name="radio-buttons"
                inputProps={{ 'aria-label': `${valueSelected}` }}
            />
        )
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
                Select Radio Component
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
                                        {allFormFields(componentsData, id, 'text').map((option, index) => (
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
                                                {radios.map(row=>(
                                                    <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                        <TableCell padding="checkbox">
                                                            {RadioOption(row.id)}
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
                                                                    row.label = e.target.value;
                                                                    setRadios([...radios]);
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
                                                                disabled={radios.length<=1}
                                                                variant='contained'
                                                                size='small'
                                                                color='error'
                                                                value={row.id}
                                                                onClick={(e) => {
                                                                    setRadios([...radios]);
                                                                    if(radios.length !== 1){
                                                                        setRadios(radios.filter(item => item.id !== e.target.value));
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
                                        <Button variant='contained' size='small' color='primary' onClick={addRadio}>Add Another</Button>
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
                    <SelectRadioPreview fieldLabel={fieldLabel} fieldDescription={fieldDescription} tooltip={tooltip} fieldValue={fieldValue} radios={radios} isRequired={isRequired}/>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Grid item xs={12} md={12} style={{ padding: '30px' }} align='right'>
                    <Button onClick={cancel} variant="outlined" size='small' style={{ margin: '0px 20px' }} color="error">Cancel</Button>
                    <Button onClick={fieldData?handleUpdate:addRadioField} variant="outlined" size='small' color="success">{fieldData?"Save Changes":"Add Field"}</Button>
                </Grid>
            </DialogActions>
        </Dialog>
    )
}

export default SelectRadioField
