import { useState, useEffect, useRef, useCallback } from 'react';
import Head from 'next/head';
import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  Grid,
  Tab,
  Tabs,
  InputAdornment,
  TextField,
  Typography,
  CircularProgress,
} from '@mui/material';
import toast from 'react-hot-toast';
import { TabPanel, TabContext } from '@mui/lab';

// import { customerApi } from '../../../__fake-api__/customer-api';
import { AuthGuard } from '../../../components/authentication/auth-guard';
import { DashboardLayout } from '../../../components/dashboard/dashboard-layout';
import { TaskListTable } from '../../../components/dashboard/task/task-list-table';
// import { useMounted } from '../../../hooks/use-mounted';
import { Download as DownloadIcon } from '../../../icons/download';
import { Plus as PlusIcon } from '../../../icons/plus';
import { Search as SearchIcon } from '../../../icons/search';
import { Upload as UploadIcon } from '../../../icons/upload';
import { gtm } from '../../../lib/gtm';
import { useAuth } from '../../../hooks/use-auth';
// Fetch Projects API
import { projectsApi } from '../../../api/projects-api';
import { tasksApi } from '../../../api/tasks-api';
import { TaskManagerListTable } from '../../../components/dashboard/projectDetails/taskmanager/task-manager-list-table';



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
    label: 'Total orders (highest)',
    value: 'orders|desc'
  },
  {
    label: 'Total orders (lowest)',
    value: 'orders|asc'
  }
];

const applyFilters = (customers, filters) => customers.filter((customer) => {
  if (filters.query) {
    let queryMatched = false;
    const properties = ['email', 'name'];

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

const TaskList = () => {
  const queryRef = useRef(null);
  const [customers] = useState([]);
  // const [currentTab, setCurrentTab] = useState('all');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sort, setSort] = useState(sortOptions[0].value);
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const [currentTab, setCurrentTab] = useState('');


  const [filters, setFilters] = useState({
    query: '',
    hasAcceptedMarketing: null,
    isProspect: null,
    isReturning: null
  });

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

  const getProjectTasks = useCallback(async (projectId,projectsCollection) => {
    try {
      const data = await tasksApi.getProjectTasks(projectId);
      if (data) {
        toast.success('Tasks loaded successfully', { duration: 10000 });
        console.log('Tasks loaded successfully', data);
        tasks.push(data);
        setTasks(tasks);
        setLoading(!(tasks.length == projectsCollection.length));
        console.log("Updated Loading From Tasks: ", !(tasks.length == projectsCollection.length));
        console.log("Updated Tasks: ", tasks.length);
        console.log("Updated Projects: ", projectsCollection.length);
      }
    } catch (error) {
      toast.error('Sorry, can not load projects right now, try again later', { duration: 10000 });
    }
  }, []);

  const getUserProjects = useCallback(async () => {
    setLoading(true);
    try {
      console.log("Client Id: ", user.clientId);
      let clientId;
      clientId = user.roles === 'Owner' ? user.id : user.clientId;

      const data = await projectsApi.fetchProjects(clientId);
      console.log('Projects ', data);
      if (data?.status === 200) {
        console.log(data.status);
        setProjects(data.data);
        setCurrentTab(data.data[0]._id);
        data.data.map((project) => {
          getProjectTasks(project._id,data.data);
        });
        
      } else if (data?.status === 401) {
        toast.error('Your session is expired, please login again');
      }
    } catch (error) {
      console.log(error);
    }
    // setLoading(false);
    // console.log("Updated Loading: ", loading);
  }, [setProjects, user]);

  useEffect(() => {
    getUserProjects();
  }, []);

  const getTabs = () => projects.length > 0 ? projects.map((project,index) => {
    const label = `${project.projectname} (${tasks.length > 0 ? tasks[index].length : 0})`;
    return {
      value: project._id,
      label
    };
  }) : [
    {
      value: 'all',
      label: 'All (0)'
    }
  ];
  // Usually query is done on backend with indexing solutions
  const filteredCustomers = applyFilters(customers, filters);
  const sortedCustomers = applySort(filteredCustomers, sort);
  const paginatedCustomers = applyPagination(sortedCustomers, page, rowsPerPage);

  const handleTabsChange = (event, value) => {
    const updatedFilters = {
      ...filters,
      hasAcceptedMarketing: null,
      isProspect: null,
      isReturning: null
    };

    if (value !== 'all') {
      updatedFilters[value] = true;
    }

    setFilters(updatedFilters);
    setCurrentTab(value);
  };
  return (
    <>
      <Head>
        <title>
          Dashboard: Tasks List | AI Collect
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
                  Tasks Manager
                </Typography>
              </Grid>
              <Grid item>
                <Button
                  startIcon={<PlusIcon fontSize="small" />}
                  variant="contained"
                >
                  Add Task
                </Button>
              </Grid>
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
            {  !loading && ( projects.length > 0 &&  projects.length === tasks.length) ?(<TabContext value={currentTab}>
              <Tabs
                indicatorColor="primary"
                onChange={handleTabsChange}
                scrollButtons="auto"
                sx={{ px: 3 }}
                textColor="primary"
                value={currentTab}
                variant="scrollable"
              >
                {
                  projects.length > 0 && !loading ?
                    getTabs().map((tab) => (
                      <Tab
                        key={tab.value}
                        label={tab.label}
                        value={tab.value}
                        onClick={() => setCurrentTab(tab.value)}
                      />
                    ))
                    : null

                }
              </Tabs>
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
                {/* <Box
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
                    placeholder="Search Tasks"
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
              </Box> */}
              <Box>
              {
               tasks.length === projects.length && projects.length>0 ?
                  tasks.map((task,index) => (
                    <TabPanel key={getTabs()[index].value} value={getTabs()[index].value}>
                      {
                        task.length === 0 ? (
                          <Container maxWidth="md">
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
                                  width: 200
                                }}
                              />
                            </Box>
                            <Typography
                              align="center"
                              color="textSecondary"
                              sx={{ mt: 4 }}
                              variant="subtitle2"
                            >
                              No Tasks Found
                            </Typography>
                          </Container>
                          ) : (
                          <TaskManagerListTable
                            tasks={task}
                            tasksCount={task.length}
                            onPageChange={handlePageChange}
                            onRowsPerPageChange={handleRowsPerPageChange}
                            rowsPerPage={rowsPerPage}
                            page={page}
                          />
                          )
                      }
                    </TabPanel>
                  )) : (
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '50vh' }}>
                  <CircularProgress />
                </Box>
                )
              }
              </Box>
            </TabContext>) :
            (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '50vh' }}>
                  <CircularProgress />
                </Box>
            )
            }

          </Card>
        </Container>
      </Box>
    </>
  );
};

TaskList.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>
      {page}
    </DashboardLayout>
  </AuthGuard>
);

export default TaskList;
