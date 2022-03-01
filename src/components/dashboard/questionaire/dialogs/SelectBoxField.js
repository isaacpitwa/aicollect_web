import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid'
import {
    Box,
    Checkbox,
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
    FormControl,
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

import GeneralTooltip from '../previews/GeneralTooltip';
import SelectBoxesPreview from '../previews/SelectBoxesPreview';
import { typography } from '@mui/system';

// This is the field for type=TextField
const SelectBoxField = (props) => {

    const { open, createTextField, handleClose } = props
    
    const [fieldLabel, setFieldLabel] = useState('')
    const [fieldDescription, setFieldDescription] = useState('')
    const [tooltip, setTooltip] = useState('')
    const [boxes, setBoxes] = useState([
        {
            'boxId': uuidv4(),
            'boxLabel': '',
            'checked': false,
        }
    ])
    const [isRequired, setIsRequired] = useState(false)

    const addCheckBox = () => {
        let boxId = uuidv4()
        let data = {
            'boxId': boxId,
            'boxLabel': '',
            'checked': false
        }
        setBoxes(boxes => [...boxes, data])
    }

    const handleRemoveItem = (e) => {
        setBoxes(boxes.filter(item => item.boxId !== e.target.value));
    };

    const handleLabel = (e) => {
        setFieldLabel(e.target.value);
    }
    
    const handleCheckbox = (e) => {
        const { name, value } = e.target;
        setBoxes(boxes=>[...boxes, { [name]: value }])
    }

    const handleDescription = (event) => {
        setFieldDescription(event.target.value);
    }

    const handleTooltip = (e) => {
        setTooltip(e.target.value)
    }

    const handleChecked = (e) => {
        setIsRequired(!isRequired)
    }

    const cancel = () => {
        setFieldLabel('')
        setFieldDescription('')
        setTooltip('')
        setBoxes([
            {
                'boxId': uuidv4(),
                'boxLabel': '',
                'checked': false,
            }
        ])
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
                Select Boxes Component
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
                            <TableContainer style={{ marginTop: '20px' }}>
                                <Table
                                    size="small"
                                    aria-label="a dense table"
                                >
                                    <TableHead color='primary'>
                                        <TableRow>
                                            <TableCell>Default</TableCell>
                                            <TableCell align="left">Option</TableCell>
                                            <TableCell align="left">Value</TableCell>
                                            <TableCell align="left"></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {boxes.map(row=>(
                                            <TableRow key={row.boxId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                <TableCell padding="checkbox">
                                                    <Checkbox
                                                        color="primary"
                                                        label='Default Value'
                                                        checked={row.checked}
                                                        onChange={(e) => {
                                                            row.checked = !row.checked;
                                                            setBoxes([...boxes]);
                                                        }}
                                                        inputProps={{
                                                            'aria-labelledby': row.boxId,
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <TextField                                                        
                                                        margin="dense"
                                                        id="outlined-multiline-static"
                                                        label="Value"
                                                        size="small"
                                                        variant="outlined"
                                                        fullWidth
                                                        value={row.boxLabel}
                                                        onChange={(e) => {
                                                            row.boxLabel = e.target.value;
                                                            setBoxes([...boxes]);
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <TextField
                                                        margin="dense"
                                                        id="outlined-multiline-static"
                                                        label="Value"
                                                        size="small"
                                                        variant="outlined"
                                                        fullWidth
                                                        value={row.boxLabel}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <Button
                                                        disabled={boxes.length<=1}
                                                        variant='contained'
                                                        size='small'
                                                        color='error'
                                                        value={row.boxId}
                                                        onClick={(e) => {
                                                            setBoxes([...boxes]);
                                                            if(boxes.length !== 1){
                                                                setBoxes(boxes.filter(item => item.boxId !== e.target.value));
                                                            }
                                                        }}
                                                    >
                                                        Remove
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <Typography align='right'>
                                <Button variant='contained' size='small' color='primary' onClick={addCheckBox}>Add Another</Button>
                            </Typography>
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
                    <SelectBoxesPreview fieldLabel={fieldLabel} fieldDescription={fieldDescription} tooltip={tooltip} checkBoxes={boxes} isRequired={isRequired}/>
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

export default SelectBoxField
