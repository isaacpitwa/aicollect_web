import { useState, useEffect, useContext } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { styled } from '@mui/material/styles'
import {
    Box,
    Paper,
    Button,
    Grid,
    Typography,
    Stack,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    TextField
} from '@mui/material'
import { Draggable } from "react-beautiful-dnd"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import SelectAllIcon from '@mui/icons-material/SelectAll'
import TextFieldsIcon from '@mui/icons-material/TextFields'
import TagIcon from '@mui/icons-material/Tag'
import ListIcon from '@mui/icons-material/List'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail'
import BusinessIcon from '@mui/icons-material/Business'
import TextSnippetIcon from '@mui/icons-material/TextSnippet'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked'
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk'
import SmartButtonIcon from '@mui/icons-material/SmartButton'
import CalculateIcon from '@mui/icons-material/Calculate'
import ImageIcon from '@mui/icons-material/Image'
import PersonPinIcon from '@mui/icons-material/PersonPin'
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt'
import MapIcon from '@mui/icons-material/Map'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn'
import GestureIcon from '@mui/icons-material/Gesture'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import MicIcon from '@mui/icons-material/Mic'
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary'
import BlurLinearIcon from '@mui/icons-material/BlurLinear'
import QrCode2Icon from '@mui/icons-material/QrCode2'
import VerticalSplitIcon from '@mui/icons-material/VerticalSplit'
import TableChartIcon from '@mui/icons-material/TableChart'
import LinearScaleIcon from '@mui/icons-material/LinearScale'
import GradeIcon from '@mui/icons-material/Grade'

import ButtonsLoader from './utils/ButtonsLoader';
import Section from './dialogs/Section'
import SubSection from './dialogs/SubSection'
import TextField_ from './dialogs/TextField'
import TextAreaField from './dialogs/TextAreaField'
import NumberField from './dialogs/NumberField'
import SelectBoxField from './dialogs/SelectBoxField'
import SelectField from './dialogs/SelectField'
import SelectRadioField from './dialogs/SelectRadioField'
import EmailField from './dialogs/EmailField'
import PhoneField from './dialogs/PhoneField'

import { FormContext } from './context'
import DragNDrop from './dragNdrop'
import FormRenderer from './FormRenderer'


const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}))


