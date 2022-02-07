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
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { UserCircle as UserCircleIcon } from "../../../icons/user-circle";

// TODO: Refactor Function to reduce Cognitive Complexity
const CreateUserForm = (props) => {
  // To get the user from the authContext, you can use
  // `const { user } = useAuth();`
  const user = {
    avatar: "/static/mock-images/avatars/avatar-anika_visser.png",
    name: "Anika Visser",
  };
  const phoneRegEx = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      expiryDate: "",
      phone: "",
      role: "",
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
      phone: Yup.string().matches(
        phoneRegEx,
        "Phone is not valid"
      ),
      role: Yup.string().required("User role is required"),
      supervisor: Yup.string().required("Please set the supervisor"),
    }),
    onSubmit: async (values, helpers) => {
      console.log(values);
    },
  });

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
            <Button variant="contained">Choose File. No file Chosen</Button>
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
              error={Boolean(formik.touched.firstName && formik.errors.firstName)}
              helperText={Boolean(formik.touched.firstName && formik.errors.firstName)}
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="First Name *"
              variant="standard"
              fullWidth
            />
            {formik.errors.firstName && (
                <Box sx={{ mt: 3 }}>
                  <FormHelperText error>
                    {formik.errors.firstName}
                  </FormHelperText>
                </Box>
              )}
           
          </Grid>
          <Grid item md={6} sm={12} marginLeft={3}>
          <TextField
              error={Boolean(formik.touched.lastName && formik.errors.lastName)}
              helperText={Boolean(formik.touched.lastName && formik.errors.lastName)}
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Last Name *"
              variant="standard"
              fullWidth
            />
            {formik.errors.lastName && (
                <Box sx={{ mt: 3 }}>
                  <FormHelperText error>
                    {formik.errors.lastName}
                  </FormHelperText>
                </Box>
              )}
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
              error={Boolean(formik.touched.username && formik.errors.username)}
              helperText={Boolean(formik.touched.username && formik.errors.username)}
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Username *"
              variant="standard"
              fullWidth
            />
            {formik.errors.username && (
                <Box sx={{ mt: 3 }}>
                  <FormHelperText error>
                    {formik.errors.username}
                  </FormHelperText>
                </Box>
              )}
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
            {formik.errors.email && (
                <Box sx={{ mt: 3 }}>
                  <FormHelperText error>
                    {formik.errors.email}
                  </FormHelperText>
                </Box>
              )}
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
            {formik.errors.expiryDate && (
                <Box sx={{ mt: 3 }}>
                  <FormHelperText error>
                    {formik.errors.expiryDate}
                  </FormHelperText>
                </Box>
              )}
            </FormControl>
          </Grid>
          <Grid item md={6} sm={12} marginLeft={3} marginTop={3}>
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
              {/* <InputMask name="phone" value={formik.values.phone} onChange={formik.handleChange} mask={formik.values.phone} maskChar="(" >
                {(inputProps) => <TextField {...inputProps} name="phone"   type="tel" disableUnderline />}
              </InputMask> */}
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
              <FormLabel>Role *</FormLabel>
              <Select type="date" variant="standard" value="admin" fullWidth>
                <option value="admin">Super Administrator</option>
                <option value="moderator">Moderator</option>
                <option value="user">User</option>
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={6} sm={12} marginLeft={3}>
            <FormControl fullWidth>
              <FormLabel>Supervisor *</FormLabel>
              <Select type="date" variant="standard" value="david" fullWidth>
                <option value="david">Kityo David</option>
                <option value="moderator">Moderator</option>
                <option value="user">User</option>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid item md={12} sm={12}>
          <Button variant="contained" type="submit">
            Save User
          </Button>
          <Button>Cancel</Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default CreateUserForm;
