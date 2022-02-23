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
} from "@mui/material";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import MuiPhoneNumber from 'material-ui-phone-number';
import * as Yup from "yup";
import { userApi } from '../../../api/users-api';
import { UserCircle as UserCircleIcon } from "../../../icons/user-circle";

// TODO: Refactor Function to reduce Cognitive Complexity
const CreateUserForm = ({supervisors, handleClose}) => {
  // To get the user from the authContext, you can use
  // `const { user } = useAuth();`
  const user = {
    avatar: "/static/mock-images/avatars/avatar-anika_visser.png",
    name: "Anika Visser",
  };

  const handleCreateUser = async () => {
    const data = await userApi.createUser({ ...formik.values, password: 'simplepassword', addedBy: 1, profileImage: null })
    if (data) {
      toast("User created successfully");
    }
  };

  const phoneRegEx = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      password: "simplepassword",
      email: "",
      expiryDate: "",
      phone: "",
      roles: "",
      supervisor: "",
      profilePhoto: []
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
      phone: Yup.string().matches(
        phoneRegEx,
        "Phone is not valid"
      ),
      role: Yup.string().required("User role is required"),
      supervisor: Yup.string().required("Please set the supervisor"),
    }),
    onSubmit: async (values, helpers) => {
      handleCreateUser()
    },
  });
  console.log(formik.values);

  return (
    <form noValidate onSubmit={formik.handleSubmit}>
      <Grid container spacing={3}>
        <Grid item md={12} xs={12}>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
            }}
          >
            <Avatar
              src={user.avatar}
              sx={{
                height: 64,
                mr: 2,
                width: 64,
              }}
            >
              <UserCircleIcon fontSize="small" />
            </Avatar>
            <input type="file" name="profilePhoto" id="user_avatar" onChange={formik.handleChange} hidden />
            <label htmlFor="user_avatar">
            <Button variant="contained" component="span">
              Choose File. No file Chosen
            </Button>
            </label>
          </Box>
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
              error={Boolean(formik.touched.password && formik.errors.password)}
              helperText={Boolean(formik.touched.password && formik.errors.password)}
              name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Password *"
              variant="standard"
              disabled
              fullWidth
            />
          </Grid>
          <Grid item md={6} sm={12} marginLeft={3}>
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
          <Grid item md={6} sm={12} marginLeft={3} marginTop={3}>
            <FormControl fullWidth>
              <FormLabel> </FormLabel>
              {/* <TextField
                error={Boolean(formik.touched.phone && formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
                placeholder="Phone *"
                name="phone"
                variant="standard"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.phone}
                fullWidth
              /> */}
              <MuiPhoneNumber
                defaultCountry="us"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.phone}
                error={Boolean(formik.touched.phone && formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
                 />
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
            <InputLabel>Role *</InputLabel>
              <Select type="date" variant="standard" name="roles" value={formik.values.roles} onChange={formik.handleChange} fullWidth>
                <MenuItem value="Admin">Super Administrator</MenuItem>
                <MenuItem value="Owner">Owner</MenuItem>
                <MenuItem value="Data Manager">Data Manager</MenuItem>
                <MenuItem value="Billing Manager">Billing Manager</MenuItem>
                <MenuItem value="Standard user">Standard user</MenuItem>
                <MenuItem value="External user">External User</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {
            formik.values.roles === "Standard user" && (
              <Grid item md={6} sm={12} marginLeft={3}>
                <FormControl fullWidth>
                  <InputLabel>Supervisor *</InputLabel>
                  <Select type="date" variant="standard" name="supervisor" value={formik.values.supervisor} onChange={formik.handleChange} hidden={formik.values.roles !== "Standard user"}  fullWidth>
                    {
                      supervisors.map((user) => (
                        <MenuItem key={user.id} value={`${user.email}`}>{`${user.firstname} ${user.lastname}`}</MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
              </Grid>
            )
          }
        </Grid>
        <Grid item md={12} sm={12}>
          <Button variant="contained" onClick={handleCreateUser}>
            Save User
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default CreateUserForm;
