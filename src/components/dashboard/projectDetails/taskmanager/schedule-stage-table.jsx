import { useEffect, useState } from 'react';
import NextLink from 'next/link';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
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
import moment from 'moment';
import { ArrowRight as ArrowRightIcon } from '../../../../icons/arrow-right';
import { PencilAlt as PencilAltIcon } from '../../../../icons/pencil-alt';
import { Scrollbar } from '../../../scrollbar';

export const ScheduleStagingTable = (props) => {
  const {
    cols,
    tasks,
    tasksCount,
    onPageChange,
    onRowsPerPageChange,
    page,
    rowsPerPage,
    ...other
  } = props;
  const router = useRouter();
  const { projectId } = router.query;
  const [selectedTasks, setSelectedTasks] = useState([]);

  // Reset selected customers when customers change
  useEffect(() => {
      if (selectedTasks.length) {
        setSelectedTasks([]);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [tasks]);

  const handleSelectAllTasks = (event) => {
    setSelectedTasks(event.target.checked
      ? tasks.map((project) => project.id)
      : []);
  };

  const handleSelectOneTask = (event, taskId) => {
    if (!selectedTasks.includes(taskId)) {
      setSelectedTasks((prevSelected) => [...prevSelected, taskId]);
    } else {
      setSelectedTasks((prevSelected) => prevSelected.filter((id) => id !== taskId));
    }
  };

  const enableBulkActions = selectedTasks.length > 0;
  const selectedSomeTasks = selectedTasks.length > 0
    && selectedTasks.length < tasks.length;
  const selectedAllTasks = selectedTasks.length === tasks.length;

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
          checked={selectedAllTasks}
          indeterminate={selectedSomeTasks}
          onChange={handleSelectAllTasks}
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
              {
                cols.map((cell, idx) => (
                  <TableCell key={idx}>{cell.title}</TableCell>
                ))
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task, idx) => {
              // console.log(project)

              return (
                <TableRow
                  hover
                  key={idx}
                >
                  <TableCell>
                    <Typography>{task.Account}</Typography>
                  </TableCell>
                  <TableCell>
                    {task["Event Type"]}
                  </TableCell>
                  <TableCell>
                    {task.Contact}
                  </TableCell>
                  <TableCell>
                    {task.Latitude}
                  </TableCell>
                  <TableCell>
                    {task.Longitude}
                  </TableCell>
                  <TableCell>
                    {task.Location}
                  </TableCell>
                  <TableCell>
                    {moment(task["last visit"])}
                  </TableCell>
                  <TableCell>
                  {task["Gps Lock"]}
                  </TableCell>
                  <TableCell>
                    {moment(task["Start  Date"]).format('DD/MM/YYY')}
                  </TableCell>
                  <TableCell>
                    {task.Day}
                  </TableCell>
                  <TableCell>
                    {task.Recurring}
                  </TableCell>
                  <TableCell>
                    {task.Agent}
                  </TableCell>
                  
                  <TableCell align="right">
                    <NextLink
                      href={`/dashboard/projects/${projectId}/taskmanager/""/edit`}
                      passHref
                    >
                      <IconButton component="a">
                        <PencilAltIcon fontSize="small" />
                      </IconButton>
                    </NextLink>
                    <NextLink
                      href={`/dashboard/projects/${projectId}/taskmanager/''`}
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
        count={tasksCount}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </div>
  );
};

ScheduleStagingTable.propTypes = {
  cols: PropTypes.array.isRequired,
  tasks: PropTypes.array.isRequired,
  tasksCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired
};
