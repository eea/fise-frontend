/**
 * Navigation reducer.
 * @module reducers/frontpage_slides
 */

import { map } from 'lodash';
import { settings } from '~/config';

import { SET_FOLDER_HEADER } from '~/constants/ActionTypes';

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
export default function folder_header(state = initialState, action = {}) {
  switch (action.type) {
    case `${SET_FOLDER_HEADER}_PENDING`:
      return {
        ...state,
        error: null,
        loaded: false,
        loading: true,
      };
    case `${SET_FOLDER_HEADER}_SUCCESS`:
      const image =
        (action.result.image && action.result.image.download) || null;
      const title = action.result.title || null;
      const description = action.result.description || null;
      const url = action.result['@id'] || null;
      return {
        ...state,
        error: null,
        items: {
          image,
          title,
          description,
          url,
        },
        loaded: true,
        loading: false,
      };
    case `${SET_FOLDER_HEADER}_FAIL`:
      return {
        ...state,
        error: action.error,
        items: [],
        loaded: false,
        loading: false,
      };
    default:
      return state;
  }
}
