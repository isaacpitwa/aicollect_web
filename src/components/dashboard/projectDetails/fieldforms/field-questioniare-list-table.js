import { useEffect, useState,forwardRef } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import {
  Button,
  IconButton,
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
export const FieldFormListTable = (props) => {
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
             <Tooltip title="Edit Form">
              <IconButton component="a">
                <PencilAltIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </NextLink>
              <NextLink
                href={`/dashboard/projects/${projectId}/questionaire/${params.id}`}
                passHref
              >
                <Tooltip title="View Form Responses">
                  <IconButton component="a">
                    <RemoveRedEyeIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </NextLink>
              <NextLink
                href={`/dashboard/projects/${projectId}/questionaire/${params.id}`}
                passHref
              >
                <Tooltip title="Preview Form">
                  <IconButton component="a">
                    <SavedSearchIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </NextLink>
              <NextLink
                href={`/dashboard/projects/${projectId}/questionaire/${params.id}`}
                passHref
              >
                 <Tooltip title="Archive Form">
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
 
  return (
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
  );
};

FieldFormListTable.propTypes = {
  questionaires: PropTypes.array.isRequired,
  questionairesCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired
};
