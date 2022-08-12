import React, { useState, useContext } from 'react';
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
    Checkbox,
    Select,
    MenuItem
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

import { FormContext } from '../context';
import {
    FieldTooltip,
    allFormFields,
    conditionalLogic
} from '../utils';
import {
    FieldError,
} from '../utils/ErrorCards';
import FieldDialog from './';
import TextfieldPreview from '../previews/TextfieldPreview';
import MultipleValuesPreview from '../previews/multipleValues';

// This is the field for type=TextField
const TextField_ = (props) => {

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
    const [id] = useState(fieldData?fieldData.id:'')
    const [parentId] = useState(fieldData?fieldData.parentId:sectionId)
    const [subParentId] = useState(fieldData?fieldData.subParentId:subSectionId)
    const [type] = useState(fieldData ? fieldData.type : 'text')
    const [display] = useState(fieldData&&fieldData.display?fieldData.display:'visible')
    const [fieldLabel, setFieldLabel] = useState(fieldData ? fieldData.label : '')
    const [fieldValue, setFieldValue] = useState(fieldData ? fieldData.value : '')
    const [fieldDescription, setFieldDescription] = useState(fieldData ? fieldData.description : '')
    const [tooltip, setTooltip] = useState(fieldData ? fieldData.tooltip : '')
    const [isRequired, setIsRequired] = useState(fieldData ? fieldData.required : false )
    const [dependency, setDependency] = useState(fieldData&&fieldData.dependency?fieldData.dependency:null)
    const [conditional, setConditional] = useState(fieldData&&fieldData.conditional?fieldData.conditional:null)
    const [when, setWhen] = useState(fieldData&&fieldData.conditional?fieldData.conditional.when:'')
    const [value, setValue] = useState(fieldData&&fieldData.conditional?fieldData.conditional.value:'')
    const [multipleValues, setMultipleValues] = useState(fieldData && fieldData.multipleValues ? fieldData.multipleValues : false)
    const [multipleValuesData, setMultipleValuesData] = useState(fieldData && fieldData.multipleValuesData ? fieldData.multipleValuesData : [])

    const handleLabel = (event) => {
        setFieldLabel(event.target.value);
    }

    const handleFieldValue = (event) => {
        setFieldValue(event.target.value);
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

    const handleWhen = (e) => {
        setWhen(e.target.value)
    }

    const handleValue = (e) => {
        setValue(e.target.value)
    }

    const removeConditional = () => {
        setWhen(conditional?fieldData.conditional.when:'')
        setValue(conditional?fieldData.conditional.value:'')
    }

    const conditionalData = conditionalLogic({
        when: when,
        value: value
    })

    const addField = () => {

        let newFieldObj = {
            id: uuidv4(),
            parentId: sectionId,
            subParentId: subSectionId,
            type: type,
            display: conditionalData?'hidden':display,
            label: fieldLabel,
            value: fieldValue,
            description: fieldDescription,
            tooltip: tooltip,
            required: isRequired,
            dependency: dependency,
            conditional: conditionalData,
            multipleValues: multipleValues,
            multipleValuesData: multipleValuesData
        }

        if(sectionId&&fieldLabel!=='') {
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
            setMultipleValues(false)
            setMultipleValuesData([])
            removeConditional()
            handleClose()
        } else {
            setError(true)
            if(fieldLabel===''){
                setErrorTag('Label')
            }
        }
    }

    const updateField = () => {

        let textFieldData = {
            id: id,
            parentId: parentId,
            subParentId: subParentId,
            type: type,
            display: conditionalData?'hidden':display,
            label: fieldLabel,
            value: fieldValue,
            description: fieldDescription,
            tooltip: tooltip,
            required: isRequired,
            dependency: dependency,
            conditional: conditionalData,
            multipleValues: multipleValues,
            multipleValuesData: multipleValuesData
        }

        updateFieldInSection(textFieldData)
        handleClose()

    }

    const cancel = () => {
        setError(false)
        setErrorTag(false)
        setPanelType('display')
        setFieldLabel(fieldData?fieldData.label:'')
        setFieldValue(fieldData?fieldData.value:'')
        setFieldDescription(fieldData?fieldData.description:'')
        setTooltip(fieldData?fieldData.tooltip:'')
        setIsRequired(!isRequired)
        setDependency(fieldData&&fieldData.dependency?fieldData.dependency:null)
        setMultipleValues(fieldData && fieldData.multipleValues ? fieldData.multipleValues : false)
        setMultipleValuesData(fieldData && fieldData.multipleValuesData ? fieldData.multipleValuesData : [])
        removeConditional()
        handleClose()
    };

    const handleMultipleValues = (e) => {
        if (!multipleValues) {
            setMultipleValuesData([
                1
            ])
        }
        setMultipleValues(!multipleValues);
    }

    return (
        <FieldDialog
            open={open}
            handleClose={handleClose}
            fieldData={fieldData}
            fieldTitle={'Text Field Component'}
            errorTag={errorTag}
            mode={panelType}
            displayMode={displayPanel}
            conditionalMode={conditionalPanel}
            dependencyMode={false}
            calculateMode={false}
            when={when}
            handleWhen={handleWhen}
            value={value}
            handleValue={handleValue}
            removeConditional={removeConditional}
            dependency={dependency}
            handleDependency={false}
            removeDependency={false}
            fieldLabel={fieldLabel}
            handleLabel={handleLabel}
            fieldValue={fieldValue}
            handleFieldValue={handleFieldValue}
            fieldDescription={fieldDescription}
            handleDescription={handleDescription}
            tooltip={tooltip}
            handleTooltip={handleTooltip}
            isRequired={isRequired}
            handleIsRequired={handleIsRequired}
            cancel={cancel}
            addField={addField}
            updateField={updateField}
            multipleValues={multipleValues}
            handleMultipleValues={handleMultipleValues}
            setMultipleValuesData={setMultipleValuesData}
            multipleValuesData={multipleValuesData}
        />
    )
}

export default TextField_
