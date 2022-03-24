import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography
} from '@mui/material';

const members = [
  {
    id: '5e887a62195cc5aef7e8ca5d',
    avatar: '/static/mock-images/avatars/avatar-marcus_finn.png',
    job: 'Front End Developer',
    name: 'Marcus Finn'
  },
  {
    id: '5e887ac47eed253091be10cb',
    avatar: '/static/mock-images/avatars/avatar-carson_darrin.png',
    job: 'UX Designer',
    name: 'Carson Darrin'
  },
  {
    id: '5e887b7602bdbc4dbb234b27',
    avatar: '/static/mock-images/avatars/avatar-jie_yan_song.png',
    job: 'Copyright',
    name: 'Jie Yan Song'
  }
];

export const TaskMembers = ({ team: members }) => (
  <Box
    sx={{
      backgroundColor: 'background.default',
      minHeight: '100%',
      width: '100%',
      p: 3
    }}
  >
    {/* <Container> */}
      <Card>
        <CardHeader
          sx={{ pb: 0 }}
          title="Task members"
          titleTypographyProps={{ variant: 'overline' }}
        />
        <CardContent sx={{ pt: 0 }}>
          <List>
            {members?.map((member) => (
              <ListItem
                disableGutters
                key={member.userId}
              >
                <ListItemAvatar>
                  <Avatar src='/static/mock-images/avatars/avatar-marcus_finn.png' />
                </ListItemAvatar>
                <ListItemText
                  primary={(
                    <Typography variant="subtitle2">
                      {member.name}
                    </Typography>
                  )}
                  secondary={(
                    <Typography
                      color="textSecondary"
                      variant="body2"
                    >
                      {member.roles}
                    </Typography>
                  )}
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
        <Divider />
        <CardActions>
          <Button fullWidth>
            Manage members
          </Button>
        </CardActions>
      </Card>
    {/* </Container> */}
  </Box>
);
