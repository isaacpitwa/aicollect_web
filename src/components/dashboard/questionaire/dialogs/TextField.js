import React, { useState } from 'react';
import {
    Box,
    Paper,
    Button,
    ButtonGroup,
    Grid,
    Typography,
    Stack,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    Select,
    MenuItem,
    InputLabel,
    FormControl
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

import TextfieldPreview from '../previews/TextfieldPreview'

// This is the field for type=TextField
const TextField_ = (props) => {

    const { open, createTextField, handleClose } = props
    
    const [fieldLabel, setFieldLabel] = useState('')
    const [fieldPosition, setFieldPosition] = useState('Top')
    const [fieldDescription, setFieldDescription] = useState('')

    const handleLabel = () => {
        setFieldLabel(event.target.value);
    }

    const handlePosition = (event) => {
        setPosition(event.target.value);
    };

    const handleDescription = (event) => {
        setFieldDescription(event.target.value);
    };

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
                Text Field Component
                <CancelIcon color='error' style={{ float: 'right', cursor: 'pointer' }} onClick={handleClose}/>
            </DialogTitle>
            <DialogContent>
                <Grid container>
                    <Grid item xs={12} md={7} style={{ padding: '30px 20px' }}>
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
                        <ButtonGroup variant="outlined" size='small' aria-label="outlined button group">
                            <Button variant="contained" style={{ borderRadius: '8px 0px 0px 0px' }}>Display</Button>
                            <Button>Data</Button>
                            <Button>Validation</Button>
                            <Button>Conditional</Button>
                            <Button style={{ borderRadius: '0px 8px 0px 0px' }}>Logic</Button>
                        </ButtonGroup>
                        </Box>
                        <Box
                            component="form"
                            style={{ padding: '20px', border: '1px #5048E5 solid', borderRadius: '0px 8px 8px 8px', marginTop: '-1px' }}
                        >
                            <TextField
                                required
                                autoFocus
                                margin="dense"
                                id="label"
                                label="Label"
                                type="text"
                                size="small"
                                fullWidth
                                variant="outlined"
                                value={fieldLabel}
                                onChange={handleLabel}
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
                        </Box>
                    </Grid>
                    <TextfieldPreview fieldLabel={fieldLabel} fieldDescription={fieldDescription}/>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Grid item xs={12} md={12} style={{ padding: '30px' }} align='right'>
                    <Button onClick={handleClose} variant="outlined" size='small' style={{ margin: '0px 20px' }} color="error">Cancel</Button>
                    <Button onClick={createTextField} variant="outlined" size='small' color="success">Add Field</Button>
                </Grid>
            </DialogActions>
        </Dialog>
    )
}

export default TextField_
