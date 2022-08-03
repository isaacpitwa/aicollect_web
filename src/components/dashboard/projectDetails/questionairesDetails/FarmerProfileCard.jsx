import * as React from 'react';
import { styled } from '@mui/material/styles';
// import { } from '@mui/material';
import {Card, CardHeader, Avatar, colors, IconButton } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function FarmerProfileCard() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 345, backgroundColor: '#FCFBFA' }} elevation={20} >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: colors.red[500] }} aria-label="recipe">
            MD
          </Avatar>
        }
        title="Musoke Dan"
        subheader="September 14, 2016"
      />
      <CardMedia
        component="img"
        height="150"
        image="/stuart.jpg"
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="caption" paragraph>
            KYE-00001
          </Typography>
          <Typography variant="caption" paragraph>
            07747368364
          </Typography>
          <Typography variant="caption" paragraph>
            Male
          </Typography>
      </CardContent>
      <CardActions style={{ height: '10px' }}>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Others</Typography>
          <Typography variant="caption" paragraph>
            District: Kyenjojo
          </Typography>
          <Typography variant="caption" paragraph>
            Parish:Wabusana
          </Typography>
          <Typography variant="caption" paragraph>
            Village: Nkote B
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
