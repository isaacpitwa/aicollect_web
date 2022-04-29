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
import SectionPreview from '../previews/SectionPreview'

// This is the field for type=TextField
const Section = (props) => {

    const {
        setIsLoaded,
        setError,
        setSelectSection,
        setSectionId,
        setSubSectionId,
        componentsData,
        setComponentsData,
        setSectionCreated,
        updateFormData,
    } = useContext(FormContext)

    const { open, fieldData, handleClose } = props

    const [errorTag, setErrorTag] = useState(false)
    const [panelType, setPanelType] = useState('display')
    const [id] = useState(fieldData?fieldData.id:'')
    const [type] = useState(fieldData?fieldData.type:'section')
    const [display] = useState(fieldData?fieldData.display:'visible')
    const [fieldLabel, setFieldLabel] = useState(fieldData?fieldData.label:'')
    const [fieldDescription, setFieldDescription] = useState(fieldData?fieldData.description:'')
    const [tooltip, setTooltip] = useState(fieldData?fieldData.tooltip:'')
    const [dependency, setDependency] = useState(fieldData?fieldData.dependency:null)
    const [conditional, setConditional] = useState(fieldData?fieldData.conditional:null)
    const [components, setComponents] = useState(fieldData?fieldData.components:[])
    const [when, setWhen] = useState(fieldData&&fieldData.conditional?fieldData.conditional.when:'')
    const [value, setValue] = useState(fieldData&&fieldData.conditional?fieldData.conditional.value:'')
    
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
    }

    const conditionalPanel = (e) => {
        setPanelType("conditional")
    }

    const handleWhen = (e) => {
        setWhen(e.target.value)
    }

    const handleValue = (e) => {
        setValue(e.target.value)
    }

    const removeConditional = () => {
        setWhen('')
        setValue('')
    }

    const conditionalData = conditionalLogic({
        when: when,
        value: value
    })

    const addSection = () => {

        setIsLoaded(false)

        let sectionData = {
            id: uuidv4(),
            type: 'section',
            display: conditionalData?'hidden':display,
            label: fieldLabel,
            description: fieldDescription,
            tooltip: tooltip,
            dependency: dependency,
            conditional: conditionalData,
            components: components
        }

        let formFields = componentsData
        
        if(fieldLabel!=='') {
            setError(false)
            setSectionCreated(true)
            setSelectSection(true)
            setSectionId(sectionData.id)
            setSubSectionId(null)
            formFields.push(sectionData)
            setComponentsData(formFields)
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
        setIsLoaded(true)
    }

    const updateSection = () => {
        let sectionData = {
            id: id,
            type: type,
            display: conditionalData?'hidden':'visible',
            label: fieldLabel,
            description: fieldDescription,
            tooltip: tooltip,
            dependency: dependency,
            conditional: conditionalData,
            components: components
        }

        let newFormFields = componentsData;
        let sectionIndex = componentsData.findIndex(section => section.id === fieldData.id);
        newFormFields[sectionIndex] = sectionData
        setComponentsData(newFormFields)
        updateFormData()
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
                Section Component
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
                        style={{ padding: '30px 20px' }}
                    >
                        <FieldError fieldType={"section"} errorTag={errorTag}/>
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
                                        {allFormFields(componentsData, fieldData?fieldData:{ id: id, type: type }).map((option, index) => (
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
                                     <Typography
                                        style={{ paddingTop: '10px' }}
                                     >
                                        <Button
                                            disabled={when||value?false:true}
                                            variant='outlined'
                                            size='small'
                                            color='error'
                                            onClick={removeConditional}
                                        >
                                            Remove Conditional
                                        </Button>
                                     </Typography>
                                </>
                            :
                                <>
                                    <TextField
                                        required
                                        autoFocus
                                        margin="dense"
                                        id="label"
                                        label="Section Label"
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
                    <SectionPreview
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
                        onClick={fieldData?updateSection:addSection}
                        variant="outlined"
                        size='small'
                        color="success"
                    >{fieldData?"Save Changes":"Add Section"}</Button>
                </Grid>
            </DialogActions>
        </Dialog>
    )
}

export default Section
