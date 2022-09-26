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
import { sectorApi } from '../../api/sectors-api';
import { useMounted } from "../../hooks/use-mounted";
import { billingPlanApi } from "../../api/billingplan-api";
import { fileToBase64 } from "../../utils/file-to-base64";
import toast from 'react-hot-toast';
import { UserCircle as UserCircleIcon } from "../../icons/user-circle";
import { clientsApi } from "../../api/clients-api";


export const  ClientRegistration = (props) => {
    const [companyLogo, setCompanyLogo] = useState(null);
    const [sectors, setSectors] = useState([]);
    const [billingPlans, setBillingPlans] = useState([]);
    const isMounted = useMounted();
    const router = useRouter();
    const { disableGuard, token } = router.query;
    const countries = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua &amp; Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia &amp; Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Cape Verde", "Cayman Islands", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica", "Cote D Ivoire", "Croatia", "Cruise Ship", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Kyrgyz Republic", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Mauritania", "Mauritius", "Mexico", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Namibia", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre &amp; Miquelon", "Samoa", "San Marino", "Satellite", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "South Africa", "South Korea", "Spain", "Sri Lanka", "St Kitts &amp; Nevis", "St Lucia", "St Vincent", "St. Lucia", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L'Este", "Togo", "Tonga", "Trinidad &amp; Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks &amp; Caicos", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "Uruguay", "Uzbekistan", "Venezuela", "Vietnam", "Virgin Islands (US)", "Yemen", "Zambia", "Zimbabwe"];
    const languages = ["English"]
    const formik = useFormik({
        initialValues: {
            billingPlan: 1,
            sector: "",
            name: "",
            policy: false,
            submit: null,
            country: '',
            language: '',
            phone: '',
            email: '',
            description: '',
        },
        validationSchema: Yup.object({
            billingPlan: Yup.string().max(255),
            sector: Yup.string().max(255),
            name: Yup.string().max(255),
            policy: Yup.boolean().oneOf([true], "This field must be checked"),
            country: Yup.string().max(255).required("Country is required"),
            language: Yup.string().max(255).required("Language is required"),
            phone: Yup.string().max(25).required("Phone is required"),
            email: Yup.string().max(255).required("Email is required"),
            description: Yup.string().max(500).required("Description is required"),
        }),
        onSubmit: async (values, helpers) => {
            try {
                const base64CompanyImage = companyLogo ? await fileToBase64(companyLogo) : null;
                const profile = {
                    ...values,
                    logo: base64CompanyImage,
                    token: token,
                }
                const data = await clientsApi.register(profile);
                if (isMounted() && data) {
                    if (data) {
                        // const returnUrl = router.query.returnUrl || IndexRedirect[props.user.roles];
                        // router.push(returnUrl, null, { shallow: false });
                        toast.success("Registration successful");
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
        if (companyLogo) {
            return URL.createObjectURL(companyLogo);
        }
        return '';
    }
    return (
        <form noValidate onSubmit={formik.handleSubmit} {...props} style={{boxShadow: '0 8px 40px -12px rgba(0,0,0,0.3)', padding:'16px 16px' }}>
            {/* <Typography sx={{ color: "text.secondary", fontSize: '16px', fontWeight: '600', mt: 3 }}>Organisation Information</Typography> */}            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', justifyContent: 'center', }}>
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
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', justifyContent: 'center', flexDirection:'column' }}>
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
                        Company logo
                    </Button>
                </label>
                {companyLogo && (
                    <Box sx={{ width: "100%" }}>
                        <Typography variant="caption">{companyLogo.name}</Typography>
                        <LinearProgress variant="determinate" value={100} />
                    </Box>
                )}
                </Box>
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                    error={Boolean(
                        formik.touched.name && formik.errors.name
                    )}
                    fullWidth
                    helperText={formik.touched.name && formik.errors.name}
                    label="Name"
                    margin="normal"
                    name="name"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.name}
                />
            </Box>

            <TextField
                error={Boolean(
                    formik.touched.description && formik.errors.description
                )}
                fullWidth
                helperText={formik.touched.description && formik.errors.description}
                label="Description"
                margin="normal"
                name="description"
                multiline
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.description}
                InputProps={{
                    style: {
                        minHeight: '100px',
                    }
                }}
            />
            <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                    error={Boolean(
                        formik.touched.email && formik.errors.email
                    )}
                    fullWidth
                    helperText={formik.touched.email && formik.errors.email}
                    label="Email address"
                    margin="normal"
                    name="email"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.email}
                />
                <TextField
                    error={Boolean(
                        formik.touched.phone && formik.errors.phone
                    )}
                    fullWidth
                    helperText={formik.touched.phone && formik.errors.phone}
                    label="Phone Contact"
                    margin="normal"
                    name="phone"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.phone}
                />
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
                <FormControl fullWidth sx={{ mb: 2 }}>
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
                        value={formik.values.billingPlan }
                        disabled
                    >
                        {
                            billingPlans.map((plan, idx) => (
                                <MenuItem key={idx} value={plan.id}>{[plan.name]}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Country</InputLabel>
                    <Select
                        error={Boolean(formik.touched.country && formik.errors.country)}
                        fullWidth
                        helperText={formik.touched.country && formik.errors.country}
                        label="Country"
                        margin="normal"
                        name="country"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.country}
                    >
                        {
                            countries.map((country, idx) => (
                                <MenuItem key={country} value={country}>{country}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>

                <FormControl fullWidth>
                    <InputLabel>Language</InputLabel>
                    <Select
                        error={Boolean(
                            formik.touched.language && formik.errors.language
                        )}
                        fullWidth
                        helperText={formik.touched.language && formik.errors.language}
                        label="Language"
                        margin="normal"
                        name="language"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.language}
                    >
                        {
                            languages.map((language) => (
                                <MenuItem key={language} value={language}>{language}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
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
                    Register Organisation
                </Button>
            </Box>
        </form>
    );
};
