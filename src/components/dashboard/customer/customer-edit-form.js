import NextLink from 'next/link';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography
} from '@mui/material';
import { userApi } from '../../../api/users-api';
import { wait } from '../../../utils/wait';

export const CustomerEditForm = (props) => {
  const { customer, updateUser, ...other } = props;
  const formik = useFormik({
    initialValues: {
      firstname: customer.firstname || '',
      lastname: customer.lastname || '',
      firstTimeProcessor: customer.firstTimeProcessor || '',
      email: customer.email || '',
      isActive: customer.isActive || false,
      isVerified: customer.isVerified || false,
      roles: customer.roles || '',
      phone: customer.phone || '',
      processor: customer.processor || '',
      isDeleted: customer.isDeleted || false,
      addedBy: "Stuar Dambi",
      submit: null
    },
    validationSchema: Yup.object({
      firstname: Yup.string().max(255),
      lastname: Yup.string().max(255),
      firstTimeProcessor: Yup.string().max(255),
      email: Yup
        .string()
        .email('Must be a valid email')
        .max(255)
        .required('Email is required'),
      isActive: Yup.bool(),
      isVerified: Yup.bool(),
      roles: Yup
        .string()
        .max(255)
        .required('Role is required'),
      phone: Yup.string().max(15),
      processor: Yup.string().max(255),
      addedBy: Yup.string().max(255),
      isDeleted: Yup.bool()
    }),
    onSubmit: async (values, helpers) => {
      try {
        // NOTE: Make API request
        // await wait(500);
        const data = await userApi.updateUserDetails(customer.id, {...formik.values, addedBy: 1});
        if (Array.isArray(data)) {
          helpers.setStatus({ success: true });
          helpers.setSubmitting(false);
          toast.success('User Details have been updated!');
        }
        
      } catch (err) {
        console.error(err);
        toast.error('Something went wrong!');
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      {...other}>
      <Card>
        <CardHeader title="Edit customer" />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                error={Boolean(formik.touched.firstname && formik.errors.firstname)}
                fullWidth
                helperText={formik.touched.firstname && formik.errors.firstname}
                label="Full name"
                name="firstname"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required
                value={formik.values.firstname}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                error={Boolean(formik.touched.lastname && formik.errors.lastname)}
                fullWidth
                helperText={formik.touched.lastname && formik.errors.lastname}
                label="Full name"
                name="lastname"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required
                value={formik.values.lastname}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                error={Boolean(formik.touched.email && formik.errors.email)}
                fullWidth
                helperText={formik.touched.email && formik.errors.email}
                label="Email address"
                name="email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required
                value={formik.values.email}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <FormControl fullWidth>
                <InputLabel>Role</InputLabel>
                <Select
                  error={Boolean(formik.touched.roles && formik.errors.roles)}
                  fullWidth
                  helperText={formik.touched.roles && formik.errors.roles}
                  label="Role"
                  name="roles"
                  title='Select Roles'
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.roles}
                >
                  <MenuItem value="Owner">Owner</MenuItem>
                  <MenuItem value="Data Manager">Data Manager</MenuItem>
                  <MenuItem value="Supervisor">Supervisor</MenuItem>
                  <MenuItem value="Standard user">Standard user</MenuItem>
                  <MenuItem value="External user">External user</MenuItem>
                  <MenuItem value="Billing Manager">Billing Manager</MenuItem>
                  <MenuItem value="Admin">Admin</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {/* <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                error={Boolean(formik.touched.firstTimeProcessor && formik.errors.firstTimeProcessor)}
                fullWidth
                helperText={formik.touched.firstTimeProcessor && formik.errors.firstTimeProcessor}
                label="First Time Processor"
                name="firstTimeProcessor"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.firstTimeProcessor}
              />
            </Grid> */}
            {/* <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                error={Boolean(formik.touched.processor && formik.errors.processor)}
                fullWidth
                helperText={formik.touched.processor && formik.errors.processor}
                label="Processor"
                name="processor"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.processor}
              />
            </Grid> */}
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                error={Boolean(formik.touched.addedBy && formik.errors.addedBy)}
                fullWidth
                helperText={formik.touched.addedBy && formik.errors.addedBy}
                label="Added By"
                name="addedBy"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                disabled
                value={formik.values.addedBy}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                error={Boolean(formik.touched.phone && formik.errors.phone)}
                fullWidth
                helperText={formik.touched.phone && formik.errors.phone}
                label="Phone number"
                name="phone"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.phone}
              />
            </Grid>
          </Grid>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'space-between',
              mt: 3
            }}
          >
            <div>
              <Typography
                gutterBottom
                variant="subtitle1"
              >
                Is Verified
              </Typography>
              <Typography
                color="textSecondary"
                variant="body2"
                sx={{ mt: 1 }}
              >
                Means that user has verified his/her email address
              </Typography>
            </div>
            <Switch
              checked={formik.values.isVerified}
              color="primary"
              edge="start"
              name="isVerified"
              onChange={formik.handleChange}
              value={formik.values.isVerified}
            />
          </Box>
          <Divider sx={{ my: 3 }} />
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <Typography
                gutterBottom
                variant="subtitle1"
              >
                Is Active
              </Typography>
              <Typography
                color="textSecondary"
                variant="body2"
                sx={{ mt: 1 }}
              >
                Toggling this will make the user Inactive
              </Typography>
            </div>
            <Switch
              checked={formik.values.isActive}
              color="primary"
              edge="start"
              name="isActive"
              onChange={formik.handleChange}
              value={formik.values.isActive}
            />
          </Box>
        </CardContent>
        <CardActions
          sx={{
            flexWrap: 'wrap',
            m: -1
          }}
        >
          <Button
            disabled={formik.isSubmitting}
            type="submit"
            sx={{ m: 1 }}
            variant="contained"
          >
            Update
          </Button>
          <NextLink
            href="/dashboard/customers/1"
            passHref
          >
            <Button
              component="a"
              disabled={formik.isSubmitting}
              sx={{
                m: 1,
                mr: 'auto'
              }}
              variant="outlined"
            >
              Cancel
            </Button>
          </NextLink>
          <Button
            color="error"
            disabled={formik.isSubmitting}
          >
            Delete user
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};

CustomerEditForm.propTypes = {
    customer: PropTypes.object.isRequired
};
