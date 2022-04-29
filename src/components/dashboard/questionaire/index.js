import { useContext } from 'react';
import { styled } from '@mui/material/styles';
import {
    Paper,
    Button,
    Grid,
    Stack,
} from '@mui/material';

import { FormContext } from './context'
import FormHeader from './FormHeader'
import FormButtons from './FormButtons'
import FormRender from './FormRender'

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
