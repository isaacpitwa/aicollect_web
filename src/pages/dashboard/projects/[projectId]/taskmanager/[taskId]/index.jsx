import { useState } from 'react';
import Head from 'next/head';
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
// Layout files
import { DashboardLayout } from '../../../../../../components/dashboard/dashboard-layout';
import { AuthGuard } from '../../../../../../components/authentication/auth-guard';
import { ArrowBackTwoTone, ArrowForwardTwoTone } from '@mui/icons-material';
import { TaskMembers } from '../../../../../../components/dashboard/projectDetails/taskmanager/task-members-list';
import { Table3 } from '../../../../../../components/widgets/tables/table-3';
import { TaskManagerSchedule } from '../../../../../../components/dashboard/projectDetails/taskmanager/task-manager-shedule';

const ProjectTaskDetails = () => {
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
              <Grid item>
                <Typography variant="h4">
                  Task Manager
                </Typography>
              </Grid>
              <Grid item>
                <Button

                  // startIcon={<PlusIcon fontSize="small" />}
                  variant="contained"
                // onClick={handleOpenTaskDialog}
                >
                  Create Task
                </Button>

              </Grid>


              <Grid item>
                <Button

                  // startIcon={<PlusIcon fontSize="small" />}
                  variant="contained"
                // onClick={handleOpenTaskDialog}
                >
                  Create Task
                </Button>
              </Grid>
              <Grid item>
                <Button

                  // startIcon={<PlusIcon fontSize="small" />}
                  variant="contained"
                // onClick={handleOpenTaskDialog}
                >
                  Create Task
                </Button>
              </Grid>

              <Grid item flex flexDirection="row">
                <IconButton size='large'>
                  <ArrowBackTwoTone />
                </IconButton>
                <IconButton size='large'>
                  <ArrowForwardTwoTone />
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
                <TaskMembers />
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
