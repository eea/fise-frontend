import {
  GET_ALL_ATTACHMENTS,
  CREATE_ATTACHMENT,
} from '~/constants/ActionTypes';

const initialState = {
  error: null,
  attachments: [],
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
export default function attachments(state = initialState, action = {}) {
  switch (action.type) {
    case `${GET_ALL_ATTACHMENTS}_PENDING`:
      return {
        ...state,
        error: null,
        loaded: false,
        loading: true,
      };
    case `${GET_ALL_ATTACHMENTS}_SUCCESS`:
      console.log('Success getting attachments', action.result);
      return {
        ...state,
        error: null,
        attachments: action.result.items || [],
        loaded: true,
        loading: false,
      };
    case `${GET_ALL_ATTACHMENTS}_FAIL`:
      return {
        ...state,
        error: action.error,
        attachments: [],
        loaded: false,
        loading: false,
      };

    case `${CREATE_ATTACHMENT}_PENDING`:
      return {
        ...state,
        error: null,
        loaded: false,
        loading: true,
      };
    case `${CREATE_ATTACHMENT}_SUCCESS`:
      console.log('Success creating attachment', action.result);
      return {
        ...state,
        error: null,
        attachments: [action.result, ...state.attachments],
        loaded: true,
        loading: false,
      };
    case `${CREATE_ATTACHMENT}_FAIL`:
      return {
        ...state,
        error: action.error,
        attachments: [],
        loaded: false,
        loading: false,
      };
    default:
      return state;
  }
}
