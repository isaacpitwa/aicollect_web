/**
 * Converts data from an excel into JSON FORMAT
 * @param Array headers
 * @param Array data
 * @returns JSON DATA FROM EXCEL FILE
 */
export const convertToJSON = (headers, data) => {
  const rows = [];
  data.forEach((row) => {
    let rowData = {};
    row.forEach((element, index) => {
      rowData[headers[index]] = element;
    });
    rows.push(rowData);
  });
  return rows;
};
