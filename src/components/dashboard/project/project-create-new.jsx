import { useState } from "react";
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
import { LoadingButton } from '@mui/lab';
import toast from "react-hot-toast";
import { useAuth } from '../../../hooks/use-auth';
import { projectsApi } from '../../../api/projects-api';

const CreateNewProjectDialog = ({ open, handleClose, getProjects }) => {
  const { user } = useAuth();
  const [project, setProject] = useState({
    name: '',
    description: '',
  });
  const [loading, setLoading] = useState(false)

  const handleChange = (event) => {
    event.preventDefault();
    setProject((prevState) => ({ ...prevState, [event.target.name]: event.target.value }));
  };

  const handleCreateProject = async () => {
    setLoading(true);
    try {
      const data = await projectsApi.createProject({
        ...project,
        client:user.client,
        userId: user.id,
        userName: `${user.firstname} ${user.lastname}`,
        roles: user.roles
      });
      if (data?.status === 201) {
        toast.success("Project has been created successfully", { duration: 9000 });
        getProjects();
        handleClose();
      } else {
        console.log(data);
        toast.error( data.message ? data.message :"Something went wrong, project was not created")
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

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
                      name="name"
                      value={project.name}
                      onChange={handleChange}
                      required
                      fullWidth
                    />
                  </FormControl>
                </Grid>
                {/* <Grid item md={12} xs={12}>
                  <FormControl marginTop={3} fullWidth>
                    <InputLabel>Select Sector *</InputLabel>
                    <Select label="Select Section *" value="">
                      <MenuItem value="agric">Agriculture</MenuItem>
                      <MenuItem value="trans">Transport</MenuItem>
                      <MenuItem value="min">Mining</MenuItem>
                    </Select>
                  </FormControl>
                </Grid> */}
                <Grid item md={12} xs={12}>
                  <FormControl fullWidth>
                    <TextField name="description"
                      value={project.description}
                      onChange={handleChange}
                      placeholder="description *"
                      rows={3}
                      multiline />
                  </FormControl>
                </Grid>

              </Grid>
            </form>
          </DialogContent>
          <DialogActions>
            {
              loading ? (
                <LoadingButton
                  loading
                  variant="outlined">
                  Save
                </LoadingButton>
              ) : (
                <Button
                  variant="contained"
                  onClick={handleCreateProject}>
                  Save
                </Button>
              )
            }
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </CardContent>
      </Card>
    </Dialog>
  );
};

export default CreateNewProjectDialog;
