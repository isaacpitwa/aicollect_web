import React from 'react'
import Image from 'next/image'
import {
    Box,
    Grid,
    Typography,
} from '@mui/material'

import AreaMappingImg from '../../../../../public/static/form/areaMap1.jpg';
import {
    DescriptionCard,
} from '../utils';
import GeneralTooltip from './GeneralTooltip'

const TextfieldPreview = (props) => {

    const { fieldLabel, fieldDescription, tooltip } = props

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
                <Typography
                    style={{ fontSize: '18px', color: '#5048E5' }}
                >
                    {fieldLabel}<GeneralTooltip tipData={tooltip}/>
                </Typography>
                <Box
                    style={{
                        height: '120px',
                        width: "100%",
                        borderRadius: '8px',
                        overflow: "hidden",
                    }}
                    align='center'
                >
                    <Image
                        src={AreaMappingImg}
                        alt="Area Mapping Image"
                    />
                </Box>
                {fieldDescription!=''?
                    <DescriptionCard description={fieldDescription} helperText={true}/>
                :
                    ''
                }
                
            </Box>
        </Grid>

    )
}

export default TextfieldPreview
                    