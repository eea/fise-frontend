/**
 * Navigation reducer.
 * @module reducers/frontpage_slides
 */

import { map } from 'lodash';

import { GET_NEWS } from '~/constants/ActionTypes';

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
export default function news(
  state = initialState,
  action = {},
) {
  switch (action.type) {
    case `${GET_NEWS}_PENDING`:
      return {
        ...state,
        error: null,
        loaded: false,
        loading: true,
      };
    case `${GET_NEWS}_SUCCESS`:
      return {
        ...state,
        error: null,
        items: map(action.result.items, item => ({
          id: item['@id'],
          date: item.created,
          type: item['@type'],
          title: item.title,
          image: item.image ? item.image.download : null,
          description: item.description,
          text: item.text,
          topics: item.topics
        })).sort((a, b) => {
          return new Date(b.date) - new Date(a.date) 
        }),
        loaded: true,
        loading: false,
      };
    case `${GET_NEWS}_FAIL`:
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
