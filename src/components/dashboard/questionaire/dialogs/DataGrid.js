import { useState, useEffect, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid'
import {
    Box,
    Button,
    ButtonGroup,
    Grid,
    Typography,
    Select,
    MenuItem,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

import { FormContext } from '../context'
import {
    allFormFields,
    conditionalLogic
} from '../utils';
import {
    FieldError,
} from '../utils/ErrorCards';
import SubSectionPreview from '../previews/SubSectionPreview'

// This is the field for type=TextField
const DataGrid = (props) => {

    const {
        setError,
        sectionId,
        setSelectSection,
        setSectionId,
        setSubSectionId,
        componentsData,
        addComponentToSection,
        updateFieldInSection,
    } = useContext(FormContext)

    const { open, fieldData, handleClose } = props

    const [errorTag, setErrorTag] = useState(false)
    const [panelType, setPanelType] = useState('display')
    const [id] = useState(fieldData ? fieldData.id : '')
    const [type] = useState(fieldData ? fieldData.type : 'data-grid' )
    const [display] = useState(fieldData?fieldData.display:'visible')
    const [fieldLabel, setFieldLabel] = useState(fieldData ? fieldData.label : '')
    const [fieldDescription, setFieldDescription] = useState(fieldData ? fieldData.description : '')
    const [tooltip, setTooltip] = useState(fieldData ? fieldData.tooltip : '')
    const [dependency, setDependency] = useState(fieldData&&fieldData.dependency?fieldData.dependency:null)
    const [conditional, setConditional] = useState(fieldData&&fieldData.conditional?fieldData.conditional:null)
    const [components, setComponents] = useState(fieldData ? fieldData.components : [])
    const [when, setWhen] = useState(fieldData && fieldData.conditional ? fieldData.conditional.when : '')
    const [value, setValue] = useState(fieldData && fieldData.conditional ? fieldData.conditional.value : '')

    const handleLabel = (e) => {
        setFieldLabel(e.target.value)
    }

    const handleDescription = (e) => {
        setFieldDescription(e.target.value)
    }

    const handleTooltip = (e) => {
        setTooltip(e.target.value)
    }

    const displayPanel = (e) => {
        setPanelType("display")
        setConditional(false)
    }

    const conditionalPanel = (e) => {
        setPanelType("conditional")
        setConditional(true)
    }

    const handleWhen = (e) => {
        setWhen(e.target.value)
    }

    const handleValue = (e) => {
        setValue(e.target.value)
    }

    const removeConditional = () => {
        setWhen("")
        setValue("")
    }

    const conditionalData = conditionalLogic({
        when: when,
        value: value
    })
    
    const addSubSection = () => {
        
        const newSubSection = {
            id: uuidv4(),
            parentId: sectionId,
            type: type,
            display: conditionalData?'hidden':display,
            label: fieldLabel,
            description: fieldDescription,
            tooltip: tooltip,
            dependency: dependency,
            conditional: conditionalData,
            components: components
        }

        if(sectionId&&fieldLabel!=='') {
            setError(false)
            setErrorTag(false)
            setSelectSection(true)
            setSectionId(newSubSection.parentId)
            setSubSectionId(newSubSection.id)
            addComponentToSection(newSubSection)
            setPanelType('display')
            setFieldLabel('')
            setFieldDescription('')
            setTooltip('')
            setDependency(null)
            setConditional(null)
            setComponents([])
            removeConditional()
            handleClose()
        } else {
            setError(true)
            if(fieldLabel===''){
                setErrorTag('Label')
            }
        }
    }
    
    const updateSubSection = () => {
        const updatedField = {
            id: fieldData.id,
            parentId: fieldData.parentId,
            display: conditionalData?'hidden':display,
            type: fieldData.type,
            label: fieldLabel,
            description: fieldDescription,
            tooltip: tooltip,
            dependency: dependency,
            conditional: conditionalData,
            components: components,
        }

        updateFieldInSection(updatedField)
        handleClose()
    }

    const cancel = () => {
        setError(false)
        setErrorTag(false)
        setPanelType('display')
        setFieldLabel(fieldData?fieldData.label:'')
        setFieldDescription(fieldData?fieldData.description:'')
        setTooltip(fieldData?fieldData.tooltip:'')
        setDependency(null)
        removeConditional()
        setComponents([])
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
                
                Data Grid  Component
                <CancelIcon color='error' style={{ float: 'right', cursor: 'pointer' }} onClick={handleClose}/>
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
                                variant={panelType == "display" ? "contained" : "outlined"}
                                onClick={displayPanel}
                                style={{ borderRadius: '8px 0px 0px 0px' }}
                            >Display</Button>
                            <Button
                                variant={panelType == "conditional" ? "contained" : "outlined"}
                                onClick={conditionalPanel}
                                style={{ borderRadius: '0px 8px 0px 0px' }}
                            >Conditional</Button>
                        </ButtonGroup>
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
                            :
                                <>
                                    <TextField
                                        required
                                        autoFocus
                                        margin="dense"
                                        id="label"
                                        label="Data Grid Label"
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
                                </>
                            }
                        </Box>
                    </Grid>
                    <SubSectionPreview
                        sectionLabel={fieldLabel}
                        sectionDescription={fieldDescription}
                        tooltip={tooltip}
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
                        onClick={fieldData?updateSubSection:addSubSection}
                        variant="outlined"
                        size='small'
                        color="success"
                    >{fieldData?"Save Changes":"Add Data Grid"}</Button>
                </Grid>
            </DialogActions>
        </Dialog>
    )
}

export default DataGrid
