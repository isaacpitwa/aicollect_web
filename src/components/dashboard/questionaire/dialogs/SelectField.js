import React, { useState, useContext } from 'react';
import dialogStyles from '../styles/FormStyles';
import { v4 as uuidv4 } from 'uuid';
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
    conditionalLogic
} from '../utils';
import {
    FieldError,
} from '../utils/ErrorCards';
import GeneralTooltip from '../previews/GeneralTooltip';
import SelectPreview from '../previews/SelectPreview';

// This is the field for type=TextField
const SelectField = (props) => {

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
    const [panelType, setPanelType] = useState('display')
    const [id] = useState(fieldData?fieldData.id:'')
    const [parentId] = useState(fieldData?fieldData.parentId:sectionId)
    const [subParentId] = useState(fieldData?fieldData.subParentId:subSectionId)
    const [type] = useState(fieldData ? fieldData.type : 'select')
    const [display] = useState(fieldData&&fieldData.display?fieldData.display:'visible')
    const [fieldLabel, setFieldLabel] = useState(fieldData?fieldData.label:'')
    const [fieldValue, setFieldValue] = useState(fieldData?fieldData.value:'')
    const [options, setOptions] = useState(fieldData?fieldData.options:[{id: uuidv4(),label:'',value:''}])
    const [fieldDescription, setFieldDescription] = useState(fieldData?fieldData.description:'')
    const [tooltip, setTooltip] = useState(fieldData ? fieldData.tooltip : '')
    const [isRequired, setIsRequired] = useState(fieldData ? fieldData.required : false )
    const [dependency, setDependency] = useState(fieldData&&fieldData.dependency?fieldData.dependency:null)
    const [conditional, setConditional] = useState(fieldData&&fieldData.conditional?fieldData.conditional:null)
    const [when, setWhen] = useState(fieldData&&fieldData.conditional?fieldData.conditional.when:'')
    const [value, setValue] = useState(fieldData&&fieldData.conditional?fieldData.conditional.value:'')

    const handleLabel = (e) => {
        setFieldLabel(e.target.value);
    }
    
    const handleSelect = (e) => {
        setFieldValue(e.target.value)
    }

    const addOption = () => {
        let optionId = uuidv4()
        let data = {
            'id': optionId,
            'label': '',
            'value': ''
        }
        setOptions(options => [...options, data])
    }

    const handleDescription = (event) => {
        setFieldDescription(event.target.value);
    }

    const handleTooltip = (e) => {
        setTooltip(e.target.value)
    }

    const handleIsRequired = (e) => {
        setIsRequired(!isRequired)
    }

    const displayPanel = (e) => {
        setPanelType("display")
        setConditional(false)
    }

    const conditionalPanel = (e) => {
        setPanelType("conditional")
        setConditional(true)
    }

    const logicPanel = (e) => {
        setPanelType("logic")
    }

    const handleWhen = (e) => {
        setWhen(e.target.value)
    }

    const handleValue = (e) => {
        setValue(e.target.value)
    }

    const removeConditional = () => {
        setWhen(conditional?fieldData.conditional.when:'')
        setValue(conditional?fieldData.conditional.value:'')
    }

    const conditionalData = conditionalLogic({
        when: when,
        value: value
    })

    const optionsLabelStatus = () => {
        let status = true
        options.map((option) => {
            if(option.label==='') {
                status = false
            }
        })
        return status
    }

    const addSelectField = () => {

        let labelStatus = optionsLabelStatus()

        let newFieldObj = {
            id: uuidv4(),
            parentId: sectionId,
            subParentId: subSectionId,
            type: type,
            display: conditionalData?'hidden':display,
            label: fieldLabel,
            value: fieldValue,
            options: options,
            description: fieldDescription,
            tooltip: tooltip,
            required: isRequired,
            dependency: dependency,
            conditional: conditionalData,
        }

        if(sectionId&&fieldLabel!==''&&labelStatus) {
            addComponentToSection(newFieldObj)
            setError(false)
            setErrorTag(false)
            setPanelType('display')
            setFieldLabel('')
            setFieldValue('')
            setOptions([{id: uuidv4(),label:'',value:''}])
            setFieldDescription('')
            setTooltip('')
            setIsRequired(false)
            setDependency(null)
            setConditional(null)
            removeConditional()
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
            parentId: parentId,
            subParentId: subParentId,
            type: type,
            display: conditionalData?'hidden':display,
            label: fieldLabel,
            value: fieldValue,
            options: options,
            description: fieldDescription,
            tooltip: tooltip,
            required: isRequired,
            dependency: dependency,
            conditional: conditionalData,
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
        setError(false)
        setErrorTag(false)
        setPanelType('display')
        setFieldLabel(fieldData?fieldData.label:'')
        setFieldValue(fieldData?fieldData.value:'')
        setOptions(fieldData?fieldData.options:[{id: uuidv4(),label:'',value:''}])
        setFieldDescription(fieldData?fieldData.description:'')
        setTooltip(fieldData?fieldData.tooltip:'')
        setIsRequired(!isRequired)
        setDependency(fieldData&&fieldData.dependency?fieldData.dependency:null)
        removeConditional()
        handleClose()
    }

    const newFieldData = fieldData?fieldData:{
        id: id,
        parentId: parentId,
        subParentId: subParentId,
        type: type
    }
    
    const classes = dialogStyles();

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth={true}
            maxWidth={'lg'}
        >
            <DialogTitle
                className={classes.title}
            >
                Select Field Component
                <CancelIcon
                    color='error'
                    className={classes.cancelBtn}
                    onClick={handleClose}
                />
            </DialogTitle>
            <DialogContent>
                <Grid container>
                    <Grid
                        item
                        xs={12}
                        md={6}
                        className={classes.content}
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
                                        variant={panelType == "display" ? "contained" : "outlined"}
                                        onClick={displayPanel}
                                        style={{ borderRadius: '8px 0px 0px 0px' }}
                                    >Display</Button>
                                    <Button
                                        variant={panelType == "conditional" ? "contained" : "outlined"}
                                        onClick={conditionalPanel}
                                    >Conditional</Button>
                                    <Button
                                        disabled
                                        variant={panelType == "logic" ? "contained" : "outlined"}
                                        onClick={logicPanel}
                                        style={{ borderRadius: '0px 8px 0px 0px' }}
                                    >Logic</Button>
                                </ButtonGroup>
                            </Box>
                        <Box
                            component="form"
                            style={{ padding: '20px', border: '1px #5048E5 solid', borderRadius: '0px 8px 8px 8px', marginTop: '-1px' }}
                        >
                            {conditional ?
                                <>
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
                                        {allFormFields(componentsData, newFieldData).map((option, index) => (
                                            <MenuItem
                                                key={index}
                                                value={option.id}
                                            >{option.label}</MenuItem>
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
                                        value={value}
                                        onChange={handleValue}
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
                                                    <TableCell align="left">Option</TableCell>
                                                    <TableCell align="left">Value</TableCell>
                                                    <TableCell align="left"></TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {options.map(row=>(
                                                    <TableRow key={row.boxId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
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
                                                                    setOptions([...options]);
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
                                                                disabled={options.length<=1}
                                                                variant='contained'
                                                                size='small'
                                                                color='error'
                                                                value={row.id}
                                                                onClick={(e) => {
                                                                    setOptions([...options]);
                                                                    if(options.length !== 1){
                                                                        setOptions(options.filter(item => item.id !== e.target.value));
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
                                        <Button variant='contained' size='small' color='primary' onClick={addOption}>Add Another</Button>
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
                                        <Checkbox
                                            size={'small'}
                                            checked={isRequired}
                                            onChange={handleIsRequired}
                                        />Required<GeneralTooltip tipData={'A required field must be filled.'}/>
                                    </Typography>
                                </>
                            }
                        </Box>
                    </Grid>
                    <SelectPreview
                        fieldLabel={fieldLabel}
                        fieldValue={fieldValue}
                        options={options}
                        fieldDescription={fieldDescription}
                        tooltip={tooltip}
                        isRequired={isRequired}
                    />
                </Grid>
            </DialogContent>
            <DialogActions>
                <Grid item xs={12} md={12} style={{ padding: '30px' }} align='right'>
                    <Button onClick={cancel} variant="outlined" size='small' style={{ margin: '0px 20px' }} color="error">Cancel</Button>
                    <Button onClick={fieldData?handleUpdate:addSelectField} variant="outlined" size='small' color="success">{fieldData?"Save Changes":"Add Field"}</Button>
                </Grid>
            </DialogActions>
        </Dialog>
    )
}

export default SelectField
