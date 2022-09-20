import React, { useState } from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  Paper,
  Box,
  Container
} from '@mui/material'
import ResultsDataTable from './ResultsDataTable.js'
import { Grid } from '@mui/material'
import FacetChips from './FacetChips'
import './App.css'
import { ThemeProvider } from '@mui/material/styles'
import TypeAheadSearch from './TypeAheadSearch.js'
import FacetAutocomplete from './FacetAutocomplete.js'
import theme from './CustomTheme.js'
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState([])
  const [selectedResult, setSelectedResult] = useState([])
  const [cuisines, setCuisines] = useState([])
  const [selectedCuisine, setSelectedCuisine] = useState([])
  const [boroughs, setBoroughs] = useState([])
  const [selectedBorough, setSelectedBorough] = useState([])
  const [facetResults, setFacetResults] = useState([])

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        {/* header */}
        <AppBar color="primary" position="sticky">
          <Toolbar>
            <Typography variant="h3" color="inherit">
              NYC Restaurant Search
            </Typography>
          </Toolbar>
        </AppBar>

        <Container maxWidth="lg">
          <Box>
            {/* Search Fields */}
            <TypeAheadSearch
              results={results}
              setResults={setResults}
              selectedCuisine={selectedCuisine}
              selectedBorough={selectedBorough}
              setFacetResults={setFacetResults}
              setSelectedResult={setSelectedResult}
              setSearchTerm={setSearchTerm}
              setBoroughs={setBoroughs}
              setCuisines={setCuisines}
            ></TypeAheadSearch>

            {/* Facets */}
            <Grid container sx={{ pt: 2 }}>
              <Grid item xs={6}>
                <Paper elevation={0}>
                  {/* Cuisine Facet */}
                  <FacetAutocomplete
                    selected={selectedCuisine}
                    options={cuisines}
                    setter={setSelectedCuisine}
                    label="Cuisine"
                  ></FacetAutocomplete>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper elevation={0}>
                  {/* Borough facet */}
                  <FacetAutocomplete
                    selected={selectedBorough}
                    options={boroughs}
                    setter={setSelectedBorough}
                    label="Borough"
                  ></FacetAutocomplete>
                </Paper>
              </Grid>
            </Grid>
            <FacetChips facets={facetResults} />
            <ResultsDataTable results={results}></ResultsDataTable>
            <MapContainer
              center={[51.505, -0.09]}
              zoom={13}
              size={500}
              scrollWheelZoom={false}
              // placeholder={<MapPlaceholder />}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[51.505, -0.09]}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
            </MapContainer>
          </Box>
        </Container>
      </div>
    </ThemeProvider>
  )
}

export default App
