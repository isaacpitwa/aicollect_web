import { useState, useEffect, useContext } from 'react';
import { styled } from '@mui/material/styles';
import formStyles from './styles/FormStyles';
import {
    Paper,
    Button,
    Grid,
    Stack,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    TextField,
    Typography
} from '@mui/material';
import SaveAsOutlinedIcon from '@mui/icons-material/SaveAsOutlined';
import CachedOutlinedIcon from '@mui/icons-material/CachedOutlined';
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
import SmartButtonIcon from '@mui/icons-material/SmartButton';
import CalculateIcon from '@mui/icons-material/Calculate';
import ImageIcon from '@mui/icons-material/Image';
import DateRangeIcon from '@mui/icons-material/DateRange';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import GridViewIcon from '@mui/icons-material/GridView';
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

import ButtonsLoader from './utils/ButtonsLoader';
import Section from './dialogs/Section';
import SubSection from './dialogs/SubSection';
import TextField_ from './dialogs/TextField';
import TextAreaField from './dialogs/TextAreaField';
import NumberField from './dialogs/NumberField';
import SelectBoxField from './dialogs/SelectBoxField';
import SelectField from './dialogs/SelectField';
import SelectRadioField from './dialogs/SelectRadioField';
import EmailField from './dialogs/EmailField';
import PhoneField from './dialogs/PhoneField';
import ImageField from './dialogs/ImageField';
import DateField from './dialogs/DateField';
import LocationField from './dialogs/LocationField';
import AreaMappingField from './dialogs/AreaMappingField';
import { FormContext } from './context';
import DataGrid from './dialogs/DataGrid';


const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}))


