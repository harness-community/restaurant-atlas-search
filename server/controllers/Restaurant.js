import db from '../db/db.js'
import { RestaurantSchema } from '../models/Restaurant.js'

export default class RestaurantController {
  #restaurants
  constructor() {
    this.#restaurants = db.model('product', RestaurantSchema, 'restaurants')
  }

  async getCuisines(req, res) {
    const data = await this.#restaurants.distinct('cuisine')
    return data
  }

  async getBoroughs(req, res) {
    const data = await this.#restaurants.distinct('borough')
    return data
  }

  async fuzzyAutocompleteSearchOnName(req, res) {
    const data = await this.#restaurants
      .aggregate()
      .search({
        autocomplete: {
          // adding facets to add categories
          query: req.params.term,
          fuzzy: {
            maxEdits: 2,
            prefixLength: 3
          },
          path: 'name'
        }
      })
      .addFields({
        avgScore: {
          $map: {
            input: '$grades.grade',
            in: {
              $switch: {
                branches: [
                  {
                    case: {
                      $eq: ['$$this', 'A']
                    },
                    then: 5
                  },
                  {
                    case: {
                      $eq: ['$$this', 'B']
                    },
                    then: 4
                  },
                  {
                    case: {
                      $eq: ['$$this', 'C']
                    },
                    then: 3
                  },
                  {
                    case: {
                      $eq: ['$$this', 'D']
                    },
                    then: 2
                  }
                ],
                default: 1
              }
            }
          }
        }
      })
      .addFields({
        avgScore: {
          $round: [
            {
              $avg: '$avgScore'
            }
          ]
        }
      })
      .addFields({
        avgScoreLetter: {
          $switch: {
            branches: [
              {
                case: {
                  $eq: ['$avgScore', 5]
                },
                then: 'A'
              },
              {
                case: {
                  $eq: ['$avgScore', 4]
                },
                then: 'B'
              },
              {
                case: {
                  $eq: ['$avgScore', 3]
                },
                then: 'C'
              },
              {
                case: {
                  $eq: ['$avgScore', 2]
                },
                then: 'D'
              }
            ],
            default: 'F'
          }
        }
      })

    return data
  }

