import React, { useState } from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  Card,
  Paper,
  CardContent,
  TextField,
  Box,
  Container
} from '@material-ui/core'
import ResultsDataTable from './ResultsDataTable.js'
import { Grid, Autocomplete } from '@mui/material'
import FacetChips from './FacetChips'
import './App.css'
import { createTheme } from '@mui/material/styles'
import { ThemeProvider } from '@material-ui/styles'
import TypeAheadSearch from './TypeAheadSearch.js'

const theme = createTheme({
  palette: {
    primary: {
      main: '#1B2E49'
    }
  }
})

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
        <AppBar color="primary" position="static">
          <Toolbar>
            <Typography variant="h3" color="inherit">
              NYC Restaurant Search
            </Typography>
          </Toolbar>
        </AppBar>

        <Container maxWidth="lg">
          <Box
            sx={{
              paddingTop: 25
            }}
          >
            {/* Search Fields */}
            <Grid container spacing={0}>
              <Grid item xs={12}>
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
              </Grid>
            </Grid>
            {/* Buckets */}
            <Box
              sx={{
                paddingTop: 20
              }}
            >
              {/* Cuisine facet */}
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Paper elevation={0}>
                    <Autocomplete
                      sx={{ width: 1 }}
                      value={selectedCuisine}
                      options={cuisines}
                      getOptionLabel={(option) => option.value ?? ''}
                      isOptionEqualToValue={(option, value) =>
                        option.id === value.id
                      }
                      onChange={(_event, selected) => {
                        setSelectedCuisine(selected)
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          label="Cuisine"
                        />
                      )}
                    />
                  </Paper>
                </Grid>
                {/* Borough facet */}
                <Grid item xs={6}>
                  <Paper elevation={0}>
                    <Autocomplete
                      sx={{ width: 1 }}
                      value={selectedBorough}
                      options={boroughs}
                      getOptionLabel={(option) => option.value ?? ''}
                      isOptionEqualToValue={(option, value) =>
                        option.id === value.id
                      }
                      onChange={(_event, selected) => {
                        setSelectedBorough(selected)
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          label="Borough"
                        />
                      )}
                    />
                  </Paper>
                </Grid>
              </Grid>
            </Box>
            <Grid container spacing={0} justifyContent="flex-start">
              <Typography variant="h5" component="div">
                Buckets
              </Typography>
            </Grid>
            <Grid container spacing={0} justifyContent="space-between">
              <FacetChips facets={facetResults} />
            </Grid>
            {/* Results */}
            <Card>
              <CardContent>
                <ResultsDataTable results={results}></ResultsDataTable>
              </CardContent>
            </Card>
          </Box>
        </Container>
      </div>
    </ThemeProvider>
  )
}

export default App
