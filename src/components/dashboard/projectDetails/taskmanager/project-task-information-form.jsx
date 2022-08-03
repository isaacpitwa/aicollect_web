import {
  Grid,
  TextField,
  Select,
  FormControl,
  FormLabel,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

// TODO: Refactor Function to reduce Cognitive Complexity
const TaskInformationForm = (props) => {

  const formik = useFormik({
    initialValues: {
      title: "",
      taskType: "",
      description: "",
      startDate: "",
      dueDate: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().min(3).max(255).required("Title is required"),
      taskType: Yup.string().max(255).required("task type is required"),
      description: Yup.string().max(255).required("Description is required"),
      startDate: Yup.date().required("Start Date is required"),
      dueDate: Yup.date().required("Due Date is required"),
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
          <Grid item md={6} sm={12} mt={2}>
            <FormControl fullWidth >
              <TextField
                error={Boolean(formik.touched.title && formik.errors.title)}
                helperText={Boolean(formik.touched.title && formik.errors.title)}
                name="title"
                value={formik.values.title}
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
              <InputLabel>Task Type</InputLabel>
              <Select
                error={Boolean(formik.touched.taskType && formik.errors.taskType)}
                helperText={Boolean(formik.touched.taskType && formik.errors.taskType)}
                name="taskType"
                value={formik.values.taskType}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Last Name *"
                defaultValue="def"
                variant="standard"
                fullWidth
              >
                <MenuItem value="registration">Registration</MenuItem>
                <MenuItem value="training">Training</MenuItem>
                <MenuItem value="inspection">Inspection</MenuItem>
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
            error={Boolean(formik.touched.description && formik.errors.description)}
            helperText={Boolean(formik.touched.description && formik.errors.description)}
            name="description"
            value={formik.values.description}
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
                error={Boolean(formik.touched.startDate && formik.errors.startDate)}
                helperText={Boolean(formik.touched.startDate && formik.errors.startDate)}
                name="startDate"
                value={formik.values.startDate}
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
                error={Boolean(formik.touched.dueDate && formik.errors.dueDate)}
                helperText={Boolean(formik.touched.dueDate && formik.errors.dueDate)}
                name="dueDate"
                value={formik.values.dueDate}
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
