import { Button, Grid, Typography } from '@mui/material';

const ProjectTaskUploader = () => {
  return (
    <Grid container spacing={3} mt={2}>
      <Grid item md={12} sm={12}>
        <Typography mb={2}>
            Import CSV or Excel Files
        </Typography>
        <Button variant='contained'>Choose File. No file chosen</Button> <br />
        <Typography variant="caption" mt={2}>
          Acceptable file types CSV or Excel. First row should contain column names.<br/>
          Sample excel file for importing can be <a href='#'>DOWNLOADED HERE</a>
        </Typography>
      </Grid>
    </Grid>
  )
};

export default ProjectTaskUploader;
