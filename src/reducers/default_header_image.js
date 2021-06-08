/**
 * Navigation reducer.
 * @module reducers/frontpage_slides
 */

import { map } from 'lodash';

import { GET_DEFAULT_HEADER_IMAGE } from '~/constants/ActionTypes';

const initialState = {
  error: null,
  items: [],
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
export default function default_header_image(
  state = initialState,
  action = {},
) {
  switch (action.type) {
    case `${GET_DEFAULT_HEADER_IMAGE}_PENDING`:
      return {
        ...state,
        error: null,
        loaded: false,
        loading: true,
      };
    case `${GET_DEFAULT_HEADER_IMAGE}_SUCCESS`:
      return {
        ...state,
        error: null,
        items: map(action.result.items, (item) => ({
          title: item.title,
          image: item.image.download,
          description: item.description,
        })),
        loaded: true,
        loading: false,
      };
    case `${GET_DEFAULT_HEADER_IMAGE}_FAIL`:
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
