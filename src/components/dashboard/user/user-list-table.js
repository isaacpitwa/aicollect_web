import { useEffect, useState } from 'react';
import NextLink from 'next/link';
import moment from 'moment';
import PropTypes from 'prop-types';
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
  Tooltip,
  Typography
} from '@mui/material';
import { ArrowRight as ArrowRightIcon } from '../../../icons/arrow-right';
import { PencilAlt as PencilAltIcon } from '../../../icons/pencil-alt';
import { getInitials } from '../../../utils/get-initials';
import { Scrollbar } from '../../scrollbar';
import { DataGridPremium } from '@mui/x-data-grid-premium';
import { DataGridToolbar } from '../data-grid-toolbar'
import { Utils } from '../../../utils/main';


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
  const [selectedCustomers, setSelectedCustomers] = useState([]);

  // Reset selected customers when customers change
  useEffect(() => {
    if (selectedCustomers.length) {
      setSelectedCustomers([]);
    }
  },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [customers]);

  const handleSelectAllCustomers = (event) => {
    setSelectedCustomers(event.target.checked
      ? customers.map((customer) => customer.id)
      : []);
  };

  const handleSelectOneCustomer = (event, customerId) => {
    if (!selectedCustomers.includes(customerId)) {
      setSelectedCustomers((prevSelected) => [...prevSelected, customerId]);
    } else {
      setSelectedCustomers((prevSelected) => prevSelected.filter((id) => id !== customerId));
    }
  };

  const enableBulkActions = selectedCustomers.length > 0;
  const selectedSomeCustomers = selectedCustomers.length > 0
    && selectedCustomers.length < customers.length;
  const selectedAllCustomers = selectedCustomers.length === customers.length;

  console.log("Users List", customers);

  const columns = [
    { field: "Id", headName: "id", width: 150 },
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
    { field: "name", headName: "name", width: 150 },
    { field: "roles", headName: "roles", width: 150 },
    { field: "name", headName: "name", width: 150 },
    { field: "Email", headName: "Email", width: 180 },
    { field: "avatar", headName: "avatar", width: 150 },
    { field: "Mobile", headName: "Mobile", width: 140 },
    { field: "Created By", headName: "Created By", width: 150 },
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

  const formatUser = (user) => {
    console.log("User name:",`${user.firstname} ${user.lastname}`);
    return {
      id: user.id,
      avatar: user.avatar ?? 'N/A',
      name: `${user.firstname} ${user.lastname}`,
      // Name: Utils.capitalizeFirstLetter(`${user.firstname} ${user.lastname}`),
      roles: user.roles,
      Email: user.email || "N/A",
      Mobile: user.phone || 'N/A',
      Status: Utils.capitalizeFirstLetter(user.status),
      Verified: user.emailVerified ? "Verified" : "Not Verified",
      "Created By": Utils.capitalizeFirstLetter("User"),
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
