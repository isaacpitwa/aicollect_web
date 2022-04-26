import { useState, useEffect, useContext } from 'react';
import { styled } from '@mui/material/styles';
import formStyles from './styles/FormStyles';
import {
    Paper,
    Button,
    Grid,
    Stack,
    Box,
    AccordionSummary,
    AccordionDetails,
    TextField,
    Typography
} from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import CircularProgress from '@mui/material/CircularProgress';
import PreviewRoundedIcon from '@mui/icons-material/PreviewRounded';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import SaveAsOutlinedIcon from '@mui/icons-material/SaveAsOutlined';
import CachedOutlinedIcon from '@mui/icons-material/CachedOutlined';
import { FormContext } from './context';


const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}))


const FormHeader = () => {

    const {
        isLoaded,
        getFormData,
        sectionCreated,
        formData,
        setFormData,
        updateFormData,
        formPreview,
        handleFormPreview
    } = useContext(FormContext)

    const [formName, setFormName] = useState(formData?formData.name:'')

    useEffect(() => {
        setFormName(formData.name)
    }, [isLoaded])

    const handleFormName = (e) => {
        setFormName(e.target.value)
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
        setImageDialog(false)
        setDateDialog(false)
        setLocationDialog(false)
        setAreaMappingDialog(false)
    }

    const FormHeaderLoad = () => {

        return (
            <Typography>
                Form Data Loading...
            </Typography>
        )
    };

    const classes = formStyles();

    return (
        <Grid
            container
            spacing={3}
            style={{
                position: 'fixed',
                zIndex: '100',
                width: '85.3vw',
                marginTop: '-63px',
            }}
        >
            <Grid
                container
            >
                <Typography sx={{ width: '100%' }}>
                    <LinearProgress />
                </Typography>
            </Grid>
            <Grid
                container
                className={classes.formHeaderPanel}
            >
                <Typography
                    gutterBottom
                    color={"primary"}
                    className={classes.formHeader}
                >
                    <strong>
                        {isLoaded?
                            "Form Builder: "
                        : 
                            <FormHeaderLoad/>
                        }
                    </strong>
                    {isLoaded?formPreview?"Preview Mode":"Edit Mode":""}
                </Typography>
                <Grid container>
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={6}
                        lg={4}
                        xl={4}
                    >
                        <TextField
                            disabled={formPreview}
                            fullWidth
                            required
                            id="outlined-basic"
                            variant="outlined"
                            size="small"
                            label={'Form Name'}
                            value={isLoaded?formName:'Loading...'}
                            onChange={handleFormName}
                            className={classes.formField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                    />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={6}
                        lg={3.5}
                        xl={4}
                    >
                        <>
                            <Button
                                disabled={!isLoaded||formData.name===formName||formPreview}
                                variant="contained"
                                color="success"
                                size="small"
                                onClick={saveChanges}
                                className={classes.formButton}
                            >
                                <SaveAsOutlinedIcon className={classes.formButtonIcon}/>
                                Save Change
                            </Button>
                            <Button
                                disabled={!isLoaded}
                                variant="contained"
                                color="primary"
                                size="small"
                                onClick={getFormData}
                                className={classes.formButton}
                            >
                                <CachedOutlinedIcon className={classes.formButtonIcon}/>
                                Reload Form
                            </Button>
                        </>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        lg={3.7}
                        xl={4}
                    >
                        <Stack
                            direction="row"
                            spacing={2}
                            justifyContent={'right'}
                        >
                            {/* <Button
                                variant="outlined"
                                color="primary"
                                size="small"
                                style={{ backgroundColor: 'white' }}
                            >Save Draft</Button> */}
                            <Button
                                variant={"contained"}
                                color={formPreview?"info":"primary"}
                                size="small"
                                onClick={handleFormPreview}
                            >
                                {formPreview?
                                    <><DriveFileRenameOutlineIcon/> Edit </>
                                :
                                    <><PreviewRoundedIcon/> Preview </>
                                }
                                Form
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                size="small"
                            >Publish</Button>
                        </Stack>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default FormHeader
