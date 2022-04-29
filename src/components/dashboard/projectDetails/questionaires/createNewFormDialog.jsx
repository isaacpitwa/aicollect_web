import * as React from 'react';
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import { FormsApi } from '../../../../api/forms-api';
import { CircularProgress, Grid, IconButton, Stack } from '@mui/material';
import { DeleteOutline } from '@mui/icons-material';

export const CreateNewFormDialog = ({ open, handleClose, user }) => {
  const router = useRouter();
  const { moduleId } = router.query;
  const [metaData, setMetaData] = React.useState({
    name: '',
    createdBy: {
      name: `${user.firstname} ${user.lastname}`,
      roles: user.roles,
      userId: user.id
    },
    clientId: user.roles === "Owner" ? user.id : user.clientId,
    projectId: router.query.projectId,
    formFields: [],
    version: 1,
    module: moduleId 
  });
  const [checked, setChecked] = React.useState(false);
  const [regionValues, setRegionValues] = React.useState([
    {
      region: '',
      prefix: ''
    },
  ]);
  const [loading, setLoading] = React.useState(false);

  const handleAddRegionFields = () => {
    setRegionValues((prevState) => ([...prevState, { region: '', prefix: '' }]))
    console.log(regionValues)
  };

  const handleChangeRegion = (index, e) => {
    const values = [...regionValues];
    values[index][e.target.name] = e.target.value;
    setRegionValues(values);
  };

  const handleRemoveRegionField = (index) => {
    const values = [...regionValues];
    values.splice(index, 1);
    setRegionValues(values);
  };

  const handleChange = (event) => {
    event.preventDefault();
    setMetaData((prevState) => ({ ...prevState, [event.target.name]: event.target.value }));
  };

  const handleCreateNewForm = async () => {
    setLoading(true);
    try {
      const formResponse = await FormsApi.createNewForm({...metaData, regions: regionValues});
      console.log(formResponse);
      if (formResponse.data.name) {
        router.push(`/dashboard/projects/${router.query.projectId}/module/${moduleId}/questionaire/${formResponse.data._id}/form`);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Create New Form</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Fill in all the fields
        </DialogContentText>
        <TextField
          sx={{ mt: 2 }}
          autoFocus
          margin="dense"
          label="Form Name"
          fullWidth
          variant="outlined"
          name="name"
          value={metaData.name}
          onChange={handleChange}
        />
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={checked}
                onChange={(event) => {
                  event.preventDefault();
                  setChecked(event.target.checked)
                }}
              />
            }
            label="Attach Regions"
          />

          {
            checked && <Button variant="contained" size='small' onClick={handleAddRegionFields}>
              Add region
            </Button>
          }
        </Stack>


        <Box sx={{ overflow: 'auto', maxHeight: 200 }}>
          {
            checked && regionValues.map((field, idx) => (
              <Grid container display="flex" flexDirection="row" key={idx}>
                <Grid item md={5}>
                  <TextField
                    autoFocus
                    margin="dense"
                    label="Region"
                    variant="outlined"
                    name="region"
                    value={field.region}
                    onChange={(event) => handleChangeRegion(idx, event)}
                    size="small"
                  />
                </Grid>
                <Grid item md={5}>
                  <TextField
                    autoFocus
                    margin="dense"
                    label="Prefix"
                    variant="outlined"
                    name="prefix"
                    value={field.prefix}
                    onChange={(event) => handleChangeRegion(idx, event)}
                    size="small"
                  />
                </Grid>
                <Grid item md={2} mt={2}>
                  <IconButton aria-label='delete' color='error' onClick={() => handleRemoveRegionField(idx)}>
                    <DeleteOutline fontSize='small' />
                  </IconButton>
                </Grid>

              </Grid>

            ))
          }
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleCreateNewForm} disabled={loading} variant="contained">
          {loading ? <CircularProgress size="small" /> : "Create Form"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}