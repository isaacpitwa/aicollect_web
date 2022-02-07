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
} from "@mui/material";

const CreateNewProjectDialog = ({ open, handleClose }) => {
  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Create new Project</DialogTitle>
      <Card>
        <CardContent>
          <DialogContent>
            <form action="">
              <Grid container spacing={3}>
                <Grid item md={12} xs={12}>
                  <FormControl fullWidth>
                    <TextField
                      placeholder="Project Name *"
                      required
                      fullWidth
                    />
                  </FormControl>
                </Grid>
                <Grid item md={12} xs={12}>
                  <FormControl marginTop={3} fullWidth>
                    <InputLabel>Select Sector *</InputLabel>
                    <Select label="Select Section *" value="">
                      <MenuItem value="agric">Agriculture</MenuItem>
                      <MenuItem value="trans">Transport</MenuItem>
                      <MenuItem value="min">Mining</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item md={12} xs={12}>
                  <FormControl fullWidth>
                    <TextField placeholder="description *" rows={3} multiline  />
                  </FormControl>
                </Grid>
                
              </Grid>
            </form>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={handleClose}>Save</Button>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </CardContent>
      </Card>
    </Dialog>
  );
};

export default CreateNewProjectDialog;
