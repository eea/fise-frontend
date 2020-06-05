/**
 * Navigation reducer.
 * @module reducers/frontpage_slides
 */

import { SET_CURRENT_VERSION } from '~/constants/ActionTypes';

const initialState = {
  error: null,
  items: {},
  loaded: false,
  loading: false,
};

/**
 * Navigation reducer.
 * @function navigation
 * @param {Object} state Current state.
 * @param {Object} action Action to be handled.
 * @returns {Object} New state.
 */
export default function current_version(state = initialState, action = {}) {
  if (action.type === SET_CURRENT_VERSION) {
    return {
      ...state,
      error: null,
      items: action.payload,
      loaded: true,
      loading: false,
    };
  }
  return state;
}
