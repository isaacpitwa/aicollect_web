import { useState } from "react";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Avatar, Box, Button, FormHelperText, TextField } from "@mui/material";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { useAuth } from "../../hooks/use-auth";
import { useMounted } from "../../hooks/use-mounted";

export const CompleteUserProfile = (props) => {
  const isMounted = useMounted();
  const router = useRouter();
  const { completeUserProfile: profileUpdate } = useAuth();
  const [profileImage, setProfileImage] = useState(null);
  
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      phone: "",
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
        .required("Last name is required"),
      password: Yup.string().max(255).required("Password is required"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        const token = router.query.token;
        const user = {
          firstname: values.firstname,
          lastname: values.lastname,
          phone: values.phone,
          password: values.password,
          token
        }
        console.log(user);
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
