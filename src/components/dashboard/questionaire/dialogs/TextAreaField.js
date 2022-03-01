import React, { useState, useContext } from 'react';
import {
    Box,
    Paper,
    Button,
    ButtonGroup,
    Grid,
    Typography,
    Checkbox,
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

import { FormContext } from '../context';
import { allFormFields } from '../utils';
import GeneralTooltip from '../previews/GeneralTooltip';
import TextareafieldPreview from '../previews/TextareafieldPreview';

// This is the field for type=TextField
const TextAreaField = (props) => {

    const { componentsData } = useContext(FormContext)

    const { open, createTextField, handleClose } = props
    
    const [fieldLabel, setFieldLabel] = useState('')
    const [fieldDescription, setFieldDescription] = useState('')
    const [tooltip, setTooltip] = useState('')
    const [isRequired, setIsRequired] = useState(false)
    const [conditional, setConditional] = useState(false)
    const [displayValue, setDisplayValue] = useState('')
    const [whenValue, setWhenValue] = useState('')
    const [compValue, setCompValue] = useState('')
    
    const handleLabel = (event) => {
        setFieldLabel(event.target.value);
    }

    const handlePosition = (event) => {
        setPosition(event.target.value);
    };

    const handleDescription = (event) => {
        setFieldDescription(event.target.value);
    }

    const handleTooltip = (e) => {
        setTooltip(e.target.value)
    }

    const handleChecked = (e) => {
        setIsRequired(!isRequired)
    }

    const handleConditional = (e) => {
        setConditional(!conditional)
    }

    const handleDiplay = (e) => {
        setDisplayValue(e.target.value)
    }

    const handleWhen = (e) => {
        setWhenValue(e.target.value)
    }

    const handleCompValue = (e) => {
        setCompValue(e.target.value)
    }

    const cancel = () => {
        setFieldLabel('')
        setFieldDescription('')
        setTooltip('')
        setIsRequired(!isRequired)
        handleClose()
    }

    console.log()

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
                Text Area Component
                <CancelIcon color='error' style={{ float: 'right', cursor: 'pointer' }} onClick={handleClose}/>
            </DialogTitle>
            <DialogContent>
                <Grid container>
                    <Grid item xs={12} md={6} style={{ padding: '30px 20px' }}>
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
                            <Button onClick={handleConditional}>Conditional</Button>
                            <Button style={{ borderRadius: '0px 8px 0px 0px' }}>Logic</Button>
                        </ButtonGroup>
                        </Box>
                            <Box
                                component="form"
                                style={{ padding: '20px', border: '1px #5048E5 solid', borderRadius: '0px 8px 8px 8px', marginTop: '-1px' }}
                            >
                            {conditional?
                                <>
                                    <Typography style={{ fontSize: '18px', color: '#5048E5' }}>
                                        This component should Display:
                                    </Typography>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={displayValue}
                                        fullWidth
                                        size={'small'}
                                        onChange={handleDiplay}
                                    >
                                        <MenuItem value={true}>True</MenuItem>
                                        <MenuItem value={false}>False</MenuItem>
                                    </Select>
                                    <Typography style={{ fontSize: '18px', marginTop: '20px', color: '#5048E5' }}>
                                        When the form component:
                                    </Typography>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={whenValue}
                                        fullWidth
                                        size={'small'}
                                        onChange={handleWhen}
                                    >
                                        {allFormFields(componentsData).map(option=>(
                                            <MenuItem value={option.id}>{option.label}</MenuItem>
                                        ))}
                                        <MenuItem value={false}>False</MenuItem>
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
                                        value={compValue}
                                        onChange={handleCompValue}
                                    />
                                </>
                            :
                                <>
                                <TextField
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
                                <Typography style={{ color: '#5048E5' }}>
                                    <Checkbox size={'small'} checked={isRequired} onChange={handleChecked}/>Required<GeneralTooltip tipData={'A required field must be filled.'}/>
                                </Typography>
                            </>
                            }
                            </Box>

                    </Grid>
                    <TextareafieldPreview fieldLabel={fieldLabel} fieldDescription={fieldDescription} tooltip={tooltip} isRequired={isRequired}/>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Grid item xs={12} md={12} style={{ padding: '30px' }} align='right'>
                    <Button onClick={cancel} variant="outlined" size='small' style={{ margin: '0px 20px' }} color="error">Cancel</Button>
                    <Button onClick={createTextField} variant="outlined" size='small' color="success">Add Field</Button>
                </Grid>
            </DialogActions>
        </Dialog>
    )
}

export default TextAreaField
