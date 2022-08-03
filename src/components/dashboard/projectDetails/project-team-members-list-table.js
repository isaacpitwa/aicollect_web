import { useEffect, useState } from 'react';
import NextLink from 'next/link';
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
  Typography,
  Tooltip
} from '@mui/material';
import { ArrowRight as ArrowRightIcon } from '../../../icons/arrow-right';
import { PencilAlt as PencilAltIcon } from '../../../icons/pencil-alt';
import { getInitials } from '../../../utils/get-initials';
import { Scrollbar } from '../../scrollbar';
import { Trash } from '../../../icons/trash';

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

  // Reset selected customers when customers change
  useEffect(() => {
    if (selectedMembers.length) {
      setSelectedMembers([]);
    }
  },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [projectMembers]);

  const handleSelectAllMembers = (event) => {
    setSelectedMembers(event.target.checked
      ? projectMembers.map((customer) => customer.userId)
      : []);
  };

  const handleSelectOneMember = (event, memberId) => {
    if (!selectedMembers.includes(memberId)) {
      setSelectedMembers((prevSelected) => [...prevSelected, memberId]);
    } else {
      setSelectedMembers((prevSelected) => prevSelected.filter((id) => id !== memberId));
    }
  };

  const enableBulkActions = selectedMembers.length > 0;
  const selectedSomeMembers = selectedMembers.length > 0
    && selectedMembers.length < projectMembers.length;
  const selectedAllMembers = selectedMembers.length === projectMembers.length;

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
          checked={selectedAllMembers}
          indeterminate={selectedSomeMembers}
          onChange={handleSelectAllMembers}
        />
        <Button
          size="small"
          sx={{ ml: 2 }}
        >
          Remove From Project
        </Button>
      </Box>
      <Scrollbar>
        <Table sx={{ minWidth: 700 }}>
          <TableHead sx={{ visibility: enableBulkActions ? 'collapse' : 'visible' }}>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedAllMembers}
                  indeterminate={selectedSomeMembers}
                  onChange={handleSelectAllMembers}
                />
              </TableCell>
              <TableCell>
                Name
              </TableCell>
              <TableCell>
                Role
              </TableCell>
              <TableCell>
                Added By
              </TableCell>
              <TableCell>
                Date Created
              </TableCell>
              <TableCell align="right">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projectMembers.map((customer) => {
              const isCustomerSelected = selectedMembers.includes(customer.userId);

              return (
                <TableRow
                  hover
                  key={customer.userId}
                  selected={isCustomerSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isCustomerSelected}
                      onChange={(event) => handleSelectOneMember(event, customer.userId)}
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
                        {getInitials(customer.name)}
                      </Avatar>
                      <Box sx={{ ml: 1 }}>
                        <NextLink
                          href={`/dashboard/users/${customer.userId}`}
                          passHref
                        >
                          <Link
                            color="inherit"
                            variant="subtitle2"
                          >
                            {customer.name}
                          </Link>
                        </NextLink>
                        <Typography
                          color="textSecondary"
                          variant="body2"
                        >
                          {customer.email}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {customer.role}
                  </TableCell>
                  <TableCell>
                    {customer.createdBy.name ?  `${customer.createdBy.name }` : '-'}
                  </TableCell>
                  <TableCell>
                    {customer.createdAt}
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Remove User From Team">
                      <IconButton>
                        <Trash fontSize='small' />
                      </IconButton>
                    </Tooltip>

                    <NextLink
                      href={`/dashboard/users/${customer.userId}/edit`}
                      passHref
                    >
                      <IconButton component="a">
                        <PencilAltIcon fontSize="small" />
                      </IconButton>
                    </NextLink>
                    <NextLink
                      href={`/dashboard/users/${customer.userId}`}
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
        count={projectMembersCount}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
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
