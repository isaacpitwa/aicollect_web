import {
    ClickAwayListener,
    CssBaseline,
    Fade,
    List,
    ListItemButton,
    ListSubheader,
    Paper,
    TextField,
    Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import React, { createRef, useCallback, useContext } from 'react'
import { atom, RecoilRoot, useRecoilState, useSetRecoilState } from 'recoil'
import { FormContext } from '../context'

const suggestionsState = atom({
    key: 'Band Suggestions Visible?',
    default: false,
})

const inputState = atom({
    key: 'Suggestable Input Bands',
    default: '',
})


function Suggestions({ field, handleFormula }) {
    const [hasSuggestions, setHasSuggestions] = useRecoilState(suggestionsState)
    const [value, setValue] = useRecoilState(inputState)
    const {
        isLoaded,
        formData,
    } = useContext(FormContext)

    const handleClick = useCallback(
        ({band, id}) => {
            const currentValue = value.split('@')[0];
            handleFormula(currentValue+id);
            setValue(value + band)
            setHasSuggestions(false)
            field.current?.focus()
        },
        [value, setValue, setHasSuggestions, field]
    )
    const handleClickAway = useCallback(() => {
        setHasSuggestions(false)
    }, [field, setHasSuggestions])
    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <Fade in={hasSuggestions}>
                <List component={Paper} sx={{ mt: 1 }}>
                    {
                        isLoaded && formData ?
                            formData.formFields.map((sectionData, index) => {
                                return (
                                    <>
                                        <ListSubheader>{sectionData.label}</ListSubheader>
                                        {
                                            sectionData.components.map((formfield, index2) => {
                                                if (formfield.type === "sub-section") {
                                                    return (
                                                        <>
                                                            <ListSubheader>{'-> ' + formfield.label}</ListSubheader>
                                                            {formfield.components.map((subsection, index3) => {
                                                                return (
                                                                    <ListItemButton
                                                                        key={index3}
                                                                        onClick={() => handleClick({band:subsection.label.replace(/\s/g, ''),id:subsection.id})}
                                                                    >
                                                                       &nbsp;&nbsp;{subsection.label}
                                                                    </ListItemButton>
                                                                )
                                                            })
                                                            }
                                                        </>
                                                    )
                                                }
                                                else {
                                                    return (<ListItemButton key={index2} onClick={() => handleClick({band:formfield.label.replace(/\s/g, ''),id:formfield.id})}>
                                                        {formfield.label}
                                                    </ListItemButton>)
                                                }
                                            }
                                            )
                                        }
                                    </>

                                )
                            }
                            )
                            : <Typography>Loading...</Typography>
                    }
                </List>
            </Fade>
        </ClickAwayListener>
    )
}
function SuggestionsField(props) {
    const textFieldRef = createRef()
    const setHasSuggestions = useSetRecoilState(suggestionsState)
    const [value, setValue] = useRecoilState(inputState)
    const handleChange = useCallback(
        (event) => {
            setValue(event.target.value)
            if (event.target.value.match(/@$/)) {
                setHasSuggestions(true)
            } else setHasSuggestions(false)
        },
        [setHasSuggestions, setValue]
    )

    return (

        <Box display="inline-block" sx={{ width: '100%' }}>
            <TextField
                inputRef={textFieldRef}
                label="Type @ to select question"
                value={value}
                onChange={handleChange}
                margin="dense"
                id="label"
                size="small"
                fullWidth
                variant="outlined"
                name='Formula'
                multiline
            />
            <Suggestions field={textFieldRef} handleFormula={props.handleFormula} />
        </Box>
    )
}

export default function CalculatedFormulaInput(props) {
    return (
        <RecoilRoot>
            <CssBaseline />
            <SuggestionsField  handleFormula={props.handleFormula}/>
        </RecoilRoot>

    )
}

