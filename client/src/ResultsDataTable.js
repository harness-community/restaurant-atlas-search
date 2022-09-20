import React from 'react'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

export default class ResultsDataTable extends React.Component {
  StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#1B2E49',
      color: theme.palette.common.white
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14
    }
  }))

  StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0
    }
  }))

  render() {
    if (this.props.results && this.props.results[0]) {
      return (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <this.StyledTableCell>Restaurant</this.StyledTableCell>
                <this.StyledTableCell align="right">
                  Cuisine
                </this.StyledTableCell>
                <this.StyledTableCell align="right">
                  Average Grade
                </this.StyledTableCell>
                <this.StyledTableCell align="right">
                  Address
                </this.StyledTableCell>
                <this.StyledTableCell align="right">
                  Borough
                </this.StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.results.map((row) => (
                <this.StyledTableRow key={row._id}>
                  <this.StyledTableCell component="th" scope="row">
                    {row.name}
                  </this.StyledTableCell>
                  <this.StyledTableCell align="right">
                    {row.cuisine}
                  </this.StyledTableCell>
                  <this.StyledTableCell align="right">
                    {row.avgScoreLetter}
                  </this.StyledTableCell>
                  <this.StyledTableCell align="right">
                    {row.address.building +
                      ' ' +
                      row.address.street +
                      ' ' +
                      row.address.zipcode +
                      ' (' +
                      row.borough +
                      ')'}
                  </this.StyledTableCell>
                  <this.StyledTableCell align="right">
                    {row.borough}
                  </this.StyledTableCell>
                </this.StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )
    }
  }
}