const Questionaire = () => {

    const {
        isLoaded,
        refresh,
        sectionCreated,
        formData,
        setFormData,
        addComponent,
        componentsData,
        updateFormData,
        formPreview,
        editStatus,
        handleFormPreview
    } = useContext(FormContext)

    const [dataIsLoaded, setDataIsLoaded] = useState(false)
    const [formName, setFormName] = useState('')
    const [sectionDialog, setSectionDialog] = useState(false)
    const [subSectionDialog, setSubSectionDialog] = useState(false)
    const [textFieldDialog, setTextFieldDialog] = useState(false)
    const [textAreaFieldDialog, setTextAreaFieldDialog] = useState(false)
    const [numberFieldDialog, setNumberFieldDialog] = useState(false)
    const [selectBoxDialog, setSelectBoxDialog] = useState(false)
    const [selectDialog, setSelectDialog] = useState(false)
    const [selectRadioDialog, setSelectRadioDialog] = useState(false)
    const [emailFieldDialog, setEmailFieldDialog] = useState(false)
    const [phoneFieldDialog, setPhoneFieldDialog] = useState(false)
    const [areaMappingDialog, setAreaMappingDialog] = useState(false)
    const [open, setOpen] = useState(false)

    useEffect(() => {
        setDataIsLoaded(isLoaded)
        setFormName(formData.name)
    }, [isLoaded, componentsData, sectionDialog])

    const handleFormName = (e) => {
        setFormName(e.target.value)
    }

    const handleSection = () => {
        setSectionDialog(true)
    }

    const handleSubSection = () => {
        setSubSectionDialog(true)
    }

    const handleTextField = () => {
        setTextFieldDialog(true)
    }

    const handleTextAreaField = () => {
        setTextAreaFieldDialog(true)
    }

    const handleNumberField = () => {
        setNumberFieldDialog(true)
    }

    const handleSelectBoxField = () => {
        setSelectBoxDialog(true)
    }

    const handleSelectField = () => {
        setSelectDialog(true)
    }

    const handleSelectRadioField = () => {
        setSelectRadioDialog(true)
    }

    const handleEmailField = () => {
        setEmailFieldDialog(true)
    }

    const handlePhoneField = () => {
        setPhoneFieldDialog(true)
    }

    const handleAreaMapping = () => {
        setAreaMappingDialog(true)
    }

    const saveFormChanges = () => {
        updateFormData()
    }

    const createTextField = () => {
        setTextFieldDialog(true)
    }

    const saveChanges = () => {
        let newForm = formData
        newForm.name = formName
        setFormData(newForm)
        updateFormData()
    }

    const handleClose = () => {
        // Dialog box closing method
        setOpen(false)
        setSectionDialog(false)
        setSubSectionDialog(false)
        setTextFieldDialog(false)
        setTextAreaFieldDialog(false)
        setNumberFieldDialog(false)
        setSelectBoxDialog(false)
        setSelectDialog(false)
        setSelectRadioDialog(false)
        setEmailFieldDialog(false)
        setPhoneFieldDialog(false)
    }

    const handleDragStart = () => {

    }

    return (
        <Grid container spacing={2}>
            <Section open={sectionDialog} fieldData={false} handleClose={handleClose} />
            <SubSection open={subSectionDialog} handleClose={handleClose} />
            <TextField_ open={textFieldDialog} createTextField={createTextField} handleClose={handleClose} />
            <TextAreaField open={textAreaFieldDialog} createTextField={createTextField} handleClose={handleClose} />
            <NumberField open={numberFieldDialog} createTextField={createTextField} handleClose={handleClose} />
            <SelectBoxField open={selectBoxDialog} createTextField={createTextField} handleClose={handleClose} />
            <SelectField open={selectDialog} createTextField={createTextField} handleClose={handleClose} />
            <SelectRadioField open={selectRadioDialog} handleClose={handleClose} />
            <EmailField open={emailFieldDialog} createTextField={createTextField} handleClose={handleClose} />
            <PhoneField open={phoneFieldDialog} createTextField={createTextField} handleClose={handleClose} />
            <Grid item xs={6} md={12}>
                <Typography variant="h5" gutterBottom color="primary" component="div" style={{ fontWeight: '300' }}>
                    {dataIsLoaded?formData.formFields.length === 0?'Create New Form':'Edit Form': 'Form Builder dataIsLoaded....'}
                </Typography>
                <Grid container>
                    <Grid item xs={12} md={4}>
                        <TextField
                            fullWidth
                            required
                            id="outlined-basic"
                            variant="outlined"
                            size="small"
                            value={formName}
                            onChange={handleFormName}
                            style={{
                                fontSize: '20px'
                            }}
                    />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        {dataIsLoaded?
                            <Button
                                disabled={formData.name===formName}
                                variant="contained"
                                color="success"
                                size="small"
                                onClick={saveChanges}
                                style={{ marginLeft: '20px' }}
                            >
                                Save Change
                            </Button>
                        : '' }
                    </Grid>
                    <Grid item xs={12} md={5}>
                        <Stack direction="row" spacing={2} justifyContent={'right'}>
                            <Button
                                variant="outlined"
                                color="primary"
                                size="small"
                                style={{ backgroundColor: 'white' }}
                            >Save Draft</Button>
                            <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                onClick={handleFormPreview}
                            >{formPreview ? 'Edit Form' : 'Form Preview'}</Button>
                            <Button
                                variant="contained"
                                color="primary"
                                size="small"
                            >Publish</Button>
                        </Stack>
                    </Grid>
                </Grid>
            </Grid>
            {formPreview ?
                ''
                :
                <Grid item xs={12} sm={12} md={3.5}>
                    <Grid container style={{ border: "#5048E5 1px solid", borderRadius: "5px", padding: "10px" }}>
                        <Stack direction="row" spacing={2} style={{ width: "100%" }}>
                            {dataIsLoaded?
                                <Button startIcon={<CheckBoxOutlineBlankIcon />} draggable="true" onClick={handleSection} variant="contained" style={{ width: '150%' }}>Section</Button>
                            : <ButtonsLoader/> }
                            {dataIsLoaded?
                                <Button startIcon={<SelectAllIcon />} draggable='true' onClick={handleSubSection} variant="contained" style={{ width: '150%', visibility: sectionCreated ? 'visible' : 'hidden' }}>Sub Section</Button>
                            : <ButtonsLoader/> }
                        </Stack>
                    </Grid>
                    {dataIsLoaded?
                        <>
                            <Accordion variant="contained" style={{ marginTop: '5px', borderRadius: "5px", color: '#5048E5', border: '1px #5048E5 solid', visibility: sectionCreated ? 'visible' : 'hidden' }}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                    style={{ marginTop: '3px' }}
                                >
                                    <Typography>Basic Data Types</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={6}>
                                            <Button startIcon={<TextFieldsIcon />} draggable="true" onClick={handleTextField} variant="contained" size="small" style={{ width: '100%' }}>Text Field</Button>
                                            <Button startIcon={<TagIcon />} draggable="true" onClick={handleNumberField} variant="contained" size="small" style={{ width: '100%', marginTop: '10px' }}>Number Field</Button>
                                            <Button startIcon={<ListIcon />} draggable="true" onClick={handleSelectField} variant="contained" size="small" style={{ width: '100%', marginTop: '10px' }}>Select</Button>
                                            <Button startIcon={<AlternateEmailIcon />} draggable="true" onClick={handleEmailField} variant="contained" size="small" style={{ width: '100%', marginTop: '10px' }}>Email Address</Button>
                                            <Button startIcon={<ImageIcon />} variant="contained" size="small" style={{ width: '100%', marginTop: '10px' }}>Image</Button>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Button startIcon={<TextSnippetIcon />} draggable="true" onClick={handleTextAreaField} variant="contained" size="small" style={{ width: '100%' }}>Text Area</Button>
                                            <Button startIcon={<CheckBoxIcon />} draggable="true" onClick={handleSelectBoxField} variant="contained" size="small" style={{ width: '100%', marginTop: '10px' }}>Select Boxes</Button>
                                            <Button startIcon={<RadioButtonCheckedIcon />} draggable="true" onClick={handleSelectRadioField} variant="contained" size="small" style={{ width: '100%', marginTop: '10px' }}>Radio</Button>
                                            <Button startIcon={<PhoneInTalkIcon />} draggable="true" onClick={handlePhoneField} variant="contained" size="small" style={{ width: '100%', marginTop: '10px' }}>Phone Number</Button>
                                            <Button startIcon={<AddLocationAltIcon />} variant="contained" size="small" style={{ width: '100%', marginTop: '10px' }}>Location</Button>
                                        </Grid>
                                    </Grid>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion variant="contained" style={{ marginTop: '5px', borderRadius: "5px", color: '#5048E5', border: '1px #5048E5 solid', visibility: sectionCreated ? 'visible' : 'hidden' }}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography>Advanced Data Types</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={6}>
                                            <Button startIcon={<MapIcon />} variant="contained" size="small" style={{ width: '100%' }}>Area Mapping</Button>
                                            <Button startIcon={<MicIcon />} variant="contained" size="small" style={{ width: '100%', marginTop: '10px' }}>Audio</Button>
                                            <Button startIcon={<PersonPinIcon />} variant="contained" size="small" style={{ width: '100%', marginTop: '10px' }}>Image Geo Tag</Button>
                                            <Button startIcon={<MonetizationOnIcon />} variant="contained" size="small" style={{ width: '100%', marginTop: '10px' }}>Currency</Button>
                                            <Button startIcon={<GestureIcon />} variant="contained" size="small" style={{ width: '100%', marginTop: '10px' }}>Signature</Button>
                                            <Button startIcon={<TableChartIcon />} variant="contained" size="small" style={{ width: '100%', marginTop: '10px' }}>Tables</Button>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Button startIcon={<UploadFileIcon />} variant="contained" size="small" style={{ width: '100%' }}>Upload File</Button>
                                            <Button startIcon={<VideoLibraryIcon />} variant="contained" size="small" style={{ width: '100%', marginTop: '10px' }}>Video</Button>
                                            <Button startIcon={<BlurLinearIcon />} variant="contained" size="small" style={{ width: '100%', marginTop: '10px' }}>Bar Code</Button>
                                            <Button startIcon={<QrCode2Icon />} variant="contained" size="small" style={{ width: '100%', marginTop: '10px' }}>QR Code</Button>
                                            <Button startIcon={<VerticalSplitIcon />} variant="contained" size="small" style={{ width: '100%', marginTop: '10px' }}>Columns</Button>
                                            <Button startIcon={<CalculateIcon />} variant="contained" size="small" style={{ width: '100%', marginTop: '10px' }}>Calculated Field</Button>
                                        </Grid>
                                    </Grid>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion variant="contained" style={{ marginTop: '5px', borderRadius: "5px", color: '#5048E5', border: '1px #5048E5 solid', visibility: sectionCreated ? 'visible' : 'hidden' }}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography>Feedback</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={6}>
                                            <Button startIcon={<LinearScaleIcon />} variant="contained" size="small" style={{ width: '100%' }}>Likert Scale</Button>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Button startIcon={<GradeIcon />} variant="contained" size="small" style={{ width: '100%' }}>Rating</Button>
                                        </Grid>
                                    </Grid>
                                </AccordionDetails>
                            </Accordion>
                        </>
                    : ''}
                </Grid>
            }
            {formPreview ?
                <Grid item xs={12} sm={12} md={12}>
                    <Grid container style={{ border: "#5048E5 1px solid", backgroundColor: 'white', borderRadius: "5px" }}>
                        {/* <DragNDrop componentsData={componentsData} /> */}
                        <FormRenderer editStatus={editStatus} />
                    </Grid>
                </Grid>

                :
                refresh ? '' :
                    <Grid item xs={6} md={8.5}>
                        <Grid container style={{ border: "#5048E5 1px solid", backgroundColor: 'white', borderRadius: "5px" }}>
                            {/* <DragNDrop componentsData={componentsData} /> */}
                            <FormRenderer editStatus={editStatus} />
                        </Grid>
                    </Grid>
            }
            <Grid item xs={6} md={12}>
                <Stack direction="row" spacing={2} justifyContent={'right'}>
                    <Button variant="outlined" size='small' color="error">Cancel</Button>
                    <Button variant="outlined" size='small' color="primary">Save Draft</Button>
                    <Button onClick={saveFormChanges} variant="contained" size='small' color="primary">Save Form</Button>
                </Stack>
            </Grid>
        </Grid>
    )
}

export default Questionaire
