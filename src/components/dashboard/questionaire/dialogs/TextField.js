import React, { useState, useEffect, useContext } from 'react';
import {
    Box,
    Button,
    ButtonGroup,
    Grid,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Typography,
    Checkbox
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

import { FormContext } from '../context';
import {
    findComponentIndex,
    editField
} from '../utils';
import GeneralTooltip from '../previews/GeneralTooltip';
import TextfieldPreview from '../previews/TextfieldPreview';

// This is the field for type=TextField
const TextField_ = (props) => {

    const { componentsData, updateComponentsData } = useContext(FormContext)

    const { open, createTextField, fieldData, handleClose } = props
    
    const [compsData, setCompsData] = useState([]);
    const [fieldLabel, setFieldLabel] = useState(fieldData?fieldData.label:'')
    const [fieldDescription, setFieldDescription] = useState(fieldData?fieldData.description:'')
    const [tooltip, setTooltip] = useState(fieldData?fieldData.tooltip:'')
    const [isRequired, setIsRequired] = useState(fieldData?fieldData.required:'')

    useEffect(() => {
        setCompsData(componentsData);
    }, [compsData])

    const handleLabel = (event) => {
        setFieldLabel(event.target.value);
    }

    const handlePosition = (event) => {
        setPosition(event.target.value);
    };

    const handleDescription = (event) => {
        setFieldDescription(event.target.value);
    };

    const handleTooltip = (e) => {
        setTooltip(e.target.value)
    }

    const handleChecked = (e) => {
        setIsRequired(!isRequired)
    }

    const handleUpdate = () => {
        let newField = {
            id: fieldData.id,
            parentId: fieldData.parentId,
            subParentId: fieldData.subParentId,
            required: isRequired,
            type: fieldData.type,
            defaultValue: fieldData.defaultValue,
            label: fieldLabel,
            description: fieldDescription,
            tooltip: tooltip
        }        
        updateComponentsData(editField(compsData, findComponentIndex(fieldData, compsData), newField))
        handleClose()
    }

    const cancel = () => {
        setFieldLabel('')
        setFieldDescription('')
        setTooltip('')
        setIsRequired(!isRequired)
        handleClose()
    }

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
                            <Button>Conditional</Button>
                            <Button style={{ borderRadius: '0px 8px 0px 0px' }}>Logic</Button>
                        </ButtonGroup>
                        </Box>
                        <Box
                            component="form"
                            style={{ padding: '20px', border: '1px #5048E5 solid', borderRadius: '0px 8px 8px 8px', marginTop: '-1px' }}
                        >
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
                        </Box>
                    </Grid>
                    <TextfieldPreview fieldLabel={fieldLabel} fieldDescription={fieldDescription} tooltip={tooltip} isRequired={isRequired}/>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Grid item xs={12} md={12} style={{ padding: '30px' }} align='right'>
                    <Button onClick={cancel} variant="outlined" size='small' style={{ margin: '0px 20px' }} color="error">Cancel</Button>
                    <Button onClick={handleUpdate} variant="outlined" size='small' color="success">Save</Button>
                </Grid>
            </DialogActions>
        </Dialog>
    )
}

export default TextField_
