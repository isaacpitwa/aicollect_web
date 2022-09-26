import { useRouter } from 'next/router';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Box, Button, Checkbox, FormHelperText, TextField, Typography, Link } from '@mui/material';
import { useAuth } from '../../hooks/use-auth';
import { useMounted } from '../../hooks/use-mounted';

export const JWTRegister = (props) => {
  const isMounted = useMounted();
  const router = useRouter();
  const { register } = useAuth();
  const formik = useFormik({
    initialValues: {
      email: '',
      firstname: '',
      lastname: '',
      phone: '',
      password: '',
      policy: false,
      submit: null
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email('Must be a valid email')
        .max(255)
        .required('Email is required'),
      firstname: Yup
        .string()
        .max(255)
        .required('First Name is required'),
      lastname: Yup
        .string()
        .max(255)
        .required('Last Name is required'),
      phone: Yup.string().max(25).required("Phone is required"),
      password: Yup
        .string()
        .min(7)
        .max(255)
        .required('Password is required'),
      policy: Yup
        .boolean()
        .oneOf([true], 'This field must be checked')
    }),
    onSubmit: async (values, helpers) => {
      try {
        await register(values.email, values.name, values.password);

        if (isMounted()) {
          const returnUrl = router.query.returnUrl || '/dashboard';
          router.push(returnUrl);
        }
      } catch (err) {
        console.error(err);

        if (isMounted()) {
          helpers.setStatus({ success: false });
          helpers.setErrors({ submit: err.message });
          helpers.setSubmitting(false);
        }
      }
    }
  });

  return (
    <form
      noValidate
      onSubmit={formik.handleSubmit}
      {...props}>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <TextField
          error={Boolean(formik.touched.firstname && formik.errors.firstname)}
          fullWidth
          helperText={formik.touched.firstname && formik.errors.firstname}
          label="First Name"
          margin="normal"
          name="firstname"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.firstname}
        />
        <TextField
          error={Boolean(formik.touched.lastname && formik.errors.lastname)}
          fullWidth
          helperText={formik.touched.lastname && formik.errors.lastname}
          label="Last Name"
          margin="normal"
          name="lastname"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.lastname}
        />
      </Box>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <TextField
          error={Boolean(formik.touched.email && formik.errors.email)}
          fullWidth
          helperText={formik.touched.email && formik.errors.email}
          label="Email Address"
          margin="normal"
          name="email"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          type="email"
          value={formik.values.email}
        />
        <TextField
          error={Boolean(
            formik.touched.phone && formik.errors.phone
          )}
          fullWidth
          helperText={formik.touched.phone && formik.errors.phone}
          label="Phone Number"
          margin="normal"
          name="phone"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.phone}
        />
      </Box>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <TextField
          error={Boolean(formik.touched.password && formik.errors.password)}
          fullWidth
          helperText={formik.touched.password && formik.errors.password}
          label="Password"
          margin="normal"
          name="password"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          type="password"
          value={formik.values.password}
        />
        <TextField
          error={Boolean(formik.touched.password && formik.errors.password)}
          fullWidth
          helperText={formik.touched.password && formik.errors.password}
          label="Confirm password"
          margin="normal"
          name="password"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          type="password"
          value={formik.values.password}
        />
      </Box>

      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          ml: -1,
          mt: 2
        }}
      >
        <Checkbox
          checked={formik.values.policy}
          name="policy"
          onChange={formik.handleChange}
        />
        <Typography
          color="textSecondary"
          variant="body2"
        >
          I have read the
          {' '}
          <Link
            component="a"
            href="#"
          >
            Terms and Conditions
          </Link>
        </Typography>
      </Box>
      {Boolean(formik.touched.policy && formik.errors.policy) && (
        <FormHelperText error>
          {formik.errors.policy}
        </FormHelperText>
      )}
      {formik.errors.submit && (
        <Box sx={{ mt: 3 }}>
          <FormHelperText error>
            {formik.errors.submit}
          </FormHelperText>
        </Box>
      )}
      <Box sx={{ mt: 2 }}>
        <Button
          disabled={formik.isSubmitting}
          fullWidth
          size="large"
          type="submit"
          variant="contained"
        >
          Register
        </Button>
      </Box>
    </form>
  );
};
