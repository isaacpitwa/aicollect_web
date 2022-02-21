import { useState } from "react";
import { Grid, FormControl, FormLabel, TextField, Typography, Select, Button, MenuItem  } from "@mui/material";
import toast from "react-hot-toast";

const SendCustomerInvite = () => {
  const [state, setState] = useState({
    email: '',
    roles: '',
    expiryDate: '',
    status: 'Pending'
  });

  const handleChange = (e) => {
    e.preventDefault();
    setState((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const handleInviteNewUser = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/authService/send_invitation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/json'
        },
        body: JSON.stringify(state)
      });
      const data = await response.json();
      if (data.status === 200) {
        toast.success('User has been successfully invited', { duration: 5000, position: 'top-right' });
      }
    } catch (error) {
      console.log(error);
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
