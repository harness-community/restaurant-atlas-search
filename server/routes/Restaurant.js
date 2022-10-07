import RestaurantController from '../controllers/Restaurant.js'
export default async function routes(fastify, options) {
  const restaurantController = new RestaurantController()
  fastify.get('/restaurants/facets/cuisine', async (req, res) => {
    return await restaurantController.getCuisines(req, res)
  })

  fastify.get('/restaurants/facets/borough', async (req, res) => {
    return await restaurantController.getBoroughs(req, res)
  })

  // searches all fields (paths) for search term.
  fastify.get('/restaurant/search/:term', async (request, reply) => {
    return await restaurantController.fuzzyAutocompleteSearchOnName(
      request,
      reply
    )
  })

  fastify.get(
    '/restaurant/facet/:term/:cuisine/:borough',
    async (request, reply) => {
      console.debug("executing getFacetedSearchResults")
      return await restaurantController.getFacetedSearchResults(request, reply)
    }
  )

  fastify.get(
    '/facetSearch/facet/:term/:cuisine/:borough', async (request, reply) => {
      console.debug("executing getFacetedSearchResults")
      return await restaurantController.fuzzyAutocompleteSearchOnNameWithFacets(request, reply)
    }
  )
}
