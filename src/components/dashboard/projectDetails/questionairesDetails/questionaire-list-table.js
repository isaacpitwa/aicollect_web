import { useEffect, useState } from "react";
import { Link } from 'next/link';
import PropTypes from "prop-types";
import { Box, Button, Checkbox, IconButton } from "@mui/material";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";

const VISIBLE_FIELDS = ["action", "date", "code", "name", "contact"];
const rows = [
  {
    id: 1,
    Date: "10-10-21",
    Code: "DIN",
    "Name of respondent": "Mukisa Dan",
    Contact: "07464373",
    Location: "Kyenjojo",
    DOB: '10-6-97',
    Gender: 'Male',
    "Main Crop": 'Matooke',
    "Number of plots": 5,
    totalAccrage: 10,
    "Yeild Estimate": 36
  },
  {
    id: 2,
    Date: "10-10-21",
    Code: "DIN",
    "Name of respondent": "Kityo Samuel",
    Contact: "07464373",
    Location: "Rukungiri",
    DOB: '10-6-97',
    Gender: 'Male',
    "Main Crop": 'Coffee',
    "Number of plots": 8,
    "Total Accrage": 100,
    "Yield Estimate": 150
  },
];

const columns = [
  { 
    field: "action",
    headerName: "Action",
    width: 80,
    sortable: false,
    renderCell: (params) => {
      const onClick = (e) => {
        e.stopPropagation(); // don't select this row after clicking

        const api = params.api;
        const thisRow= {};

        api
          .getAllColumns()
          .filter((c) => c.field !== "__check__" && !!c)
          .forEach(
            (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
          );

        return alert(JSON.stringify(thisRow, null, 4));
      };

      return (
        <div style={{ display: 'flex', flexDirection: 'row', border: 0, margin: 0 }}>
          <IconButton role="link" href="/dashboard/projects/43/questionaire/6/mukisa"><RemoveRedEyeIcon fontSize="small" /></IconButton>
          <IconButton onClick={onClick}><LocalPrintshopIcon fontSize="small" /></IconButton>
        </div>
      );
    }
  },
  { field: "Date", headName: "date", width: 150 },
  { field: "Code", headName: "code", width: 150 },
  { field: "Name of respondent", headName: "nameofrespondent", width: 150 },
  { field: "Contact", headName: "Contact", width: 150 },
  { field: "Location", headName: "Location", width: 150 },
  { field: "DOB", headName: "DOB", width: 150 },
  { field: "Gender", headName: "Gender", width: 150 },
  { field: "Main Crop", headName: "Main Crop", width: 150 },
  { field: "Number of plots", headName: "Number of plots", width: 150 },
  { field: "Total Accrage", headName: "Total Accrage", width: 150 },
  { field: "Yield Estimate", headName: "Yield Estimate", width: 150 },
];

export const QuestionaireDetailsTable = (props) => {
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
  const { data } = useDemoData({
    dataSet: "Employee",
    visibleFields: VISIBLE_FIELDS,
    rowLength: 50,
  });

  const [filterModel, setFilterModel] = useState({
    items: [
      // {
      //   columnField: "totalAccrage",
      //   operatorValue: ">",
      //   value: 5,
      // },
    ],
  });

  // Reset selected customers when customers change
  useEffect(
    () => {
      if (selectedCustomers.length) {
        setSelectedCustomers([]);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [customers]
  );

  const handleSelectAllCustomers = (event) => {
    setSelectedCustomers(
      event.target.checked ? customers.map((customer) => customer.id) : []
    );
  };

  const enableBulkActions = selectedCustomers.length > 0;
  const selectedSomeCustomers =
    selectedCustomers.length > 0 && selectedCustomers.length < customers.length;
  const selectedAllCustomers = selectedCustomers.length === customers.length;

  return (
    <div {...other}>
      <Box
        sx={{
          backgroundColor: "neutral.100",
          display: !enableBulkActions && "none",
          px: 2,
          py: 0.5,
        }}
      >
        <Checkbox
          checked={selectedAllCustomers}
          indeterminate={selectedSomeCustomers}
          onChange={handleSelectAllCustomers}
        />
        <Button size="small" sx={{ ml: 2 }}>
          Delete
        </Button>
        <Button size="small" sx={{ ml: 2 }}>
          Edit
        </Button>
      </Box>
      {/* <Scrollbar> */}
      <div style={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          components={{
            Toolbar: GridToolbar,
          }}
          filterModel={filterModel}
          onFilterModelChange={(newFilterModel) =>
            setFilterModel(newFilterModel)
          }
        />
      </div>
      {/* </Scrollbar> */}
    </div>
  );
};

QuestionaireDetailsTable.propTypes = {
  customers: PropTypes.array.isRequired,
  customersCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};
