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
} from '@mui/material';
import toast from 'react-hot-toast';

import { AuthGuard } from '../../../components/authentication/auth-guard';
import { DashboardLayout } from '../../../components/dashboard/dashboard-layout';
import { ProjectListTable } from '../../../components/dashboard/project/project-list-table';
import { Download as DownloadIcon } from '../../../icons/download';
import { Plus as PlusIcon } from '../../../icons/plus';
import { Search as SearchIcon } from '../../../icons/search';
import { Upload as UploadIcon } from '../../../icons/upload';
import { gtm } from '../../../lib/gtm';
import CreateNewProjectDialog from '../../../components/dashboard/project/project-create-new';
import { useAuth } from '../../../hooks/use-auth';
// Fetch Projects API
import { projectsApi } from '../../../api/projects-api';

import { LoadingSkeleton } from '../../../components/dashboard/dashboard-wait-for-data-loader';

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

const applyFilters = (projects, filters) => projects.filter((project) => {
  if (filters.query) {
    let queryMatched = false;
    const properties = ['projectname'];

    properties.forEach((property) => {
      if (project[property].toLowerCase().includes(filters.query.toLowerCase())) {
        queryMatched = true;
      }
    });

    if (!queryMatched) {
      return false;
    }
  }

  if (filters.hasAcceptedMarketing && !project.hasAcceptedMarketing) {
    return false;
  }

  if (filters.isProspect && !project.isProspect) {
    return false;
  }

  if (filters.isReturning && !project.isReturning) {
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

const applyPagination = (projects, page, rowsPerPage) => projects.slice(page * rowsPerPage,
  page * rowsPerPage + rowsPerPage);

const ProjectList = (props) => {
  const queryRef = useRef(null);
  const { user } = useAuth();
  console.log(user);
  // const { data: projects, loading, handleFetchData } = props;
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sort, setSort] = useState(sortOptions[0].value);
  const [openProjectDialog, setOpenProjectDialog] = useState(false);

  const [filters, setFilters] = useState({
    query: '',
    hasAcceptedMarketing: null,
    isProspect: null,
    isReturning: null
  });

  const getUserProjects = useCallback(async () => {
    setLoading(true);
    try {
      console.log("Client Id: ", user.clientId);
      let clientId;
        clientId =  user.roles === 'Owner' ? user.id: user.clientId;
      
      const data = await projectsApi.fetchProjects(clientId);
      console.log('Projects ', data);
      if (data?.status === 200) {
        console.log(data.status);
        setProjects(data.data);
      } else if (data?.status === 401) {
        toast.error('Your session is expired, please login again');
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }, [setProjects, user]);

  useEffect(() => {
    getUserProjects();
  }, []);

  const handleOpenProjectDialog = () => {
    setOpenProjectDialog(true)
  };
  const handleCloseProjectDialog = () => {
    setOpenProjectDialog(false)
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

  // Usually query is done on backend with indexing solutions
  const filteredProjects = applyFilters(projects || [], filters);
  const sortedProjects = applySort(filteredProjects, sort);
  const paginatedProjects = applyPagination(sortedProjects, page, rowsPerPage);

  return (
    <>
      <Head>
        <title>
          Dashboard: Project List | AiCollect
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
                  Projects
                </Typography>
              </Grid>
              <Grid item>
                <Button
                  startIcon={<PlusIcon fontSize="small" />}
                  variant="contained"
                  onClick={handleOpenProjectDialog}
                >
                  Add Project
                </Button>
              </Grid>
              <CreateNewProjectDialog
                open={openProjectDialog}
                handleClose={handleCloseProjectDialog}
                getProjects={getUserProjects}
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
                  placeholder="Search projects"
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
              !loading ? (
                <ProjectListTable
                  projects={paginatedProjects}
                  projectsCount={filteredProjects.length}
                  onPageChange={handlePageChange}
                  onRowsPerPageChange={handleRowsPerPageChange}
                  rowsPerPage={rowsPerPage}
                  page={page}
                />
              ) : (
                <LoadingSkeleton />
              )
            }
          </Card>
        </Container>
      </Box>
    </>
  );
};

// In this case I do not need to pass the second argument 
// const ProjectsListWithLayout = WithFetchData(projectsApi.fetchProjects, null)(ProjectList);

ProjectList.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>
      {page}
    </DashboardLayout>
  </AuthGuard>
);

export default ProjectList;