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
import {DataGridToolbar} from '../data-grid-toolbar'
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
    { field: "Project Name", headName: "Project Name", width: 150 },
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
  ];

  const formatProject  = (project) =>{
    return {
      id: project._id,
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
          columns={columns}
          rows={formattedProjects}
          components={{
            Toolbar: DataGridToolbar,
          }}
          columnVisibilityModel={{
            // Hide columns Id
            Id: false,
          }}
        />

      </div>
    // </div>
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
