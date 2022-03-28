import { useState } from "react";
import { Grid, FormControl, FormLabel, TextField, Typography, Select, Button, MenuItem  } from "@mui/material";
import toast from "react-hot-toast";

import { userApi } from '../../../api/users-api';

const SendCustomerInvite = ({getClientUsers, handleClose}) => {
  const [state, setState] = useState({
    email: '',
    roles: '',
    expiryDate: '',
    status: 'Pending',
    phone: '083738235',
    frontendUrl: 'http://localhost:3000'
  });

  const handleChange = (e) => {
    e.preventDefault();
    setState((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const handleInviteNewUser = async () => {
    try {
      const data = await userApi.inviteUserByEmail(state);
      if (data) {
        toast.success('User has been successfully invited', { duration: 5000, position: 'top-right' });
        getClientUsers();
        handleClose();
      }
    } catch (error) {
      console.log('user error \n', error);
    }
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
            <MenuItem value="Owner">Owner</MenuItem>
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
        <Button variant='contained' onClick={handleInviteNewUser}>Send Invite</Button>
        <Button>Cancel</Button>
      </Grid>
    </Grid>
  )
};

export default SendCustomerInvite;
