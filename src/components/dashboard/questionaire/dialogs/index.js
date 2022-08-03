import React, { useState, useContext } from 'react';
import {
    dialogStyles,
    modeBtnStyles
} from '../styles/FormStyles';
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
    DescriptionCard,
    allFormFields,
    getSectionsSubSections
} from '../utils';
import {
    FieldError,
} from '../utils/ErrorCards';

/**
 * @function FieldDialog
 * @desc This is the field dialog component that has forms to add/edit field properties, this component helps to add/edit a field in a form that is being built or edited.
 * @arg {Object} props - The properties passed to the select field dialog.
 * @arg {Boolean} props.open - The display status of the dialog component, passed through props.
 * @arg {String} props.dialogType - The dialog type property passed to the dialog component through props.
 * @arg {Object} props.fieldData - The field data, passed through props.
 * @arg {Object} props.handleClose - The method to close the dialog component, passed through props.
 * @returns {Component} The field dialog component.
 * @author Atama Zack <atama.zack@gmail.com>
 * @version 1.0.0
 */
const FieldDialog = (props) => {

    const {
        componentsData,
    } = useContext(FormContext)

    const {
        fieldData,
        open,
        handleClose,
        fieldTitle,
        errorTag,
        mode,
        displayMode,
        conditionalMode,
        dependencyMode,
        calculateMode,
        when,
        handleWhen,
        value,
        handleValue,
        removeConditional,
        fieldValue,
        handleFieldValue,
        dependency,
        handleDependency,
        removeDependency,
        fieldLabel,
        handleLabel,
        fieldDescription,
        handleDescription,
        tooltip,
        handleTooltip,
        isRequired,
        handleIsRequired,
        cancel,
        addField,
        updateField,
    } = props;

    const mainClass = dialogStyles();
    const modeBtnClass = modeBtnStyles();

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
                {fieldTitle}
                <CancelIcon
                    color='error'
                    style={{ float: 'right', cursor: 'pointer' }}
                    onClick={handleClose}
                />
            </DialogTitle>
            <DialogContent>
                <Grid container>
                    <Grid
                        item
                        xs={12}
                        md={6}
                        style={{ padding: '20px' }}
                    >
                        <FieldError errorTag={errorTag}/>

                        {/* DIALOG MODE BUTTONS */}
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
                                    variant={mode==="display"?"contained":"outlined"}
                                    onClick={displayMode}
                                    style={{ borderRadius: '8px 0px 0px 0px' }}
                                >Display</Button>
                                <Button
                                    disabled={conditionalMode?false:true}
                                    variant={mode==="conditional"?"contained":"outlined"}
                                    onClick={conditionalMode?conditionalMode:''}
                                >Conditional</Button>
                                <Button
                                    disabled={dependencyMode?false:true}
                                    variant={mode==="logic"?"contained":"outlined"}
                                    onClick={dependencyMode?dependencyMode:''}
                                >Dependency</Button>
                                <Button
                                    disabled={calculateMode?false:true}
                                    variant={mode==="logic"?"contained":"outlined"}
                                    onClick={calculateMode?calculateMode:''}
                                    style={{ borderRadius: '0px 8px 0px 0px' }}
                                >Calculator</Button>
                            </ButtonGroup> 
                        </Box>

                        {/* DIALOG MODES */}
                        <Box
                            component="form"
                            style={{ padding: '20px', border: '1px #5048E5 solid', borderRadius: '0px 8px 8px 8px', marginTop: '-1px' }}
                        >
                            {mode==='conditional'? // CONDITION MODE
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
                                    <Typography
                                        style={{ paddingTop: '10px' }}
                                    >
                                        <Button
                                            disabled={when&&value?false:true}
                                            variant='outlined'
                                            size='small'
                                            color='error'
                                            onClick={removeConditional}
                                        >
                                            Remove Conditional
                                        </Button>
                                    </Typography>
                                </>
                            :mode==="dependency"? // DEPENDENCY MODE
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
                                            disabled={dependency?false:true}
                                            variant='outlined'
                                            size='small'
                                            color='error'
                                            onClick={removeDependency}
                                        >
                                            Remove Dependency
                                        </Button>
                                    </Typography>
                                </>
                            :mode==="calculate"? // CALCULATION MODE [ for calculated fields ]
                                <>
                                    <Typography
                                        style={{ fontSize: '15px', color: '#5048E5' }}
                                    >
                                        Field Value Operation:
                                    </Typography>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={'Addition'}
                                        fullWidth
                                        size={'small'}
                                    >
                                        {/* {getSectionsSubSections(sectionId, componentsData).map((option, index) => ( */}
                                            <MenuItem
                                                key={index}
                                                value={'Addition'}
                                            >Addition [ + ]</MenuItem>
                                            <MenuItem
                                                key={index}
                                                value={'Subtraction'}
                                            >Subtraction [ - ]</MenuItem>
                                            <MenuItem
                                                key={index}
                                                value={'Multiplication'}
                                            >Multiplication [ x ]</MenuItem>
                                            <MenuItem
                                                key={index}
                                                value={'Division'}
                                            >Division [ / ]</MenuItem>
                                        {/* ))} */}
                                    </Select>
                                </>  
                            :
                            // DISPLAY MODE [ this is the default mode where a field is defined ]
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
                                        />Required<FieldTooltip tooltip={fieldData.tooltip} />
                                    </Typography>
                                </>
                            }
                        </Box>
                    </Grid>

                    {/* FIELD PREVIEW */}
                    <Grid
                        item
                        xs={12}
                        md={6}
                        style={{ padding: '30px 20px' }}
                    >
                        <Typography
                            style={{ backgroundColor: '#5048E5', padding: '5px 10px', color: 'white', marginTop: '2px', borderRadius: '8px 8px 0px 0px' }}
                            size='small'
                        >
                            <strong>Preview</strong>
                        </Typography>
                        <Box
                            component="form"
                            style={{ padding: '20px', border: '1px #5048E5 solid', borderRadius: '0px 0px 8px 8px', marginTop: '-1px', minHeight: '200px' }}
                        >
                        <TextField
                            required={isRequired}
                            fullWidth
                            variant="outlined"
                            type={'text'}
                            label={fieldLabel}
                            value={fieldValue}
                            onChange={handleFieldValue}
                            helperText={<DescriptionCard description={fieldDescription} helperText={true} />}
                            InputProps={{
                                endAdornment: <FieldTooltip tooltip={tooltip}/>
                            }}
                        />
                        </Box>
                    </Grid>
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
                        onClick={fieldData?updateField:addField}
                        variant="outlined"
                        size='small'
                        color="success"
                    >{fieldData?"Save Changes":"Add Field"}</Button>
                </Grid>
            </DialogActions>
        </Dialog>
    )
}

export default FieldDialog
