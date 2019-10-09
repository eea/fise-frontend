/**
 * Data Providers reducer
 * @module reducers/data_providers
 */

import { GET_DATA_PROVIDERS } from '~/constants/ActionTypes';

const initialState = {
  error: null,
  items: {},
  loaded: false,
  loading: false,
};

/**
 * Data providers reducer.
 * @function mosaic_settings
 * @param {Object} state Current state.
 * @param {Object} action Action to be handled.
 * @returns {Object} New state.
 */
export default function data_providers(state = initialState, action = {}) {
  switch (action.type) {
    case `${GET_DATA_PROVIDERS}_PENDING`:
      return {
        ...state,
        error: null,
        loaded: false,
        loading: true,
      };
    case `${GET_DATA_PROVIDERS}_SUCCESS`:
      return {
        ...state,
        error: null,
        items: action.result,
        loaded: true,
        loading: false,
      };
    case `${GET_DATA_PROVIDERS}_FAIL`:
      return {
        ...state,
        error: action.error,
        items: {},
        loaded: false,
        loading: false,
      };
    default:
      return state;
  }
}
