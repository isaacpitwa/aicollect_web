import { useState, useEffect, useRef, useCallback } from "react";
import Head from "next/head";
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  Grid,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import toast from "react-hot-toast";
import { AuthGuard } from "../../../../components/authentication/auth-guard";
import { DashboardLayout } from "../../../../components/dashboard/dashboard-layout";
import { ProjectTeamMembersTable } from "../../../../components/dashboard/projectDetails/project-team-members-list-table";
import { AddTaskRounded } from '@mui/icons-material';
import { Trash as TrashIcon } from "../../../../icons/trash";
import { Search as SearchIcon } from "../../../../icons/search";
import { UserAdd as UserAddIcon } from "../../../../icons/user-add";
import { gtm } from "../../../../lib/gtm";
import AddTeamMember from "../../../../components/dashboard/projectDetails/project-addteam-member";
import { sectorApi } from '../../../../api/sectors-api';
import { projectsApi } from '../../../../api/projects-api';
import { useAuth } from '../../../../hooks/use-auth';
import { ModuleCard } from "../../../../components/dashboard/projectDetails/module-card";

const sortOptions = [
  {
    label: "Last update (newest)",
    value: "updatedAt|desc",
  },
  {
    label: "Last update (oldest)",
    value: "updatedAt|asc",
  },
  {
    label: "Total orders (highest)",
    value: "orders|desc",
  },
  {
    label: "Total orders (lowest)",
    value: "orders|asc",
  },
];

const applyFilters = (projectMembers, filters) =>
  projectMembers.filter((member) => {
    if (filters.query) {
      let queryMatched = false;
      const properties = ["email", "name"];

      properties.forEach((property) => {
        if (
          member[property].toLowerCase().includes(filters.query.toLowerCase())
        ) {
          queryMatched = true;
        }
      });

      if (!queryMatched) {
        return false;
      }
    }

    if (filters.hasAcceptedMarketing && !member.hasAcceptedMarketing) {
      return false;
    }

    if (filters.isProspect && !member.isProspect) {
      return false;
    }

    if (filters.isReturning && !member.isReturning) {
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

const getComparator = (order, orderBy) =>
  order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);

const applySort = (customers, sort) => {
  const [orderBy, order] = sort.split("|");
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

const applyPagination = (projects, page, rowsPerPage) =>
  projects.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

const ProjectDetails = () => {
  const queryRef = useRef(null);
  const { user } = useAuth();
  const [project, setProject] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sort, setSort] = useState(sortOptions[0].value);
  const [openProjectDialog, setOpenProjectDialog] = useState(false);
  const [modules, setModules] = useState([]);
  const router = useRouter();
  const { projectId } = router.query;

  const [filters, setFilters] = useState({
    query: "",
    hasAcceptedMarketing: null,
    isProspect: null,
    isReturning: null,
  });

  const handleOpenProjectDialog = () => {
    setOpenProjectDialog(true);
  };
  const handleCloseProjectDialog = () => {
    setOpenProjectDialog(false);
  };

  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);

  const handleQueryChange = (event) => {
    event.preventDefault();
    setFilters((prevState) => ({
      ...prevState,
      query: queryRef.current?.value,
    }));
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  // Usually query is done on backend with indexing solutions
  const filteredTeamMembers = applyFilters(project?.projectTeam || [], filters);
  const sortedTeamMembers = applySort(filteredTeamMembers, sort);
  const paginatedTeamMembers = applyPagination(
    sortedTeamMembers,
    page,
    rowsPerPage
  );

  const getProjectDetails = useCallback(async () => {
    if (projectId) {
      try {
        const data = await projectsApi.fetchProjectDetails(projectId);
        if (data?.status === 200) {
          toast.success(data.message, { duration: 10000 });
          setProject(data.data);
        } else {
          toast.error(data.message)
        }
      } catch (error) {
        console.log(error);
        toast.error('Sorry, can not load project details right now, try again later', { duration: 6000 });
      }
    }
  }, [setProject, projectId]);

  const getSectorModules = useCallback(async () => {
    try {
      // TODO: Find sectorID
      const { Profile: { sector } } = user;
      console.log('sector', sector);
      const data = await sectorApi.getSectorModules(sector);
      if (data) {
        console.log(data);
        setModules(data);
      }
    } catch (error) {
      toast.error('Could not load modules', { duration: 6000 });
      console.log(error);
    }
  }, [setModules, user]);

  useEffect(() => {
    getProjectDetails();
  }, [])

  useEffect(() => {
    getSectorModules();
  }, []);

  return (
    <>
      <Head>
        <title>Dashboard: Project Details | AiCollect</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ mb: 4 }}>
            <Grid container justifyContent="space-between" spacing={3}>
              <Grid item>
                <Typography variant="h4">Project: {project?.projectname}</Typography>
              </Grid>
              <Grid item>
                <Button
                  startIcon={<TrashIcon fontSize="small" />}
                  variant="contained"

                >
                  Delete Project
                </Button>
              </Grid>
              <AddTeamMember
                open={openProjectDialog}
                handleClose={handleCloseProjectDialog}
                projectId={projectId}
                getProjects={getProjectDetails}
              />
            </Grid>
          </Box>

          <Stack direction="row" mb={4}>
            <Grid container flex flexDirection="row" spacing={3}>

              {
                modules.map((module) => (
                  <ModuleCard projectId={projectId} module={module} key={module.id} />

                ))
              }

            </Grid>
          </Stack>
          <Card>
            <Divider />
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                flexWrap: "wrap",
                m: -1.5,
                p: 3,
              }}
            >
              <Box
                component="form"
                onSubmit={handleQueryChange}
                sx={{
                  flexGrow: 1,
                  m: 1.5,
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
                    ),
                  }}
                  placeholder="Search Team Members"
                />
              </Box>
              <Button
                variant="contained"
                startIcon={<UserAddIcon fontSize="small" />}
                onClick={handleOpenProjectDialog}
              >
                Add Team Member
              </Button>
              <Button
                startIcon={<AddTaskRounded fontSize="small" />}
                onClick={() => {
                  router.push(`/dashboard/projects/${projectId}/taskmanager`)
                }}>
                Task Manager
              </Button>

            </Box>
            <ProjectTeamMembersTable
              projectMembers={paginatedTeamMembers}
              projectMembersCount={filteredTeamMembers.length}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              rowsPerPage={rowsPerPage}
              page={page}
            />
          </Card>
        </Container>
      </Box>
    </>
  );
};

ProjectDetails.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default ProjectDetails;
