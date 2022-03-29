import React from 'react'
import {
    Box,
    Grid,
    Typography,
} from '@mui/material'
import GeneralTooltip from '../previews/GeneralTooltip'

const SubSectionPreview = (props) => {

    const { sectionLabel, sectionDescription, tooltip } = props

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
                {sectionLabel!=''?
                    <Typography
                        style={{ fontSize: '18px', borderBottom: '1px #5048E5 solid', color: '#5048E5' }}
                    >
                        {sectionLabel}<GeneralTooltip tipData={tooltip}/>
                    </Typography>
                :
                    ''
                }
                {sectionDescription!=''?
                    <Typography
                        style={{ fontSize: '14px', color: '#5048e598' }}
                    >
                        <i>{sectionDescription}</i>
                    </Typography>
                :
                    ''
                }
            </Box>
        </Grid>

    )
}

export default SubSectionPreview
                    