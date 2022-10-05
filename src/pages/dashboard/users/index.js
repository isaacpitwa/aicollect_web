import { useState, useEffect, useCallback, useRef } from "react";
import Head from "next/head";
// import { useRouter } from 'next/router';
import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { AuthGuard } from "../../../components/authentication/auth-guard";
import { DashboardLayout } from "../../../components/dashboard/dashboard-layout";
import { UserListTable } from "../../../components/dashboard/user/user-list-table";
import { useMounted } from "../../../hooks/use-mounted";
import { Download as DownloadIcon } from "../../../icons/download";
// import { Plus as PlusIcon } from '../../../icons/plus';
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { Search as SearchIcon } from "../../../icons/search";
import { Upload as UploadIcon } from "../../../icons/upload";
import { gtm } from "../../../lib/gtm";
import CreateUserDialog from "../../../components/dashboard/user/user-create-new";

// Fetch Users Util Function
import { userApi } from "../../../api/users-api";

import { LoadingSkeleton } from "../../../components/dashboard/dashboard-wait-for-data-loader";
import { WithFetchData } from "../../../hocs/with-fech-data";

const sortOptions = [
  {
    label: "Last update (newest)",
    value: "updatedAt|desc",
  },
  {
    label: "Last signed in (oldest)",
    value: "updatedAt|asc",
  },
  {
    label: "Active",
    value: "orders|desc",
  },
  {
    label: "Total Questionaires (lowest)",
    value: "orders|asc",
  },
];

const applyFilters = (users, filters) =>
  users?.filter((user) => {
    if (filters.query) {
      let queryMatched = false;
      const properties = ["email", "phone", "status", "firstname", "lastname"];

      properties.forEach((property) => {
        if (
          user[property].toLowerCase().includes(filters.query.toLowerCase())
        ) {
          queryMatched = true;
        }
      });

      if (!queryMatched) {
        return false;
      }
    }

    if (filters.hasAcceptedMarketing && !user.hasAcceptedMarketing) {
      return false;
    }

    if (filters.isProspect && !user.isProspect) {
      return false;
    }

    if (filters.isReturning && !user.isReturning) {
      return false;
    }

    return true;
  });

const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }

  if (b[orderBy] > a[orderBy]) {
    return 1;
  }

  return 0;
};

const getComparator = (order, orderBy) =>
  order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);

const applySort = (users, sort) => {
  const [orderBy, order] = sort.split("|");
  const comparator = getComparator(order, orderBy);
  const stabilizedThis = users.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const newOrder = comparator(a[0], b[0]);

    if (newOrder !== 0) {
      return newOrder;
    }

    return a[1] - b[1];
  });

  return stabilizedThis.map((el) => el[0]);
};

const applyPagination = (customers, page, rowsPerPage) =>
  customers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

const UserList = (props) => {
  const isMounted = useMounted();
  const queryRef = useRef(null);
  const { data: users, loading, handleFetchData } = props;
  // const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sort, setSort] = useState(sortOptions[0].value);
  const [filters, setFilters] = useState({
    query: "",
    hasAcceptedMarketing: null,
    isProspect: null,
    isReturning: null,
  });
  // const router = useRouter();

  const [openUserDialog, setOpenUserDialog] = useState(false);

  const handleOpenUserDialog = () => setOpenUserDialog(true);
  const handleCloseUserDialog = () => setOpenUserDialog(false);

  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);

  const handleQueryChange = (event) => {
    event.preventDefault();
    setFilters((prevState) => ({
      ...prevState,
      query: queryRef.current?.value,
    }));
  };

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  // Usually query is done on backend with indexing solutions
  const filteredUsers = applyFilters(users || [], filters);
  const sortedUsers = applySort(filteredUsers, sort);
  const paginatedUsers = applyPagination(
    sortedUsers,
    page,
    rowsPerPage
  );

  return (
    <>
      <Head>
        <title>Dashboard: Users List | AiCollect</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <CreateUserDialog
          open={openUserDialog}
          handleClose={handleCloseUserDialog}
          users={users || []}
          getClientUsers={handleFetchData}
        />
        <Container maxWidth="xl">
          <Box sx={{ mb: 4 }}>
            <Grid container justifyContent="space-between" spacing={3}>
              <Grid item>
                <Typography variant="h5">Users</Typography>
              </Grid>
              <Grid item>
                <Button
                  startIcon={<GroupAddIcon fontSize="small" />}
                  variant="contained"
                  onClick={handleOpenUserDialog}
                >
                  Create User
                </Button>
              </Grid>
            </Grid>
            <Box
              sx={{
                m: -1,
                mt: 3,
              }}
            >
              <Button startIcon={<UploadIcon fontSize="small" />} sx={{ m: 1 }}>
                Import
              </Button>
              {/* <Button
                startIcon={<DownloadIcon fontSize="small" />}
                sx={{ m: 1 }}
              >
                Export
              </Button> */}
            </Box>
          </Box>
          <Card>
            {!loading ? (
              <UserListTable
                customers={paginatedUsers}
                customersCount={filteredUsers.length}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                rowsPerPage={rowsPerPage}
                page={page}
              />
            ) : (
              <LoadingSkeleton />
            )}
          </Card>
        </Container>
      </Box>
    </>
  );
};

const UserListWithLayout = WithFetchData(userApi.getUsers, null)(UserList);

UserListWithLayout.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default UserListWithLayout;
