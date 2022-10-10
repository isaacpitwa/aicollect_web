import { useEffect, useState,forwardRef } from 'react';
import NextLink from 'next/link';
import moment from 'moment';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

import {
  Avatar,
  Box,
  Button,
  IconButton,
  Link,

  Typography,
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
import { DataGridPremium } from '@mui/x-data-grid-premium';
import { DataGridToolbar } from '../data-grid-toolbar'
import { Utils } from '../../../utils/main';

import { userApi } from '../../../api/users-api';


const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export const UserListTable = (props) => {
  const {
    customers,
    customersCount,
    onPageChange,
    onRowsPerPageChange,
    page,
    rowsPerPage,
    ...other
  } = props;
  const [open, setOpen] = useState(false);
  const router = useRouter();
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
    { field: "Email", headName: "Email", width: 180 },
    { field: "Mobile", headName: "Mobile", width: 140 },
    {
      field: "Created By", headName: "Created By", width: 150,
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
          >
            <Typography
              color="success.main"
              variant="subtitle2"
              sx={{textDecoration: 'none'}}
            >
              {Utils.capitalizeFirstLetter(`${params.row.creator.firstname} ${params.row.creator.lastname}`)}</Typography>
          </Button>
        ) : 'N/A'
      }

    },
    { field: "Verified", headName: "Verified", width: 120 },
    { field: "Status", headName: "Status", width: 120 },
    { field: "Date of Joining", headName: "Date of Joining", width: 120 },
    { field: "Last Accessed", headName: "Last Accessed", width: 120 },
    {
      field: "action",
      headerName: "Action",
      width: 80,
      sortable: false,
      renderCell: (params) => {
        return (
          <>
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
      id: user.id,
      avatar: user.avatar ?? 'N/A',
      name: `${user.firstname} ${user.lastname}`,
      // Name: Utils.capitalizeFirstLetter(`${user.firstname} ${user.lastname}`),
      roles: user.roles,
      Email: user.email || "N/A",
      Mobile: user.phone || 'N/A',
      creator: user.creator,
      Status: Utils.capitalizeFirstLetter(user.status),
      Verified: user.emailVerified ? "Verified" : "Not Verified",
      "Created By": user.creator ? Utils.capitalizeFirstLetter(`${user.creator.firstname} ${user.creator.lastname}`) : 'N/A',
      "Date of Joining": moment(user.createdAt).format('DD/MM/YYYY'),
      "Last Accessed": moment(user.updatedAt).format('DD/MM/YYYY'),
    }
  }
  const formattedUsers = customers.map((customer) => ({ ...formatUser(customer) }));
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

UserListTable.propTypes = {
  customers: PropTypes.array.isRequired,
  customersCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired
};
