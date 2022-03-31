import React from 'react'
import {
    Box,
    Grid,
    Typography,
    TextField
} from '@mui/material'

import GeneralTooltip from './GeneralTooltip'

const TextfieldPreview = (props) => {

    const { label, description, tooltip, isRequired } = props

    return (
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
                autoFocus
                InputProps={{
                  endAdornment: tooltip!=''?<GeneralTooltip tipData={tooltip}/>:false,
                }}
                margin="dense"
                id="label"
                label={label?label:'Label'}
                type="text"
                size="small"
                fullWidth
                variant="outlined"
            />
                {description!=''?
                    <Typography
                        style={{ fontSize: '14px', color: '#5048e598' }}
                    >
                        <i>{description}</i>
                    </Typography>
                :
                    ''
                }
            </Box>
        </Grid>

    )
}

export default TextfieldPreview
                    