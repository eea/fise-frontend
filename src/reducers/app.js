import { SET_LOADER } from '~/constants/ActionTypes';
/**
 * Facets reducer.
 * @module reducers/facets/facets
 */
const initialState = {
  loader: false
};

let newState = {};

/**
 * Facets reducer.
 * @function facets
 * @param {Object} state Current state.
 * @param {Object} action Action to be handled.
 * @returns {Object} New state.
 */
export const app = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_LOADER:
      newState = {
        ...state,
        loader: action.payload
      };
      return newState;
    default:
      return state;
  }
}