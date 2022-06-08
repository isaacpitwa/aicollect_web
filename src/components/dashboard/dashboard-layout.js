import { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { useIdleTimer } from 'react-idle-timer';
import { DashboardNavbar } from './dashboard-navbar';
import { DashboardSidebar } from './dashboard-sidebar';
import { Box } from '@mui/material';
import { useRouter } from 'next/router'


const DashboardLayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  paddingTop: 64,
  [theme.breakpoints.up('lg')]: {
    paddingLeft: 280
  }
}));

export const DashboardLayout = (props) => {
  const { children } = props;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isIdle, setIsIdle] = useState(false);
  const [isTimedOut, setIsTimedOut] = useState(false);
  const [timeout, setTimeout] = useState(1000 * 60 * 1); //Defines the Session Time out
  const router = useRouter()

  const  onAction = ()=>{
    console.log('user did something')
    setIsTimedOut(false);
  }
  const onActive = ()=>{
    console.log('user is active')
    setIsTimedOut(false);
  }
  const onIdle = ()=>{
    console.log('user is idle')
    setIsIdle(true)
    if (isTimedOut) {
      console.log('user is timed out')
        // props.history.push('/')
        router.push(`/authentication/lock?returnUrl=${router.asPath}`);
    } else {
      idleTimer.reset();
      setIsTimedOut(true);
    }
  }
  const idleTimer = useIdleTimer({ timeout,onIdle, onActive })
  return (
    <>
      <DashboardLayoutRoot>
        <Box
          sx={{
            display: 'flex',
            flex: '1 1 auto',
            flexDirection: 'column',
            width: '100%'
          }}
        >
          {children}
        </Box>
      </DashboardLayoutRoot>
      <DashboardNavbar onOpenSidebar={() => setIsSidebarOpen(true)} />
      <DashboardSidebar
        onClose={() => setIsSidebarOpen(false)}
        open={isSidebarOpen}
      />
    </>
  );
};

DashboardLayout.propTypes = {
  children: PropTypes.node
};
