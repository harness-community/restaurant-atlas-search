const calculateActiveFacetValue = (facetData) => {
  if (facetData && typeof facetData === 'string') {
    return facetData.split(' (')[0]
  } else {
    return '*'
  }
}
export { calculateActiveFacetValue }
