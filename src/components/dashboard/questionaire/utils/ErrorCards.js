import React, { useState, useEffect, useContext } from 'react';
import {
    Stack
} from '@mui/material';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

import { FormContext } from '../context';

export const FieldError = (props) => {

    const { error, selectSection } = useContext(FormContext)

    const { fieldType, errorTag } = props

    useEffect(() => {

    }, [selectSection])
    
    return (
        <Stack
            sx={{ width: '100%' }}
            style={{ paddingBottom: '20px' }}
        >
            {!selectSection&&!error?
                fieldType?"":
                <Alert severity="warning">
                    <AlertTitle>Warning</AlertTitle>
                    You have not selected a <strong>Section</strong> or <strong>Sub-Section</strong> to place this field in.
                </Alert>
            :
                error?
                    <Alert severity="error">
                        <AlertTitle>Error</AlertTitle>
                        {errorTag?
                            <>
                                Please add missing <strong>{errorTag}</strong> to field.
                            </>
                        :
                            <>
                                Please select a <strong>Section</strong> or <strong>Sub-Section</strong> to place this field in.
                            </>
                        }
                    </Alert>
                : ""
            }
        </Stack>
    );
};
