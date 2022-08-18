import {
    ClickAwayListener,
    CssBaseline,
    Fade,
    List,
    ListItemButton,
    Paper,
    TextField,
} from '@mui/material'
import { Box } from '@mui/system'
import React, { createRef, useCallback } from 'react'
import { atom, RecoilRoot, useRecoilState, useSetRecoilState } from 'recoil'

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

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <Fade in={hasSuggestions}>
                <List component={Paper} sx={{ mt: 1 }}>
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

export default function SuggestionsField() {
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
        <RecoilRoot>
            <CssBaseline />
            <Box p={4} display="inline-block">
                <TextField
                    inputRef={textFieldRef}
                    label="Type @"
                    value={value}
                    onChange={handleChange}
                />
                <Suggestions field={textFieldRef} />
            </Box>
        </RecoilRoot>
    )
}

