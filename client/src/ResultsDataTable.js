import React from 'react'
import { styled } from '@mui/material/styles'
import {
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Paper,
  Grid
} from '@mui/material'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { LocationCity, Reviews, RestaurantMenu } from '@mui/icons-material'

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

  markers() {
    return this.props.results.map((result) => (
      <Marker
        position={[result.address.coord[1], result.address.coord[0]]}
        key={result._id}
      >
        <Popup>
          <div>
            <table>
              <tbody>
                <tr>
                  <td colSpan={2}>
                    <h3>{result.name}</h3>
                  </td>
                </tr>
                <tr>
                  <td style={{ width: 25 }}>
                    <RestaurantMenu />
                  </td>
                  <td>{result.cuisine}</td>
                </tr>
                <tr>
                  <td style={{ width: 25 }}>
                    <LocationCity />
                  </td>
                  <td>
                    {result.address.building} {result.address.street}, New York
                    NY, {result.address.zipcode}
                  </td>
                </tr>
                <tr>
                  <td style={{ width: 25 }}>
                    <Reviews />
                  </td>
                  <td>{result.avgScoreLetter}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Popup>
      </Marker>
    ))
  }

  render() {
    if (this.props.results && this.props.results[0]) {
      return (
        <Box sx={{ pt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
                <Table
                  stickyHeader
                  sx={{ minWidth: 200 }}
                  aria-label="customized table"
                >
                  <TableHead>
                    <TableRow>
                      <this.StyledTableCell>
                        Restaurant (Avg. Grade)
                      </this.StyledTableCell>
                      <this.StyledTableCell align="right">
                        Cuisine
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
                          {row.name} ({row.avgScoreLetter})
                        </this.StyledTableCell>
                        <this.StyledTableCell align="right">
                          {row.cuisine}
                        </this.StyledTableCell>
                        <this.StyledTableCell align="right">
                          {row.borough}
                        </this.StyledTableCell>
                      </this.StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item xs={6}>
              <MapContainer
                center={[40.758896, -73.98513]}
                zoom={12}
                scrollWheelZoom={false}
                className="map"
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {this.markers()}
              </MapContainer>
            </Grid>
          </Grid>
        </Box>
      )
    }
  }
}
