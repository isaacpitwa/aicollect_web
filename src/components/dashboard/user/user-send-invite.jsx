import { useState } from "react";
import { Grid, FormControl, FormLabel, TextField, Typography, Select, Button, MenuItem  } from "@mui/material";
import toast from "react-hot-toast";
import { useAuth } from '../../../hooks/use-auth';

import { userApi } from '../../../api/users-api';
import { duration } from "moment";

const SendCustomerInvite = ({getClientUsers, handleClose}) => {
  const { user } = useAuth();
  const [state, setState] = useState({
    email: '',
    roles: '',
    expiryDate: '',
    createdBy: user.id,
    clientId: user.roles === 'Owner' ? user.id : user.clientId,
    supervisor: user.id,
    frontendUrl: 
      process.env.NODE_ENV === 'production' ? `https://${window.location.host}` : `http://${window.location.host}`
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    e.preventDefault();
    setState((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const handleInviteNewUser = async () => {
    setLoading(true);
    try {
      const data = await userApi.inviteUserByEmail(state);
      if (data?.status === 201) {
        toast.success('User has been successfully invited', { duration: 5000, position: 'top-right' });
        getClientUsers();
        handleClose();
      } else if (data?.status === 403) {
        toast.error('You do not have permission to invite a user', { duration: 7000 });
      } else if (data?.status === 401) {
        toast.error('Your session has expired')
      } else {
        toast.error('Something went wrong, please contact support', { duration: 7000 });
      }
    } catch (error) {
      console.log('user error \n', error);
    }
    setLoading(false);
  };

  return (
    <Grid container spacing={3}>
      <Grid item md={12} sm={12}>
        <Typography>Enter the Email address of the user you want to invite, and add the role they should have</Typography>
      </Grid>
      <Grid item md={12} sm={12}>
        <FormControl fullWidth>
          <TextField placeholder="Email *" name="email" value={state.email} onChange={handleChange} variant="standard" required />
        </FormControl>
      </Grid>
      <Grid item md={12} sm={12}>
        <FormControl fullWidth>
          <FormLabel>Role Type *</FormLabel>
          <Select type="date" variant="standard" name="roles" value={state.roles} onChange={handleChange} required>
            <MenuItem value="Admin">Admin</MenuItem>
            <MenuItem value="Data Manager">Data Manager</MenuItem>
            <MenuItem value="Supervisor">Supervisor</MenuItem>
            <MenuItem value="Standard user">Standard user</MenuItem>
            <MenuItem value="External user">External user</MenuItem>
            <MenuItem value="Billing Manager">Billing Manager</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item md={12} sm={12}>
        <FormControl fullWidth>
          <FormLabel>Expiry Date *</FormLabel>
          <TextField type="date" name="expiryDate" value={state.expiryDate} onChange={handleChange} variant="standard" required />
        </FormControl>
      </Grid>
      <Grid item md={12} sm={12}>
        {
          !loading ? (
            <Button variant='contained' onClick={handleInviteNewUser}>Send Invite</Button>
          ) : (
            <Button variant='contained' disabled onClick={handleInviteNewUser}>Loading ...</Button>
          )
        }
        <Button>Cancel</Button>
      </Grid>
    </Grid>
  )
};

export default SendCustomerInvite;
