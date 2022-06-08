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
  FormGroup,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import BadgeIcon from '@mui/icons-material/Badge';
import { authenticationApi } from '../../api/auth-api';
import { sectorApi } from '../../api/sectors-api';
import { useMounted } from "../../hooks/use-mounted";
import { billingPlanApi } from "../../api/billingplan-api";
import { fileToBase64 } from "../../utils/file-to-base64";
import { IndexRedirect } from "./auth-guard";

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
      billingPlan: "",
      sector: "",
      companyName: "",
      policy: false,
      submit: null,
    },
    validationSchema: Yup.object({
      userType: Yup.string().max(255).required("User Type is required"),
      user: Yup.string(),
      billingPlan: Yup.string().max(255),
      sector: Yup.string().max(255),
      companyName: Yup.string().max(255),
      policy: Yup.boolean().oneOf([true], "This field must be checked"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        const base64Image = profileImage ? await fileToBase64(profileImage): null;
        const base64CompanyImage =  companyLogo ? await fileToBase64(companyLogo) : null;
        const profile = {
          ...values,
          profileImage: base64Image,
          companyLogo: base64CompanyImage,
          user: props.user.id
        }
        const data = await authenticationApi.createUserProfile(profile);

        if (isMounted() && data) {
          if (data) {
            const returnUrl = router.query.returnUrl ||  IndexRedirect[props.user.roles];
            router.push(returnUrl, null, { shallow: false });
          }
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

  return (
    <form noValidate onSubmit={formik.handleSubmit} {...props}>
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
      {props.user.roles === "Owner" && (
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>Sector</InputLabel>
          <Select
            error={Boolean(formik.touched.sector && formik.errors.sector)}
            fullWidth
            helperText={formik.touched.sector && formik.errors.sector}
            label="Sector"
            margin="normal"
            name="sector"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.sector}
          >
            {
              sectors.map((sector, idx) => (
                <MenuItem key={idx} value={sector.id}>{sector.title}</MenuItem>
              ))
            }
          </Select>
        </FormControl>
      )}

      {props.user.roles === "Owner" && (
        <FormControl fullWidth>
          <InputLabel>Billing Plan</InputLabel>
          <Select
            error={Boolean(
              formik.touched.billingPlan && formik.errors.billingPlan
            )}
            fullWidth
            helperText={formik.touched.billingPlan && formik.errors.billingPlan}
            label="Billing Plan"
            margin="normal"
            name="billingPlan"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.billingPlan}
          >
            {
              billingPlans.map((plan, idx) => (
                <MenuItem key={idx} value={plan.id}>{[plan.name]}</MenuItem>
              ))
            }
          </Select>
        </FormControl>
      )}

      {props.user.roles === "Owner" && (
        <TextField
          error={Boolean(
            formik.touched.companyName && formik.errors.companyName
          )}
          fullWidth
          helperText={formik.touched.companyName && formik.errors.companyName}
          label="Company Name"
          margin="normal"
          name="companyName"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.companyName}
          hidden={props.user.roles !== "Owner"}
        />
      )}
      {props.user.roles === "Owner" && (
        <>
          <input
            type="file"
            name="companyLogo"
            id="companyLogo"
            onChange={(e) => setCompanyLogo(e.target.files[0])}
            hidden
          />
          <label htmlFor="companyLogo">
            <Button
              variant="contained"
              startIcon={<AddPhotoAlternateIcon fontSize="small" />}
              component="span"
              sx={{ mt: 3 }}
            >
              Company Logo (Optional). {!companyLogo && "No file Chosen"}
            </Button>
          </label>
          {companyLogo && (
            <Box sx={{ width: "100%" }}>
              <Typography variant="caption">{companyLogo.name}</Typography>
              <LinearProgress variant="determinate" value={100} />
            </Box>
          )}
        </>
      )}

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
            Profile Image (Optional). {!profileImage && "No file Chosen"}
          </Button>
        </label>
        {profileImage && (
          <Box sx={{ width: "100%" }}>
            <Typography variant="caption">{profileImage.name}</Typography>
            <LinearProgress variant="determinate" value={100} />
          </Box>
        )}
      </FormGroup>
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
