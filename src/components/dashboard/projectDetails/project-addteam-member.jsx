import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Select,
  Card,
  CardContent,
  FormControl,
  Grid,
  MenuItem,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography
  , InputLabel
} from "@mui/material";
import toast from 'react-hot-toast';
import { userApi } from '../../../api/users-api';
import { useAuth } from '../../../hooks/use-auth';


const AddNewTeamMember = ({ open, handleClose, projectId, getProjects }) => {
  const [member, setMember] = useState({
    userObj: {},
    role: '',
    supervisor: {}
  });
  console.log(projectId)
  const [users, setUsers] = useState([]);
  const router = useRouter();
  const { user } = useAuth();


  const handleChange = (event) => {
    event.preventDefault();
    setMember((prevState) => ({ ...prevState, [event.target.name]: event.target.value }));
  };

  useEffect(() => {
    const fetchUserList = async () => {
      try {
        const users = await userApi.getUsers()
        if (users) {
          setUsers(users);
        }
        handleClose();
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserList();
  }, []);


  const handleAddTeamMembers = async () => {
    try {
      const teamMemberObject = {
        userId: member.userObj.id,
        name: `${member.userObj.firstname} ${member.userObj.lastname}`,
        role: member.role,
        supervisor: member.supervisor,
        createdBy: {
          id: user.id,
          name: `${user.firstname} ${user.lastname}`,
          email: user.email,
        },
      }
      const response = await fetch(`${process.env.NEXT_PUBLIC_PROJECTS_SERVICE_URL}/projects/addTeamMember`, {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify({ ...teamMemberObject, projectId: router.query.projectId })
      });
      const data = await response.json();
      if (data.status === 200) {
        toast.success('User has been added to project');
        getProjects();
        handleClose();
      }
    } catch (error) {
      toast.error('User could not be added, try again later.');
      console.log(error);
    }
  };

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
                    <FormLabel>Select User</FormLabel>
                    <Select name="userObj" value={member.userObj} onChange={handleChange}>
                      {
                        users.map((user, idx) => (
                          <MenuItem key={idx} value={user}>{`${user.firstname} ${user.lastname}`}</MenuItem>
                        ))
                      }
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item md={12} xs={12}>
                  <FormControl marginTop={3} fullWidth>
                    <FormLabel>Project Roles</FormLabel>
                    <RadioGroup name="role" value={member.role} defaultValue="inspector" onChange={handleChange}>
                      <FormControlLabel value="Standard User" control={<Radio />} label="Standard User" />
                      <Typography variant="caption" mb={4}>Does project Inspection</Typography>

                      <FormControlLabel value="Data Manager" control={<Radio />} label="Data Manager" />
                      <Typography variant="caption">Manages Project Activities</Typography>

                      <FormControlLabel value="Supervisor" control={<Radio />} label="Supervisor" />
                      <Typography variant="caption">Manages Team  Activities </Typography>
                    </RadioGroup>
                  </FormControl>
                  <Grid item md={12} sm={12}  marginTop={3}>
                    {member.role == "Standard User" ? <FormControl fullWidth>
                      <FormLabel> Select Supervisor </FormLabel>
                      <Select type="text" name="supervisor" value={member.supervisor} onChange={handleChange}>
                        {
                          users.filter(user => user.roles === 'Supervisor').map((user,idx) => {console.log(` Supervisor User :  ${user.firstname + ' ' + user.lastname}`); return <MenuItem  key ={idx} value={user.id}>{user.firstname + ' ' + user.lastname}</MenuItem>})
                        }
                      </Select>
                    </FormControl> : null}
                  </Grid>
                </Grid>

              </Grid>
            </form>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={handleAddTeamMembers}>Add Member</Button>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </CardContent>
      </Card>
    </Dialog>
  );
};

AddNewTeamMember.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  projectId: PropTypes.string.isRequired,
  getProjects: PropTypes.func.isRequired
};

export default AddNewTeamMember;
