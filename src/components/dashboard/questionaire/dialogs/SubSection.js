import { useState, useEffect, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid'
import {
    Box,
    Button,
    ButtonGroup,
    Grid,
    Typography,
    Select,
    MenuItem,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

import { FormContext } from '../context'
import {
    allFormFields,
    findComponentIndex,
} from '../utils';

import GeneralTooltip from '../previews/GeneralTooltip';
import SubSectionPreview from '../previews/SubSectionPreview'

// This is the field for type=TextField
const SubSection = (props) => {

    const { sectionId, componentsData, addComponent, updateComponentsData } = useContext(FormContext)

    const { open, fieldData, handleClose } = props

    const [compsData, setCompsData] = useState([]);
    const [buttonFocused, setButtonFocused] = useState('display')
    const [id, setId] = useState(fieldData ? fieldData.id : '')
    const [parentId, setParentId] = useState(fieldData ? fieldData.parentId : false)
    const [subParentId, setSubParentId] = useState(fieldData ? fieldData.subParentId : false)
    const [type, setType] = useState(fieldData ? fieldData.type : '')
    const [value, setValue] = useState(fieldData ? fieldData.value : '')
    const [fieldLabel, setFieldLabel] = useState(fieldData ? fieldData.label : '')
    const [fieldDescription, setFieldDescription] = useState(fieldData ? fieldData.description : '')
    const [tooltip, setTooltip] = useState(fieldData ? fieldData.tooltip : '')
    const [isRequired, setIsRequired] = useState(fieldData ? fieldData.required : '')
    const [dependency, setDependency] = useState(false)
    const [conditional, setConditional] = useState(false)
    const [components] = useState(fieldData ? fieldData.components : [])
    const [display, setDisplay] = useState(fieldData && fieldData.conditional ? fieldData.conditional.display : '')
    const [when, setWhen] = useState(fieldData && fieldData.conditional ? fieldData.conditional.when : '')
    const [compValue, setCompValue] = useState(fieldData && fieldData.conditional ? fieldData.conditional.value : '')

    useEffect(() => {
        setCompsData(componentsData);
    }, [compsData])

    const handleLabel = (e) => {
        setFieldLabel(e.target.value)
    }

    const handleDescription = (e) => {
        setFieldDescription(e.target.value)
    }

    const handleTooltip = (e) => {
        setTooltip(e.target.value)
    }

    const handleChecked = (e) => {
        setIsRequired(!isRequired)
    }

    const handleDisplay = (e) => {
        setButtonFocused("display")
        setConditional(false)
    }

    const handleConditional = (e) => {
        setButtonFocused("conditional")
        setConditional(true)
    }

    const createSubSection = () => {

        let sectionObj = componentsData.find(comp => comp.id === sectionId )
        let newSectionObj = componentsData.find(comp => comp.id === sectionId )

        const newSubSection = {
            id: id?id:uuidv4(),
            parentId: sectionId,
            subParentId: false,
            required: isRequired,
            display: 'visible',
            type: 'sub-section',
            label: fieldLabel,
            description: fieldDescription,
            tooltip: tooltip,
            dependency: dependency,
            conditional: conditional,
            components: components
        }

        newSectionObj.components.push(newSubSection)
        updateComponentsData(findComponentIndex(sectionObj, componentsData), newSectionObj)
        handleClose()
    }

    const cancel = () => {
        setFieldLabel('')
        setFieldDescription('')
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
                Sub-Section Component
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
                            <Button variant={buttonFocused == "display" ? "contained" : "outlined"} onClick={handleDisplay} style={{ borderRadius: '8px 0px 0px 0px' }}>Display</Button>
                            <Button variant={buttonFocused == "conditional" ? "contained" : "outlined"} onClick={handleConditional} style={{ borderRadius: '0px 8px 0px 0px' }}>Conditional</Button>
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
                                label="Sub-Section Label"
                                type="text"
                                size="small"
                                fullWidth
                                variant="outlined"
                                value={fieldLabel}
                                onChange={handleLabel}
                                // error={sectionTitle==''?true:false}
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
                    <SubSectionPreview sectionLabel={fieldLabel} sectionDescription={fieldDescription} tooltip={tooltip} isRequired={isRequired} />
                </Grid>
            </DialogContent>
            <DialogActions>
                <Grid item xs={12} md={12} style={{ padding: '30px' }} align='right'>
                    <Button onClick={cancel} variant="outlined" size='small' style={{ margin: '0px 20px' }} color="error">Cancel</Button>
                    <Button onClick={createSubSection} variant="outlined" size='small' color="primary">Add Sub Section</Button>
                </Grid>
            </DialogActions>
        </Dialog>
    )
}

export default SubSection
