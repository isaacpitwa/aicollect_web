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
import CreateUserForm from './customer-create-user-form';
import SendCustomerInvite from './customer-send-invite';

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


const CreateNewUserDialog = ({ open, handleClose }) => {
  const [value, setValue] = useState(0);

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="lg">
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
              <Tab
                label="By Invite"
                {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel
            value={value}
            index={0}
            >
            <CreateUserForm />
          </TabPanel>
          <TabPanel
            value={value}
            index={1}>
            <SendCustomerInvite />
          </TabPanel>
          
        </Box>
      </DialogContent>
    </Dialog>
  )
};


export default CreateNewUserDialog;
