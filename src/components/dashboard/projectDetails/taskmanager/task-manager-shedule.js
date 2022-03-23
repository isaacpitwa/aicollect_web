import { subDays, subHours } from 'date-fns';
import {
  Box,
  Card,
  Checkbox,
  Divider,
  IconButton,
  InputAdornment,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Tabs,
  TextField,
} from '@mui/material';
import { Scrollbar } from '../../../scrollbar';
import { PencilAlt as PencilAltIcon } from '../../../../icons/pencil-alt';
import { Search as SearchIcon } from '../../../../icons/search';
import { DeleteForever } from '@mui/icons-material';

const now = new Date();

const customers = [
  {
    id: '5e887ac47eed253091be10cb',
    status: 'Completed',
    account: 'Mukisa Dan',
    eventType: 'Field',
    contact: '+2567843635',
    gps: '1.8737',
    lastVisit: '02/73/3098',
    gpsLock: false,
    visitType: 'Recurring',
    startDate: '02/73/3098',
    day: 'Friday',
    recurring: 'Yes',
    agent: 'John Kent',
    updatedAt: subDays(subHours(now, 7), 1).getTime()
  },
];

const tabs = [
  {
    label: 'All',
    value: 'all'
  },
  {
    label: 'Completed',
    value: 'completed'
  },
  {
    label: 'Rescheduled',
    value: 'rescheduled'
  },
  {
    label: 'On Route',
    value: 'onRoute'
  }
];

const sortOptions = [
  {
    label: 'Last update (newest)',
    value: 'updatedAt|desc'
  },
  {
    label: 'Last update (oldest)',
    value: 'updatedAt|asc'
  },
  {
    label: 'Total orders (highest)',
    value: 'orders|desc'
  },
  {
    label: 'Total orders (lowest)',
    value: 'orders|asc'
  }
];

export const TaskManagerSchedule = () => (
  <Box
    sx={{
      backgroundColor: 'background.default',
      p: 3
    }}
  >
    <Card>
      <Tabs
        indicatorColor="primary"
        scrollButtons="auto"
        textColor="primary"
        value="all"
        sx={{ px: 3 }}
        variant="scrollable"
      >
        {tabs.map((tab) => (
          <Tab
            key={tab.value}
            label={tab.label}
            value={tab.value}
          />
        ))}
      </Tabs>
      <Divider />
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexWrap: 'wrap',
          m: -1,
          p: 2
        }}
      >
        <Box
          sx={{
            m: 1,
            maxWidth: '100%',
            width: 500
          }}
        >
          <TextField
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              )
            }}
            placeholder="Search Schedule"
          />
        </Box>
        <Box
          sx={{
            m: 1,
            width: 240
          }}
        >
          <TextField
            label="Sort By"
            name="sort"
            select
            SelectProps={{ native: true }}
          >
            {sortOptions.map((option) => (
              <option
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </TextField>
        </Box>
      </Box>
      <Scrollbar>
        <Table sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox />
              </TableCell>
              <TableCell>
                Live Status
              </TableCell>
              <TableCell>
                Account
              </TableCell>
              <TableCell>
                Event Type
              </TableCell>
              <TableCell>
                Contact
              </TableCell>
              <TableCell>
                GPS
              </TableCell>
              <TableCell>
                Last Visit
              </TableCell>
              <TableCell>
                GPS LOCK
              </TableCell>
              <TableCell>
                Visit Type
              </TableCell>
              <TableCell>
                Start Date
              </TableCell>
              <TableCell>
                Day 
              </TableCell>
              <TableCell>
                Recurring
              </TableCell>
              <TableCell>
                Agent
              </TableCell>
              <TableCell align="right">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer) => (
              <TableRow
                hover
                key={customer.id}
              >
                <TableCell padding="checkbox">
                  <Checkbox />
                </TableCell>
                <TableCell>
                  {customer.status}
                </TableCell>
                <TableCell>
                  {customer.account}
                </TableCell>
                <TableCell>
                  {customer.eventType}
                </TableCell>
                <TableCell>
                  {customer.contact}
                </TableCell>
                <TableCell>
                  {customer.gps}
                </TableCell>
                <TableCell>
                  {customer.lastVisit}
                </TableCell>
                <TableCell>
                  {customer.gpsLock ? "Yes" : "No"}
                </TableCell>
                <TableCell>
                  {customer.visitType}
                </TableCell>
                <TableCell>
                  {customer.startDate}
                </TableCell>
                <TableCell>
                  {customer.day}
                </TableCell>
                <TableCell>
                  {customer.recurring}
                </TableCell>
                <TableCell>
                  {customer.agent}
                </TableCell>
                <TableCell align="right">
                  <IconButton>
                    <PencilAltIcon fontSize="small" />
                  </IconButton>
                  <IconButton>
                    <DeleteForever fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Scrollbar>
      <TablePagination
        component="div"
        count={customers.length}
        onPageChange={() => { }}
        onRowsPerPageChange={() => { }}
        page={0}
        rowsPerPage={5}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  </Box>
);
