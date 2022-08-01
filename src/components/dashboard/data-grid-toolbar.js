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
    function exceljsPreProcess({ workbook, worksheet }) {
        workbook.created = new Date(); // Add metadata
        worksheet.name = 'All Responses'; // Modify worksheet name
        worksheet.columns = worksheet.columns.shift();
      }
    return (
      <GridToolbarContainer style={{display:"flex",justifyContent:"space-between"}}>
        <Box>
          <GridToolbarColumnsButton/>
          <GridToolbarFilterButton/>
          <GridToolbarExport 
            excelOptions ={{
                includeHeaders:true,
                fileName: "Responses For Questionaire",
                exceljsPreProcess,
            }}
          />
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
        worksheet.getRow(1).font = { name: 'Calibri', family: 4, size: 11, bold: true };
        worksheet.name = 'All Responses'; // Modify worksheet name
        worksheet.columns.shift();
        worksheet.views = [
          {state: 'frozen', ySplit: 1,}
        ];
       
        if(details.depedancyTabs){
            details.depedancyTabs.forEach(tab => {
                const sheet = workbook.addWorksheet(tab.name, {
                    headerFooter:{firstHeader: tab.name, firstFooter: tab.name},
                    views: [
                      {state: 'frozen',  ySplit: 1,}
                    ],
                });
                tab.columns.shift();
                sheet.columns = tab.columns.map((column)=>{
                    column.key = column.headName;
                    column.header =column.field;
                    column.width =32;
                    return column;
                });
                const rows = sheet.addRows([...tab.rows]);
                sheet.getRow(1).font = { name: 'Calibri', family: 4, size: 11, bold: true };                
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
            fileName:  details.questionaire ?? "Responses For Questionaire",
            exceljsPreProcess,
          }}
          />
        </Box>
        <Box >
          <GridToolbarQuickFilter/>
        </Box>
      </GridToolbarContainer>
    );
}