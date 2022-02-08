import { Grid, TableContainer, TableCell, TableRow, TableHead, TableBody, Table, Paper } from '@mui/material';

function createData(name, unitPrice, orderCount, quantity, amount, date) {
  return { name, unitPrice, orderCount, quantity, amount, date };
}

const rows = [
  createData('Coffee', 159, 6.0, 24, 4.0, '20/01/2022')
];


export default function FarmerPuchases() {
  return (
    <Grid container display="flex" flexDirection="row" spacing={2}>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell align="right">Unit Price</TableCell>
            <TableCell align="right">Order Count</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.date}
              </TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.unitPrice}</TableCell>
              <TableCell align="right">{row.orderCount}</TableCell>
              <TableCell align="right">{row.quantity}</TableCell>
              <TableCell align="right">{row.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Grid>
  )
}