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
} from "@mui/material";
import toast from 'react-hot-toast';
import { userApi } from '../../../api/users-api';

const AddNewTeamMember = ({ open, handleClose, projectId, getProjects }) => {
  const [member, setMember] = useState({
    userObj: {},
    role: '',
  });
  console.log(projectId)
  const [users, setUsers] = useState([]);
  const router = useRouter();

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
        createdBy: "Stuart Dambi",
      }
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_PROJECTS_URL}/projectService/addTeamMember`, {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/json',
        },
        body: JSON.stringify({...teamMemberObject, projectId: router.query.projectId})
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
                    <FormLabel>Team Members</FormLabel>
                    <Select name="userObj"  value={member.userObj} onChange={handleChange}>
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
