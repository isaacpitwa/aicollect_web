import { useEffect, useState,forwardRef } from 'react';
import NextLink from 'next/link';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  Avatar,
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
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from '@mui/material';
import { ArrowRight as ArrowRightIcon } from '../../../icons/arrow-right';
import { PencilAlt as PencilAltIcon } from '../../../icons/pencil-alt';
import { getInitials } from '../../../utils/get-initials';
import { Scrollbar } from '../../scrollbar';
import { Trash } from '../../../icons/trash';

import { DataGridPremium } from '@mui/x-data-grid-premium';
import { DataGridToolbar } from '../data-grid-toolbar'
import { Utils } from '../../../utils/main';

import { userApi } from '../../../api/users-api';


const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export const ProjectTeamMembersTable = (props) => {
  const {
    projectMembers,
    projectMembersCount,
    onPageChange,
    onRowsPerPageChange,
    page,
    rowsPerPage,
    ...other
  } = props;
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [open, setOpen] = useState(false);


  // Reset selected customers when customers change
  useEffect(() => {
    if (selectedMembers.length) {
      setSelectedMembers([]);
    }
  },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [projectMembers]);



  const columns = [
    {
      field: "Name", headName: "Name",
      width: 200,
      renderCell: (params) => {
        return (
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex'
            }}
          >
            <Avatar
              src={params.row.avatar}
              sx={{
                height: 42,
                width: 42
              }}
            >
              {getInitials(params.row.name)}
            </Avatar>
            <Box sx={{ ml: 1 }}>
              <NextLink
                href={`/dashboard/users/${params.row.id}`}
                passHref
              >
                <Link
                  color="inherit"
                  variant="subtitle2"
                >
                  {params.row.name}
                </Link>
              </NextLink>
              <Typography
                color="textSecondary"
                variant="body2"
              >
                {params.row.roles}
              </Typography>
            </Box>
          </Box>
        );
      }
    },
    { field: "Role", headName: "Role", width: 140 },
    {
      field: "Added By", headName: "Added By", width: 180,
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
    { field: "Date of Joining", headName: "Date of Joining", width: 150 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Tooltip title="Remove User From Team">
                <IconButton>
                  <Trash fontSize='small' />
                </IconButton>
              </Tooltip>
            <NextLink
              href={`/dashboard/users/${params.id}/edit`}
              passHref
            >
              <IconButton component="a">
                <PencilAltIcon fontSize="small" />
              </IconButton>
            </NextLink>
            <NextLink
              href={`/dashboard/users/${params.id}`}
              passHref
            >
              <IconButton component="a">
                <ArrowRightIcon fontSize="small" />
              </IconButton>
            </NextLink>
          </>
        );
      }
    },
  ];
  const handleClose = () => {
    setOpen(false);
  };
  const formatUser = (user) => {
    console.log("User name:", `${user.firstname} ${user.lastname}`);
    return {
      id: user.id ?? 10,
      name:user.name,
      Name: Utils.capitalizeFirstLetter(user.name),
      Role: user.role,
      creator:user.createdBy,
      "Added By": Utils.capitalizeFirstLetter(user.createdBy.name),
      "Date of Joining": moment(user.createdAt).format('DD/MM/YYYY'),
    }
  }
  const formattedUsers = projectMembers.map((member) => ({ ...formatUser(member) }));
 
  return (
    <div {...other}>
      <div style={{ height: "60vh", width: "100%" }}>
        <DataGridPremium
          checkboxSelection={true}
          columns={columns}
          rows={formattedUsers}
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
            {/* <Button onClick={handleClose}>Agree</Button> */}
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

ProjectTeamMembersTable.propTypes = {
  projectMembers: PropTypes.array.isRequired,
  projectMembersCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired
};
