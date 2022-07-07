import { useState, useEffect, useCallback, useRef } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router'
import NextLink from 'next/link';
import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  Grid,
  InputAdornment,
  Tab,
  Tabs,
  TextField,
  Typography,
  
} from '@mui/material';
import { TabPanel, TabContext } from '@mui/lab';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
// import { AuthGuard } from '../../../../../../components/authentication/auth-guard';
// import { Auth } from '../../../../../../../../components/authentication/auth-guard';
import { AuthGuard } from '../../../../../../components/authentication/auth-guard';
import { DashboardLayout } from '../../../../../../components/dashboard/dashboard-layout';
import { QuestionaireDetailsTable } from '../../../../../../components/dashboard/projectDetails/questionairesDetails/questionaire-list-table';
import {QuestionaireResponseSummaryTable} from '../../../../../../components/dashboard/projectDetails/questionairesDetails/QuestionaireReponseSummary';
import { useMounted } from '../../../../../../hooks/use-mounted';
import { Search as SearchIcon } from '../../../../../../icons/search';
import { gtm } from '../../../../../../lib/gtm';
import {FormsApi} from '../../../../../../api/forms-api'
import { projectsApi } from '../../../../../../api/projects-api';

const tabs = [
  {
    label: 'Summary',
    value: 'summary'
  },
  {
    label: 'Overview',
    value: 'all'
  }
];

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

const QuestionaireDetails = () => {
  const isMounted = useMounted();
  const queryRef = useRef(null);
  const router = useRouter()
  const [responses, setResponses] = useState([]);
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: "Coffee Lubirizi",
      created: "22-08-2020",
      modified: "22-02-22",
      version: "v4",
      status: "active",
    }
  ]);
  const [currentTab, setCurrentTab] = useState('summary');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sort, setSort] = useState(sortOptions[0].value);
  const { projectId, questionaireId } = router.query;
  const [project, setProject] = useState(null);
  const [questionaire, setQuestionaire] = useState(null);


  const [filters, setFilters] = useState({
    query: '',
    hasAcceptedMarketing: null,
    isProspect: null,
    isReturning: null
  });

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);


  const fetchFormResponses = async ()=>{
    const { questionaireId} = router.query
    const apiReponses = await FormsApi.getFormResponses(questionaireId);
    setResponses(apiReponses);
  }

  useEffect(() => {
    fetchFormResponses()
    },[])
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

  const fetchProjectDetails = useCallback(async () => {
    try {
      const data = await projectsApi.fetchProjectDetails(projectId);
      if (data?.status === 200) {
        setProject(data.data);
      } else {
        toast.error(data?.message)
      }
    } catch (error) {
      console.log(error);
    }
  }, [setProject, projectId]);

  useEffect(() => {
    fetchProjectDetails();
  }, []);

  const fetchFieldFormDetails = useCallback(async () => {
    try {
      const data = await FormsApi.getFormDetails(questionaireId);
      if (data) {
        setQuestionaire(data);
      } else {
        toast.error(data?.message)
      }
    } catch (error) {
      console.log(error);
    }
  }, [setQuestionaire, questionaireId]);


  useEffect(() => {
    fetchFieldFormDetails();
  }, []);

  // Usually query is done on backend with indexing solutions
  const filteredCustomers = applyFilters(customers, filters);
  const sortedCustomers = applySort(filteredCustomers, sort);
  const paginatedCustomers = applyPagination(sortedCustomers, page, rowsPerPage);

  return (
    <>
      <Head>
        <title>
          Dashboard: Questionaire Repsonses
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
              <Typography variant="h9">
                  <NextLink
                    href={`/dashboard/projects/${project&& project._id}`}
                    passHref
                    
                  ><a style={{textDecoration:'none'}}>{project && project.projectname}</a></NextLink> {'>'}
                  
                  <NextLink
                    href={`/dashboard/projects/${project&& project._id}/questionaire/${questionaire&& questionaire._id}`}
                    passHref
                    
                  ><a style={{textDecoration:'none'}}>{questionaire && questionaire.name}</a></NextLink> {'>'} Responses
                 
                </Typography>
              </Grid>
              
            </Grid>
            
          </Box>

          

          <Card>
          <TabContext value={currentTab}>
            <Tabs
              indicatorColor="primary"
              onChange={handleTabsChange}
              scrollButtons="auto"
              sx={{ px: 3 }}
              textColor="primary"
              value={currentTab}
              variant="scrollable"
            >
              {tabs.map((tab) => (
                <Tab
                  key={tab.value}
                  label={tab.label}
                  value={tab.value}
                />
              ))}
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
                  placeholder="Search"
                />
              </Box>
              <Button
              role="link"
              href="/dashboard/projects/43/questionaire/6/map"
                startIcon={<CloudDownloadIcon fontSize="small" />}
                sx={{ m: 1 }}
                variant="contained"
              >
                View Map
              </Button>
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
            <TabPanel value='summary' index={0}>
            <QuestionaireResponseSummaryTable
              customers={paginatedCustomers}
              customersCount={filteredCustomers.length}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              rowsPerPage={rowsPerPage}
              page={page}
              responses = {responses}
            />
            </TabPanel>
            <TabPanel value='all' index={1}>
            <QuestionaireDetailsTable
              customers={paginatedCustomers}
              customersCount={filteredCustomers.length}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              rowsPerPage={rowsPerPage}
              page={page}
              responses = {responses}
            />
            </TabPanel>
            </TabContext>
          </Card>
        </Container>
      </Box>
    </>
  );
};

QuestionaireDetails.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>
      {page}
    </DashboardLayout>
  </AuthGuard>
);

export default QuestionaireDetails;
