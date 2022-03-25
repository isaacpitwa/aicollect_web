import React, { useState } from "react";
import Grid from '@mui/material/Grid'

export const Component;

const DragCanvas = (props) => {

    const [components, setComponents] = useState([])

    const handleDragStart = (e) => {
        
    }

    return (
        <Grid              
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}              
        >
            {components.map(componentItem=>(
                <Component/>
            ))}            
        </Grid>
    )
}

export default DragCanvas
