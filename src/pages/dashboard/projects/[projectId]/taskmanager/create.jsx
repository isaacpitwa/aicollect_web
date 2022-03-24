import { useState, useEffect, useCallback } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';
import {
  Avatar,
  Box,
  Alert,
  Container,
  Link,
  Typography,
  Step,
  Stepper,
  Paper,
  StepLabel,
  StepContent,
  Button,
  TextField,
  Grid,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
  ListItemIcon,
  IconButton,
  Tooltip,
  List,
  ListItem,
  ListItemText,
  Chip,
  OutlinedInput,
  useTheme
} from '@mui/material';
import { useDropzone } from 'react-dropzone';;
// import XLSX from 'xlsx';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import { userApi } from '../../../../api/users-api';
import { AuthGuard } from '../../../../../components/authentication/auth-guard';
import { DashboardLayout } from '../../../../../components/dashboard/dashboard-layout';
// import { UserEditForm } from '../../../../components/dashboard/user/user-edit-form';
import { useMounted } from '../../../../../hooks/use-mounted';
import { gtm } from '../../../../../lib/gtm';
import { getInitials } from '../../../../../utils/get-initials';
import { bytesToSize } from '../../../../../utils/bytes-to-size';
import { convertToJSON } from '../../../../../utils/convert-excel-data-to-json';
import { tasksApi } from '../../../../../api/tasks-api';
import { Duplicate as DuplicateIcon } from '../../../../../icons/duplicate';
import { X as XIcon } from '../../../../../icons/x';
import { ScheduleStagingTable } from '../../../../../components/dashboard/projectDetails/taskmanager/schedule-stage-table';
import toast from 'react-hot-toast';

const questionairesList = [
  {
    id: '673ndsid',
    name: 'Nabbingo Farms Form'
  },
  {
    id: '673ndsidslkfh',
    name: 'Refugee Camp Forms'
  },
  {
    id: '673ndjsdsid',
    name: 'Sacco Management'
  },
]

