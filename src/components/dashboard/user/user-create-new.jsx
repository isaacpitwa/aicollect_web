import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  // DialogActions,
  DialogContent,
  DialogTitle,
  // Button,
  Tabs,
  Tab,
  Box,
} from '@mui/material';
import CreateUserForm from './user-create-user-form';
import SendUserInvitation from './user-send-invite';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


const CreateNewUserDialog = ({ open, handleClose, users, getClientUsers }) => {
  const [value, setValue] = useState(0);

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  const supervisors = users.filter((user) => user.roles === 'Supervisor');
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md">
      <DialogTitle>Create new user</DialogTitle>
      <DialogContent>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={value}
              onChange={handleChangeTab}
              aria-label="basic tabs example">
              <Tab
                label="Create User"
                {...a11yProps(0)} />
              {/* TODO: UNCOMMENT TO ADD INVITE USER THROUGH EMAIL */}
              <Tab
                label="By Invite"
                {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel
            value={value}
            index={0}
            >
            <CreateUserForm supervisors={supervisors} handleClose={handleClose} getClientUsers={getClientUsers} />
          </TabPanel>
          
          <TabPanel
            value={value}
            index={1}>
            <SendUserInvitation getClientUsers={getClientUsers} handleClose={handleClose} />
          </TabPanel>
          
        </Box>
      </DialogContent>
    </Dialog>
  )
};


export default CreateNewUserDialog;
