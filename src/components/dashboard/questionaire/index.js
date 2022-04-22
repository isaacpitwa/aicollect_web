import { useState, useEffect, useContext } from 'react';
import { styled } from '@mui/material/styles';
import formStyles from './styles/FormStyles'
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
} from '@mui/material'
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
import DateRangeIcon from '@mui/icons-material/DateRange';
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
import ImageField from './dialogs/ImageField'
import DateField from './dialogs/DateField'
import LocationField from './dialogs/LocationField'
import AreaMappingField from './dialogs/AreaMappingField'

import { FormContext } from './context'
import FormButtons from './FormButtons'
import FormRender from './FormRender'


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
        updateFormData,
        formPreview,
        editStatus,
        handleFormPreview
    } = useContext(FormContext)

    const [formName, setFormName] = useState(formData?formData.name:'')
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
    const [open, setOpen] = useState(false)

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

    const saveFormChanges = () => {
        updateFormData()
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
    ]

    const AdvancedFields = [
        {
            name: 'Area Mapping',
            icon: <MapIcon/>,
            func: handleTextField
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
        setImageDialog(false)
        setDateDialog(false)
        setLocationDialog(false)
        setAreaMappingDialog(false)
    }

    const handleDragStart = () => {

    }

    const classes = formStyles();

    return (
        <Grid
            container
            spacing={2}
        >
            {<FormButtons/>}
            {formPreview ?
                <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    xl={12}
                >
                    <FormRender/>
                </Grid>

            :
                <Grid
                    item
                    xs={12}
                    sm={12}
                    md={9}
                    lg={9}
                    xl={9}
                >
                    <FormRender/>
                </Grid>
            }
            <Grid
                item
                xs={12}
                md={12}
            >
                <Stack
                    direction="row"
                    spacing={2}
                    justifyContent={'right'}
                >
                    <Button
                        variant="outlined"
                        size='small'
                        color="error"
                    >Cancel</Button>
                    <Button
                        variant="outlined"
                        size='small'
                        color="primary"
                    >Save Draft</Button>
                    <Button
                        onClick={saveFormChanges}
                        variant="contained"
                        size='small'
                        color="primary"
                    >Save Form</Button>
                </Stack>
            </Grid>
        </Grid>
    )
}

export default Questionaire
