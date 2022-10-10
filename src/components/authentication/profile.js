import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  Box,
  Button,
  Checkbox,
  FormHelperText,
  TextField,
  Typography,
  Link,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  LinearProgress,
  Divider,
  FormGroup,
  Avatar,

} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import BadgeIcon from '@mui/icons-material/Badge';
import { authenticationApi } from '../../api/auth-api';
import { sectorApi } from '../../api/sectors-api';
import { useMounted } from "../../hooks/use-mounted";
import { billingPlanApi } from "../../api/billingplan-api";
import { fileToBase64 } from "../../utils/file-to-base64";
import { IndexRedirect } from "./auth-guard";
import toast from 'react-hot-toast';
import { UserCircle as UserCircleIcon } from "../../icons/user-circle";


export const Profile = (props) => {
  const [profileImage, setProfileImage] = useState(null);
  const [companyLogo, setCompanyLogo] = useState(null);
  const [sectors, setSectors] = useState([]);
  const [billingPlans, setBillingPlans] = useState([]);
  const isMounted = useMounted();
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      userType: props.user.roles,
      user: props.user.email,
      firstName: props.user.firstname,
      lastName: props.user.lastname,
      billingPlan: "",
      sector: "",
      companyName: "",
      policy: false,
      submit: null,
    },
    validationSchema: Yup.object({
      userType: Yup.string().max(255).required("User Type is required"),
      user: Yup.string(),
      firstName: Yup.string().max(255).required("First name is required"),
      lastName: Yup.string().max(255).required("Last name is required"),
      billingPlan: Yup.string().max(255),
      sector: Yup.string().max(255),
      companyName: Yup.string().max(255),
      policy: Yup.boolean().oneOf([true], "This field must be checked"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        const base64Image = profileImage ? await fileToBase64(profileImage) : null;
        const base64CompanyImage = companyLogo ? await fileToBase64(companyLogo) : null;
        const profile = {
          ...values,
          profileImage: base64Image,
          companyLogo: base64CompanyImage,
          user: props.user.id
        }
        const data = await authenticationApi.createUserProfile(profile);

        if (isMounted() && data) {
          if (data) {
            const returnUrl = router.query.returnUrl || IndexRedirect[props.user.roles];
            router.push(returnUrl, null, { shallow: false });
          }
        }
      } catch (err) {
        console.error(err);
        toast.error(err.message ?? 'Something went wrong');
        if (isMounted()) {
          helpers.setStatus({ success: false });
          helpers.setErrors({ submit: err.message });
          helpers.setSubmitting(false);
        }
      }
    },
  });
  // console.log(companyLogo);

  useEffect(() => {
    const getSectors = async () => {
      const data = await sectorApi.getSectors();
      setSectors(data ? data : []);
    };
    getSectors();
  }, [setSectors]);

  useEffect(() => {
    const getBillingPlans = async () => {
      const data = await billingPlanApi.getBillingPlans();
      setBillingPlans(data);
    };
    getBillingPlans();
  }, [setBillingPlans]);

  const getURL = () => {
    if (profileImage) {
      return URL.createObjectURL(profileImage);
    }
    return '';
  }
  return (
    <form noValidate onSubmit={formik.handleSubmit} {...props}>
      <Typography sx={{ color: "text.secondary", fontSize: '16px',fontWeight:'600' }}>Personal Information</Typography>
      <Divider sx={{ mb: 3, mt: 1 }} />
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', justifyContent: 'center' }}>
        <Avatar
          src={getURL()}
          sx={{
            height: 120,
            mr: 2,
            width: 120,
            mt: '14px',
            backgroundColor: 'text.secondary',
          }}
        >
          <UserCircleIcon fontSize="small" />
        </Avatar>
        <FormGroup>
          <input
            type="file"
            name="profileImage"
            id="profileImage"
            onChange={(e) => setProfileImage(e.target.files[0])}
            hidden
          />
          <label htmlFor="profileImage">
            <Button
              variant="contained"
              startIcon={<BadgeIcon fontSize="small" />}
              component="span"
              sx={{ mt: 3 }}
            >
              Profile Image (Optional)
            </Button>
          </label>
          {profileImage && (
            <Box sx={{ width: "100%" }}>
              <Typography variant="caption">{profileImage.name}</Typography>
              <LinearProgress variant="determinate" value={100} />
            </Box>
          )}
        </FormGroup>
      </Box>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField
          error={Boolean(formik.touched.firstName && formik.errors.firstName)}
          fullWidth
          helperText={formik.touched.firstName && formik.errors.firstName}
          label="First name"
          margin="normal"
          name="firstName"
          disabled
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.firstName}
        />
        <TextField
          error={Boolean(formik.touched.lastName && formik.errors.lastName)}
          fullWidth
          helperText={formik.touched.lastName && formik.errors.lastName}
          label="Last name"
          margin="normal"
          name="lastName"
          disabled
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.lastName}
        />

      </Box>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField
          error={Boolean(formik.touched.userType && formik.errors.userType)}
          fullWidth
          helperText={formik.touched.userType && formik.errors.userType}
          label="User Type"
          margin="normal"
          name="userType"
          disabled
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.userType}
        />
        <TextField
          error={Boolean(formik.touched.user && formik.errors.user)}
          fullWidth
          helperText={formik.touched.user && formik.errors.user}
          label="User"
          margin="normal"
          name="user"
          disabled
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.user}
        />

      </Box>
      
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          ml: -1,
          mt: 2,
        }}
      >
        <Checkbox
          checked={formik.values.policy}
          name="policy"
          onChange={formik.handleChange}
        />
        <Typography color="textSecondary" variant="body2">
          I have read the{" "}
          <Link component="a" href="#">
            Terms and Conditions
          </Link>
        </Typography>
      </Box>
      
      {Boolean(formik.touched.policy && formik.errors.policy) && (
        <FormHelperText error>{formik.errors.policy}</FormHelperText>
      )}
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
          Create Profile
        </Button>
      </Box>
    </form>
  );
};
