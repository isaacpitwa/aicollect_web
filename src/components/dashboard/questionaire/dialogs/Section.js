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
    TextField
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

// This is the field for type=TextField
const Section = (props) => {

    const { open, data, createSection, handleClose } = props

    const [sectionTitle, setSectionTitle] = useState('')
    const [sectionDescription, setSectionDescription] = useState('')

    const handleTitle = (e) => {
        setSectionTitle(e.target.value)
    }

    const handleDescription = (e) => {
        setSectionDescription(e.target.value)
    }

    const sectionData = {
        type: 'section',
        title: sectionTitle,
        description: sectionDescription
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
                {data.dialogTitle}
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
                                label="Section Title"
                                type="text"
                                size="small"
                                fullWidth
                                variant="outlined"
                                onChange={handleTitle}
                                error={sectionTitle==''?true:false}
                                helperText={'Missing field'}
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
                                onChange={handleDescription}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={5} style={{ padding: '30px 20px' }}>
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
                            <Button variant="contained" style={{ borderRadius: '8px 8px 0px 0px' }}>Preview</Button>
                        </ButtonGroup>
                        </Box>
                        <Box
                            component="form"
                            style={{ padding: '20px', border: '1px #5048E5 solid', borderRadius: '0px 8px 8px 8px', marginTop: '-1px', minHeight: '200px' }}
                        >
                            {sectionTitle!=''?
                                <Typography style={{ fontSize: '18px', borderBottom: '1px #5048E5 solid', color: '#5048E5' }}>
                                    {sectionTitle}
                                </Typography>
                            :
                                ''
                            }
                            {sectionDescription!=''?
                                <Typography style={{ fontSize: '14px', color: '#5048e598' }}>
                                    <i>{sectionDescription}</i>
                                </Typography>
                            :
                                ''
                            }
                        </Box>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Grid item xs={12} md={12} style={{ padding: '30px' }} align='right'>
                    <Button onClick={handleClose} variant="outlined" size='small' style={{ margin: '0px 20px' }} color="error">Cancel</Button>
                    <Button onClick={createSection} variant="outlined" size='small' color="primary">Create Section</Button>
                </Grid>
            </DialogActions>
        </Dialog>
    )
}

export default Section
