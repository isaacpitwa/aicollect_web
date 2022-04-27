import { useState } from "react";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Avatar, Box, Button, FormHelperText, TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  IconButton,
  InputAdornment, } from "@mui/material";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import { useAuth } from "../../hooks/use-auth";
import { useMounted } from "../../hooks/use-mounted";

export const CompleteUserProfile = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const isMounted = useMounted();
  const router = useRouter();
  const { completeUserProfile: profileUpdate } = useAuth();
  const [profileImage, setProfileImage] = useState(null);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      phone: "",
      password: "",
      confirmPassword: "",
      submit: null,
    },
    validationSchema: Yup.object({
      firstname: Yup.string()
        .max(255)
        .required("First name is required"),
      lastname: Yup.string()
        .max(255)
        .required("Last name is required"),
      phone: Yup.string()
        .max(255)
        .required("Phone number is required"),
      password: Yup.string().max(255).required("Password is required"),
      confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords do not match'),
    }),
    onSubmit: async (values, helpers) => {
      try {
        const token = router.query.token;
        const user = {
          firstname: values.firstname,
          lastname: values.lastname,
          phone: values.phone,
          password: values.password,
          token,
        }
        await profileUpdate(user);

        if (isMounted()) {
          const returnUrl = "/";
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
  // console.log(formik.values.profileImage);

  return (
    <form noValidate onSubmit={formik.handleSubmit} {...props}>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          marginTop: 2,
          marginBottom: 3
        }}
      >
        <Avatar
          src="https://www.kindpng.com/picc/m/78-786207_user-avatar-png-user-avatar-icon-png-transparent.png"
          sx={{
            height: 64,
            mr: 2,
            width: 64,
          }}
        >
          <GroupAddIcon fontSize="small" />
        </Avatar>
        <input
          type="file"
          name="profileImage"
          id="user_avatar"
          onChange={(e) => setProfileImage(e.target.files[0])}
          hidden
        />
        <label htmlFor="user_avatar">
          <Button variant="contained" component="span">
            Choose Profile Picture. No file Chosen (Optional)
          </Button>
        </label>
      </Box>
      <TextField
        autoFocus
        error={Boolean(formik.touched.firstname && formik.errors.firstname)}
        fullWidth
        helperText={formik.touched.firstname && formik.errors.firstname}
        label="First Name *"
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
        label="Last Name *"
        margin="normal"
        name="lastname"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values.lastname}
      />
      <TextField
        error={Boolean(formik.touched.phone && formik.errors.phone)}
        fullWidth
        helperText={formik.touched.phone && formik.errors.phone}
        label="Phone Number *"
        margin="normal"
        name="phone"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values.phone}
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
      </FormControl>

      <FormControl 
        sx={{ m: 1 }}
        fullWidth>
        <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
        <OutlinedInput
          error={Boolean(formik.touched.confirmPassword && formik.errors.confirmPassword)}
          helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
          id="confirmPassword"
          type={showPassword ? "text" : "password"}
          name="confirmPassword"
          // margin="normal"
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
          label="Password"
          fullWidth
        />
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
          onClick={formik.handleSubmit}
        >
          Complete Profile
        </Button>
      </Box>
    </form>
  );
};
