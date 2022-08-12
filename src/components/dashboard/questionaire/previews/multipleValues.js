import React from 'react'
import {
    Box,
    Grid,
    Typography,
    TextField,
    Button
} from '@mui/material'

import GeneralTooltip from './GeneralTooltip'
import CancelIcon from '@mui/icons-material/Cancel';
import AddIcon from '@mui/icons-material/Add';

const MultipleValuesPreview = (props) => {

    const { fieldLabel, fieldDescription, tooltip, isRequired, component,onChange,multipleValuesData } = props
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
                   <Box sx={{display:'flex', flexDirection:'column', border:'1px solid #D8DEE4'}}>
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

            </Box>
        </Grid>
        

    )
}

export default MultipleValuesPreview
                    