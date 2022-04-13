import React, { useState, useContext } from 'react';
import {
    dialogStyles,
    modeBtnStyles
} from '../styles/FormStyles';
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

import { FormContext } from '../context';
import {
    allFormFields,
    conditionalLogic,
    getSectionsSubSections
} from '../utils';
import {
    FieldError,
} from '../utils/ErrorCards';
import GeneralTooltip from '../previews/GeneralTooltip';
import FieldPreview from '../previews';

const FieldDialog = (props) => {

    const {
        setError,
        sectionId,
        subSectionId,
        componentsData,
        addComponentToSection,
        updateFieldInSection,
    } = useContext(FormContext)

    const { open, dialogType, fieldData, handleClose } = props;

    const [errorTag, setErrorTag] = useState(false)
    const [panelType, setPanelType] = useState('display')
    const [id] = useState(fieldData?fieldData.id:'')
    const [parentId] = useState(fieldData?fieldData.parentId:sectionId)
    const [subParentId] = useState(fieldData?fieldData.subParentId:subSectionId)
    const [type] = useState(fieldData?fieldData.type:dialogType)
    const [display] = useState(fieldData&&fieldData.display?fieldData.display:'visible')
    const [fieldLabel, setFieldLabel] = useState(fieldData?fieldData.label:'')
    const [fieldValue, setFieldValue] = useState(fieldData?fieldData.value:'')
    const [options, setOptions] = useState(fieldData?fieldData.options:[{id: uuidv4(),label:'',value:''}])
    const [fieldDescription, setFieldDescription] = useState(fieldData?fieldData.description:'')
    const [tooltip, setTooltip] = useState(fieldData?fieldData.tooltip:'')
    const [isRequired, setIsRequired] = useState(fieldData?fieldData.required:false)
    const [conditional, setConditional] = useState(fieldData?fieldData.conditional:null)
    const [logic, setLogic] = useState(null)
    const [dependency, setDependency] = useState(fieldData&&fieldData.dependency?fieldData.dependency.id:null)
    const [when, setWhen] = useState(fieldData?fieldData.conditional.when:'')
    const [value, setValue] = useState(fieldData?fieldData.conditional.value:'')

    const handleLabel = (event) => {
        setFieldLabel(event.target.value);
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
    };

    const handleTooltip = (e) => {
        setTooltip(e.target.value)
    }

    const handleIsRequired = (e) => {
        setIsRequired(!isRequired)
    }

    const handleDependency = (e) => {
        setDependency(getDependantField(e.target.value))
    }

    const displayPanel = (e) => {
        setPanelType("display")
    }

    const conditionalPanel = (e) => {
        setPanelType("conditional")
    }

    // To be used later
    const logicPanel = (e) => {
        setPanelType("logic")
    }

    const dependencyPanel = (e) => {
        setPanelType("dependency")

    }

    const handleWhen = (e) => {
        setWhen(e.target.value)
    }

    const handleValue = (e) => {
        setValue(e.target.value)
    }

    const optionsLabelStatus = () => {
        let status = true
        options.map((option) => {
            if(option.label==='') {
                status = false
            }
        })
        return status
    }

    const removeConditional = () => {
        setWhen(conditional?fieldData.conditional.when:'')
        setValue(conditional?fieldData.conditional.value:'')
    }

    const conditionalData = conditionalLogic({
        when: when,
        value: value
    });

    const getDependantField = (fieldId) => {
        try {
            let field = getSectionsSubSections(parentId, componentsData).find(field=>field.id===fieldId)
            if(field) return { type: field.type, id: field.id }

        } catch (err) {
            return null
        }
    }

    const addTextField = () => {

        let newFieldObj = {
            id: uuidv4(),
            parentId: sectionId,
            subParentId: subSectionId,
            type: type,
            display: conditionalData?'hidden':display,
            label: fieldLabel,
            value: fieldValue,
            description: fieldDescription,
            tooltip: tooltip,
            required: isRequired,
            conditional: conditionalData,
            logic: logic,
            dependency: dependantId?dependantId:null,
        }

        if(sectionId&&fieldLabel!=='') {
            addComponentToSection(newFieldObj)
            setError(false)
            setErrorTag(false)
            setPanelType('display')
            setFieldLabel('')
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
        }
    }

    const handleUpdate = () => {

        let textFieldData = {
            id: id,
            parentId: parentId,
            subParentId: subParentId,
            type: type,
            display: conditionalData?'hidden':display,
            label: fieldLabel,
            value: fieldValue,
            description: fieldDescription,
            tooltip: tooltip,
            required: isRequired,
            dependency: dependency,
            conditional: conditionalData,
        }

        updateFieldInSection(textFieldData)
        handleClose()

    }

    const cancel = () => {
        setError(false)
        setErrorTag(false)
        setPanelType('display')
        setFieldLabel(fieldData?fieldData.label:'')
        setFieldValue(fieldData?fieldData.value:'')
        setFieldDescription(fieldData?fieldData.description:'')
        setTooltip(fieldData?fieldData.tooltip:'')
        setIsRequired(!isRequired)
        setDependency(fieldData&&fieldData.dependency?fieldData.dependency:null)
        removeConditional()
        handleClose()
    };

    const mainClass = dialogStyles();
    const modeBtnClass = modeBtnStyles();

    const DialogModes = () => {

        return (
            <ButtonGroup
                variant="outlined"
                size='small'
                aria-label="outlined button group"
            >
                <Button
                    variant={panelType==="display"?"contained":"outlined"}
                    onClick={displayPanel}
                    className={modeBtnClass.startBtn}
                >Display</Button>
                <Button
                    variant={panelType==="conditional"?"contained":"outlined"}
                    onClick={conditionalPanel}
                >Conditional</Button>
                <Button
                    disabled
                    variant={panelType==="logic"?"contained":"outlined"}
                    onClick={logicPanel}
                >Logic</Button>
                <Button
                    disabled={dialogType==='number'?true:false}
                    variant={panelType == "dependency" ? "contained" : "outlined"}
                    onClick={dependencyPanel}
                    className={modeBtnClass.endBtn}
                >Dependency</Button>
            </ButtonGroup>            
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
                Text Field Component
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
                            {DialogModes()}
                        </Box>
                        <Box
                            component="form"
                            style={{ padding: '20px', border: '1px #5048E5 solid', borderRadius: '0px 8px 8px 8px', marginTop: '-1px' }}
                        >
                            {panelType==='conditional'?
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
                                        value={value}
                                        onChange={handleValue}
                                    />
                                </>
                            :panelType==="dependency"?
                                <>
                                    <Typography
                                        style={{ fontSize: '15px', color: '#5048E5' }}
                                    >
                                        For Section/Sub-Section:
                                    </Typography>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={dependency}
                                        fullWidth
                                        size={'small'}
                                        onChange={handleDependency}
                                    >
                                        {getSectionsSubSections(sectionId, componentsData).map((option, index) => (
                                            <MenuItem
                                                key={index}
                                                value={option.id}
                                            >
                                                {option.label} ={'>'} <small>[{option.type}]</small>
                                            </MenuItem>
                                        ))}
                                    </Select>
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
                                        />Required<GeneralTooltip tipData={'A required field must be filled.'} />
                                    </Typography>
                                </>
                            }
                        </Box>
                    </Grid>
                    <FieldPreview
                        fieldLabel={fieldLabel}
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

export default FieldDialog
