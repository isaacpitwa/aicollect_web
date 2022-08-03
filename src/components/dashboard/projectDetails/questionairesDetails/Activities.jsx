import {
  Grid,
  List,
  ListItem,
  Divider,
  ListItemText,
  Avatar,
  Typography,
  ListItemAvatar,
} from "@mui/material";

export default function Activities() {
  return (
    <Grid container display="flex" flexDirection="row" spacing={2}>
      <Grid item md={12} xs={12}>
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src="/stuart.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary="Last Visted on"
              secondary={
                <>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    20th October 2021
                  </Typography>
                  {" By Hassan Mubiru"}
                </>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Travis Howard" src="/stuart.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary="Next Visit"
              secondary={
                <>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    22nd February 2022
                  </Typography>
                  {" By Hassan Mubiru"}
                </>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Cindy Baker" src="/stuart.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary="Total Number of Visits"
              secondary={
                <>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    5
                  </Typography>
                </>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Cindy Baker" src="/stuart.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary="Last Training"
              secondary={
                <>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    20th December 2021
                  </Typography>
                  
                </>
              }
            />
          </ListItem>
        </List>
      </Grid>
    </Grid>
  );
}
