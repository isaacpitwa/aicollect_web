import { useCallback, useEffect, useState } from 'react';
import { formatDistanceToNowStrict } from 'date-fns';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Popover,
  Typography
} from '@mui/material';
import { getContacts } from '../../slices/chat';
import { useDispatch, useSelector } from '../../store';
import { StatusIndicator } from '../status-indicator';
import { userApi } from '../../api/users-api';

export const ContactsPopover = (props) => {
  const { anchorEl, onClose, open, ...other } = props;
  const dispatch = useDispatch();
  const [contacts, setContacts] = useState([]);
  // const { contacts } = useSelector((state) => state.chat);

  const getTeam = useCallback(async () => {
    try {
      const data = await userApi.getUsers();
      if (data) {
        setContacts(data);
      }
    } catch (error) {
      console.log(error);
    }
  }, [setContacts]);

  useEffect(() => {
      dispatch(getContacts());
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);

  useEffect(() => {
    getTeam();
  }, []);

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'center',
        vertical: 'bottom'
      }}
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          p: 2,
          width: 320
        }
      }}
      transitionDuration={0}
      {...other}>
      <Typography variant="h6">
        Team
      </Typography>
      <Box sx={{ mt: 2 }}>
        <List disablePadding>
          {contacts.map((contact) => {
            // const contact = contacts.byId[contact];

            return (
              <ListItem
                disableGutters
                key={contact.id}
              >
                <ListItemAvatar>
                  <Avatar
                    src={contact.Profile?.profileImage || 'N/A'}
                    sx={{ cursor: 'pointer' }}
                  />
                </ListItemAvatar>
                <ListItemText
                  disableTypography
                  primary={(
                    <Link
                      color="textPrimary"
                      noWrap
                      sx={{ cursor: 'pointer' }}
                      underline="none"
                      variant="subtitle2"
                    >
                      {`${contact.firstname} ${contact.lastname}`}
                    </Link>
                  )}
                />
                {contact.isActive
                  ? (
                    <StatusIndicator
                      size="small"
                      status="online"
                    />
                  )
                  : (
                    <Typography
                      color="textSecondary"
                      noWrap
                      variant="caption"
                    >
                      1 hr
                      {' '}
                      ago
                    </Typography>
                  )}
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Popover>
  );
};

ContactsPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool
};
