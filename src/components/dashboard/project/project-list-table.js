import { useEffect, useState } from 'react';
import NextLink from 'next/link';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import { ArrowRight as ArrowRightIcon } from '../../../icons/arrow-right';
import { PencilAlt as PencilAltIcon } from '../../../icons/pencil-alt';
import { Scrollbar } from '../../scrollbar';
import moment from 'moment';
import { Utils } from '../../../utils/main';
import { DataGridPremium } from '@mui/x-data-grid-premium';

export const ProjectListTable = (props) => {
  const {
    projects,
    projectsCount,
    onPageChange,
    onRowsPerPageChange,
    page,
    rowsPerPage,
    ...other
  } = props;
  const [selectedProjects, setSelectedProjects] = useState([]);

  // Reset selected customers when customers change
  useEffect(() => {
    if (selectedProjects.length) {
      setSelectedProjects([]);
    }
  },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [projects]);

  const handleSelectAllProjects = (event) => {
    setSelectedProjects(event.target.checked
      ? projects.map((project) => project._id)
      : []);
  };

  const handleSelectOneProject = (event, projectId) => {
    if (!selectedProjects.includes(projectId)) {
      setSelectedProjects((prevSelected) => [...prevSelected, projectId]);
    } else {
      setSelectedProjects((prevSelected) => prevSelected.filter((id) => id !== projectId));
    }
  };

  const enableBulkActions = selectedProjects.length > 0;
  const selectedSomeProjects = selectedProjects.length > 0
    && selectedProjects.length < projects.length;
  const selectedAllProjects = selectedProjects.length === projects.length;
  const columns = [
    { field: "Id", headName: "id", width: 150 },
    { field: "Project Name", headName: "ProjectName", width: 150 },
    { field: "Members", headName: "Members", width: 150 },
    { field: "Questionaires", headName: "Questionaires", width: 150 },
    { field: "Created By", headName: "CreatedBy", width: 150 },
    { field: "Date Created", headName: "DateCreated", width: 150 },
    { field: "status", headName: "status", width: 150 },
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
  ]
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
          checked={selectedAllProjects}
          indeterminate={selectedSomeProjects}
          onChange={handleSelectAllProjects}
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
                  checked={selectedAllProjects}
                  indeterminate={selectedSomeProjects}
                  onChange={handleSelectAllProjects}
                />
              </TableCell>
              <TableCell>
                Project Name
              </TableCell>
              <TableCell>
                Members
              </TableCell>
              <TableCell>
                Questionaires
              </TableCell>
              <TableCell>
                Date Created
              </TableCell>
              <TableCell>
                Created By
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
            {projects.map((project, idx) => {
              const isProjectSelected = selectedProjects.includes(project._id);
              return (
                <TableRow
                  hover
                  key={idx}
                  selected={isProjectSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isProjectSelected}
                      onChange={(event) => handleSelectOneProject(event, project._id)}
                      value={isProjectSelected}
                    />
                  </TableCell>
                  <TableCell sx={{ cursor: 'pointer' }}>
                    <NextLink href={`/dashboard/projects/${project._id}`}>
                      <Typography>{Utils.capitalizeFirstLetter(project.name)}</Typography>
                    </NextLink>
                  </TableCell>
                  <TableCell>
                    {project.team.length}
                  </TableCell>
                  <TableCell>
                    {0}
                  </TableCell>
                  <TableCell>
                    {moment(project.createdAt).format('MM/DD/YYYY')}
                  </TableCell>
                  <TableCell>
                    {Utils.capitalizeFirstLetter(project.createdBy.name)}
                  </TableCell>
                  <TableCell>
                    {Utils.capitalizeFirstLetter(project.status)}
                  </TableCell>

                  <TableCell align="right">
                    <NextLink
                      href={`/dashboard/projects/${project._id}`}
                      passHref
                    >
                      <IconButton component="a">
                        <PencilAltIcon fontSize="small" />
                      </IconButton>
                    </NextLink>
                    <NextLink
                      href={`/dashboard/projects/${project._id}`}
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
        count={projectsCount}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
      <div style={{ height: "60vh", width: "100%" }}>
        <DataGridPremium

        />

      </div>
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
