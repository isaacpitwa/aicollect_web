import { useState } from "react";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  Box,
  Button,
  FormHelperText,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  IconButton,
  InputAdornment,
} from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import { authenticationApi } from '../../api/auth-api';
import { useAuth } from "../../hooks/use-auth";
import { useMounted } from "../../hooks/use-mounted";


// Demo Account
// email: 'demo@devias.io',
// password: 'Password123!',

export const Password = (props) => {
  const { user } = props;
  const [showPassword, setShowPassword] = useState(false);
  const isMounted = useMounted();
  const router = useRouter();
  const { login } = useAuth();
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const formik = useFormik({
    initialValues: {
      email: user.email,
      firstname: user.firstname || '',
      lastname: user.lastname || '',
      password: "",
      confirmPassword: "",
      submit: null,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Must be a valid email")
        .max(255)
        .required("Email is required"),
      firstname: Yup.string().required('First name is required'),
      lastname: Yup.string().required('Last name is required'),
      password: Yup.string().max(255).required("Password is required"),
      confirmPassword: Yup.string().when("password", {
        is: val => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref("password")],
          "Your passwords do not match."
        )
      }),
    }),
    onSubmit: async (values, helpers) => {
      try {
        const { email, password, firstname, lastname } = values;
        const data = await authenticationApi.createUserPassword({ email, password, firstname, lastname });

        if (isMounted() && data) {
          const returnUrl = router.query.returnUrl || "/createProfile";
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
    },
  });

  return (
    <form noValidate onSubmit={formik.handleSubmit} {...props}>
      <TextField
        autoFocus
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
        disabled
      />
      <TextField
        autoFocus
        error={Boolean(formik.touched.firstname && formik.errors.firstname)}
        fullWidth
        helperText={formik.touched.firstname && formik.errors.firstname}
        label="First Name"
        margin="normal"
        name="firstname"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values.firstname}
        disabled={user.firstname !== null}
      />
      <TextField
        autoFocus
        error={Boolean(formik.touched.lastname && formik.errors.lastname)}
        fullWidth
        helperText={formik.touched.lastname && formik.errors.lastname}
        label="Last Name"
        margin="normal"
        name="lastname"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values.lastname}
        disabled
      />

      <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          error={Boolean(formik.touched.password && formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          id="outlined-adornment-password"
          type={showPassword ? "text" : "password"}
          name="password"
          margin="normal"
          value={formik.values.password}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOffIcon /> : <RemoveRedEyeIcon />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
          fullWidth
        />
        <Box sx={{ mt: 2 }}>
          <FormHelperText error>{formik.errors.password}</FormHelperText>
        </Box>
      </FormControl>
      <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
        <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
        <OutlinedInput
          error={Boolean(formik.touched.confirmPassword && formik.errors.confirmPassword)}
          helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
          id="outlined-adornment-password"
          type={showPassword ? "text" : "password"}
          name="confirmPassword"
          margin="normal"
          value={formik.values.confirmPassword}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOffIcon /> : <RemoveRedEyeIcon />}
              </IconButton>
            </InputAdornment>
          }
          label="Confirm Password"
          fullWidth
        />
        <Box sx={{ mt: 2 }}>
          <FormHelperText error>{formik.errors.confirmPassword}</FormHelperText>
        </Box>
      </FormControl>
      {formik.errors.submit && (
        <Box sx={{ mt: 3 }}>
          <FormHelperText error>{formik.errors.submit}</FormHelperText>
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
          Create Password
        </Button>
      </Box>
    </form>
  );
};
