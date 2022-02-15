import { useState, useEffect, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid'
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
    TextField
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

import SectionPreview from '../previews/SectionPreview'

import { FormContext } from '../context'



// This is the field for type=TextField
const Section = (props) => {

    const { addComponent } = useContext(FormContext)


    const { open, handleClose } = props

    const [sectionLabel, setsectionLabel] = useState('')
    const [sectionDescription, setSectionDescription] = useState('')
    const [tooltip, setTooltip] = useState('')

    const handleLabel = (e) => {
        setsectionLabel(e.target.value)
    }

    const handleDescription = (e) => {
        setSectionDescription(e.target.value)
    }
    
    const handleTooltip = (e) => {
        setTooltip(e.target.value)
    }

    const sectionData = {
        type: 'section',
        title: sectionLabel,
        description: sectionDescription,
        components: []
    }

    const createSection = () => {
        addComponent(sectionData)
        handleClose()
    }

    const cancel = () => {
        setsectionLabel('')
        setSectionDescription('')
        setTooltip('')
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
                Section Component
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
                                label="Section Label"
                                type="text"
                                size="small"
                                fullWidth
                                variant="outlined"
                                value={sectionLabel}
                                onChange={handleLabel}
                                // error={sectionLabel==''?true:false}
                                // helperText={'Missing field'}
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
                                value={sectionDescription}
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
                    <SectionPreview sectionLabel={sectionLabel} sectionDescription={sectionDescription} tooltip={tooltip}/>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Grid item xs={12} md={12} style={{ padding: '30px' }} align='right'>
                    <Button onClick={cancel} variant="outlined" size='small' style={{ margin: '0px 20px' }} color="error">Cancel</Button>
                    <Button onClick={createSection} variant="outlined" size='small' color="primary">Add Section</Button>
                </Grid>
            </DialogActions>
        </Dialog>
    )
}

export default Section
