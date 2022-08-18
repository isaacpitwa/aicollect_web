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


function Suggestions({ field }) {
    const [hasSuggestions, setHasSuggestions] = useRecoilState(suggestionsState)
    const [value, setValue] = useRecoilState(inputState)
    const {
        isLoaded,
        formData,
        formFieldValues,
    } = useContext(FormContext)

    const handleClick = useCallback(
        (band) => {
            setValue(value + band)
            setHasSuggestions(false)
            field.current?.focus()
        },
        [value, setValue, setHasSuggestions, field]
    )
    const handleClickAway = useCallback(() => {
        setHasSuggestions(false)
        field.current?.focus()
    }, [field, setHasSuggestions])

    console.log('formData: ', formData);
    console.log('formFieldValues: ', formFieldValues);
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
                                                                        onClick={() => handleClick(subsection.label.replace(/\s/g, ''))}
                                                                    >
                                                                        {subsection.label}
                                                                    </ListItemButton>
                                                                )
                                                            })
                                                            }
                                                        </>
                                                    )
                                                }
                                                else {
                                                    return (<ListItemButton key={index2} onClick={() => handleClick(formfield.label.replace(/\s/g, ''))}>
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

                    <ListItemButton onClick={() => handleClick('Mötley Crüe')}>
                        Mötley Crüe
                    </ListItemButton>
                    <ListItemButton onClick={() => handleClick('Deep Purple')}>
                        Deep Purple
                    </ListItemButton>
                    <ListItemButton onClick={() => handleClick('Scorpions')}>
                        Scorpions
                    </ListItemButton>
                </List>
            </Fade>
        </ClickAwayListener>
    )
}
function SuggestionsField() {
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
                autoFocus={false}
                margin="dense"
                id="label"
                type="text"
                size="small"
                fullWidth
                variant="outlined"
                name='Formula'
            />
            <Suggestions field={textFieldRef} />
        </Box>
    )
}

export default function CalculatedFormulaInput() {
    return (
        <RecoilRoot>
            <CssBaseline />
            <SuggestionsField />
        </RecoilRoot>

    )
}

