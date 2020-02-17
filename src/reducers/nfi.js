/**
 * Facets reducer.
 * @module reducers/facets/facets
 */
const initialState = {
  error: null,
  loaded: false,
  loading: false,
  search: {},
  keyword: [],
  country: [],
  data_set: [],
  data_type: [],
  info_level: [],
  nuts_level: [],
  resource_type: [],
  topic_category: [],
  published_year: [],
  collections_range: [],
  language: []
};

let newState = {};

/**
 * Facets reducer.
 * @function facets
 * @param {Object} state Current state.
 * @param {Object} action Action to be handled.
 * @returns {Object} New state.
 */
function dynamicSort(property) {
  var sortOrder = 1;
  if(property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
  }
  return function (a,b) {
      /* next line works with strings and numbers, 
       * and you may want to customize it to your needs
       */
      var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
      return result * sortOrder;
  }
}

export const nfi = (state = initialState, action = {}) => {
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
     if (action.stateToChange === 'published_year') {
        newState[action.stateToChange] = action.result.filter(value => value).map(item => { return { id: item, name: item + '' } });
      } else if (action.stateToChange === 'collections_range') {
        const max = action.result.max ? parseInt(action.result.max) : 0;
        const min = action.result.min ? parseInt(action.result.min) : 0;
        const result = Array.from({ length: max + 1 - min }, (v, k) => { return { id: k + min, name: k + min + ''} });

        newState[action.stateToChange] = result;
      } else if (Array.isArray(action.result) && action.result.length > 0 && action.result[0].name) {
        const result = action.result.sort(dynamicSort('name'));
        newState[action.stateToChange] = result;
      } else {
        newState[action.stateToChange] = action.result;
      }
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