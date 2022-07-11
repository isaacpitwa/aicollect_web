import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Box, Button, Checkbox, IconButton, responsiveFontSizes } from "@mui/material";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import NextLink from 'next/link';
import { useRouter } from 'next/router';


export const FieldResponseSummaryTable = (props) => {
  const {
    customers,
    customersCount,
    onPageChange,
    onRowsPerPageChange,
    page,
    rowsPerPage,
    responses,
    ...other
  } = props;
  const [selectedCustomers, setSelectedCustomers] = useState([]);

  const [filterModel, setFilterModel] = useState({
    items: [
      // {
      //   columnField: "totalAccrage",
      //   operatorValue: ">",
      //   value: 5,
      // },
    ],
  });

const router = useRouter()
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
        <div style={{ display: 'flex', flexDirection: 'row', border: 0, margin: 0 }}>
          <NextLink
            href={`/dashboard/projects/${router.query.projectId}/questionaire/${router.query.questionaireId}/response/4`}
            passHref
          ><IconButton  component="a"><RemoveRedEyeIcon fontSize="small" /></IconButton></NextLink>
          <IconButton onClick={onClick}><LocalPrintshopIcon fontSize="small" /></IconButton>
        </div>
      );
    }
  },
  { field: "Submitted By", headName: "SubmittedBy", width: 150 },
  { field: "Date Submitted", headName: "date", width: 150 },
  { field: "Time Spent", headName: "timespent", width: 150 },
  { field: "Latitude", headName: "Latitude", width: 150 },
  { field: "Longitude", headName: "Longitude", width: 150 },
  { field: "GPS Accuracy", headName: "GPSAccuracy", width: 150 },
  { field: "ID", headName: "ID", width: 150 },
  { field: "Name Of Respondent", headName: "Name Of Respondent", width: 150 },
  { field: "Field Name", headName: "Field Name", width: 150 },

];

  // Reset selected customers when customers change
  useEffect(
    () => {
      if (selectedCustomers.length) {
        setSelectedCustomers([]);
      }
    //   if (responses.length) {
    //     setTableColumns(columns);
    //   }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [customers]
  );

  const handleSelectAllCustomers = (event) => {
    setSelectedCustomers(
      event.target.checked ? customers.map((customer) => customer.id) : []
    );
  };
  /**
* @function Reverse formatResponse
* @desc Responsible for transfering GPS coordinates   into an Address
* @arg {number} lat - Latitude on Location.
* @arg {number} lon - Longitude on Location.
* @returns {string} address -  Returns the Address 
* @author Isaac Pitwa <isaacpitwa256@gmail.com>
* @version 1.0.0
*/

  const formatResponse = (response) => {
    let formattedResponse = {
      id: response._id,
      "Time Spent": response.timeSpentToSubmit,
      "Submitted By": response.submittedBy.name,
      "Date Submitted": new Date(response.submittedOn).toLocaleDateString("en-US"),
      "Latitude": response.gps ?  Math.round(response.gps.latitude * 10000000) / 10000000: 'N/A',
      "Longitude": response.gps ? Math.round(response.gps.longitude * 10000000) / 10000000: 'N/A',
      "GPS Accuracy": response.gps? Math.round(response.gps.accuracy * 10) / 10: 'N/A',
      "Field Name": response.name ? response.name: 'N/A',
      "ID": response.code? response.code.toUpperCase(): 'N/A',
      "Name Of Respondent": response.person ? response.person: 'N/A',
    }
    // Loop sections
    for (let i = 0; i < response.answers.length; i++) {
      // loop through formfields
      for (let j = 0; j < response.answers[i].components.length; j++) {
        const formField = response.answers[i].components[j];
        if (formField.type === 'sub-section') {
          if (formField.components) {
            //  loop through sub-section Formfields
            for (let k = 0; k < formField.components.length; k++) {
              const subsectionFormField = formField.components[k];
              formattedResponse = { ...formattedResponse, [ formField.label+subsectionFormField.label]: subsectionFormField.value }
            }
          }
        } else {
          formattedResponse = { ...formattedResponse, [formField.label]: formField.value }
        }
      }
    }
    return formattedResponse;
  }


  const enableBulkActions = selectedCustomers.length > 0;
  const selectedSomeCustomers =
    selectedCustomers.length > 0 && selectedCustomers.length < customers.length;
  const selectedAllCustomers = selectedCustomers.length === customers.length;
  //  setTableColumns(getColumns());
  const formattedResponses = responses.map((response) => ({ ...formatResponse(response) }));
  const [tableColumns, setTableColumns] = useState(columns);
  console.log(formattedResponses);

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
          rows={formattedResponses.reverse()}
          columns={tableColumns}
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

FieldResponseSummaryTable.propTypes = {
  customers: PropTypes.array.isRequired,
  customersCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

/**
 * @function reverseGeocode
 * @desc Responsible for transfering GPS coordinates   into an Address
 * @arg {number} lat - Latitude on Location.
 * @arg {number} lon - Longitude on Location.
 * @returns {string} address -  Returns the Address 
 * @author Isaac Pitwa <isaacpitwa256@gmail.com>
 * @version 1.0.0
 */
const reverseGeocode = async (lat, lon) => {
  const res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=AIzaSyAcxgY7Qsd2W6Il6plj6utS5KssWMhLUXM`);
  const JSONres = await res.json()
  return JSONres.results[0].formatted_address;
}


