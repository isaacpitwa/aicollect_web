import { useState, useEffect, useCallback, useRef } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
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
  Stack,
  IconButton
} from '@mui/material';
import NextLink from 'next/link';
import { useDropzone } from 'react-dropzone';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { FactCheck, GroupAddRounded, AddTaskRounded } from '@mui/icons-material';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
// import XLSX from 'xlsx';
import toast from 'react-hot-toast';
import { AuthGuard } from '../../../../../components/authentication/auth-guard';
import { DashboardLayout } from '../../../../../components/dashboard/dashboard-layout';
import { QuestionaireListTable } from '../../../../../components/dashboard/projectDetails/questionaires/questionaire-list-table';
import { CreateNewFormDialog } from '../../../../../components/dashboard/projectDetails/questionaires/createNewFormDialog';
import { useMounted } from '../../../../../hooks/use-mounted';
import { useAuth } from '../../../../../hooks/use-auth';
import { Search as SearchIcon } from '../../../../../icons/search';
import { gtm } from '../../../../../lib/gtm';
import ExcelDataImport from '../../../../../components/dashboard/projectDetails/questionaires/excelDataImport';
import { convertToJSON } from '../../../../../utils/convert-excel-data-to-json';
import {ModuleCard} from '../../../../../components/dashboard/projectDetails/module-card';
// API
import { FormsApi } from '../../../../../api/forms-api';
import { projectsApi } from '../../../../../api/projects-api';
import { sectorApi } from '../../../../../api/sectors-api';

const tabs = [
  {
    label: 'All',
    value: 'all'
  },
  {
    label: 'Registrations',
    value: 'hasAcceptedMarketing'
  },
  {
    label: 'Field Registrations',
    value: 'isProspect'
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

const QuestionaireList = () => {
  const isMounted = useMounted();
  const queryRef = useRef(null);
  const router = useRouter();
  const { projectId, module } = router.query;
  const { user } = useAuth();
  const [project, setProject] = useState(null);
  const [questionaires, setQuestionaires] = useState([]);
  const [currentTab, setCurrentTab] = useState('all');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sort, setSort] = useState(sortOptions[0].value);
  const [filters, setFilters] = useState({
    query: '',
    hasAcceptedMarketing: null,
    isProspect: null,
    isReturning: null
  });
  const [openImportData, setOpenImportData] = useState(false);
  const [excelFile, setExcelFile] = useState(null);
  const [colDefs, setColDefs] = useState();
  const [data, setData] = useState(null);
  const [openCreateFormDialog, setOpenCreateFormDialog] = useState(false);
  const [modules, setModules] = useState([]);

  const handleOpenCreateFormDialog = () => setOpenCreateFormDialog(true);
  const handleCloseCreateFormDialog = () => setOpenCreateFormDialog(false);

 
  /**
   * @description Triggers when a file is dropped on the Excel file uploader
   */
  const onDropExcelFiles = useCallback((acceptedFiles) => {
    setExcelFile(acceptedFiles[0]);
    const selectedFile = acceptedFiles[0];
    const questionaire = {
      name: acceptedFiles[0].name.replace(/\.[^/.]+$/, ""),
      version: 'v1',
      status: 'active'
    }
    setQuestionaires((prevState) => ([...prevState].concat(questionaire)));
    const reader = new FileReader();
    reader.onload = (event) => {
      const XLSX = require('xlsx');
      // Parse data
      const bstr = event.target.result;
      const workbook = XLSX.read(bstr, { type: 'binary' });

      // get first sheet
      const workSheetName = workbook.SheetNames[0];
      const workSheet = workbook.Sheets[workSheetName];

      // Convert to array
      const fileData = XLSX.utils.sheet_to_json(workSheet, { header: 1 });
      const headers = fileData[0];
      const heads = headers.map((head) => ({ title: head, field: head }));
      setColDefs(heads);
      console.log("COLS", colDefs);
      // removing the header
      fileData.splice(0,1);
      setData(convertToJSON(headers, fileData));
    };

    reader.readAsBinaryString(selectedFile)
    
  }, []);

  const handleCreateUploadFormToDatabase = async () => {
    const newForm = {
      name: excelFile.name,
      version: 1,
      createdBy: {
        userId: user.id,
        roles: user.roles,
        name: `${user.firstname} ${user.lastname}`
      },
      status: true,
      formFields: colDefs || []
    };
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_PROJECTS_URL}/forms/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/json',
        },
        body: JSON.stringify(newForm)
      });
      const data = await response.json();
      if (data && data.status === 201) {
        toast.success('Questionaire has been successfully uploaded');
      }
    } catch (error) {
      console.log(error);
      toast.error('Could not create Questoinaire');
    }
  };

  

  

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop: onDropExcelFiles, accept: '.xlsx,.csv,.xls', maxFiles: 1 })


  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  const handleOpenImportData = () => setOpenImportData(true);
  const handleCloseImportData = () => setOpenImportData(false);


  const getQuestionaires = useCallback(async () => {
    try {
      let clientId;
      if (user.roles === 'Owner') {
        clientId = user.id;
      } else {
        clientId = user.clientId;
      }
      const currentModule = router.query.module;
      const data = await FormsApi.getModuleForms(projectId, clientId, currentModule);
      if (isMounted() && data) {
        if (data.status === 200) {
          toast.success('Questionaires have been retrieved', { duration: 5000 });
          setQuestionaires(data.data);
        } else {
          toast.error(data.message, { duration: 7000 });
        }
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted, setQuestionaires, user, projectId, module]);

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
      getQuestionaires();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);

  useEffect(() => {
    fetchProjectDetails();
  }, []);

  const getSectorModules = useCallback(async () => {
    try {
      // TODO: Find sectorID
      const { Profile: { sector } } = user;
      console.log('sector', 2);
      const data = await sectorApi.getSectorModules(sector??2);
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
    getSectorModules()
  }, []);

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

  // Usually query is done on backend with indexing solutions
  const filteredCustomers = applyFilters(questionaires, filters);
  const sortedCustomers = applySort(filteredCustomers, sort);
  const paginatedCustomers = applyPagination(sortedCustomers, page, rowsPerPage);

  return (
    <>
      <Head>
        <title>
          Dashboard: Questionaire
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
                  {project && project.projectname} - Questionaires
                </Typography>
              </Grid>
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
                startIcon={<CloudDownloadIcon fontSize="small" />}
                sx={{ m: 1 }}
                variant="contained"
                onClick={handleOpenImportData}
              >
                Import
              </Button>
              <ExcelDataImport
                open={openImportData}
                handleClose={handleCloseImportData}
                excelFile={excelFile}
                setExcelFile={setExcelFile}
                getRootProps={getRootProps}
                getInputProps={getInputProps}
                handleCreateUploadFormToDatabase={handleCreateUploadFormToDatabase}
                isDragActive={isDragActive} />
              <Button
                startIcon={<AddTaskRounded fontSize="small" />}
                sx={{ m: 1 }}
                variant="contained"
              >
                Create From Template
              </Button>
              <Button
                startIcon={<AddCircleOutlineIcon fontSize="small" />}
                sx={{ m: 1 }}
                variant="contained"
                onClick={handleOpenCreateFormDialog}
              >
                Create New Form
              </Button>
              <CreateNewFormDialog
                open={openCreateFormDialog}
                handleClose={handleCloseCreateFormDialog}
                user={user}
              />
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
            <QuestionaireListTable
              questionaires={paginatedCustomers}
              questionairesCount={filteredCustomers.length}
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

QuestionaireList.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>
      {page}
    </DashboardLayout>
  </AuthGuard>
);

export default QuestionaireList;
