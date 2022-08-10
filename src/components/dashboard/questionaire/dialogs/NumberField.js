import React, { useState, useEffect, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
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
    Select,
    MenuItem,
    Checkbox
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

import { FormContext } from '../context';
import {
    allFormFields,
    conditionalLogic,
    getSectionsSubSections
} from '../utils';
import {
    FieldError,
} from '../utils/ErrorCards';
import GeneralTooltip from '../previews/GeneralTooltip'
import NumberfieldPreview from '../previews/NumberfieldPreview'

// This is the field for type=TextField
const NumberField = (props) => {

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
    const [type] = useState(fieldData ? fieldData.type : 'number')
    const [display, setDisplay] = useState(fieldData && fieldData.display ? fieldData.display : 'visible')
    const [fieldLabel, setFieldLabel] = useState(fieldData ? fieldData.label : '')
    const [fieldValue, setFieldValue] = useState(fieldData ? fieldData.value : '')
    const [fieldDescription, setFieldDescription] = useState(fieldData ? fieldData.description : '')
    const [tooltip, setTooltip] = useState(fieldData ? fieldData.tooltip : '')
    const [isRequired, setIsRequired] = useState(fieldData ? fieldData.required : false)
    const [conditional, setConditional] = useState(fieldData && fieldData.conditional ? fieldData.conditional : null)
    const [when, setWhen] = useState(fieldData && fieldData.conditional ? fieldData.conditional.when : '')
    const [value, setValue] = useState(fieldData && fieldData.conditional ? fieldData.conditional.value : '')
    const [dependency, setDependency] = useState(fieldData && fieldData.dependency ? fieldData.dependency : null)
    const [validations, setValidations] = useState(fieldData && fieldData.validations ? fieldData.validations : null)

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

    const dependencyPanel = (e) => {
        setPanelType("dependency")

    }

    const handleDependency = (e) => {
        setDependency(e.target.value)
    }

    const handleValidations = (e) => {
        setValidations({ ...validations, [e.target.name]: e.target.value });
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



    const removeDependency = () => {
        setDependency(null)
    }

    const addNumberField = () => {

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
            conditional: conditionalData,
            dependency: dependency,
            validations: validations,
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
            setConditional(null)
            setDependency(null)
            setValidations(null)
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

        let numberFieldData = {
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
            conditional: conditionalData,
            dependency: dependency,
            validations: validations,
        }

        updateFieldInSection(numberFieldData)
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
        setDependency(fieldData && fieldData.validations ? fieldData.validations : null)
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
                Number Field Component
                <CancelIcon
                    color='error'
                    style={{ float: 'right', cursor: 'pointer' }}
                    onClick={handleClose}
                />
            </DialogTitle>
            <DialogContent>
                <Grid
                    container
                >
                    <Grid
                        item
                        xs={12}
                        md={6}
                        style={{ padding: '20px' }}
                    >
                        <FieldError
                            errorTag={errorTag}
                        />
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
                                    variant={panelType === "logic" ? "contained" : "outlined"}
                                    onClick={logicPanel}
                                >Logic</Button>
                                <Button
                                    variant={panelType === "dependency" ? "contained" : "outlined"}
                                    onClick={dependencyPanel}
                                    style={{ borderRadius: '0px 8px 0px 0px' }}
                                >Dependency</Button>
                            </ButtonGroup>
                        </Box>
                        <Box
                            component="form"
                            style={{ padding: '20px', border: '1px #5048E5 solid', borderRadius: '0px 8px 8px 8px', marginTop: '-1px' }}
                        >
                            {panelType === "conditional" ?
                                <>
                                    <Typography
                                        style={{ marginTop: '20px', fontSize: '15px', marginTop: '20px', color: '#5048E5' }}
                                    >
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
                                            <MenuItem
                                                key={index}
                                                value={option.id}
                                            >{option.label}</MenuItem>
                                        ))}
                                    </Select>
                                    <Typography
                                        style={{ marginTop: '10px', fontSize: '15px', marginTop: '20px', color: '#5048E5' }}
                                    >
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
                                : panelType === "dependency" ?
                                    <>
                                        <Typography
                                            style={{ fontSize: '15px', color: '#5048E5' }}
                                        >
                                            For Section/Sub-Section:
                                        </Typography>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={dependency}
                                            fullWidth
                                            size={'small'}
                                            onChange={handleDependency}
                                        >
                                            {getSectionsSubSections(fieldData, componentsData).map((option, index) => (
                                                <MenuItem
                                                    key={index}
                                                    value={option.id}
                                                >
                                                    {option.label} ={'>'} <small>[{option.type}]</small>
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        <Typography
                                            style={{ paddingTop: '10px' }}
                                        >
                                            <Button
                                                disabled={dependency ? false : true}
                                                variant='outlined'
                                                size='small'
                                                color='error'
                                                onClick={removeDependency}
                                            >
                                                Remove Dependency
                                            </Button>
                                        </Typography>
                                    </>
                                    :
                                    <>
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
                                            style={{ marginTop: '15px' }}
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
                                            style={{ marginTop: '25px' }}
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
                                            style={{ marginTop: '25px' }}
                                        />
                                        <Typography
                                            style={{ marginTop: '10px', color: '#5048E5' }}
                                        >
                                            <Checkbox
                                                size={'small'}
                                                checked={isRequired}
                                                onChange={handleIsRequired}
                                            />Required<GeneralTooltip tipData={'A required field must be filled.'} />
                                        </Typography>

                                        <Typography
                                            style={{ marginTop: '10px', color: '#000' }}
                                        >
                                            Validations
                                           (Optional)
                                        </Typography>
                                        <Box style={{padding: '8px 16px'}}>
                                            <Typography
                                                style={{ marginTop: '10px', color: '#000' }}
                                            >
                                                Minimum Value
                                                <GeneralTooltip tipData={`Add Minimum Data Restriction for ${fieldData.label} `} />
                                            </Typography>
                                            <TextField
                                                margin="dense"
                                                id="label"
                                                type="number"
                                                size="small"
                                                fullWidth
                                                variant="outlined"
                                                name='min'
                                                value={validations ? validations.min : null}
                                                InputProps={{
                                                    endAdornment: <GeneralTooltip tipData={tooltip} />
                                                }}
                                                onChange={handleValidations}
                                            />
                                            <Typography
                                                style={{ marginTop: '10px', color: '#000' }}
                                            >
                                                Maximum Value
                                                <GeneralTooltip tipData={`Add Maximum Data Restriction for ${fieldData.label} `} />
                                            </Typography>
                                            <TextField
                                                margin="dense"
                                                id="label"
                                                type="number"
                                                size="small"
                                                fullWidth
                                                variant="outlined"
                                                name='max'
                                                value={validations ? validations.max : null}
                                                InputProps={{
                                                    endAdornment: <GeneralTooltip tipData={tooltip} />
                                                }}
                                                onChange={handleValidations}
                                            />

                                        </Box>
                                    </>
                            }
                        </Box>
                    </Grid>
                    <NumberfieldPreview
                        fieldLabel={fieldLabel}
                        fieldDescription={fieldDescription}
                        tooltip={tooltip}
                        isRequired={isRequired}
                    />
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
                        onClick={fieldData ? handleUpdate : addNumberField}
                        variant="outlined"
                        size='small'
                        color="success"
                    >{fieldData ? "Save Changes" : "Add Field"}</Button>
                </Grid>
            </DialogActions>
        </Dialog>
    )
}

export default NumberField
