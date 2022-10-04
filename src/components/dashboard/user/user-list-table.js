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

  console.log("Client List", customers);

  const columns = [
    { field: "Id", headName: "id", width: 150 },
    {
      field: "Name", headName: "Name",
      width: 150,
      renderCell: (params) => {
        return (
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex'
            }}
          >
            <Avatar
              src={params.avatar}
              sx={{
                height: 42,
                width: 42
              }}
            >
              {getInitials(params.ame)}
            </Avatar>
            <Box sx={{ ml: 1 }}>
              <NextLink
                href={`/dashboard/users/${params.id}`}
                passHref
              >
                <Link
                  color="inherit"
                  variant="subtitle2"
                >
                  {params.Name}
                </Link>
              </NextLink>
              <Typography
                color="textSecondary"
                variant="body2"
              >
                {params.roles}
              </Typography>
            </Box>
          </Box>
        );
      }
    },
    { field: "Email", headName: "Email", width: 150 },
    { field: "roles", headName: "roles", width: 150 },
    { field: "avatar", headName: "avatar", width: 150 },
    { field: "name", headName: "name", width: 150 },
    { field: "Mobile", headName: "Mobile", width: 150 },
    { field: "Created By", headName: "Created By", width: 150 },
    { field: "Date of Joining", headName: "Date of Joining", width: 150 },
    { field: "Last Accessed", headName: "Last Accessed", width: 150 },
    { field: "Status", headName: "Status", width: 150 },
    {
      field: "action",
      headerName: "Action",
      width: 80,
      sortable: false,
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation(); // don't select this row after clicking

          const api = params.api;
          const thisRow = {};

          api
            .getAllColumns()
            .filter((c) => c.field !== "__check__" && !!c)
            .forEach(
              (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
            );

          return alert(JSON.stringify(thisRow, null, 4));
        };

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

  const formatUser = (user) => {
    return {
      id: user.id,
      avatar: user.avatar,
      name: Utils.capitalizeFirstLetter(`${user.firstname} ${user.lastname}`),
      Name: Utils.capitalizeFirstLetter(`${user.firstname} ${user.lastname}`),
      roles: user.roles,
      Email: user.email || "N/A",
      Mobile: user.phone || 'N/A',
      "Created By": Utils.capitalizeFirstLetter("User"),
      "Date of Joining": moment(user.createdAt).format('DD/MM/YYYY'),
      "Last Accessed": moment(user.updatedAt).format('DD/MM/YYYY'),
      Status: Utils.capitalizeFirstLetter(user.status),
      Verified: user.emailVerified ? "Verified" : "Not Verified",
    }
  }
  const formattedUsers = customers.map((customer) => ({ ...formatUser(customer) }));
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
          checked={selectedAllCustomers}
          indeterminate={selectedSomeCustomers}
          onChange={handleSelectAllCustomers}
        />
        <Button
          size="small"
          sx={{ ml: 2 }}
        >
          Delete
        </Button>
        {/* <Button
          size="small"
          sx={{ ml: 2 }}
        >
          Deactivate
        </Button> */}
      </Box>
      <Scrollbar>
        <Table sx={{ minWidth: 700 }}>
          <TableHead sx={{ visibility: enableBulkActions ? 'collapse' : 'visible' }}>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedAllCustomers}
                  indeterminate={selectedSomeCustomers}
                  onChange={handleSelectAllCustomers}
                />
              </TableCell>
              <TableCell>
                Name
              </TableCell>
              <TableCell>
                Email
              </TableCell>
              <TableCell>
                Mobile
              </TableCell>
              <TableCell>
                Status
              </TableCell>
              <TableCell>
                Verified
              </TableCell>
              <TableCell>
                Created By
              </TableCell>
              <TableCell>
                Date of Joining
              </TableCell>
              <TableCell>
                Last Accessed
              </TableCell>
              <TableCell align="right">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer) => {
              const isCustomerSelected = selectedCustomers.includes(customer.id);

              return (
                <TableRow
                  hover
                  key={customer.id}
                  selected={isCustomerSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isCustomerSelected}
                      onChange={(event) => handleSelectOneCustomer(event, customer.id)}
                      value={isCustomerSelected}
                    />
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Avatar
                        src={customer.avatar}
                        sx={{
                          height: 42,
                          width: 42
                        }}
                      >
                        {getInitials(`${customer.firsname} ${customer.lastname}`)}
                      </Avatar>
                      <Box sx={{ ml: 1 }}>
                        <NextLink
                          href={`/dashboard/users/${customer.id}`}
                          passHref
                        >
                          <Link
                            color="inherit"
                            variant="subtitle2"
                          >
                            {`${customer.firstname} ${customer.lastname}`}
                          </Link>
                        </NextLink>
                        <Typography
                          color="textSecondary"
                          variant="body2"
                        >
                          {customer.roles}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {customer.email}
                  </TableCell>
                  <TableCell>
                    {customer.phone || 'N/A'}
                  </TableCell>
                  <TableCell>
                    {customer.status}
                  </TableCell>
                  <TableCell>
                    <Typography
                      color="success.main"
                      variant="subtitle2"
                    >
                      {customer.emailVerified ? "Verified" : "Not Verified"}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {customer.createdBy.name || 'N/A'}
                  </TableCell>
                  <TableCell>
                    {moment(customer.createdAt).format('DD/MM/YYYY')}
                  </TableCell>
                  <TableCell>
                    {moment(customer.updatedAt).format('DD/MM/YYYY')}
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="View">
                      <NextLink
                        href={`/dashboard/users/${customer.id}/edit`}
                        passHref
                      >
                        <IconButton component="a">
                          <PencilAltIcon fontSize="small" />
                        </IconButton>
                      </NextLink>
                    </Tooltip>
                    <NextLink
                      href={`/dashboard/users/${customer.id}`}
                      passHref
                    >
                      <IconButton component="a">
                        <ArrowRightIcon fontSize="small" />
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
        count={customersCount}
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
          rows={formattedUsers}
          components={{
            Toolbar: DataGridToolbar,
          }}
          columnVisibilityModel={{
            // Hide columns Id
            Id: false,
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
