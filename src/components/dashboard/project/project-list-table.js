import { useEffect, useState, forwardRef } from 'react';
import NextLink from 'next/link';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import {
  IconButton,Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Button,
} from '@mui/material';
import { ArrowRight as ArrowRightIcon } from '../../../icons/arrow-right';
import moment from 'moment';
import { Utils } from '../../../utils/main';
import { DataGridPremium } from '@mui/x-data-grid-premium';
import { DataGridToolbar } from '../data-grid-toolbar'
import { userApi } from '../../../api/users-api';


const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export const ProjectListTable = (props) => {
  const { projects } = props;
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  // Reset selected customers when customers change
  useEffect(() => {
    if (selectedProjects.length) {
      setSelectedProjects([]);
    }
  },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [projects]);


  const columns = [
    { field: "Id", headName: "id", width: 150 },
    { field: "Project Name", headName: "Project Name", width: 150 },
    { field: "Members", headName: "Members", width: 150 },
    { field: "Questionaires", headName: "Questionaires", width: 150 },
    {
      field: "Created By", headName: "CreatedBy", width: 150,
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
          <Button variant="text"
            onClick={onClick}
          >
            <Typography
              color="success.main"
              variant="subtitle2"
              sx={{ textDecoration: 'none' }}
            >
              {Utils.capitalizeFirstLetter(`${params.row.creator.name}`)}</Typography>
          </Button>
        ) : 'N/A'
      }
    },
    { field: "Date Created", headName: "DateCreated", width: 150 },
    { field: "status", headName: "status", width: 150 },
    {
      field: "action",
      headerName: "Action",
      width: 80,
      sortable: false,
      renderCell: (params) => {
        return (
          <NextLink
            href={`/dashboard/projects/${params.id}`}
            passHref
          >
            <IconButton component="a">
              <ArrowRightIcon fontSize="small" />
            </IconButton>
          </NextLink>
        );
      }
    },
  ];

  const handleClose = () => {
    setOpen(false);
  };

  const formatProject = (project) => {
    return {
      id: project._id,
      creator: project.createdBy,
      "Project Name": Utils.capitalizeFirstLetter(project.name),
      Members: project.team.length,
      Questionaires: 0,
      "Created By": Utils.capitalizeFirstLetter(project.createdBy.name),
      "Date Created": moment(project.createdAt).format('DD/MM/YYYY'),
      status: Utils.capitalizeFirstLetter(project.status),
    }
  }
  const formattedProjects = projects.map((project) => ({ ...formatProject(project) }));

  return (
    <div style={{ height: "60vh", width: "100%" }}>
      <DataGridPremium
        checkboxSelection={true}
        columns={columns}
        rows={formattedProjects}
        components={{
          Toolbar: DataGridToolbar,
        }}
        columnVisibilityModel={{
          // Hide columns Id
          Id: false,
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
            {/* <Button onClick={handleClose}>Agree</Button> */}
          </DialogActions>
        </Dialog>
    </div>
  );
};

ProjectListTable.propTypes = {
  projects: PropTypes.array.isRequired,
  projectsCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired
};
