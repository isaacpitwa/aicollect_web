import { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
} from "@mui/material";
import NextLink from 'next/link';
import { UserCircle as UserCircleIcon } from "../../../icons/user-circle";
import dateFormat, { masks } from "dateformat";
import { PencilAlt as PencilAltIcon } from '../../../icons/pencil-alt';
import { Utils } from "../../../utils/main";
import { userApi } from '../../../api/users-api';
import { useAuth } from '../../../hooks/use-auth';
import toast from 'react-hot-toast';


const { CLOUDINARY_NAME, CLOUDINARY_PROFILE_PRESET } = process.env;

export const AccountGeneralSettings = (props) => {
  const { user, refetchUser } = useAuth();
  const [expanded, setExpanded] = useState(false);
  const [profileImage, setProfileImage] = useState(user.Profile?.profileImage);
  const [profileSource, setProfileSource] = useState(null);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const onImageChange = (e) => {
    const file = e.target.files[0];
    setProfileSource(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setProfileImage(e.target.result);
    }
    reader.readAsDataURL(file);
  }
  const uploadProfileImage =  () => {
    const data = new FormData()
    data.append("file", profileSource)
    data.append("upload_preset", "tf3wipgm")
    data.append("cloud_name", "alleviate")
    fetch(`https://api.cloudinary.com/v1_1/alleviate/image/upload`, {
      method: "post",
      body: data
    })
      .then(resp => resp.json())
      .then( async(data) => {
        console.log("Cloudinary Repsonse", data);
        if(data.error){
          console.log("Cloudinary Error", data.error);
          toast.error(data.error.message);
        }
        else{
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

  return (
    <Box sx={{ mt: 4 }} {...props}>
      <Card sx={{ my: 4 }}>
        <CardContent sx={{ padding: 4 }} >
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              px: 3,
              py: 2,
            }}
          >
            <Avatar
              src={profileImage ?? "N/A"}
              sx={{
                height: 180,
                mr: 2,
                width: 180,
                border: "1px solid #E0E0E0",
              }}
            >
              <UserCircleIcon fontSize="small" />
            </Avatar>
            <Button component="label">Change Profile Image  <input hidden accept="image/*" type="file" onChange={onImageChange} /></Button>
            {profileSource != null ? <Button onClick={uploadProfileImage}>save</Button> : null}
          </Box>
          <Box sx={{ px: 3 }}>
            <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6" style={{ color: '#707070', fontWeight: '600', marginTop: "36px" }}>Personal Information</Typography>
              <NextLink
                href={`/dashboard/account/edit`}
                passHref
              >
                <Button
                  component="a"
                  endIcon={(
                    <PencilAltIcon fontSize="small" />
                  )}
                  sx={{ m: 1 }}
                  variant="outlined"
                  size="small"
                >
                  Edit
                </Button>
              </NextLink>
            </Box>
            <Box
              sx={{
                display: "flex",
                mt: 1,
                alignItems: "center",
                gap: 5,
              }}
            >
              <Typography variant="subtitle1" style={{ color: '#707070', fontSize: '18px', fontWeight: '400' }}>Name</Typography>
              <Typography variant="body1" style={{ color: '#707070', fontSize: '18px', fontWeight: '300' }}>{Utils.capitalizeFirstLetter(user.firstname + ' ' + user.lastname)}</Typography>
            </Box>
            <Divider sx={{ my: 1 }} />

            <Box
              sx={{
                display: "flex",
                mt: 1,
                alignItems: "center",
                gap: 5,
              }}
            >
              <Typography variant="subtitle1" style={{ color: '#707070', fontSize: '18px', fontWeight: '400' }}>Email</Typography>
              <Typography variant="body1" style={{ color: '#707070', fontSize: '18px', fontWeight: '300' }}>{user.email}</Typography>
            </Box>
            <Divider sx={{ my: 1 }} />
            <Box
              sx={{
                display: "flex",
                mt: 1,
                alignItems: "center",
                gap: 5,
              }}
            >
              <Typography variant="subtitle1" style={{ color: '#707070', fontSize: '18px', fontWeight: '400' }}>Phone</Typography>
              <Typography variant="body1" style={{ color: '#707070', fontSize: '18px', fontWeight: '300' }}>{user.phone}</Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" style={{ color: '#707070', fontWeight: '600', marginTop: "8px" }}>System Information</Typography>
          <Box
            sx={{
              display: "flex",
              mt: 1,
              alignItems: "center",
              gap: 7,
            }}
          >
            <Typography variant="subtitle1" style={{ color: '#707070', fontSize: '18px', fontWeight: '400' }}>Access Level</Typography>
            <Typography variant="body1" style={{ color: '#707070', fontSize: '18px', fontWeight: '300' }}>{user.roles}</Typography>
          </Box>
          <Divider sx={{ my: 1 }} />
          <Box
            sx={{
              display: "flex",
              mt: 1,
              alignItems: "center",
              gap: 7,
            }}
          >
            <Typography variant="subtitle1" style={{ color: '#707070', fontSize: '18px', fontWeight: '400' }}>Organisation</Typography>
            <Typography variant="body1" style={{ color: '#707070', fontSize: '18px', fontWeight: '300' }}>{Utils.capitalizeFirstLetter(user.Profile?.companyName)}</Typography>
          </Box>
          <Divider sx={{ my: 1 }} />
          <Box
            sx={{
              display: "flex",
              mt: 1,
              alignItems: "center",
              gap: 4,
            }}
          >
            <Typography variant="subtitle1" style={{ color: '#707070', fontSize: '18px', fontWeight: '400' }}>Date Of Joining</Typography>
            <Typography variant="body1" style={{ color: '#707070', fontSize: '18px', fontWeight: '300' }}>{dateFormat(new Date(user.createdAt), 'd/mmm/yyyy')}</Typography>
          </Box>
          <Divider sx={{ my: 1 }} />
          <Box
            sx={{
              display: "flex",
              mt: 1,
              alignItems: "center",
              gap: 5,
            }}
          >
            <Typography variant="subtitle1" style={{ color: '#707070', fontSize: '18px', fontWeight: '400' }}>Last Accessed</Typography>
            <Typography variant="body1" style={{ color: '#707070', fontSize: '18px', fontWeight: '300' }}>{dateFormat(Date.now(), 'd/mmm/yyyy')}</Typography>
          </Box>
          <Divider sx={{ my: 1 }} />
          <Box
            sx={{
              display: "flex",
              mt: 1,
              alignItems: "center",
              gap: 9,
            }}
          >
            <Typography variant="subtitle1" style={{ color: '#707070', fontSize: '18px', fontWeight: '400' }}>Supervisor</Typography>
            <Typography variant="body1" style={{ color: '#707070', fontSize: '18px', fontWeight: '300' }}>{user.supervisor ?? 'N/A'}</Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
