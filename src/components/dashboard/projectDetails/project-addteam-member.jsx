import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Select,
  Card,
  CardContent,
  FormControl,
  Grid,
  MenuItem,
  InputLabel,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
} from "@mui/material";

const AddNewTeamMember = ({ open, handleClose }) => {
  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Add Project Team Member</DialogTitle>
      <Card>
        <CardContent>
          <DialogContent>
            <form action="">
              <Grid container spacing={3}>
                <Grid item md={12} xs={12}>
                  <FormControl fullWidth>
                    <FormLabel>Team Members</FormLabel>
                    <Select variant="standard">
                      <MenuItem value="sali">Sali Francis</MenuItem>
                      <MenuItem value="stuart">Dambi Stuart</MenuItem>
                      <MenuItem value="isaac">Mugisha Isaac</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item md={12} xs={12}>
                  <FormControl marginTop={3} fullWidth>
                    <FormLabel>Project Roles</FormLabel>
                    <RadioGroup defaultValue="inspector">
                      <FormControlLabel value="inspector" control={<Radio />} label="Standard User" />
                      <Typography variant="caption" mb={4}>Does project Inspection</Typography>
                      <FormControlLabel value="manager" control={<Radio />} label="Project Manager / Supervisor" />
                      <Typography variant="caption">Manages Project Activities</Typography>
                    </RadioGroup>
                  </FormControl>
                </Grid>
                
              </Grid>
            </form>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={handleClose}>Add Member</Button>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </CardContent>
      </Card>
    </Dialog>
  );
};

export default AddNewTeamMember;
