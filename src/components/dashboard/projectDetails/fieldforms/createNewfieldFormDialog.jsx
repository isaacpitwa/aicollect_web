import * as React from 'react';
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { FieldFormsApi } from '../../../../api/fieldform-api';
import { CircularProgress} from '@mui/material';

export const CreateNewFieldFormDialog = ({ open, handleClose, user }) => {
  const router = useRouter();
  const { moduleId } = router.query;
  const [metaData, setMetaData] = React.useState({
    name: '',
    createdBy: {
      name: `${user?.firstname} ${user?.lastname}`,
      roles: user.roles,
      userId: user.id,
    },
    clientId: user.roles === "Owner" ? user.id : user.clientId,
    projectId: router.query.projectId,
    formFields: [],
    version: 1,
    module: moduleId 
  });
  const [loading, setLoading] = React.useState(false);

  const handleChange = (event) => {
    event.preventDefault();
    setMetaData((prevState) => ({ ...prevState, [event.target.name]: event.target.value }));
  };

  const handleCreateNewFieldForm = async () => {
    setLoading(true);
    try {
      const formResponse = await FieldFormsApi.createNewFieldForm({...metaData});
      console.log(formResponse);
      if (formResponse.data.name) {
        router.push(`/dashboard/projects/${router.query.projectId}/form-fields/${formResponse.data._id}/form`);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Create New Field Form</DialogTitle>
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
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleCreateNewFieldForm} disabled={loading} variant="contained">
          {loading ? <CircularProgress size="small" /> : "Create Form"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}