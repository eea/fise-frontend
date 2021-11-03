import { SET_FOLDER_TABS } from '~/constants/ActionTypes';

const initialState = {
  error: null,
  items: null,
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
export default function folder_tabs(state = initialState, action = {}) {
  if (action.type === SET_FOLDER_TABS) {
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
