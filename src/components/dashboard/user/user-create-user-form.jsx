import {
  Avatar,
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
import { useFormik } from "formik";
import toast from "react-hot-toast";
import MuiPhoneNumber from 'material-ui-phone-number';
import * as Yup from "yup";
import { userApi } from '../../../api/users-api';
import { useAuth } from '../../../hooks/use-auth';
import { UserCircle as UserCircleIcon } from "../../../icons/user-circle";

// TODO: Refactor Function to reduce Cognitive Complexity
const CreateUserForm = ({ supervisors, handleClose, getClientUsers }) => {
  // To get the user from the authContext, you can use
  // `const { user } = useAuth();`
  const { user } = useAuth();

  const handleCreateUser = async () => {
    const clientId = user.roles === 'Owner' ? user.id : user.clientId;
    console.log(clientId);
    const data = await userApi.createUser({ ...formik.values, clientId, addedBy: 1, profileImage: null })
    if (data) {
      toast("User created successfully");
      getClientUsers();
      handleClose();
    }
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
      profilePhoto: null
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
              error={Boolean(formik.touched.firstname && formik.errors.firstname)}
              helperText={Boolean(formik.touched.firstname && formik.errors.firstname)}
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
              error={Boolean(formik.touched.lastname && formik.errors.lastname)}
              helperText={Boolean(formik.touched.lastname && formik.errors.lastname)}
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
              error={Boolean(formik.touched.email && formik.errors.email)}
              helperText={Boolean(formik.touched.email && formik.errors.email)}
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
                error={Boolean(formik.touched.phone && formik.errors.phone)}
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
                error={Boolean(formik.touched.expiryDate && formik.errors.expiryDate)}
                helperText={Boolean(formik.touched.expiryDate && formik.errors.expiryDate)}
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
              <InputLabel>Role *</InputLabel>
              <Select type="date" variant="standard" name="roles" value={formik.values.roles} onChange={formik.handleChange} fullWidth>
                <MenuItem value="Admin">Super Administrator</MenuItem>
                {/* <MenuItem value="Owner">Owner</MenuItem> */}
                <MenuItem value="Data Manager">Data Manager</MenuItem>
                <MenuItem value="Billing Manager">Billing Manager</MenuItem>
                <MenuItem value="Standard user">Standard user</MenuItem>
                <MenuItem value="External user">External User</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        
        <Grid item md={12} sm={12} display="flex" justifyContent="space-between">
          {
            formik.isSubmitting ? (
              <Button variant="contained" disabled>
                <CircularProgress color="inherit" />
              </Button>
            ) : (
              <Button variant="contained" onClick={handleCreateUser}>
                Save User
              </Button>
            )
          }
          <Button onClick={handleClose}>Cancel</Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default CreateUserForm;
