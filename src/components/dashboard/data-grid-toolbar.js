import {
    GridToolbarContainer,
    GridToolbarExport,
    GridToolbarFilterButton,
    GridToolbarColumnsButton,
    GridToolbarQuickFilter
  } from '@mui/x-data-grid-premium';
  import { Box,} from "@mui/material";
import { useExcelExport } from '../../hooks/excel-export';

export function DataGridToolbar() {
    return (
      <GridToolbarContainer style={{display:"flex",justifyContent:"space-between"}}>
        <Box>
          <GridToolbarColumnsButton/>
          <GridToolbarFilterButton/>
          <GridToolbarExport />
        </Box>
        <Box >
          <GridToolbarQuickFilter/>
        </Box>
      </GridToolbarContainer>
    );
}


export function DataGridToolbarWithDependacy() {
    const { details } = useExcelExport()
    function exceljsPreProcess({ workbook, worksheet }) {
        workbook.created = new Date(); // Add metadata
        worksheet.name = 'All Responses'; // Modify worksheet name

        if(details.depedancyTabs){
            details.depedancyTabs.forEach(tab => {
                console.log("Tab Found : ", tab);
                const sheet = workbook.addWorksheet(tab.name, {

                    headerFooter:{firstHeader: tab.name, firstFooter: tab.name},
                    

                });
                sheet.columns =  [...tab.columns]
                const rows = sheet.addRows([...tab.rows]);
                console.log(rows);
                
            });
        }

      }

    return (
      <GridToolbarContainer style={{display:"flex",justifyContent:"space-between"}}>
        <Box>
          <GridToolbarColumnsButton/>
          <GridToolbarFilterButton/>
          <GridToolbarExport
          excelOptions={{
            includeHeaders:true,
            fileName: "Responses For Questionaire",
            exceljsPreProcess:exceljsPreProcess,
          }}
          />
        </Box>
        <Box >
          <GridToolbarQuickFilter/>
        </Box>
      </GridToolbarContainer>
    );
}