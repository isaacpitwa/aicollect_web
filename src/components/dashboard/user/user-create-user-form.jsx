import {
  // Avatar,
  Box,
  Button,
  Grid,
  TextField,
  Select,
  FormControl,
  FormLabel,
  FormHelperText,
  MenuItem,
  InputLabel,
  CircularProgress,
} from "@mui/material";
import { useRouter } from 'next/router';
import { useFormik } from "formik";
import toast from "react-hot-toast";
// import MuiPhoneNumber from 'material-ui-phone-number';
import * as Yup from "yup";
import { userApi } from '../../../api/users-api';
import { useAuth } from '../../../hooks/use-auth';
import { useState } from "react";
// import { UserCircle as UserCircleIcon } from "../../../icons/user-circle";

// TODO: Refactor Function to reduce Cognitive Complexity
const CreateUserForm = ({ supervisors, handleClose, getClientUsers }) => {
  // To get the user from the authContext, you can use
  // `const { user } = useAuth();`
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleCreateUser = async () => {
    setLoading(true);
    try {
      const data = await userApi.createUser({
        ...formik.values,
        supervisor: formik.values.supervisor === "" ? null : formik.values.supervisor,
        createdBy: user.id,
        client:user.client,
      })
      if (data?.status === 201) {
        toast.success("User created successfully");
        getClientUsers();
        handleClose();
      } else if (data?.status === 401) {
        toast.error('Session has expired, please login again');
        router.push({ pathname: '/', query: { returnUrl: '/dashboard/users' } });
      } else if (data?.status === 403) {
        toast.error('You do not have the permissions to create user');
      } else {
        toast.error('User Fields validations');
      }
    } catch (error) {
      toast.error('Something went wrong, contact support')
    }
    setLoading(false);
  };

  const phoneRegEx = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      expiryDate: "",
      phone: "",
      roles: "",
      supervisor: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().min(3).max(255).required("First Name is required"),
      lastName: Yup.string().max(255).required("Last Name is required"),
      userName: Yup.string().max(255).required("Username is required"),
      email: Yup.string()
        .max(255)
        .email("Must be a valid email")
        .required("Email is required"),
      expiryDate: Yup.date().required("Expiry Date is required"),
      phone: Yup.string().required("Phone number is required"),
      role: Yup.string().required("User role is required"),
      supervisor: Yup.string().required("Please set the supervisor"),
    }),
    onSubmit: async (values, helpers) => {
      handleCreateUser();
    },
  });
  
  const availableRoles = ["Owner","Admin","Billing Manager","Data Manager","Supervisor", "Standard User",];
    availableRoles.slice(availableRoles.indexOf(user.roles));
  return (
    <form noValidate onSubmit={formik.handleSubmit}>
      <Grid container spacing={3}>

        <Grid
          item
          md={12}
          sm={12}
          display="flex"
          flexDirection="row "
          justifyContent="space-between"
        >
          <Grid item md={6} sm={12}>
            <TextField
              error={formik.touched.firstname && formik.errors.firstname}
              helperText={formik.touched.firstname && formik.errors.firstname}
              name="firstname"
              value={formik.values.firstname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="First Name *"
              variant="standard"
              fullWidth
            />

          </Grid>
          <Grid item md={6} sm={12} marginLeft={3}>
            <TextField
              error={formik.touched.lastname && formik.errors.lastname}
              helperText={formik.touched.lastname && formik.errors.lastname}
              name="lastname"
              value={formik.values.lastname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Last Name *"
              variant="standard"
              fullWidth
            />
          </Grid>
        </Grid>
        <Grid
          item
          md={12}
          sm={12}
          display="flex"
          flexDirection="row "
          justifyContent="space-between"
        >

          <Grid item md={6} sm={12}>
            <TextField
              error={formik.touched.email && formik.errors.email}
              helperText={formik.touched.email && formik.errors.email}
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Email *"
              variant="standard"
              fullWidth
            />
          </Grid>
          <Grid item md={6} sm={12} marginLeft={3} >
            <FormControl fullWidth>
              <FormLabel> </FormLabel>
              <TextField
                error={formik.touched.phone && formik.errors.phone}
                helperText={formik.touched.phone && formik.errors.phone}
                placeholder="Phone *"
                name="phone"
                variant="standard"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.phone}
                fullWidth
              />
              {/* <MuiPhoneNumber
                defaultCountry="us"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                name="phone"
                value={formik.values.phone}
                error={Boolean(formik.touched.phone && formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
              /> */}
              {formik.errors.submit && (
                <Box sx={{ mt: 3 }}>
                  <FormHelperText error>
                    {formik.errors.submit}
                  </FormHelperText>
                </Box>
              )}
            </FormControl>
          </Grid>
        </Grid>
        <Grid
          item
          md={12}
          sm={12}
          display="flex"
          flexDirection="row "
          justifyContent="space-between"
        >
          <Grid item md={6} sm={12}>
            <FormControl fullWidth>
              <FormLabel>Expiry Date *</FormLabel>
              <TextField
                type="date"
                error={formik.touched.expiryDate && formik.errors.expiryDate}
                helperText={formik.touched.expiryDate && formik.errors.expiryDate}
                name="expiryDate"
                value={formik.values.expiryDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                variant="standard"
                fullWidth
              />
            </FormControl>
          </Grid>
          <Grid item md={6} sm={12} marginLeft={3} marginTop={1}>
            <FormControl fullWidth>
              <InputLabel>Role Type *</InputLabel>
              <Select type="text" variant="standard" name="roles" value={formik.values.roles} onChange={formik.handleChange}>
              {/* <MenuItem value="Owner">Owner</MenuItem>
              <MenuItem value="Admin">Administrator</MenuItem>
              <MenuItem value="Billing Manager">Billing Manager</MenuItem>
              <MenuItem value="Data Manager">Data Manager</MenuItem>
              <MenuItem value="Supervisor">Supervisor</MenuItem>
              <MenuItem value="Standard User">Standard User</MenuItem> */}
              {
                availableRoles.map((role) => (
                  <MenuItem value={role}>{role}</MenuItem>
                ))
              }
                {/* <MenuItem value="External user">External User</MenuItem> */}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Grid item md={12} sm={12} display="flex" justifyContent="flex-end">
          {
            loading || formik.isSubmitting ? (
              <Button variant="contained" disabled startIcon={<CircularProgress color="inherit" />}>
                Loading...
              </Button>
            ) : (
              <Button variant="contained" onClick={handleCreateUser}>
                Save User
              </Button>
            )
          }
          <Button onClick={handleClose}  variant="outlined" style={{marginLeft:"16px"}}>Cancel</Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default CreateUserForm;