const FormButtons = () => {

    const {
        isLoaded,
        sectionCreated,
        formData,
        formPreview,
    } = useContext(FormContext)

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
    const [imageDialog, setImageDialog] = useState(false)
    const [locationDialog, setLocationDialog] = useState(false)
    const [areaMappingDialog, setAreaMappingDialog] = useState(false)
    const [dateDialog, setDateDialog] = useState(false)
    const [dataGridDialog, setDataGridDialog] = useState(false)

    const handleSection = () => {
        setSectionDialog(true)
    }

    const handleSubSection = () => {
        setSubSectionDialog(true)
    }

    const handleDataGrid = () => {
        setDataGridDialog(true)
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

    const handleImageField = () => {
        setImageDialog(true)
    }

    const handleLocationField = () => {
        setLocationDialog(true)
    }

    const handleDateField = () => {
        setDateDialog(true)        
    }

    const handleAreaMappingField = () => {
        setAreaMappingDialog(true)
    }

    const defaultFunction = (name) => {
        console.log(`${name} Dialog Method`)
    }

    const BasicFields = [
        {
            name: 'Text Field',
            icon: <TextFieldsIcon/>,
            func: handleTextField
        },
        {
            name: 'Text Area Field',
            icon: <TextSnippetIcon/>,
            func: handleTextAreaField
        },
        {
            name: 'Number Field',
            icon: <TagIcon/>,
            func: handleNumberField
        },
        {
            name: 'Select Box',
            icon: <CheckBoxIcon/>,
            func: handleSelectBoxField
        },
        {
            name: 'Select Field',
            icon: <ListIcon/>,
            func: handleSelectField
        },
        {
            name: 'Radio Field',
            icon: <RadioButtonCheckedIcon/>,
            func: handleSelectRadioField
        },
        {
            name: 'Email Address',
            icon: <AlternateEmailIcon/>,
            func: handleEmailField
        },
        {
            name: 'Phone Number',
            icon: <PhoneInTalkIcon/>,
            func: handlePhoneField
        },
        {
            name: 'Image Upload',
            icon: <ImageIcon/>,
            func: handleImageField
        },
        {
            name: 'Location Field',
            icon: <AddLocationAltIcon/>,
            func: handleLocationField
        },
        {
            name: 'Date Field',
            icon: <DateRangeIcon/>,
            func: handleDateField
        },
        {
            name: 'Data Grid',
            icon: <GridViewIcon/>,
            func: handleDataGrid
        },
    ]

    const AdvancedFields = [
        {
            name: 'Area Mapping',
            icon: <MapIcon/>,
            func: handleAreaMappingField
        },
        {
            name: 'File Upload',
            icon: <UploadFileIcon/>,
            func: false
        },
        {
            name: 'Audio Field',
            icon: <MicIcon/>,
            func: false
        },
        {
            name: 'Video Field',
            icon: <VideoLibraryIcon/>,
            func: false
        },
        {
            name: 'Image Geo Tag',
            icon: <PersonPinIcon/>,
            func: false
        },
        {
            name: 'Barcode Field',
            icon: <BlurLinearIcon/>,
            func: false
        },
        {
            name: 'Currency Field',
            icon: <MonetizationOnIcon/>,
            func: false
        },
        {
            name: 'QR Code Field',
            icon: <QrCode2Icon/>,
            func: false
        },
        {
            name: 'Signature Field',
            icon: <GestureIcon/>,
            func: false
        },
        {
            name: 'Columns',
            icon: <VerticalSplitIcon/>,
            func: false
        },
        {
            name: 'Table Field',
            icon: <TableChartIcon/>,
            func: false
        },
        {
            name: 'Calculated Field',
            icon: <CalculateIcon/>,
            func: false
        },
    ]

    const handleClose = () => {
        // Dialog box closing method
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
        setImageDialog(false)
        setDateDialog(false)
        setLocationDialog(false)
        setAreaMappingDialog(false)
        setDataGridDialog(false)
    }

    const classes = formStyles();

    return (
        <>
            <Section
                open={sectionDialog}
                fieldData={false}
                handleClose={handleClose}
            />
            <SubSection
                open={subSectionDialog}
                fieldData={false}
                handleClose={handleClose}
            />

            <DataGrid
                open={dataGridDialog}
                fieldData={false}
                handleClose={handleClose}
            />
            <TextField_
                open={textFieldDialog}
                fieldData={false}
                handleClose={handleClose}
            />
            <TextAreaField
                open={textAreaFieldDialog}
                fieldData={false}
                handleClose={handleClose}
            />
            <NumberField
                open={numberFieldDialog}
                fieldData={false}
                handleClose={handleClose}
            />
            <SelectBoxField
                open={selectBoxDialog}
                fieldData={false}
                handleClose={handleClose}
            />
            <SelectField
                open={selectDialog}
                fieldData={false}
                handleClose={handleClose}
            />
            <SelectRadioField
                open={selectRadioDialog}
                fieldData={false}
                handleClose={handleClose}
            />
            <EmailField
                open={emailFieldDialog}
                fieldData={false}
                handleClose={handleClose}
            />
            <PhoneField
                open={phoneFieldDialog}
                fieldData={false}
                handleClose={handleClose} 
            />
            <ImageField
                open={imageDialog}
                fieldData={false}
                handleClose={handleClose} 
            />
            <DateField
                open={dateDialog}
                fieldData={false}
                handleClose={handleClose} 
            />
            <LocationField
                open={locationDialog}
                fieldData={false}
                handleClose={handleClose} 
            />
            <AreaMappingField
                open={areaMappingDialog}
                fieldData={false}
                handleClose={handleClose} 
            />
            {formPreview ?
                ""
            :
                <Grid
                    item
                    xs={12}
                    sm={12}
                    md={4}
                    lg={4}
                    xl={4}
                >
                    <Grid
                        item
                        style={{
                            position: 'fixed',
                            width: '25vw',
                        }}
                    >
                        <Grid
                            container
                            style={{
                                border: "#5048E5 1px solid",
                                borderRadius: "5px",
                                padding: "10px", 
                                backgroundColor: "white",
                            }}
                        >
                            <Stack
                                direction="row"
                                spacing={2}
                                style={{ width: "100%" }}
                            >
                                {isLoaded?
                                    <Button
                                        startIcon={<CheckBoxOutlineBlankIcon />}
                                        draggable="true"
                                        onClick={handleSection}
                                        variant="contained"
                                        style={{ width: '150%', fontSize: '0.8rem' }}
                                    >Section</Button>
                                : <ButtonsLoader/> }
                                {isLoaded?
                                    sectionCreated?
                                        <Button
                                            startIcon={<SelectAllIcon />}
                                            draggable='true'
                                            onClick={handleSubSection}
                                            variant="contained"
                                            style={{ width: '150%', fontSize: '0.8rem' }}
                                        >Sub Section</Button>
                                    : ""
                                : <ButtonsLoader/> }
                            </Stack>
                        </Grid>
                        {isLoaded&&sectionCreated?
                            <>
                                <Accordion
                                    variant="contained"
                                    style={{
                                        marginTop: '5px',
                                        borderRadius: "5px",
                                        color: '#5048E5',
                                        border: '1px #5048E5 solid',
                                        visibility: sectionCreated ? 'visible' : 'hidden'
                                    }}
                                >
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                        style={{ marginTop: '3px' }}
                                    >
                                        <Typography>Basic Data Types</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Grid
                                            container
                                            spacing={1}
                                        >
                                            {BasicFields.map((button, index)=>(
                                                <Grid
                                                    key={index}
                                                    item
                                                    xs={12}
                                                    md={6}
                                                    className={classes.formButtons}
                                                >
                                                    <Button
                                                        startIcon={button.icon}
                                                        draggable={false}
                                                        onClick={button.func}
                                                        variant="contained"
                                                        size="small"
                                                        style={{ width: '100%' }}
                                                    >{button.name}</Button>
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion
                                    variant="contained"
                                    style={{ marginTop: '5px', borderRadius: "5px", color: '#5048E5', border: '1px #5048E5 solid', visibility: sectionCreated ? 'visible' : 'hidden' }}
                                >
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography>Advanced Data Types</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Grid
                                            container
                                            spacing={1}
                                        >
                                        {AdvancedFields.map((button, index)=>(
                                            <Grid
                                                key={index}
                                                item
                                                xs={12}
                                                md={6}
                                                className={classes.formButtons}
                                            >
                                                <Button
                                                    startIcon={button.icon}
                                                    draggable={false}
                                                    onClick={button.func?button.func:()=>{defaultFunction(button.name)}}
                                                    variant="contained"
                                                    size="small"
                                                    style={{ width: '100%' }}
                                                >{button.name}</Button>
                                            </Grid>
                                        ))}
                                        </Grid>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion
                                    variant="contained"
                                    style={{ marginTop: '5px', borderRadius: "5px", color: '#5048E5', border: '1px #5048E5 solid', visibility: sectionCreated ? 'visible' : 'hidden' }}
                                >
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography>Feedback</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Grid
                                            container
                                            spacing={2}
                                        >
                                            <Grid
                                                item
                                                xs={12}
                                                md={6}
                                            >
                                                <Button
                                                    startIcon={<LinearScaleIcon />}
                                                    variant="contained"
                                                    size="small"
                                                    style={{ width: '100%' }}
                                                >Likert Scale</Button>
                                            </Grid>
                                            <Grid
                                                item
                                                xs={12}
                                                md={6}
                                            >
                                                <Button
                                                    startIcon={<GradeIcon />}
                                                    variant="contained"
                                                    size="small"
                                                    style={{ width: '100%' }}
                                                >Rating</Button>
                                            </Grid>
                                        </Grid>
                                    </AccordionDetails>
                                </Accordion>
                            </>
                        : "" }
                    </Grid>
                </Grid>
            }
        </>
    )
}

export default FormButtons
