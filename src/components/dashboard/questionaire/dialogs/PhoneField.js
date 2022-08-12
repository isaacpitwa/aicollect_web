import React, { useState, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
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
    Checkbox,
    TextField,
    Select,
    MenuItem,
    InputLabel,
    FormControl
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import MuiPhoneNumber from 'material-ui-phone-number'

import { FormContext } from '../context';
import {
    allFormFields,
    conditionalLogic
} from '../utils';
import {
    FieldError,
} from '../utils/ErrorCards';
import GeneralTooltip from '../previews/GeneralTooltip';
import PhonefieldPreview from '../previews/PhonefieldPreview';
import MultipleValuesPreview from '../previews/multipleValues';

// This is the field for type=TextField
const PhoneField_ = (props) => {

    const {
        setError,
        sectionId,
        subSectionId,
        componentsData,
        addComponentToSection,
        updateFieldInSection,
    } = useContext(FormContext)

    const { open, fieldData, handleClose } = props

    const [errorTag, setErrorTag] = useState(false)
    const [panelType, setPanelType] = useState('display')
    const [id] = useState(fieldData ? fieldData.id : '')
    const [parentId] = useState(fieldData ? fieldData.parentId : sectionId)
    const [subParentId] = useState(fieldData ? fieldData.subParentId : subSectionId)
    const [type] = useState(fieldData ? fieldData.type : 'phone-number')
    const [display] = useState(fieldData && fieldData.display ? fieldData.display : 'visible')
    const [fieldLabel, setFieldLabel] = useState(fieldData ? fieldData.label : '')
    const [fieldValue, setFieldValue] = useState(fieldData ? fieldData.value : '')
    const [fieldDescription, setFieldDescription] = useState(fieldData ? fieldData.description : '')
    const [tooltip, setTooltip] = useState(fieldData ? fieldData.tooltip : '')
    const [isRequired, setIsRequired] = useState(fieldData ? fieldData.required : false)
    const [dependency, setDependency] = useState(fieldData && fieldData.dependency ? fieldData.dependency : null)
    const [conditional, setConditional] = useState(fieldData && fieldData.conditional ? fieldData.conditional : null)
    const [when, setWhen] = useState(fieldData && fieldData.conditional ? fieldData.conditional.when : '')
    const [value, setValue] = useState(fieldData && fieldData.conditional ? fieldData.conditional.value : '')
    const [validations, setValidations] = useState(fieldData && fieldData.validations ? fieldData.validations : null)
    const [displayConfigs, setDisplayConfigs] = useState(fieldData && fieldData.displayConfigs ? fieldData.displayConfigs : null)
    const [multipleValues, setMultipleValues] = useState(fieldData && fieldData.multipleValues ? fieldData.multipleValues : false)
    const [multipleValuesData, setMultipleValuesData] = useState(fieldData && fieldData.multipleValuesData ? fieldData.multipleValuesData : [])

    const handleLabel = (event) => {
        setFieldLabel(event.target.value);
    }

    const handleDescription = (event) => {
        setFieldDescription(event.target.value);
    };

    const handleTooltip = (e) => {
        setTooltip(e.target.value)
    }

    const handleIsRequired = (e) => {
        setIsRequired(!isRequired)
    }

    const displayPanel = (e) => {
        setPanelType("display")
    }

    const conditionalPanel = (e) => {
        setPanelType("conditional")
    }

    const logicPanel = (e) => {
        setPanelType("logic")
    }
    const handleValidations = (e) => {
        setValidations({ ...validations, [e.target.name]: e.target.value });
    }
    const handleDisplayConfigs = (e) => {
        if (e.target.name === 'inputMask' && e.target.value) {
            var value = e.target.value.toString().split('').map((char, index) => {
                if (/^\d+$/.test(char)) {
                    return '#'
                }
                return char

            }).join('')
            setDisplayConfigs({ ...displayConfigs, [e.target.name]: value });
        } else {
            setDisplayConfigs({ ...displayConfigs, [e.target.name]: e.target.value })
        };
    }
    const handleWhen = (e) => {
        setWhen(e.target.value)
    }

    const handleValue = (e) => {
        setValue(e.target.value)
    }

    const removeConditional = () => {
        setWhen(conditional ? fieldData.conditional.when : '')
        setValue(conditional ? fieldData.conditional.value : '')
    }

    const conditionalData = conditionalLogic({
        when: when,
        value: value
    })

    const addPhoneField = () => {

        let newFieldObj = {
            id: uuidv4(),
            parentId: sectionId,
            subParentId: subSectionId,
            type: type,
            display: conditionalData ? 'hidden' : display,
            label: fieldLabel,
            value: fieldValue,
            description: fieldDescription,
            tooltip: tooltip,
            required: isRequired,
            dependency: dependency,
            conditional: conditionalData,
            validations: validations,
            displayConfigs: displayConfigs,
            multipleValues: multipleValues,
            multipleValuesData: multipleValuesData
        }

        if (sectionId && fieldLabel !== '') {
            addComponentToSection(newFieldObj)
            setError(false)
            setErrorTag(false)
            setPanelType('display')
            setFieldLabel('')
            setFieldDescription('')
            setTooltip('')
            setIsRequired(false)
            setDependency(null)
            setConditional(null)
            setValidations(null)
            setDisplayConfigs(null)
            setMultipleValues(false)
            setMultipleValuesData([])
            removeConditional()
            handleClose()
        } else {
            setError(true)
            if (fieldLabel === '') {
                setErrorTag('Label')
            }
        }
    }

    const handleUpdate = () => {

        let newField = {
            id: id,
            parentId: parentId,
            subParentId: subParentId,
            type: type,
            display: conditionalData ? 'hidden' : display,
            label: fieldLabel,
            value: fieldValue,
            description: fieldDescription,
            tooltip: tooltip,
            required: isRequired,
            dependency: dependency,
            conditional: conditionalData,
            validations: validations,
            displayConfigs: displayConfigs,
            multipleValues: multipleValues,
            multipleValuesData: multipleValuesData
        }

        updateFieldInSection(newField)
        handleClose()

    }

    const cancel = () => {
        setError(false)
        setErrorTag(false)
        setPanelType('display')
        setFieldLabel(fieldData ? fieldData.label : '')
        setFieldValue(fieldData ? fieldData.value : '')
        setFieldDescription(fieldData ? fieldData.description : '')
        setTooltip(fieldData ? fieldData.tooltip : '')
        setIsRequired(!isRequired)
        setDependency(fieldData && fieldData.dependency ? fieldData.dependency : null)
        removeConditional()
        setValidations(fieldData && fieldData.validations ? fieldData.validations : null)
        setDisplayConfigs(fieldData && fieldData.displayConfigs ? fieldData.displayConfigs : null)
        setMultipleValues(fieldData && fieldData.multipleValues ? fieldData.multipleValues : false)
        setMultipleValuesData(fieldData && fieldData.multipleValuesData ? fieldData.multipleValuesData : [])
        handleClose()
    };

    const handleMultipleValues = (e) => {
        if (!multipleValues) {
            setMultipleValuesData([
                <MuiPhoneNumber
                    fullWidth
                    size={'small'}
                    label={fieldLabel ? fieldLabel : 'Phone Number'}
                    margin="dense"
                    variant='outlined'
                    defaultCountry={'ug'}
                    onChange={setValue}
                    InputProps={{
                        endAdornment: tooltip != '' ? <GeneralTooltip tipData={tooltip} /> : false,
                    }}
                />
            ])
        }
        setMultipleValues(!multipleValues);
    }


    const DialogModes = () => {

        return (
            <ButtonGroup
                variant="outlined"
                size='small'
                aria-label="outlined button group"
            >
                <Button
                    variant={panelType === "display" ? "contained" : "outlined"}
                    onClick={displayPanel}
                    style={{ borderRadius: '8px 0px 0px 0px' }}
                >Display</Button>
                <Button
                    variant={panelType === "conditional" ? "contained" : "outlined"}
                    onClick={conditionalPanel}
                >Conditional</Button>
                <Button
                    disabled
                    variant={panelType === "logic" ? "contained" : "outlined"}
                    onClick={logicPanel}
                    style={{ borderRadius: '0px 8px 0px 0px' }}
                >Logic</Button>
            </ButtonGroup>
        )
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
                Phone Number Component
                <CancelIcon color='error' style={{ float: 'right', cursor: 'pointer' }} onClick={handleClose} />
            </DialogTitle>
            <DialogContent>
                <Grid container>
                    <Grid
                        item
                        xs={12}
                        md={6}
                        style={{ padding: '20px' }}
                    >
                        <FieldError errorTag={errorTag} />
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
                            {DialogModes()}
                        </Box>
                        <Box
                            component="form"
                            style={{ padding: '20px', border: '1px #5048E5 solid', borderRadius: '0px 8px 8px 8px', marginTop: '-1px' }}
                        >
                            {panelType === 'conditional' ?
                                <>
                                    <Typography style={{ fontSize: '18px', marginTop: '20px', color: '#5048E5' }}>
                                        When the form component:
                                    </Typography>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={when}
                                        fullWidth
                                        size={'small'}
                                        onChange={handleWhen}
                                    >
                                        {allFormFields(componentsData, fieldData).map((option, index) => (
                                            <MenuItem key={index} value={option.id}>{option.label}</MenuItem>
                                        ))}
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
                                        value={value}
                                        onChange={handleValue}
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
                                        <Checkbox
                                            size={'small'}
                                            checked={isRequired}
                                            onChange={handleIsRequired}
                                        />Required<GeneralTooltip tipData={'A required field must be filled.'} />
                                    </Typography>
                                    <Typography
                                        style={{ marginTop: '10px', color: '#5048E5' }}
                                    >
                                        <Checkbox
                                            size={'small'}
                                            checked={multipleValues}
                                            onChange={handleMultipleValues}
                                        />Multiple Values<GeneralTooltip tipData={'A required field must be filled.'} />
                                    </Typography>
                                </>
                            }
                        </Box>
                    </Grid>
                    {
                        multipleValues ?
                            <MultipleValuesPreview  {...props} component={
                                <MuiPhoneNumber
                                    fullWidth
                                    size={'small'}
                                    label={fieldLabel ? fieldLabel : 'Phone Number'}
                                    margin="dense"
                                    variant='outlined'
                                    defaultCountry={'ug'}
                                    onChange={setValue}
                                    InputProps={{
                                        endAdornment: tooltip != '' ? <GeneralTooltip tipData={tooltip} /> : false,
                                    }}
                                />
                            }
                                onChange={setMultipleValuesData}
                                multipleValuesData={multipleValuesData}
                                multipleValues={multipleValues}
                            />
                            : <PhonefieldPreview
                                defaultCountry={'ug'}
                                fieldLabel={fieldLabel}
                                fieldDescription={fieldDescription}
                                tooltip={tooltip}
                                isRequired={isRequired}
                                multipleValues={multipleValues}
                            />

                    }

                </Grid>
            </DialogContent>
            <DialogActions>
                <Grid
                    item
                    xs={12}
                    md={12}
                    style={{ padding: '30px' }}
                    align='right'
                >
                    <Button
                        onClick={cancel}
                        variant="outlined"
                        size='small'
                        style={{ margin: '0px 20px' }}
                        color="error"
                    >Cancel</Button>
                    <Button
                        onClick={fieldData ? handleUpdate : addPhoneField}
                        variant="outlined"
                        size='small'
                        color="success"
                    >{fieldData ? "Save Changes" : "Add Field"}</Button>
                </Grid>
            </DialogActions>
        </Dialog>
    )
}

export default PhoneField_
