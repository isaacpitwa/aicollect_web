import { useRouter } from "next/router";
import * as Yup from "yup";
import { useFormik } from "formik";
import NextLink from "next/link";
import {
  Alert,
  Box,
  Button,
  FormHelperText,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  IconButton,
  InputAdornment,
  Stack,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import { useAuth } from "../../hooks/use-auth";
import { useMounted } from "../../hooks/use-mounted";
import { useState } from "react";

// Demo Account
// email: 'demo@devias.io',
// password: 'Password123!',

export const JWTLogin = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const isMounted = useMounted();
  const router = useRouter();
  const { login } = useAuth();
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      remember: false,
      submit: null,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Must be a valid email")
        .max(255)
        .required("Email is required"),
      password: Yup.string().max(255).required("Password is required"),
      remember: Yup.bool()
    }),
    onSubmit: async (values, helpers) => {
      try {
        await login(values.email, values.password);

        if (isMounted()) {
          const returnUrl = router.query.returnUrl || "/dashboard";
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
      />
      {/* <TextField
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
      /> */}

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
      </FormControl>
      {formik.errors.submit && (
        <Box sx={{ mt: 3 }}>
          <FormHelperText error>{formik.errors.submit}</FormHelperText>
        </Box>
      )}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ my: 2 }}
      >
        <FormControlLabel
          control={
            <Checkbox
              onChange={formik.handleChange}
              checked={formik.values.remember}
            />
          }
          label="Remember me"
        />

        <NextLink href="#" variant="subtitle2">
          Forgot Password.
        </NextLink>
      </Stack>
      <Box sx={{ mt: 2 }}>
        <Button
          disabled={formik.isSubmitting}
          fullWidth
          size="large"
          type="submit"
          variant="contained"
        >
          Log In
        </Button>
      </Box>
    </form>
  );
};
