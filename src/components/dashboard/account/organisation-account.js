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
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { UserCircle as UserCircleIcon } from "../../../icons/user-circle";

export const OrganisationGeneralSettings = (props) => {
  const { user } = props;
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box sx={{ mt: 4 }} {...props}>
      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={8} xs={12}>
              <Box
                sx={{
                  alignItems: "center",
                  display: "flex",
                }}
              >
              </Box>
              <Box
                sx={{
                  display: "flex",
                  mt: 3,
                  alignItems: "center",
                }}
              >
                <TextField
                  defaultValue={user.Profile?.companyName}
                  label="Name"
                  size="small"
                  sx={{
                    flexGrow: 1,
                    mr: 3,
                  }}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  mt: 3,
                  alignItems: "center",
                }}
              >
                <TextField
                  defaultValue={''}
                  label="Description"
                  multiline
                  rows={4}
                  size="small"
                  sx={{
                    flexGrow: 1,
                    mr: 3,
                  }}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  mt: 3,
                  alignItems: "center",
                }}
              >
                <TextField
                  defaultValue={''}
                  label="Address"
                  size="small"
                  sx={{
                    flexGrow: 1,
                    mr: 3,
                  }}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  mt: 3,
                  alignItems: "center",
                }}
              >
                <TextField
                  label=" Reset Password"
                  type="password"
                  required
                  size="small"
                  sx={{
                    flexGrow: 1,
                    mr: 3,
                  }}
                />
              </Box>
              
              
            </Grid>
            <Grid item md={4} xs={12}>
              <Typography variant="h9">Organisation Logo</Typography>
              <Avatar
                  src={user.Profile?.profileImage ? user.Profile.profileImage : "N/A"}
                  sx={{
                    height: 120,
                    mr: 2,
                    width: 120,
                    ml: '25%',
                  }}
                >
                  <UserCircleIcon fontSize="small" />
                </Avatar>
                <Button variant="contained" style={styles.uploadBtn}>Change Logo</Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

const styles = {
    uploadBtn: {
        width: "100%",
        marginTop: "21px",
    }
}