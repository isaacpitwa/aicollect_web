import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
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
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import SelectAllIcon from '@mui/icons-material/SelectAll';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import TagIcon from '@mui/icons-material/Tag';
import ListIcon from '@mui/icons-material/List';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import BusinessIcon from '@mui/icons-material/Business';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import CalculateIcon from '@mui/icons-material/Calculate';
import ImageIcon from '@mui/icons-material/Image';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import MapIcon from '@mui/icons-material/Map';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import GestureIcon from '@mui/icons-material/Gesture';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import MicIcon from '@mui/icons-material/Mic';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import BlurLinearIcon from '@mui/icons-material/BlurLinear';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import VerticalSplitIcon from '@mui/icons-material/VerticalSplit';
import TableChartIcon from '@mui/icons-material/TableChart';
import LinearScaleIcon from '@mui/icons-material/LinearScale';
import GradeIcon from '@mui/icons-material/Grade';

import Section from './dialogs/Section'
import SubSection from './dialogs/SubSection'
import TextField_ from './dialogs/TextField'

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


const Questionaire = () => {

    const [formData, setFormData] = useState([])
    const [sectionCreated, setSectionCreated] = useState(false)
    const [sectionDialog, setSectionDialog] = useState(false)
    const [subSectionDialog, setSubSectionDialog] = useState(false)
    const [textFieldDialog, setTextFieldDialog] = useState(false)
    const [open, setOpen] = useState(false)
    const [data, setData] = useState({})

    const handleSection = () => { 
        setSectionDialog(true)
    }

    const handleSubSection = () => { 
        setSubSectionDialog(true)
    }
  
    const handleTextField = () => {
        setData(
            {
                dialogTitle: 'Text Field Component'
            }
        )
        setTextFieldDialog(true)
    }

    const handleNumberField = () => {

    }

    const createSection = () => {
        setSectionDialog(false)
        setSectionCreated(true)
    }

    const createTextField = () => {
        setTextFieldDialog(true)
    }

    const handleClose = () => {
        setOpen(false)
        setSectionDialog(false)
        setSubSectionDialog(false)
        setTextFieldDialog(false)
    }
    
    return (
        <Grid container spacing={2}>
            <Section open={sectionDialog} createSection={createSection} handleClose={handleClose}/>
            <SubSection open={subSectionDialog} handleClose={handleClose}/>
            <TextField_ open={textFieldDialog} createTextField={createTextField} handleClose={handleClose}/>
            <Grid item xs={6} md={12}>
                <Typography variant="h5" gutterBottom  color="primary" component="div" style={{ fontWeight: '300' }}>
                    Create New Questionaire
                </Typography>
                <Grid container>
                    <Grid item xs={12} md={6}>
                        <TextField fullWidth required id="outlined-basic" label="Form Title" size='small' variant="outlined" />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Stack direction="row" spacing={2} justifyContent={'right'}>
                            <Button variant="outlined" size='small' color="primary">Choose From Template</Button>
                            <Button variant="contained" size='small' color="primary">Create Questionaire</Button>
                        </Stack>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={6} md={4}>
                <Grid container style={{ border: "#5048E5 1px solid", borderRadius: "5px", padding: "10px" }}>
                    <Stack direction="row" spacing={2} style={{ width: "100%" }}>
                        <Button startIcon={<CheckBoxOutlineBlankIcon />} draggable="true" onClick={handleSection} variant="contained" style={{ width: '150%' }}>Section</Button>
                        <Button startIcon={<SelectAllIcon />} draggable='true' onClick={handleSubSection} variant="contained" style={{ width: '150%', visibility: sectionCreated?'visible':'hidden' }}>Sub Section</Button>
                    </Stack>
                </Grid>
                <Accordion variant="contained" style={{ marginTop: '5px', borderRadius: "5px", color: '#5048E5', border: '1px #5048E5 solid', visibility: sectionCreated?'visible':'hidden' }}>
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
                                <Button startIcon={<TextFieldsIcon />} onClick={handleTextField} variant="contained" size="small" style={{ width: '100%' }}>Text Field</Button>
                                <Button startIcon={<TagIcon />} onClick={handleNumberField} variant="contained" size="small" style={{ width: '100%', marginTop: '10px' }}>Number Field</Button>
                                <Button startIcon={<ListIcon />} variant="contained" size="small" style={{ width: '100%', marginTop: '10px' }}>Select</Button>
                                <Button startIcon={<AlternateEmailIcon />} variant="contained" size="small" style={{ width: '100%', marginTop: '10px' }}>Email Address</Button>
                                <Button startIcon={<BusinessIcon />} variant="contained" size="small" style={{ width: '100%', marginTop: '10px' }}>Physical Address</Button>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Button startIcon={<TextSnippetIcon />} variant="contained" size="small" style={{ width: '100%' }}>Text Area</Button>
                                <Button startIcon={<CheckBoxIcon />} variant="contained" size="small" style={{ width: '100%', marginTop: '10px' }}>Select Box</Button>
                                <Button startIcon={<RadioButtonCheckedIcon />} variant="contained" size="small" style={{ width: '100%', marginTop: '10px' }}>Radio</Button>
                                <Button startIcon={<PhoneInTalkIcon />} variant="contained" size="small" style={{ width: '100%', marginTop: '10px' }}>Phone Number</Button>
                                <Button startIcon={<CalculateIcon />} variant="contained" size="small" style={{ width: '100%', marginTop: '10px' }}>Calculated Field</Button>
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
                <Accordion variant="contained" style={{ marginTop: '5px', borderRadius: "5px", color: '#5048E5', border: '1px #5048E5 solid', visibility: sectionCreated?'visible':'hidden' }}>
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
                                <Button startIcon={<ImageIcon/>} variant="contained" size="small" style={{ width: '100%' }}>Image</Button>
                                <Button startIcon={<PersonPinIcon/>} variant="contained" size="small" style={{ width: '100%', marginTop: '10px' }}>Image Geo Tag</Button>
                                <Button startIcon={<AddLocationAltIcon/>} variant="contained" size="small" style={{ width: '100%', marginTop: '10px' }}>Location</Button>
                                <Button startIcon={<MapIcon/>} variant="contained" size="small" style={{ width: '100%', marginTop: '10px' }}>Area Mapping</Button>
                                <Button startIcon={<MonetizationOnIcon/>} variant="contained" size="small" style={{ width: '100%', marginTop: '10px' }}>Currency</Button>
                                <Button startIcon={<GestureIcon/>} variant="contained" size="small" style={{ width: '100%', marginTop: '10px' }}>Signature</Button>
                                <Button startIcon={<TableChartIcon/>} variant="contained" size="small" style={{ width: '100%', marginTop: '10px' }}>Tables</Button>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Button startIcon={<UploadFileIcon/>} variant="contained" size="small" style={{ width: '100%' }}>Upload File</Button>
                                <Button startIcon={<MicIcon/>} variant="contained" size="small" style={{ width: '100%', marginTop: '10px' }}>Audio</Button>
                                <Button startIcon={<VideoLibraryIcon/>} variant="contained" size="small" style={{ width: '100%', marginTop: '10px' }}>Video</Button>
                                <Button startIcon={<BlurLinearIcon/>} variant="contained" size="small" style={{ width: '100%', marginTop: '10px' }}>Bar Code</Button>
                                <Button startIcon={<QrCode2Icon/>} variant="contained" size="small" style={{ width: '100%', marginTop: '10px' }}>QR Code</Button>
                                <Button startIcon={<VerticalSplitIcon/>} variant="contained" size="small" style={{ width: '100%', marginTop: '10px' }}>Columns</Button>
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
                <Accordion variant="contained" style={{ marginTop: '5px', borderRadius: "5px", color: '#5048E5', border: '1px #5048E5 solid', visibility: sectionCreated?'visible':'hidden' }}>
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
                                <Button startIcon={<LinearScaleIcon/>} variant="contained" size="small" style={{ width: '100%' }}>Likert Scale</Button>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Button startIcon={<GradeIcon/>} variant="contained" size="small" style={{ width: '100%' }}>Rating</Button>
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
            </Grid>
            <Grid item xs={6} md={8}>
                <Grid container style={{ border: "#5048E5 1px solid", borderRadius: "5px", padding: "10px" }}>
                    <Grid item Id="dropTarget" xs={12} sm={12} md={12} lg={12} xl={12} style={{ border: '3px #ddd dotted', cursor: 'move', borderRadius: "5px" }}>
                        <Box style={{ background: '#448AFF', color: 'white', padding: '10px', width: '100%', textAlign: 'center', marginTop: '50px' }}>
                            Drag and Drop a form component
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={6} md={12}>
                <Stack direction="row" spacing={2} justifyContent={'right'}>
                    <Button variant="outlined" size='small' color="error">Cancel</Button>
                    <Button variant="contained" size='small' color="primary">Create Questionaire</Button>
                </Stack>
            </Grid>
        </Grid>
    );
}

export default Questionaire