  async getFacetedSearchResults(req, res) {
    const data = await this.#restaurants.aggregate([
      {
        $searchMeta: {
          facet: {
            operator: {
              text: {
                query: req.params.term,
                path: ['name', 'cuisine']
              }
            },
            facets: {
              cuisine: {
                type: 'string',
                path: 'cuisine'
              },
              borough: {
                type: 'string',
                path: 'borough'
              }
            }
          }
        }
      }
    ])
    return data
  }
  

  async fuzzyAutocompleteSearchOnNameWithFacets(req, res) {
    let data
    if (req.params.cuisine !== '*' && req.params.borough === '*') {
      data = await this.#restaurants
      .aggregate()
      .search({
        autocomplete: {
          query: req.params.term,
          fuzzy: {
            maxEdits: 2,
            prefixLength: 3
          },
          path: 'name'
        }
      })
      .match({
        cuisine: req.params.cuisine
      })
      .addFields({
        avgScore: {
          $map: {
            input: '$grades.grade',
            in: {
              $switch: {
                branches: [
                  {
                    case: {
                      $eq: ['$$this', 'A']
                    },
                    then: 5
                  },
                  {
                    case: {
                      $eq: ['$$this', 'B']
                    },
                    then: 4
                  },
                  {
                    case: {
                      $eq: ['$$this', 'C']
                    },
                    then: 3
                  },
                  {
                    case: {
                      $eq: ['$$this', 'D']
                    },
                    then: 2
                  }
                ],
                default: 1
              }
            }
          }
        }
      })
      .addFields({
        avgScore: {
          $round: [
            {
              $avg: '$avgScore'
            }
          ]
        }
      })
      .addFields({
        avgScoreLetter: {
          $switch: {
            branches: [
              {
                case: {
                  $eq: ['$avgScore', 5]
                },
                then: 'A'
              },
              {
                case: {
                  $eq: ['$avgScore', 4]
                },
                then: 'B'
              },
              {
                case: {
                  $eq: ['$avgScore', 3]
                },
                then: 'C'
              },
              {
                case: {
                  $eq: ['$avgScore', 2]
                },
                then: 'D'
              }
            ],
            default: 'F'
          }
        }
      })
    }
    if (req.params.cuisine === '*' && req.params.borough !== '*') {
      data = await this.#restaurants
        .aggregate()
        .search({
          autocomplete: {
            query: req.params.term,
            fuzzy: {
              maxEdits: 2,
              prefixLength: 3
            },
            path: 'name'
          }
        })
        .match({
          borough: req.params.borough
        })
        .addFields({
          avgScore: {
            $map: {
              input: '$grades.grade',
              in: {
                $switch: {
                  branches: [
                    {
                      case: {
                        $eq: ['$$this', 'A']
                      },
                      then: 5
                    },
                    {
                      case: {
                        $eq: ['$$this', 'B']
                      },
                      then: 4
                    },
                    {
                      case: {
                        $eq: ['$$this', 'C']
                      },
                      then: 3
                    },
                    {
                      case: {
                        $eq: ['$$this', 'D']
                      },
                      then: 2
                    }
                  ],
                  default: 1
                }
              }
            }
          }
        })
        .addFields({
          avgScore: {
            $round: [
              {
                $avg: '$avgScore'
              }
            ]
          }
        })
        .addFields({
          avgScoreLetter: {
            $switch: {
              branches: [
                {
                  case: {
                    $eq: ['$avgScore', 5]
                  },
                  then: 'A'
                },
                {
                  case: {
                    $eq: ['$avgScore', 4]
                  },
                  then: 'B'
                },
                {
                  case: {
                    $eq: ['$avgScore', 3]
                  },
                  then: 'C'
                },
                {
                  case: {
                    $eq: ['$avgScore', 2]
                  },
                  then: 'D'
                }
              ],
              default: 'F'
            }
          }
        })
    }
    if (req.params.cuisine !== '*' && req.params.borough !== '*') {
      data = await this.#restaurants
        .aggregate()
        .search({
          autocomplete: {
            query: req.params.term,
            fuzzy: {
              maxEdits: 2,
              prefixLength: 3
            },
            path: 'name'
          }
        })
        .match({
          cuisine: req.params.cuisine
        })
        .match({
          borough: req.params.borough
        })
        .addFields({
          avgScore: {
            $map: {
              input: '$grades.grade',
              in: {
                $switch: {
                  branches: [
                    {
                      case: {
                        $eq: ['$$this', 'A']
                      },
                      then: 5
                    },
                    {
                      case: {
                        $eq: ['$$this', 'B']
                      },
                      then: 4
                    },
                    {
                      case: {
                        $eq: ['$$this', 'C']
                      },
                      then: 3
                    },
                    {
                      case: {
                        $eq: ['$$this', 'D']
                      },
                      then: 2
                    }
                  ],
                  default: 1
                }
              }
            }
          }
        })
        .addFields({
          avgScore: {
            $round: [
              {
                $avg: '$avgScore'
              }
            ]
          }
        })
        .addFields({
          avgScoreLetter: {
            $switch: {
              branches: [
                {
                  case: {
                    $eq: ['$avgScore', 5]
                  },
                  then: 'A'
                },
                {
                  case: {
                    $eq: ['$avgScore', 4]
                  },
                  then: 'B'
                },
                {
                  case: {
                    $eq: ['$avgScore', 3]
                  },
                  then: 'C'
                },
                {
                  case: {
                    $eq: ['$avgScore', 2]
                  },
                  then: 'D'
                }
              ],
              default: 'F'
            }
          }
        })
    }
    if (req.params.cuisine === '*' && req.params.borough === '*') {
      data = await this.#restaurants
        .aggregate()
        .search({
          autocomplete: {
            query: req.params.term,
            fuzzy: {
              maxEdits: 2,
              prefixLength: 3
            },
            path: 'name'
          }
        })
        .addFields({
          avgScore: {
            $map: {
              input: '$grades.grade',
              in: {
                $switch: {
                  branches: [
                    {
                      case: {
                        $eq: ['$$this', 'A']
                      },
                      then: 5
                    },
                    {
                      case: {
                        $eq: ['$$this', 'B']
                      },
                      then: 4
                    },
                    {
                      case: {
                        $eq: ['$$this', 'C']
                      },
                      then: 3
                    },
                    {
                      case: {
                        $eq: ['$$this', 'D']
                      },
                      then: 2
                    }
                  ],
                  default: 1
                }
              }
            }
          }
        })
        .addFields({
          avgScore: {
            $round: [
              {
                $avg: '$avgScore'
              }
            ]
          }
        })
        .addFields({
          avgScoreLetter: {
            $switch: {
              branches: [
                {
                  case: {
                    $eq: ['$avgScore', 5]
                  },
                  then: 'A'
                },
                {
                  case: {
                    $eq: ['$avgScore', 4]
                  },
                  then: 'B'
                },
                {
                  case: {
                    $eq: ['$avgScore', 3]
                  },
                  then: 'C'
                },
                {
                  case: {
                    $eq: ['$avgScore', 2]
                  },
                  then: 'D'
                }
              ],
              default: 'F'
            }
          }
        })
    }

    return data
  }
}
