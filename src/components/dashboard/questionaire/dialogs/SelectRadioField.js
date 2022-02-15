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
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel,
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

import SelectRadioPreview from '../previews/SelectRadioPreview'
import { typography } from '@mui/system';

// This is the field for type=TextField
const SelectRadioField = (props) => {

    const { open, createTextField, handleClose } = props
    
    const [fieldLabel, setFieldLabel] = useState('')
    const [radioValue, setRadioValue] = useState('')
    const [fieldDescription, setFieldDescription] = useState('')
    const [tooltip, setTooltip] = useState('')
    const [radios, setRadios] = useState([
        {
            'radioId': uuidv4(),
            'radioLabel': ''
        }
    ])

    const addRadio = () => {
        let radioId = uuidv4()
        let data = {
            'radioId': radioId,
            'radioLabel': '',
        }
        setRadios(radios => [...radios, data])
    }

    const handleRemoveItem = (e) => {
        setradios(radios.filter(item => item.radioId !== e.target.value));
    };

    const handleLabel = (e) => {
        setFieldLabel(e.target.value);
    }
    
    const handleRadio = (e) => {
        setRadioValue(e.target.value)
    }

    const handleDescription = (event) => {
        setFieldDescription(event.target.value);
    }

    const handleTooltip = (e) => {
        setTooltip(e.target.value)
    }

    const cancel = () => {
        setFieldLabel('')
        setRadioValue('')
        setFieldDescription('')
        setTooltip('')
        setRadios([
            {
                'radioId': uuidv4(),
                'radioLabel': ''
            }
        ])
        handleClose()
    }

    const RadioOption = (valueSelected) => {

        return (
            <Radio
                checked={radioValue === `${valueSelected}`}
                onChange={handleRadio}
                value={valueSelected}
                name="radio-buttons"
                inputProps={{ 'aria-label': `${valueSelected}` }}
            />
        )
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
                Select Radio Component
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
                            <Button disabled>Data</Button>
                            <Button disabled>Validation</Button>
                            <Button disabled>Conditional</Button>
                            <Button disabled style={{ borderRadius: '0px 8px 0px 0px' }}>Logic</Button>
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
                                        {radios.map(row=>(
                                            <TableRow key={row.radioId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                <TableCell padding="checkbox">
                                                    {RadioOption(row.radioId)}
                                                </TableCell>
                                                <TableCell>
                                                    <TextField                                                        
                                                        margin="dense"
                                                        id="outlined-multiline-static"
                                                        label="Option"
                                                        size="small"
                                                        variant="outlined"
                                                        fullWidth
                                                        value={row.radioLabel}
                                                        onChange={(e) => {
                                                            row.radioLabel = e.target.value;
                                                            setRadios([...radios]);
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
                                                        value={row.radioLabel}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <Button
                                                        disabled={radios.length<=1}
                                                        variant='contained'
                                                        size='small'
                                                        color='error'
                                                        value={row.radioId}
                                                        onClick={(e) => {
                                                            setRadios([...radios]);
                                                            if(radios.length !== 1){
                                                                setRadios(radios.filter(item => item.radioId !== e.target.value));
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
                                <Button variant='contained' size='small' color='primary' onClick={addRadio}>Add Another</Button>
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
                        </Box>
                    </Grid>
                    <SelectRadioPreview fieldLabel={fieldLabel} fieldDescription={fieldDescription} tooltip={tooltip} radioValue={radioValue} radios={radios}/>
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

export default SelectRadioField
