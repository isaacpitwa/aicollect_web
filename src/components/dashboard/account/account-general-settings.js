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
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { UserCircle as UserCircleIcon } from "../../../icons/user-circle";
import dateFormat, { masks } from "dateformat";
import { Utils } from "../../../utils/main";


export const AccountGeneralSettings = (props) => {
  const { user } = props;
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const options = { day: 'numeric' , month: 'long', year: 'numeric', };

  return (
    <Box sx={{ mt: 4 }} {...props}>
      <Card>
        <CardContent sx={{padding:4}} >
        <Box
                sx={{
                  alignItems: "center",
                  display: "flex",
                  px: 3,
                  py: 2,
                }}
              >
                <Avatar
                  src={user.Profile?.profileImage ? user.Profile.profileImage : "N/A"}
                  sx={{
                    height: 180,
                    mr: 2,
                    width: 180,
                    border: "1px solid #E0E0E0",
                  }}
                >
                  <UserCircleIcon fontSize="small" />
                </Avatar>
                <Button>Change Profile Image</Button>
          </Box>
          <Box sx={{px:3}}>
          <Typography variant="h6" style={{color:'#707070',fontWeight:'600',marginTop:"36px"}}>Personal Information</Typography>
              <Box
                sx={{
                  display: "flex",
                  mt: 1,
                  alignItems: "center",
                  gap: 5,
                }}
              >
              <Typography variant="subtitle1" style={{color:'#707070',fontSize:'18px',fontWeight:'400'}}>Name</Typography>
               <Typography variant="body1" style={{color:'#707070', fontSize:'18px',fontWeight:'300'}}>{ Utils.capitalizeFirstLetter(user.firstname + ' ' + user.lastname)}</Typography>
              </Box>
              <Divider  sx={{my:1}}/>

              <Box
                sx={{
                  display: "flex",
                  mt: 1,
                  alignItems: "center",
                  gap: 5,
                }}
              >
              <Typography variant="subtitle1" style={{color:'#707070',fontSize:'18px',fontWeight:'400'}}>Email</Typography>
               <Typography variant="body1" style={{color:'#707070', fontSize:'18px',fontWeight:'300'}}>{user.email}</Typography>
              </Box>
              <Divider  sx={{my:1}}/>
              <Box
                sx={{
                  display: "flex",
                  mt: 1,
                  alignItems: "center",
                  gap: 5,
                }}
              >
              <Typography variant="subtitle1" style={{color:'#707070',fontSize:'18px',fontWeight:'400'}}>Phone</Typography>
               <Typography variant="body1" style={{color:'#707070', fontSize:'18px',fontWeight:'300'}}>{user.phone}</Typography>
              </Box>
              <Divider  sx={{my:1}}/>

              <Typography variant="h6" style={{color:'#707070',fontWeight:'600',marginTop:"36px"}}>System Information</Typography>
              <Box
                sx={{
                  display: "flex",
                  mt: 1,
                  alignItems: "center",
                  gap: 7,
                }}
              >
              <Typography variant="subtitle1" style={{color:'#707070',fontSize:'18px',fontWeight:'400'}}>Access Level</Typography>
               <Typography variant="body1" style={{color:'#707070', fontSize:'18px',fontWeight:'300'}}>{user.roles}</Typography>
              </Box>
              <Divider  sx={{my:1}}/>
              <Box
                sx={{
                  display: "flex",
                  mt: 1,
                  alignItems: "center",
                  gap: 7,
                }}
              >
              <Typography variant="subtitle1" style={{color:'#707070',fontSize:'18px',fontWeight:'400'}}>Organisation</Typography>
               <Typography variant="body1" style={{color:'#707070', fontSize:'18px',fontWeight:'300'}}>{ Utils.capitalizeFirstLetter(user.Profile?.companyName)}</Typography>
              </Box>
              <Divider  sx={{my:1}}/>
              <Box
                sx={{
                  display: "flex",
                  mt: 1,
                  alignItems: "center",
                  gap: 4,
                }}
              >
              <Typography variant="subtitle1" style={{color:'#707070',fontSize:'18px',fontWeight:'400'}}>Date Of Joining</Typography>
               <Typography variant="body1" style={{color:'#707070', fontSize:'18px',fontWeight:'300'}}>{ dateFormat (new Date(user.createdAt),'d/mmm/yyyy')}</Typography>
              </Box>
              <Divider  sx={{my:1}}/>
              <Box
                sx={{
                  display: "flex",
                  mt: 1,
                  alignItems: "center",
                  gap: 5,
                }}
              >
              <Typography variant="subtitle1" style={{color:'#707070',fontSize:'18px',fontWeight:'400'}}>Last Accessed</Typography>
               <Typography variant="body1" style={{color:'#707070', fontSize:'18px',fontWeight:'300'}}>{dateFormat (Date.now(),'d/mmm/yyyy')}</Typography>
              </Box>
              <Divider  sx={{my:1}}/>
              <Box
                sx={{
                  display: "flex",
                  mt: 1,
                  alignItems: "center",
                  gap: 9,
                }}
              >
              <Typography variant="subtitle1" style={{color:'#707070',fontSize:'18px',fontWeight:'400'}}>Supervisor</Typography>
               <Typography variant="body1" style={{color:'#707070', fontSize:'18px',fontWeight:'300'}}>{ user.supervisor ?? 'N/A'}</Typography>
              </Box>
              <Divider  sx={{my:1}}/>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
