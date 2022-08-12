import React from 'react'
import {
    Box,
    Grid,
    Typography,
    TextField,
    Button
} from '@mui/material'

import CancelIcon from '@mui/icons-material/Cancel';
import AddIcon from '@mui/icons-material/Add';

const MultipleValuesField = (props) => {

    const { fieldLabel, fieldDescription, tooltip, isRequired, component,onChange,multipleValuesData,multipleValues } = props
    return (
        <Box sx={{display:'flex', flexDirection:'column', border:'1px solid #D8DEE4',width:'100%'}}>
        {
                           multipleValuesData.map((item,index)=>
                           <Box sx={{display:"flex", borderBottom:'1px solid #D8DEE4',alignItems:'center'}}  key={`Container ${index}`}>
                           <Box sx={{ borderRight:'1px solid #D8DEE4', width:"80%",padding:'0 8px'}}  key={`Container2 ${index}`}>
                                 {component}
                                   {fieldDescription!=''?
                                       <Typography
                                           style={{ fontSize: '14px', color: '#5048e598' }}
                                       >
                                           <i>{fieldDescription}</i>
                                       </Typography>
                                   :
                                       ''
                                   }
                           </Box>
                           <CancelIcon
                               color='action'
                               style={{ float: 'right', cursor: 'pointer' }}
                               sx={{marginLeft:'16px'}}
                               onClick={()=>{
                                   multipleValuesData.splice(index,1)
                                   onChange(multipleValuesData)
                               }}
                           />
                               
                   </Box>)
                         
             }
         
             
             <Box sx={{borderBottom:'1px solid #D8DEE4',padding:'8px'}}>
                 <Button variant="contained" startIcon={<AddIcon />} size='small'
                 onClick={()=>{
                     multipleValuesData.push(component)
                     onChange(multipleValuesData)
                 }}>
                     Add Another
                 </Button>
             </Box>
        </Box>
    )
          
}


export default MultipleValuesField
                    