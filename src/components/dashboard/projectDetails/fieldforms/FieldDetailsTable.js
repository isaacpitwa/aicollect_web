import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Box, Button, Checkbox, IconButton,  } from "@mui/material";
import ButtonGroup from '@mui/material/ButtonGroup';

import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import {
  DataGridPremium,
} from '@mui/x-data-grid-premium';

import {DataGridToolbar} from '../../data-grid-toolbar'
export const FieldDetailsTable = (props) => {
  const {
    customers,
    customersCount,
    onPageChange,
    onRowsPerPageChange,
    page,
    rowsPerPage,
    responses,
    questionaire,
    ...other
  } = props;
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const { setDetails } = useExcelExport();

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
            ><IconButton component="a"><RemoveRedEyeIcon fontSize="small" /></IconButton></NextLink>
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
      if (responses.length) {
        setTableColumns(getColumns());
        const tabs = getDependancyTabs()
        setDepedancyQtns(getDependancyTabs())
        updateExporter(tabs)
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
      "ID": response.code? response.code.toUpperCase(): 'N/A',
      "Name Of Respondent": response.person ? response.person: 'N/A',
      "Field Name": response.name ? response.name: 'N/A',
    }
    // Loop sections
    for (let i = 0; i < response.answers.length; i++) {
      // loop through formfields
      for (let j = 0; j < response.answers[i].components.length; j++) {
        const formField = response.answers[i].components[j];
        if (formField.type === 'sub-section' && formField.dependency === null) {
          if (formField.components) {
            //  loop through sub-section Formfields
            for (let k = 0; k < formField.components.length; k++) {
              const subsectionFormField = formField.components[k];
              if (subsectionFormField.type === 'select-box') {
                formattedResponse = { ...formattedResponse, [subsectionFormField.label + `-(${formField.label})`]: subsectionFormField.values.filter((item) => item.checked).map((item) => item.label).toString() }
              }
              else if (subsectionFormField.type === 'date') {
                formattedResponse = { ...formattedResponse, [subsectionFormField.label + `-(${formField.label})`]: new Date(subsectionFormField.value).toLocaleDateString("en-US") }
              }
              else {
                formattedResponse = { ...formattedResponse, [subsectionFormField.label + `-(${formField.label})`]: subsectionFormField.value }
              }
            }
          }
        } else if (formField.type === 'select-box') {
          formattedResponse = { ...formattedResponse, [formField.label]: formField.values.filter((item) => item.checked).map((item) => item.label).toString() }
        } else if (formField.type === 'date') {
          formattedResponse = { ...formattedResponse, [formField.label]: new Date(formField.value).toLocaleDateString("en-US") }
        }
        else {
          formattedResponse = { ...formattedResponse, [formField.label]: formField.value }
        }
      }
    }

    return formattedResponse;
  }

  const getColumns = () => {
    let currentcolumns = [...columns,];
    // Loop sections
    if (responses.length) {
      const response = responses[responses.length - 1]
      for (let i = 0; i < response.answers.length; i++) {
        // loop through formfields
        for (let j = 0; j < response.answers[i].components.length; j++) {
          const formField = response.answers[i].components[j];

          if (formField.type === 'sub-section') {
            if (formField.components && formField.dependency === null) {
              //  loop through sub-section Formfields
              for (let k = 0; k < formField.components.length; k++) {
                const subsectionFormField = formField.components[k];
                currentcolumns = [...currentcolumns, { field: `${subsectionFormField.label}-(${formField.label})`, headName: subsectionFormField.label.split(' ').join(''), width: 150 }]
              }
            }
          } else {
            currentcolumns = [...currentcolumns, { field: formField.label, headName: formField.label.split(' ').join(''), width: 150 }]

          }

        }
      }
    }

    return currentcolumns;
  }

  const updateExporter = async (currentTabs) =>{
    console.log("Executing Set function");
    await  setDetails({
       depedancyTabs:[...currentTabs.map((tab)=>{ return {name:tab.title, rows :[...tab.responses].reverse(), columns: tab.questions}})
     ],
     questionaire: questionaire.name
    })
   }

  const getDependancyTabs = () => {
    let currentTabs = [];
    const mustColumns = [{
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
            ><IconButton component="a"><RemoveRedEyeIcon fontSize="small" /></IconButton></NextLink>
            <IconButton onClick={onClick}><LocalPrintshopIcon fontSize="small" /></IconButton>
          </div>
        );
      }
    }, { field: "Date Submitted", headName: "date", width: 150 }, { field: "Submitted By", headName: "SubmittedBy", width: 150 },

    ]
    if (responses.length) {
      for (let res = 0; res < responses.length; res++) {
        for (let i = 0; i < responses[res].answers.length; i++) {
          // loop through formfields
          for (let j = 0; j < responses[res].answers[i].components.length; j++) {
            const formField = responses[res].answers[i].components[j];
            if (formField.type === 'sub-section' && formField.dependency !== null && formField.display === 'visible') {
              if (formField.components) {
                //  loop through sub-section Formfields
                console.log("===> Tab Gotten : ", formField.label);
                currentTabs = [...currentTabs, { title: `${formField.label.split('-')[0]}` }].filter((value, index, self) =>
                  index === self.findIndex((t) => (
                    t.title === value.title
                  )));
                  console.log("===> Tab Gotten  and Added: ", currentTabs.length );
                currentTabs = currentTabs.map((tab) => {
                  if (tab.title === formField.label.split('-')[0]) {
                    const readyQtns = tab.questions ? tab.questions : [...mustColumns];
                    const readyRes = tab.responses ? tab.responses : [];
                    let response = {
                      id: readyRes.length,       "Date Submitted": new Date(responses[res].submittedOn).toLocaleDateString("en-US"),
                      "Submitted By": responses[res].submittedBy.name,
                    }, qtns = [];
                    for (let k = 0; k < formField.components.length; k++) {
                      const subsectionFormField = formField.components[k];
                      qtns.push({ field: subsectionFormField.label, headName: subsectionFormField.label.split(' ').join(''), width: 180 });
                      if (subsectionFormField.type === 'select-box') {
                        response = { ...response, [subsectionFormField.label]: subsectionFormField.values.filter((item) => item.checked).map((item) => item.label).toString() };
                      }
                      else if (subsectionFormField.type === 'date') {
                        response = { ...response, [subsectionFormField.label]: new Date(subsectionFormField.value).toLocaleDateString("en-US") };
                      }
                      else {
                        response = { ...response, [subsectionFormField.label]: subsectionFormField.value };
                      }
                    }
                    tab.questions = [...readyQtns, ...qtns].filter((value, index, self) => index === self.findIndex((t) => (t.field === value.field)))
                    tab.responses = [...readyRes, { ...response }]
                    return tab;
                  }
                  return tab
                });



              }
            }
            else if (formField.type === 'data-grid' && formField.multipleValuesData && formField.multipleValuesData.length >0 && formField.display === 'visible') {
              if (formField.components) {  
                //  loop through sub-section Formfields
                console.log("===> Tab Gotten : ", formField.label);
                currentTabs = [...currentTabs, { title: `${formField.label}` }].filter((value, index, self) =>
                  index === self.findIndex((t) => (
                    t.title === value.title
                  )));
                  console.log("===> Tab Gotten  and Added: ", currentTabs.length );
                currentTabs = currentTabs.map((tab) => {
                  if (tab.title === formField.label) {
                    const readyQtns = tab.questions ? tab.questions : [...mustColumns];
                    const readyRes = tab.responses ? tab.responses : [];
                    let response = {
                      id: readyRes.length,
                      "Date Submitted": new Date(responses[res].submittedOn).toLocaleDateString("en-US"),
                      "Submitted By":  Utils.capitalizeFirstLetter(responses[res].submittedBy.name),
                      "ID": responses[res].region? `${responses[res].region.prefix }-${ String(responses[res].prefix_id ).padStart(5, '0')}`: 'N/A',
                      "Name Of Respondent": responses[res].person ? responses[res].person: 'N/A',
                    }, qtns = [];
                    for (let k = 0; k < formField.multipleValuesData.length; k++) {
                      for(let l=0;l<formField.multipleValuesData[k].length;l++){
                        const subsectionFormField = formField.multipleValuesData[k][l];
                        qtns.push({ field: subsectionFormField.label, headName: subsectionFormField.label, width: 180 });
                        if (subsectionFormField.type === 'select-box') {
                          response = { ...response, [subsectionFormField.label]: subsectionFormField.values.filter((item) => item.checked).map((item) => item.label).toString() };
                        }
                        else if (subsectionFormField.type === 'date') {
                          response = { ...response, [subsectionFormField.label]: new Date(subsectionFormField.value).toLocaleDateString("en-US") };
                        }
                        else {
                          response = { ...response, [subsectionFormField.label]: subsectionFormField.value };
                        }
                      }
                    }
                    tab.questions = [...readyQtns, ...qtns].filter((value, index, self) => index === self.findIndex((t) => (t.field === value.field)))
                    tab.responses = [...readyRes, { ...response }]
                    return tab;
                  }
                  return tab
                });

              }
            }
          }
        }
      }


    }

    return currentTabs;
  }

  const enableBulkActions = selectedCustomers.length > 0;
  const selectedSomeCustomers =
    selectedCustomers.length > 0 && selectedCustomers.length < customers.length;
  const selectedAllCustomers = selectedCustomers.length === customers.length;
  //  setTableColumns(getColumns());
  const formattedResponses = responses.map((response) => ({ ...formatResponse(response) }));
  const [tableColumns, setTableColumns] = useState(getColumns());
  const [depedancyQtns, setDepedancyQtns] = useState(getDependancyTabs());
  const [selectedDepTab, setSelectedDepTab] = useState({ notSelected: true });
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
      <div style={{ height: "60vh", width: "100%" }}>
        {
          selectedDepTab.notSelected ? <DataGridPremium
            rows={formattedResponses.reverse()}
            columns={tableColumns}
            components={{
              Toolbar: DataGridToolbar,
            }}
            filterModel={filterModel}
            onFilterModelChange={(newFilterModel) =>
              setFilterModel(newFilterModel)
            }
            pagination
          /> :
            <DataGridPremium
              rows={[...selectedDepTab.responses].reverse()}
              columns={selectedDepTab.questions}
              components={{
                Toolbar: DataGridToolbar,
              }}
              filterModel={filterModel}
              onFilterModelChange={(newFilterModel) =>
                setFilterModel(newFilterModel)
              }
              pagination
            />
        }

      </div>
      <ButtonGroup variant="contained" aria-label="outlined primary button group">
        {
          depedancyQtns.map(((depQtn) => <Button key={depQtn.title} onClick={() => {selectedDepTab.title === depQtn.title? setSelectedDepTab({ notSelected: true }): setSelectedDepTab(depQtn);}} style={  selectedDepTab.title === depQtn.title?{
            
          }:{opacity:0.7}}>{depQtn.title}</Button>))
        }
      </ButtonGroup>
      {/* </Scrollbar> */}
    </div>
  );
};

FieldDetailsTable.propTypes = {
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
