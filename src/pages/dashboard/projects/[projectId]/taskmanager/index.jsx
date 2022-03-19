import { useState, useEffect, useRef, useCallback } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
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
import { useTheme } from '@mui/material/styles';
import toast from 'react-hot-toast';

import { AuthGuard } from '../../../../../components/authentication/auth-guard';
import { DashboardLayout } from '../../../../../components/dashboard/dashboard-layout';
import { ProjectListTable } from '../../../../../components/dashboard/project/project-list-table';
// import { useMounted } from '../../../hooks/use-mounted';
import { Download as DownloadIcon } from '../../../../../icons/download';
import { Plus as PlusIcon } from '../../../../../icons/plus';
import { Search as SearchIcon } from '../../../../../icons/search';
import { Upload as UploadIcon } from '../../../../../icons/upload';
import { gtm } from '../../../../../lib/gtm';
import { useMounted } from '../../../../../hooks/use-mounted';
// import CreateNewProjectDialog from '../../../../../components/dashboard/project/project-create-new';
import CreateNewTask from '../../../../../components/dashboard/projectDetails/taskmanager/project-task-manager';
import { TaskManagerListTable } from '../../../../../components/dashboard/projectDetails/taskmanager/task-manager-list-table';


const sortOptions = [
  {
    label: 'Last update (newest)',
    value: 'updatedAt|desc'
  },
  {
    label: 'Last update (oldest)',
    value: 'updatedAt|asc'
  },
  {
    label: 'Total Questionaires (highest)',
    value: 'orders|desc'
  },
  {
    label: 'Total Members (lowest)',
    value: 'orders|asc'
  }
];

const applyFilters = (customers, filters) => customers.filter((customer) => {
  if (filters.query) {
    let queryMatched = false;
    const properties = ['projectname'];

    properties.forEach((property) => {
      if (customer[property].toLowerCase().includes(filters.query.toLowerCase())) {
        queryMatched = true;
      }
    });

    if (!queryMatched) {
      return false;
    }
  }

  if (filters.hasAcceptedMarketing && !customer.hasAcceptedMarketing) {
    return false;
  }

  if (filters.isProspect && !customer.isProspect) {
    return false;
  }

  if (filters.isReturning && !customer.isReturning) {
    return false;
  }

  return true;
});

const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }

  if (b[orderBy] > a[orderBy]) {
    return 1;
  }

  return 0;
};

const getComparator = (order, orderBy) => (order === 'desc'
  ? (a, b) => descendingComparator(a, b, orderBy)
  : (a, b) => -descendingComparator(a, b, orderBy));

const applySort = (customers, sort) => {
  const [orderBy, order] = sort.split('|');
  const comparator = getComparator(order, orderBy);
  const stabilizedThis = customers.map((el, index) => [el, index]);


  stabilizedThis.sort((a, b) => {
    const newOrder = comparator(a[0], b[0]);

    if (newOrder !== 0) {
      return newOrder;
    }

    return a[1] - b[1];
  });

  return stabilizedThis.map((el) => el[0]);
};

const applyPagination = (customers, page, rowsPerPage) => customers.slice(page * rowsPerPage,
  page * rowsPerPage + rowsPerPage);

const TasksList = () => {
  const isMounted = useMounted();
  const queryRef = useRef(null);
  const theme = useTheme();
  const router = useRouter();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('sm'));
  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sort, setSort] = useState(sortOptions[0].value);
  const [openTaskDialog, setOpenTaskDialog] = useState(false);

  const [filters, setFilters] = useState({
    query: '',
    hasAcceptedMarketing: null,
    isProspect: null,
    isReturning: null
  });

  const handleOpenTaskDialog = () => {
    setOpenTaskDialog(true);
  };
  const handleCloseTaskDialog = () => {
    setOpenTaskDialog(false);
  };

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  const handleQueryChange = (event) => {
    event.preventDefault();
    setFilters((prevState) => ({
      ...prevState,
      query: queryRef.current?.value
    }));
  };

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

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
  const filteredTasks = applyFilters(tasks, filters);
  const sortedTasks = applySort(filteredTasks, sort);
  const paginatedTasks = applyPagination(sortedTasks, page, rowsPerPage);

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
                  Task Manager
                </Typography>
              </Grid>
              <Grid item>
                <NextLink href={`/dashboard/projects/${router.query.projectId}/taskmanager/create`}>
                <Button

                  startIcon={<PlusIcon fontSize="small" />}
                  variant="contained"
                  // onClick={handleOpenTaskDialog}
                >
                  Create Task
                </Button>
                </NextLink>
              </Grid>
              <CreateNewTask
                open={openTaskDialog}
                handleClose={handleCloseTaskDialog}
              // getProjects={getProjects}
              />
            </Grid>
            <Box
              sx={{
                m: -1,
                mt: 3
              }}
            >
              <Button
                startIcon={<UploadIcon fontSize="small" />}
                sx={{ m: 1 }}
              >
                Import
              </Button>
              <Button
                startIcon={<DownloadIcon fontSize="small" />}
                sx={{ m: 1 }}
              >
                Export
              </Button>
            </Box>
          </Box>
          <Card>
            <Divider />
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                flexWrap: 'wrap',
                m: -1.5,
                p: 3
              }}
            >
              <Box
                component="form"
                onSubmit={handleQueryChange}
                sx={{
                  flexGrow: 1,
                  m: 1.5
                }}
              >
                <TextField
                  defaultValue=""
                  fullWidth
                  inputProps={{ ref: queryRef }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon fontSize="small" />
                      </InputAdornment>
                    )
                  }}
                  placeholder="Search task"
                />
              </Box>
              <TextField
                label="Sort By"
                name="sort"
                onChange={handleSortChange}
                select
                SelectProps={{ native: true }}
                sx={{ m: 1.5 }}
                value={sort}
              >
                {sortOptions.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Box>
            {
              tasks.length === 0 ? (
                <Container maxWidth="md">
                  <Typography
                    align="center"
                    variant={mobileDevice ? 'h6' : 'h4'}
                  >
                    Looks empty here.
                  </Typography>
                  <Typography
                    align="center"
                    color="textSecondary"
                    sx={{ mt: 0.5 }}
                    variant="subtitle2"
                  >
                    Please try creating some tasks to get started.
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      mt: 6
                    }}
                  >
                    <Box
                      alt="Under development"
                      component="img"
                      src="/empty.svg"
                      sx={{
                        height: 'auto',
                        maxWidth: '100%',
                        width: 400
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      mt: 3,
                      mb: 3
                    }}
                  >
                      <Button
                        variant="outlined"
                      >
                        Create Tasks
                      </Button>
                  </Box>
                </Container>
              ) : (
                <TaskManagerListTable
                  tasks={paginatedTasks}
                  tasksCount={filteredTasks.length}
                  onPageChange={handlePageChange}
                  onRowsPerPageChange={handleRowsPerPageChange}
                  rowsPerPage={rowsPerPage}
                  page={page}
                />
              )
            }

          </Card>
        </Container>
      </Box>
    </>
  );
};

TasksList.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>
      {page}
    </DashboardLayout>
  </AuthGuard>
);

export default TasksList;
