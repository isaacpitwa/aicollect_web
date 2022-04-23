import { useState, useEffect, useContext } from 'react';
import { styled } from '@mui/material/styles';
import formStyles from './styles/FormStyles'
import {
    Paper,
    Button,
    Grid,
    Stack,
} from '@mui/material';
import SaveAsOutlinedIcon from '@mui/icons-material/SaveAsOutlined';
import CachedOutlinedIcon from '@mui/icons-material/CachedOutlined';
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
import FormHeader from './FormHeader'
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
        updateFormData,
        formPreview,
    } = useContext(FormContext)

    const saveFormChanges = () => {
        updateFormData()
    }

    return (
        <Grid
            item
        >
            <FormHeader/>
            <Grid
                container
                spacing={2}
                style={{
                    paddingTop: '120px',
                }}
            >
                <FormButtons/>
                <Grid
                    item
                    xs={12}
                    sm={12}
                    md={formPreview?12:8}
                    lg={formPreview?12:8}
                    xl={formPreview?12:8}
                >
                    <FormRender/>
                    {!formPreview?
                        <Stack
                            direction="row"
                            spacing={2}
                            style={{
                                paddingTop: '15px',
                            }}
                        >
                            <Button
                                variant="outlined"
                                size='small'
                                color="error"
                            >Cancel</Button>
                            {/* <Button
                                variant="outlined"
                                size='small'
                                color="primary"
                            >Save Draft</Button> */}
                            <Button
                                onClick={saveFormChanges}
                                variant="contained"
                                size='small'
                                color="primary"
                            >Save Form</Button>
                        </Stack>
                    : ""}
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Questionaire
