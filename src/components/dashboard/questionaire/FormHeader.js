import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { styled } from '@mui/material/styles';
import formStyles from './styles/FormStyles';
import {
    Paper,
    Button,
    Grid,
    Stack,
    Chip,
    AccordionSummary,
    AccordionDetails,
    TextField,
    Typography
} from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt';
import PreviewRoundedIcon from '@mui/icons-material/PreviewRounded';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import SaveAsOutlinedIcon from '@mui/icons-material/SaveAsOutlined';
import CachedOutlinedIcon from '@mui/icons-material/CachedOutlined';
import { FormContext } from './context';
import { EditRegionsDialog } from '../projectDetails/questionaires/editRegionsFormDialog';
import { useAuth } from '../../../hooks/use-auth';

const FormHeader = () => {

    const router = useRouter()
    const { user } = useAuth();

    const {
        isLoaded,
        getFormData,
        formData,
        setFormData,
        updateFormData,
        formPreview,
        handleFormPreview,
        updateRegionFormData
    } = useContext(FormContext)

    const [formName, setFormName] = useState(formData ? formData.name : '')
    const [openEditRegionsDialog, setOpenEditRegionsDialog] = useState(false);

    const handleOpenEditRegionDialog = () => setOpenEditRegionsDialog(true);
    const handleCloseEditRegionsDialog = () => setOpenEditRegionsDialog(false);


    useEffect(() => {
        setFormName(formData.name)
    }, [formData])

    const handleFormName = (e) => {
        setFormName(e.target.value)
    }

    const saveChanges = () => {
        let newForm = formData
        newForm.name = formName
        setFormData(newForm)
        updateFormData()
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
                marginTop: '-48px',
            }}
        >   {!isLoaded ?
            <Grid
                container
            >
                <Typography sx={{ width: '100%' }}>
                    <LinearProgress />
                </Typography>
            </Grid>
            : ""}
            <Grid
                container
                className={classes.formHeaderPanel}
            >
                <Grid item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    xl={4}>
                    <Typography
                        className={classes.formHeader}
                    >
                        <Chip
                            icon={<ArrowBackIcon />}
                            size="small"
                            label="Back"
                            variant="outlined"
                            color="primary"
                            onClick={() => router.back()}
                        />
                    </Typography>
                </Grid>
                <Grid item
                    xs={12}
                    sm={12}
                    md={4}
                    lg={8}
                    xl={4}>
                    <Typography
                        className={classes.formHeader}
                    >
                        <Chip
                            icon={<EditLocationAltIcon />}
                            size="small"
                            label="Edit Regions"
                            variant="outlined"
                            color="primary"
                            onClick={handleOpenEditRegionDialog}
                        />
                        <EditRegionsDialog
                            open={openEditRegionsDialog}
                            handleClose={handleCloseEditRegionsDialog}
                            user={user}
                            regions={ formData ? formData.regions: []}
                            onSave ={updateRegionFormData}
                        />
                    </Typography>
                </Grid>
                <Typography
                    gutterBottom
                    color={"primary"}
                    className={classes.formHeader}
                >
                    <strong>
                        {isLoaded ?
                            "Form Builder: "
                            :
                            <FormHeaderLoad />
                        }
                    </strong>
                    {isLoaded ? formPreview ? "Preview Mode" : "Edit Mode" : ""}
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
                            value={isLoaded ? formName : 'Loading...'}
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
                                disabled={!isLoaded || formData.name === formName || formPreview}
                                variant="contained"
                                color="success"
                                size="small"
                                onClick={saveChanges}
                                className={classes.formButton}
                            >
                                <SaveAsOutlinedIcon className={classes.formButtonIcon} />
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
                                <CachedOutlinedIcon className={classes.formButtonIcon} />
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
                            <Button
                                variant={"contained"}
                                color={formPreview ? "info" : "primary"}
                                size="small"
                                onClick={handleFormPreview}
                            >
                                {formPreview ?
                                    <><DriveFileRenameOutlineIcon /> Edit </>
                                    :
                                    <><PreviewRoundedIcon /> Preview </>
                                }
                                Form
                            </Button>
                            <Button
                                onClick={saveChanges}
                                variant="contained"
                                size='small'
                                color="primary"
                            >Save Form</Button>
                        </Stack>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default FormHeader
