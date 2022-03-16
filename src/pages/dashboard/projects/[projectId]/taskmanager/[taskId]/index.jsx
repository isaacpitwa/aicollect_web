import { useState, useEffect, useRef, useCallback } from 'react';
import Head from 'next/head';
import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  Grid,
  InputAdornment,
  TextField,
  Typography,
  useMediaQuery
} from '@mui/material';
// import { useTheme } from '@mui/material/styles';
import toast from 'react-hot-toast';

import { AuthGuard } from '../../../../../../components/authentication/auth-guard';
import { DashboardLayout } from '../../../../../../components/dashboard/dashboard-layout';
import { gtm } from '../../../../../../lib/gtm';
import { TaskMap } from '../../../../../../components/dashboard/projectDetails/taskmanager/task-map-area';

const TaskDetails = () => {
  // const isMounted = useMounted();
  const queryRef = useRef(null);
  


  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);


  // const getProjects = useCallback(async () => {
  //   try {
  //     const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_PROJECTS_URL}/projectService/projects`);
  //     const data = await response.json();
  //     if (isMounted()) {
  //       if (data?.status === 200) {
  //         toast.success(data.message, { duration: 10000 });
  //         setTasks(data.data);
  //       }
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     toast.error('Sorry, can not load projects right now, try again later', { duration: 10000 });
  //   }
  // }, [isMounted]);

  // useEffect(() => {
  //   getProjects();
  // }, []);

  // Usually query is done on backend with indexing solutions

  return (
    <>
      <Head>
        <title>
          Dashboard: Task Manager | AiCollect
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ mb: 4 }}>
            <Grid
              container
              justifyContent="space-between"
              spacing={3}
            >
              <Grid item>
                <Typography variant="h4">
                  Task Details
                </Typography>
              </Grid>
              <Grid item>
                <Button
                  // startIcon={<PlusIcon fontSize="small" />}
                  variant="contained"
                  // onClick={handleOpenTaskDialog}
                >
                  Delete Task
                </Button>
              </Grid>
            </Grid>
            
          </Box>
          <Card>
            <Divider />
            
            <Grid container spacing={2}>
              <Grid item md={4}></Grid>  
              <Grid item md={8}>
                <TaskMap />
              </Grid>  
            </Grid>

          </Card>
        </Container>
      </Box>
    </>
  );
};

TaskDetails.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>
      {page}
    </DashboardLayout>
  </AuthGuard>
);

export default TaskDetails;
