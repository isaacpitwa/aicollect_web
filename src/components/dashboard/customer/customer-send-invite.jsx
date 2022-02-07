import { Grid, FormControl, FormLabel, TextField, Typography, Select, Button  } from "@mui/material";

const SendCustomerInvite = () => {
  return (
    <Grid container spacing={3}>
      <Grid item md={12} sm={12}>
        <Typography>Enter the Email address of the user you want to invite, and add the role they should have</Typography>
      </Grid>
      <Grid item md={12} sm={12}>
        <FormControl fullWidth>
          <TextField placeholder="Email *" variant="standard" required />
        </FormControl>
      </Grid>
      <Grid item md={12} sm={12}>
        <FormControl fullWidth>
          <FormLabel>Role Type *</FormLabel>
          <Select type="date" variant="standard" value="admin" required>
            <option value="admin">Super Admin</option>
            <option value="moderator">Moderator</option>
            <option value="user">Standard User</option>
          </Select>
        </FormControl>
      </Grid>
      <Grid item md={12} sm={12}>
        <FormControl fullWidth>
          <FormLabel>Expiry Date *</FormLabel>
          <TextField type="date" variant="standard" required />
        </FormControl>
      </Grid>
      <Grid item md={12} sm={12}>
        <Button variant='contained'>Send Invite</Button>
        <Button>Cancel</Button>
      </Grid>
    </Grid>
  )
};

export default SendCustomerInvite;
