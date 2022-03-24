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

export const TaskManagerListTable = (props) => {
  const {
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
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedAllTasks}
                  indeterminate={selectedSomeTasks}
                  onChange={handleSelectAllTasks}
                />
              </TableCell>
              <TableCell>
                Title
              </TableCell>
              <TableCell>
                Task Type
              </TableCell>
              <TableCell>
                Status
              </TableCell>
              <TableCell>
                Assigned To
              </TableCell>
              <TableCell>
                Priority
              </TableCell>
              <TableCell>
                Start Date
              </TableCell>
              <TableCell>
                Due Date
              </TableCell>
              <TableCell>
                Rescheduled
              </TableCell>
              <TableCell>
                Task Completed
              </TableCell>
              <TableCell align="right">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task) => {
              const isTaskSelected = selectedTasks.includes(task.id);
              // console.log(project)

              return (
                <TableRow
                  hover
                  key={task.id}
                  selected={isTaskSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isTaskSelected}
                      onChange={(event) => handleSelectOneTask(event, task.id)}
                      value={isTaskSelected}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography>{task.title}</Typography>
                  </TableCell>
                  <TableCell>
                    {task.taskType}
                  </TableCell>
                  <TableCell>
                    {task.status}
                  </TableCell>
                  <TableCell>
                    {task.createdBy.name}
                  </TableCell>
                  <TableCell>
                    {task.priority}
                  </TableCell>
                  <TableCell>
                    {moment(task.startDate).format('MM/DD/YYYY')}
                  </TableCell>
                  <TableCell>
                    {moment(task.dueDate).format('MM/DD/YYYY')}
                  </TableCell>
                  <TableCell>
                    {task.rescheduled ? 'Yes' : 'No'}
                  </TableCell>
                  <TableCell>
                    {task.completed ? task.dataCompleted : 'Not Completed'}
                  </TableCell>
                  
                  <TableCell align="right">
                    <NextLink
                      href={`/dashboard/projects/${projectId}/taskmanager/${task._id}/edit`}
                      passHref
                    >
                      <IconButton component="a">
                        <PencilAltIcon fontSize="small" />
                      </IconButton>
                    </NextLink>
                    <NextLink
                      href={`/dashboard/projects/${projectId}/taskmanager/${task._id}`}
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

TaskManagerListTable.propTypes = {
  projects: PropTypes.array.isRequired,
  projectsCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired
};
