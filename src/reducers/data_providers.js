/**
 * Data Providers reducer
 * @module reducers/data_providers
 */

import { GET_DATA_FROM_PROVIDER } from '~/constants/ActionTypes';

const initialState = {
  error: null,
  item: {},
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
    case `${GET_DATA_FROM_PROVIDER}_PENDING`:
      return {
        ...state,
        error: null,
        loaded: false,
        loading: true,
      };
    case `${GET_DATA_FROM_PROVIDER}_SUCCESS`:
      console.log('Success', action.result);
      return {
        ...state,
        error: null,
        item: action.result['@components']?.['connector-data']?.data || [],
        loaded: true,
        loading: false,
      };
    case `${GET_DATA_FROM_PROVIDER}_FAIL`:
      return {
        ...state,
        error: action.error,
        item: {},
        loaded: false,
        loading: false,
      };
    default:
      return state;
  }
}
