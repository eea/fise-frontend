/**
 * Facets reducer.
 * @module reducers/facets/facets
 */
const initialState = {
  error: null,
  loaded: false,
  loading: false,
  keywords: [],
  country: [],
  dataSet: [],
  dataType: [],
  countries: [],
  language: [],
  nutsLevel: [],
  resourceType: [],
  topicCategory: [],
  publicationYears: [],
  search: []
};

let newState = {};

/**
 * Facets reducer.
 * @function facets
 * @param {Object} state Current state.
 * @param {Object} action Action to be handled.
 * @returns {Object} New state.
 */
export const nfiFacets = (state = initialState, action = {}) => {
  switch (action.type) {
    case `${action.baseType}_PENDING`:
      newState = {
        ...state,
        loading: true,
        loaded: false
      };
      return newState;
    case `${action.baseType}_SUCCESS`:
      newState = {
        ...state,
        loading: false,
        loaded: true
      };
      newState[action.stateToChange] = action.result;
      return newState;
    case `${action.baseType}_FAIL`:
      newState = {
        ...state,
        error: action.error,
        loading: false,
        loaded: false
      };
      newState[action.stateToChange] = [];
      return newState;
    default:
      return state;
  }
}