const teamMembers = [
  {
    userId: 1,
    name: "Musoke Dan",
    roles: "Standard User"
  },
  {
    userId: 2,
    name: "Hassan Kent",
    roles: "Standard User"
  },
  {
    userId: 3,
    name: "Isaac Pitwa",
    roles: "Standard User"
  },
]

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(questionaire, questionaireList, theme) {
  return {
    fontWeight:
      questionaireList.indexOf(questionaire) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const applyPagination = (data, page, rowsPerPage) =>
  data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

const CreateTask = () => {
  const isMounted = useMounted();
  const router = useRouter();
  const theme = useTheme();
  const [taskInformation, setTaskInformation] = useState({
    title: '',
    taskType: '',
    description: '',
    startDate: '',
    dueDate: '',
  });

  const [questionaires, setQuestionaires] = useState([]);
  const [team, setTeam] = useState([]);
  const [excelFile, setExcelFile] = useState(null);
  const [schedule, setSchedule] = useState([]);
  const [fileError, setFileError] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [colDefs, setColDefs] = useState();
  const [data, setData] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const steps = [
    {
      label: 'Task Information',
      description: `For each ad campaign that you create, you can control how much
                you're willing to spend on clicks and conversions, which networks
                and geographical locations you want your ads to show on, and more.`,
    },
    {
      label: activeStep === 1 && taskInformation.taskType === 'registration' ? "Add Team Member" : "Upload Schedule",
      description:
        'An ad group contains one or more ads which target a shared set of keywords.',
    },
    {
      label: 'Assign Questionaire',
      description: `Try out different ad text to see what brings in the most customers,
                and learn how to enhance your ads using features like ad extensions.
                If you run into any problems with your ads, find out how to tell if
                they're running and how to resolve approval issues.`,
    },
  ];

  const { userId } = router.query;

  const handleChangeQuestionaires = (event) => {
    const {
      target: { value },
    } = event;
    setQuestionaires(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  const handleChangeTeam = (event) => {
    const {
      target: { value },
    } = event;
    setTeam(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };
  // Todo: Fix use of paginated members on excel import.
  const paginatedTeamMembers = applyPagination(
    data || [],
    page,
    rowsPerPage
  );

  const onDropExcelFiles = useCallback((acceptedFiles,) => {
    setExcelFile(acceptedFiles[0]);
    const selectedFile = acceptedFiles[0];
    const scheduleFile = {
      name: acceptedFiles[0].name.replace(/\.[^/.]+$/, ""),
      version: 'v1',
      status: 'active'
    }
    setSchedule((prevState) => ([...prevState].concat(scheduleFile)));
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;
    reader.onload = (event) => {
      const XLSX = require('xlsx');
      // Parse data
      const bstr = event.target.result;
      const workbook = XLSX.read(bstr, { type: rABS ? 'binary' : 'array' });


      // get first sheet
      const workSheetName = workbook.SheetNames[0];
      const workSheet = workbook.Sheets[workSheetName];

      // // Convert to array
      const fileData = XLSX.utils.sheet_to_json(workSheet, { header: 1 });
      const headers = fileData[0];
      // console.log('headers');
      const heads = headers.map((head) => ({ title: head, field: head }));
      setColDefs(heads);
      // console.log("COLS", colDefs);
      // removing the header
      fileData.splice(0, 1);
      setData(convertToJSON(headers, fileData));
      // console.log(data);
    };
    
    reader.onerror = (event) => {
      setFileError("Wrong file type, please use excel or csv file");
    };

    if (rABS) reader.readAsBinaryString(selectedFile);
    else reader.readAsArrayBuffer(selectedFile);

  }, []);
  console.log('data', data);
  console.log('cols', colDefs);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleChange = (event) => {
    event.preventDefault();
    setTaskInformation((prevState) => ({ ...prevState, [event.target.name]: event.target.value }));
  };

  const handleChangeScheduleFile = (event) => {
    event.preventDefault();
    setSchedule(event.target.files[0]);
  };

  const handleCreateTask = async () => {
    try {
      // Make call to task creation API
      let schedule = [];
      data.forEach((item) => {
        schedule.push(item.id);
      });
      const task = {
        ...taskInformation,
        questionaire: qnList,
        team,
        schedule
      };
      const data = await tasksApi.createTask(task);
      if (data) {
        toast.success("Yeah, you have create a task");
      }
    } catch (error) {
      toast.error("Awww, failed to create a task", { duration: 9000 });
      console.log(error);
    }
  };

  // Log Id

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({ onDrop: onDropExcelFiles, accept: '.xlsx,.csv,.xls', maxFiles: 1, })

  return (
    <>
      <Head>
        <title>
          Dashboard: Create Task | AiCollect
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          backgroundColor: 'background.default',
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ mb: 4 }}>
            <NextLink
              href="#"
              passHref
            >
              <Link
                color="textPrimary"
                component="button"
                sx={{
                  alignItems: 'center',
                  display: 'flex'
                }}
                onClick={() => router.back()}
              >
                <ArrowBackIcon
                  fontSize="small"
                  sx={{ mr: 1 }}
                />
                <Typography variant="subtitle2">
                  Create Task
                </Typography>
              </Link>
            </NextLink>
          </Box>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              overflow: 'hidden'
            }}
          >
            <Avatar
              src=""
              sx={{
                height: 64,
                mr: 2,
                width: 64
              }}
            >
              {getInitials(`Create Task`)}
            </Avatar>
            <div>
              <Typography
                noWrap
                variant="h4"
              >
                Create Task
              </Typography>

            </div>
          </Box>
          <Box sx={{ maxWidth: 800, mt: 2 }}>
            <Stepper activeStep={activeStep} orientation="vertical">
              {steps.map((step, index) => (
                <Step key={step.label}>
                  <StepLabel
                    optional={
                      index === 2 ? (
                        <Typography variant="caption">Last step</Typography>
                      ) : null
                    }
                  >
                    {activeStep === 1 && taskInformation.taskType === "registration" ? "Add Team Members" : step.label}
                  </StepLabel>
                  <StepContent>

                    {
                      activeStep === 0 && (
                        <Box sx={{ mb: 2 }}>
                          <Grid container mt={3} spacing={2}>
                            <Grid item md={6} sm={12}>
                              <TextField name="title" value={taskInformation.title} onChange={handleChange} placeholder='Task Title' fullWidth />
                            </Grid>
                            <Grid item md={6} sm={12}>
                              <FormControl fullWidth>
                                <InputLabel>Task Type</InputLabel>
                                <Select name="taskType" value={taskInformation.taskType} onChange={handleChange} >
                                  <MenuItem value="registration">Registration</MenuItem>
                                  <MenuItem value="inspection">Inspection</MenuItem>
                                  <MenuItem value="training">Training</MenuItem>
                                </Select>
                              </FormControl>
                            </Grid>

                            <Grid item md={12} sm={12}>
                              <TextField placeholder='Description' name="description" value={taskInformation.description} onChange={handleChange} multiline rows={3} fullWidth />
                            </Grid>

                            <Grid item md={6} sm={12}>
                              <TextField helperText="Start Date" name="startDate" value={taskInformation.startDate} onChange={handleChange} type="date" fullWidth />
                            </Grid>
                            <Grid item md={6} sm={12}>
                              <TextField helperText="Due Date" name="dueDate" value={taskInformation.dueDate} onChange={handleChange} type="date" fullWidth />
                            </Grid>
                          </Grid>

                        </Box>
                      )
                    }

                    {
                      activeStep === 1 &&
                      (
                        taskInformation.taskType === 'registration' ? (
                          <Box sx={{ mb: 2 }}>
                            <Grid container spacing={2}>
                              <Grid item md={12} mt={3} sm={12}>
                                <FormControl fullWidth>
                                  <InputLabel id="select-team">Select Team</InputLabel>
                                  <Select
                                    labelId="select-team"
                                    id="select-team"
                                    multiple
                                    value={team}
                                    onChange={handleChangeTeam}
                                    input={<OutlinedInput id="select-team" label="Chip" />}
                                    renderValue={(selected) => (
                                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected.map((value, idx) => (
                                          <Chip
                                            key={idx}
                                            label={value.name} />
                                        ))}
                                      </Box>
                                    )}
                                    MenuProps={MenuProps}
                                  >
                                    {teamMembers.map((member, idx) => (
                                      <MenuItem
                                        key={idx}
                                        value={member}
                                        style={getStyles(member, questionaires, theme)}
                                      >
                                        {member.name}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                              </Grid>
                            </Grid>
                          </Box>
                        ) : (
                          <Box sx={{ mb: 2, mt: 3 }}>
                            <Typography variant="h6">Import CSV or Excel File</Typography>
                            <Typography variant="caption" mb={3}>
                              Acceptable file types CSV or Excel. First row should contain column names.
                              Sample Template excel file for importing can be <a href='/templates/Template.xlsx' download>DOWNLOADED HERE</a>
                            </Typography> <br />

                            <Box
                              sx={{
                                alignItems: 'center',
                                border: 1,
                                borderRadius: 1,
                                borderStyle: 'dashed',
                                borderColor: 'divider',
                                display: 'flex',
                                flexWrap: 'wrap',
                                justifyContent: 'center',
                                outline: 'none',
                                p: 6,
                                ...(isDragActive && {
                                  backgroundColor: 'action.active',
                                  opacity: 0.5
                                }),
                                '&:hover': {
                                  backgroundColor: 'action.hover',
                                  cursor: 'pointer',
                                  opacity: 0.5
                                }
                              }}
                              {...getRootProps()}>
                              <input {...getInputProps()} />
                              <Box
                                sx={{
                                  '& img': {
                                    width: 100
                                  }
                                }}
                              >
                                <img
                                  alt="Select file"
                                  src="/static/undraw_add_file2_gvbb.svg"
                                />
                              </Box>
                              <Box sx={{ p: 2 }}>
                                <Typography variant="h6">
                                  {`Select file`}
                                </Typography>
                                <Box sx={{ mt: 2 }}>
                                  <Typography variant="body1">
                                    {`Drop file`}
                                    {' '}
                                    <Link underline="always">
                                      browse
                                    </Link>
                                    {' '}
                                    thorough your machine
                                  </Typography>
                                </Box>
                              </Box>
                            </Box>
                            {
                              fileRejections.length > 0 && <Alert sx={{ mt: 3 }} severity="error">Wrong file type, please use excel or csv file</Alert>
                            }
                            {
                              excelFile && (
                                <>
                                  <Box sx={{ mt: 2 }}>
                                    <List>
                                      <ListItem
                                        key={excelFile.path}
                                        sx={{
                                          border: 1,
                                          borderColor: 'divider',
                                          borderRadius: 1,
                                          '& + &': {
                                            mt: 1
                                          }
                                        }}
                                      >
                                        <ListItemIcon>
                                          <DuplicateIcon fontSize="small" />
                                        </ListItemIcon>
                                        <ListItemText
                                          primary={excelFile.name}
                                          primaryTypographyProps={{
                                            color: 'textPrimary',
                                            variant: 'subtitle2'
                                          }}
                                          secondary={bytesToSize(excelFile.size)}
                                        />
                                        <Tooltip title="Remove">
                                          <IconButton
                                            edge="end"
                                            onClick={() => setExcelFile(null)}
                                          >
                                            <XIcon fontSize="small" />
                                          </IconButton>
                                        </Tooltip>
                                      </ListItem>
                                    </List>
                                    <Box
                                      sx={{
                                        display: 'flex',
                                        justifyContent: 'flex-end',
                                        mt: 2
                                      }}
                                    >
                                      <Button
                                        // onClick={onRemoveAll}
                                        size="small"
                                        type="button"
                                      >
                                        Remove All
                                      </Button>
                                      <Button
                                        // onClick={onUpload}
                                        size="small"
                                        sx={{ ml: 2 }}
                                        type="button"
                                        variant="contained"
                                      >
                                        Upload
                                      </Button>
                                    </Box>
                                  </Box>

                                  {
                                    data && colDefs && (
                                      <ScheduleStagingTable
                                    cols={colDefs || []}
                                    tasks={data || []}
                                    tasksCount={data?.length}
                                    onPageChange={handlePageChange}
                                    onRowsPerPageChange={handleRowsPerPageChange}
                                    page={page}
                                    rowsPerPage={rowsPerPage} />
                                    )
                                  }
                                </>
                              )
                            }

                          </Box>
                        )
                      )

                    }

                    {
                      activeStep === 2 && (
                        <Box sx={{ mb: 2 }}>
                          <Grid container spacing={2}>
                            <Grid item md={12} mt={3} sm={12}>
                              <FormControl fullWidth>
                                <InputLabel id="select-questionaires">Questionaire</InputLabel>
                                <Select
                                  labelId="select-questionaires"
                                  id="select-questionaires"
                                  multiple
                                  value={questionaires}
                                  onChange={handleChangeQuestionaires}
                                  input={<OutlinedInput id="select-questionaires" label="Chip" />}
                                  renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                      {selected.map((value) => (
                                        <Chip
                                          key={value}
                                          label={value.name} />
                                      ))}
                                    </Box>
                                  )}
                                  MenuProps={MenuProps}
                                >
                                  {questionairesList.map((name) => (
                                    <MenuItem
                                      key={name}
                                      value={name}
                                      style={getStyles(name, questionaires, theme)}
                                    >
                                      {name.name}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            </Grid>
                          </Grid>
                        </Box>
                      )
                    }
                    <Box sx={{ mb: 2 }}>
                      <div>
                        <Button
                          variant="contained"
                          onClick={index === steps.length - 1 ? handleCreateTask : handleNext}
                          sx={{ mt: 1, mr: 1 }}
                        >
                          {index === steps.length - 1 ? 'Create Task' : 'Continue'}
                        </Button>
                        <Button
                          disabled={index === 0}
                          onClick={handleBack}
                          sx={{ mt: 1, mr: 1 }}
                        >
                          Back
                        </Button>
                      </div>
                    </Box>
                  </StepContent>
                </Step>
              ))}
            </Stepper>

            {activeStep === steps.length && (
              <Paper square elevation={0} sx={{ p: 3 }}>
                <Typography>All steps completed - you&apos;re finished</Typography>
                <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                  Reset
                </Button>
              </Paper>
            )}
          </Box>
        </Container>
      </Box >
    </>
  );
};

CreateTask.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>
      {page}
    </DashboardLayout>
  </AuthGuard>
);

export default CreateTask;
