import {
  Grid,
  TextField,
  Select,
  FormControl,
  FormLabel,
  MenuItem,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

// TODO: Refactor Function to reduce Cognitive Complexity
const TaskInformationForm = (props) => {
  // To get the user from the authContext, you can use
  // `const { user } = useAuth();`

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
      role: Yup.string().required("User role is required"),
      supervisor: Yup.string().required("Please set the supervisor"),
    }),
    onSubmit: async (values, helpers) => {
      console.log(values);
    },
  });

  return (
    <form noValidate onSubmit={formik.handleSubmit}>
      <Grid container spacing={3} mt={4}>

        <Grid
          item
          md={12}
          sm={12}
          display="flex"
          flexDirection="row "
          justifyContent="space-between"
        >
          <Grid item md={6} sm={12}>
            <FormControl fullWidth >
            <TextField
              error={Boolean(formik.touched.firstName && formik.errors.firstName)}
              helperText={Boolean(formik.touched.firstName && formik.errors.firstName)}
              name="title"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Title *"
              variant="standard"
              fullWidth
            />
            </FormControl>
            
           
          </Grid>
          <Grid item md={6} sm={12} marginLeft={3}>
          <FormControl fullWidth>
          <Select
              error={Boolean(formik.touched.lastName && formik.errors.lastName)}
              helperText={Boolean(formik.touched.lastName && formik.errors.lastName)}
              name="tasktype"
              value="def"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Last Name *"
              defaultValue="def"
              variant="standard"
              fullWidth
            >
              <option value="def" hidden>Task Type *</option>
              <MenuItem value="reg">Registration</MenuItem>
              <MenuItem value="train">Training</MenuItem>
              <MenuItem value="insp">Inspection</MenuItem>
            </Select>
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
          <TextField
              error={Boolean(formik.touched.email && formik.errors.email)}
              helperText={Boolean(formik.touched.email && formik.errors.email)}
              name="description"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Description *"
              variant="standard"
              fullWidth
            />
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
              <FormLabel>Start Date *</FormLabel>
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
          <Grid item md={6} sm={12} ml={3}>
            <FormControl fullWidth>
              <FormLabel>End Date *</FormLabel>
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
          
        </Grid>
        
      </Grid>
    </form>
  );
};

export default TaskInformationForm;
