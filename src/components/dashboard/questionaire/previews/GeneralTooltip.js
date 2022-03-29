import * as React from 'react';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

const GeneralTooltip = (props) => {

    const { tipData } = props

    return (
        tipData!=''?
            <Tooltip title={tipData}>
            <IconButton>
                <HelpOutlineIcon/>
            </IconButton>
            </Tooltip>
        : ''
    )
}

export default GeneralTooltip
