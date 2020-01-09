/**
 * Facets reducer.
 * @module reducers/facets/facets
 */
import { GET_KEYWORDS } from '~/constants/ActionTypes'

const initialState = {
  error: null,
  loaded: false,
  loading: false,
  keywords: [],
  originalKeywords: [],
  selectedKeywords: []
};

let newState = {}

/**
 * Facets reducer.
 * @function facets
 * @param {Object} state Current state.
 * @param {Object} action Action to be handled.
 * @returns {Object} New state.
 */
export const keywords = (state = initialState, action = {}) => {
  switch (action.type) {
    case `${GET_KEYWORDS}_PENDING`:
      newState = {
        ...state,
        loading: true,
        loaded: false
      }
      return newState
    case `${GET_KEYWORDS}_SUCCESS`:
      newState = {
        ...state,
        keywords: action.result,
        originalKeywords: action.result,
        selectedKeywords: [],
        loading: false,
        loaded: true
      }
      return newState
    case `${GET_KEYWORDS}_FAIL`:
      newState = {
        ...state,
        error: action.error,
        loading: false,
        loaded: false
      }
      newState[action.stateToChange] = []
      return newState
    default:
      return state;
  }
}