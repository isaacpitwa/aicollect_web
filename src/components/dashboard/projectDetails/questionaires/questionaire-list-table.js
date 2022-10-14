import { useEffect, useState, forwardRef } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Checkbox,
  IconButton,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Slide,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Tooltip,
} from '@mui/material';
import moment from 'moment';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import SavedSearchIcon from '@mui/icons-material/SavedSearch';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import { PencilAlt as PencilAltIcon } from '../../../../icons/pencil-alt';
import { Scrollbar } from '../../../scrollbar';
import { Utils } from '../../../../utils/main';
import LoadingButton from '@mui/lab/LoadingButton';


import { userApi } from '../../../../api/users-api';
import { projectsApi } from '../../../../api/projects-api';
import toast from 'react-hot-toast';

import { DataGridPremium } from '@mui/x-data-grid-premium';
import { DataGridToolbar } from '../../data-grid-toolbar'


const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export const QuestionaireListTable = (props) => {
  const {
    questionaires,
    questionairesCount,
    onPageChange,
    onRowsPerPageChange,
    page,
    rowsPerPage,
    ...other
  } = props;
  const [selectedQuestionaires, setSelectedQuestionaires] = useState([]);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const router = useRouter();
  const { projectId } = router.query;

  const columns = [
    {
      field: "Form Name", headName: "Form Name",
      width: 200
    },
    { field: "Created", headName: "Created", width: 120, type: "date" },
    { field: "Modified", headName: "Modified", width: 120, type: "date" },
    { field: "Version", headName: "Version", width: 100,},
    { field: "Status", headName: "Status", width: 120 },
    {
      field: "Created By", headName: "Created By", width: 140,
      renderCell: (params) => {

              
        const onClick = () => {
          try {

            userApi.getUserDetails(params.row.creator.id).then((data) => {
              if(!data){
                setOpen(true);
              }else{
                  router.push(`/dashboard/users/${params.row.creator.id}`);
              }
            }).catch((error) => {
              console.log(error);
            });
            
          } catch (err) {
            console.error(err);
          }
        }

        return params.row.creator ? (
          <Button
            href={`/dashboard/users/${params.row.creator.id}`}
            passHref
            onClick={onClick}
          >
            <Typography
              color="success.main"
              variant="subtitle2"
              sx={{textDecoration: 'none'}}
            >
              {Utils.capitalizeFirstLetter(`${params.row.creator.name}`)}</Typography>
          </Button>
        ) : 'N/A'
      }

    },
   
    {
      field: "action",
      headerName: "Action",
      width: 150,
      sortable: false,
      renderCell: (params) => {
        return (
          <>
          <NextLink
            href={`/dashboard/projects/${projectId}/questionaire/${params.id}/form`}
            passHref
          >
            <IconButton component="a">
              <PencilAltIcon fontSize="small" />
            </IconButton>
          </NextLink>
            <NextLink
              href={`/dashboard/projects/${projectId}/questionaire/${params.id}`}
              passHref
            >
              <Link
                color="inherit"
                variant="subtitle2"
              >
                {params.row.name}
              </Link>
            </NextLink>
            <Tooltip title="Remove User From Team">
              <NextLink
                href={`/dashboard/projects/${projectId}/questionaire/${params.id}`}
                passHref
              >
                <IconButton component="a">
                  <RemoveRedEyeIcon fontSize="small" />
                </IconButton>
              </NextLink>
            </Tooltip>
            <Tooltip title="Remove User From Team">
              <NextLink
                href={`/dashboard/projects/${projectId}/questionaire/${params.id}`}
                passHref
              >
                <IconButton component="a">
                  <SavedSearchIcon fontSize="small" />
                </IconButton>
              </NextLink>
            </Tooltip>
           
              <NextLink
                href={`/dashboard/projects/${projectId}/questionaire/${params.id}`}
                passHref
              >
                 <Tooltip title="Remove User From Team">
                  <IconButton component="a">
                    <DeleteSweepIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </NextLink>
            
          </>
        );
      }
    },
  ];
  const handleClose = () => {
    setOpen(false);
  };
  const handleDeleteClose = () => {
    setSelectedForm(null);
    setOpenDelete(false);
  };

  const handleDeleteQuestionaire = () => {
    setLoading(true);
    try {
      const response = projectsApi.removeUser(selectedMember);
      if (response.status === 200) {
        onUpdate();
        toast.success('User removed from team');
      }
      else {
        toast.error(response.message ??'Something went wrong, please try again');
      }
      setLoading(false);
      setOpenDelete(false);
      setSelectedMember(null);
    }
    catch (err) {
      setLoading(false);
      setOpenDelete(false);
      setSelectedMember(null);
      console.error(err);
      toast.error('Something went wrong, please try again');
    }
  };

  const formatQuestionaire = (questionaire) => {
    return {
      id: questionaire._id,
      "Form Name": Utils.capitalizeFirstLetter(questionaire.name),
      Status: Utils.capitalizeFirstLetter(questionaire.status),
      creator:questionaire.createdBy,
      "Added By": Utils.capitalizeFirstLetter(questionaire.createdBy.name),
      "Created": moment(questionaire.createdAt).format('DD/MM/YYYY'),
      "Modified": moment(questionaire.updatedAt).format('DD/MM/YYYY'),
      "Version": `v${questionaire.version}`,
    }
  }
  const formattedQuestionaires = questionaires.map((questionaire) => ({ ...formatQuestionaire(questionaire) }));
 

  // Reset selected customers when customers change
  useEffect(() => {
    if (selectedQuestionaires.length) {
      setSelectedQuestionaires([]);
    }
  },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [questionaires]);

  const handleSelectAllQuestionaires = (event) => {
    setSelectedQuestionaires(event.target.checked
      ? questionaires.map((customer) => customer.id)
      : []);
  };

  const handleSelectOneQuestionaire = (event, questioanireId) => {
    if (!selectedQuestionaires.includes(questioanireId)) {
      setSelectedQuestionaires((prevSelected) => [...prevSelected, questioanireId]);
    } else {
      setSelectedQuestionaires((prevSelected) => prevSelected.filter((id) => id !== questioanireId));
    }
  };

  const enableBulkActions = selectedQuestionaires.length > 0;
  const selectedSomeQuestionaires = selectedQuestionaires.length > 0
    && selectedQuestionaires.length < questionaires.length;
  const selectedAllQuestionaires = selectedQuestionaires.length === questionaires.length;

  return (
    <div {...other}>
      <Box
        sx={{
          backgroundColor: 'neutral.100',
          display: !enableBulkActions && 'none',
          px: 2,
          py: 0.5
        }}
      >
        <Checkbox
          checked={selectedAllQuestionaires}
          indeterminate={selectedSomeQuestionaires}
          onChange={handleSelectAllQuestionaires}
        />
        <Button
          size="small"
          sx={{ ml: 2 }}
        >
          Delete
        </Button>
        <Button
          size="small"
          sx={{ ml: 2 }}
        >
          Edit
        </Button>
      </Box>
      <Scrollbar>
        <Table sx={{ minWidth: 700 }}>
          <TableHead sx={{ visibility: enableBulkActions ? 'collapse' : 'visible' }}>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedAllQuestionaires}
                  indeterminate={selectedSomeQuestionaires}
                  onChange={handleSelectAllQuestionaires}
                />
              </TableCell>
              <TableCell>
                Form name
              </TableCell>
              <TableCell>
                Created
              </TableCell>
              <TableCell>
                Modified
              </TableCell>
              <TableCell>
                Version
              </TableCell>
              <TableCell>
                Status
              </TableCell>
              <TableCell align="right">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {questionaires.map((questionaire) => {
              const isQuestionaireSelected = selectedQuestionaires.includes(questionaire.id);

              return (
                <TableRow
                  hover
                  key={questionaire.id}
                  selected={isQuestionaireSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isQuestionaireSelected}
                      onChange={(event) => handleSelectOneQuestionaire(event, questionaire.id)}
                      value={isQuestionaireSelected}
                    />
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Box sx={{ ml: 1 }}>
                        <NextLink
                          href={`/dashboard/projects/${router.query.projectId}/questionaire/${questionaire._id}`}
                          passHref
                        >
                          <Link
                            color="inherit"
                            variant="subtitle2"
                          >
                            {questionaire.name}
                          </Link>
                        </NextLink>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {moment(questionaire.createdAt).format('DD/MM/YYYY')}
                  </TableCell>
                  <TableCell>
                    {moment(questionaire.updatedAt).format('DD/MM/YYYY')}
                  </TableCell>
                  <TableCell>
                    <Typography
                      color="success.main"
                      variant="subtitle2"
                    >
                      {`V${questionaire.version}`}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      color="success.main"
                      variant="subtitle2"
                    >
                      {Utils.capitalizeFirstLetter(questionaire.status)}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <NextLink
                      href={`/dashboard/projects/${router.query.projectId}/questionaire/${questionaire._id}/form`}
                      passHref
                    >
                      <IconButton component="a">
                        <PencilAltIcon fontSize="small" />
                      </IconButton>
                    </NextLink>
                    <NextLink
                      href={`/dashboard/projects/${router.query.projectId}/questionaire/${questionaire._id}`}
                      passHref
                    >
                      <IconButton component="a">
                        <RemoveRedEyeIcon fontSize="small" />
                      </IconButton>
                    </NextLink>
                    <NextLink
                      href={`/dashboard/projects/${router.query.projectId}/questionaire/${questionaire._id}`}
                      passHref
                    >
                      <IconButton component="a">
                        <SavedSearchIcon fontSize="small" />
                      </IconButton>
                    </NextLink>
                    <NextLink
                      href={`/dashboard/projects/${router.query.projectId}/questionaire/${questionaire._id}`}
                      passHref
                    >
                      <IconButton component="a">
                        <DeleteSweepIcon fontSize="small" />
                      </IconButton>
                    </NextLink>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Scrollbar>
      <TablePagination
        component="div"
        count={questionairesCount}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
       <div style={{ height: "60vh", width: "100%" }}>
        <DataGridPremium
          checkboxSelection={true}
          columns={columns}
          rows={formattedQuestionaires}
          components={{
            Toolbar: DataGridToolbar,
          }}
          columnVisibilityModel={{
            // Hide columns Id
            Id: false,
            roles: false,
            name: false,
            avatar: false,
          }}
          pagination
        />
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"404: User not found"}</DialogTitle>
          <DialogContent>
           <DialogContentText id="alert-dialog-slide-description">
              This User was Permanently Deleted. This means sending anonymous
              user data to Aicolect, even when none of his tasks are running.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={openDelete}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"Remove User From Project"}</DialogTitle>
          <DialogContent>
           <DialogContentText id="alert-dialog-slide-description">
              This User will be  Permanently removed from this project. This means sending anonymous
              user data to Aicolect, even when none of his tasks are running.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <LoadingButton onClick={handleDeleteQuestionaire} color="error" loading={loading}>Confirm</LoadingButton>
            <Button onClick={handleDeleteClose} disabled={loading}>Cancel</Button>
          </DialogActions>

        </Dialog>
      </div>
    </div>
  );
};

QuestionaireListTable.propTypes = {
  questionaires: PropTypes.array.isRequired,
  questionairesCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired
};
