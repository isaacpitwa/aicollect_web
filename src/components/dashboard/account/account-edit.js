import NextLink from 'next/link';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useState } from 'react';
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
    Typography,
    Avatar
} from '@mui/material';
import { userApi } from '../../../api/users-api';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useRouter } from 'next/router'
import { useAuth } from '../../../hooks/use-auth';
import { UserCircle as UserCircleIcon } from "../../../icons/user-circle";


export const AccountEditForm = (props) => {
    const { customer, updateUser, ...other } = props;
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const { user, refetchUser } = useAuth();
    const [profileImage, setProfileImage] = useState(user.Profile?.profileImage);
    const [profileSource, setProfileSource] = useState(null);

    const uploadProfileImage = () => {
        const data = new FormData()
        data.append("file", profileSource)
        data.append("upload_preset", "tf3wipgm")
        data.append("cloud_name", "alleviate")
        fetch(`https://api.cloudinary.com/v1_1/alleviate/image/upload`, {
            method: "post",
            body: data
        })
            .then(resp => resp.json())
            .then(async (data) => {
                console.log("Cloudinary Repsonse", data);
                if (data.error) {
                    console.log("Cloudinary Error", data.error);
                    toast.error(data.error.message);
                }
                else {
                    await userApi.updateUserProfile(user.id, { profileImage: data.url });
                    setProfileSource(null);
                    setProfileImage(data.url);
                    refetchUser().then(() => {
                        toast.success("Profile Image Updated");
                    });
                }
            })
            .catch(err => console.log(err))
    }

    
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
            addedBy: "Rockside Consults",
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

                if (profileSource) {
                    uploadProfileImage()
                }
                const data = await userApi.updateUserDetails(customer.id, { ...formik.values, addedBy: 1 });
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

    const deleteUser = async () => {
        try {
            // NOTE: Make API request
            // await wait(500);
            const data = await userApi.deleteUser(customer.id);
            if (data.status === 200) {
                setOpen(false)
                toast.success('User  has been deleted!');
                router.push('/dashboard/users');
            }

        } catch (err) {
            console.error(err);
            toast.error('Something went wrong!');
            setOpen(false)
        }
    }

    const onImageChange = (e) => {
        const file = e.target.files[0];
        setProfileSource(file);
        const reader = new FileReader();
        reader.onload = (e) => {
            setProfileImage(e.target.result);
        }
        reader.readAsDataURL(file);
    }

    return (
        <>
            <Box
                sx={{
                    alignItems: "center",
                    display: "flex",
                    px: 3,
                    py: 2,
                }}
            >
                <Avatar
                    src={ profileImage ?? "N/A"}
                    sx={{
                        height: 180,
                        mr: 2,
                        width: 180,
                        border: "2px solid #E0E0E0",
                    }}
                >
                    <UserCircleIcon fontSize="small" />
                </Avatar>
                <Button component="label">Change Profile Image  <input hidden accept="image/*" type="file" onChange={onImageChange} /></Button>
                {/* {profileSource != null ? <Button onClick={uploadProfileImage}>save</Button> : null} */}
            </Box>

            <form
                onSubmit={formik.handleSubmit}
                {...other}>
                <Card>
                    <CardHeader title="Edit Account" />
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
                                        disabled={true}
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
                                    hidden
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
                                justifyContent: 'space-between',
                                mt: 3
                            }}
                        >
                            <div>
                                <Typography
                                    gutterBottom
                                    variant="subtitle1"
                                >
                                    Password
                                </Typography>
                                <Typography
                                    color="textSecondary"
                                    variant="body2"
                                    sx={{ mt: 1 }}
                                >
                                    Means that your password is going to be Reset.
                                </Typography>
                                <Button
                                    variant='outlined'
                                    sx={{
                                        mt: 2,
                                    }}
                                >Reset & Send Password</Button>
                            </div>

                        </Box>
                        <Divider sx={{ my: 3 }} />
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
                            href={`/dashboard/account`}
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
                    </CardActions>
                </Card>
                <Dialog
                    open={open}
                    onClose={() => setOpen(false)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Delete User?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure you want to delete user:  {customer.firstname + ' ' + customer.lastname} <br /> WARNING: Account setting for the user will be deleted!
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpen(false)}>Disagree</Button>
                        <Button onClick={deleteUser} autoFocus>
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog>
            </form>
        </>
    );
};

AccountEditForm.propTypes = {
    customer: PropTypes.object.isRequired
};
