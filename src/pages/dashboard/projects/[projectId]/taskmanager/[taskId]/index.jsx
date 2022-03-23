import { useState, useCallback, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Divider,
  IconButton
} from '@mui/material';
import Map from "react-map-gl"
import toast from 'react-hot-toast';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import DateRangeIcon from '@mui/icons-material/DateRange';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// Layout files
import { DashboardLayout } from '../../../../../../components/dashboard/dashboard-layout';
import { AuthGuard } from '../../../../../../components/authentication/auth-guard';
import { ArrowBackTwoTone, ArrowForwardTwoTone } from '@mui/icons-material';
import { TaskMembers } from '../../../../../../components/dashboard/projectDetails/taskmanager/task-members-list';
import { TaskManagerSchedule } from '../../../../../../components/dashboard/projectDetails/taskmanager/task-manager-shedule';

const ProjectTaskDetails = () => {
  const router = useRouter();
  const { taskId } = router.query;

  const [task, setTask] = useState(null);

  const fetchTaskDetails = useCallback(async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_PROJECTS_URL}/tasks/${taskId}`, {
        headers: {
          'Content-Type': 'Application/json'
        }
      });
      const data = await response.json();
      if (data && data.status === 200) {
        toast.success('Data loaded successfully');
        setTask(data.data);
      }
    } catch (error) {
      toast.error('failed to load data', { duration: 700 });
    }
  }, [setTask]);

  useEffect(() => {
    fetchTaskDetails();
  }, []);

  return (
    <>
      <Head>
        <title>
          Dashboard: Task Details | AiCollect
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}>
        <Container maxWidth="xl">
          <Box sx={{ mb: 4 }}>
            <Grid
              container
              justifyContent="space-between"
              spacing={3}
            >
              <Grid item flex flexDirection="column" spacing={2}>
                <Typography variant="caption">
                  Task ({task?.taskType})
                </Typography>
                <Typography variant='h6'>
                  {task?.title}
                </Typography>
              </Grid>
              <Grid item>
                <Grid container spacing={2}>
                  <Grid item>
                    <Button startIcon={<FormatListBulletedIcon fontSize="small" />}>List</Button>
                  </Grid>
                  <Grid item>
                    <Button startIcon={<AccountTreeIcon fontSize="small" />}>Board</Button>
                  </Grid>
                  <Grid item>
                    <Button startIcon={<DateRangeIcon fontSize="small" />}>Calender</Button>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item flex flexDirection="row">
                <IconButton size='large'>
                  <ChevronLeftIcon />
                </IconButton>
                <IconButton size='large'>
                  <ChevronRightIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Box>

          <Box
            sx={{
              backgroundColor: 'background.paper',
              p: 3
            }}>
            <Grid container spacing={2}>
              <Grid item md={4} sm={6}>
                <TaskMembers team={task?.team} />
              </Grid>
              <Grid item md={8} sm={6}>
                <Map
                  initialViewState={{
                    longitude: -122.45,
                    latitude: 37.78,
                    zoom: 14,
                    width: "100%",
                  }}
                  mapboxAccessToken={process.env.NEXT_PUBLIC_GOOGLE_MAP_TOKEN}
                  mapStyle="mapbox://styles/mapbox/streets-v9"
                />
              </Grid>
            </Grid>
          </Box>

          <Box
          sx={{
            backgroundColor: 'background.paper',
            p: 3
          }}>
            <TaskManagerSchedule />
          </Box>
        </Container>
      </Box>
    </>
  )
};

ProjectTaskDetails.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>
      {page}
    </DashboardLayout>
  </AuthGuard>
)

export default ProjectTaskDetails;
