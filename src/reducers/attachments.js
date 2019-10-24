import {
  GET_ALL_ATTACHMENTS,
  CREATE_ATTACHMENT,
} from '~/constants/ActionTypes';
import { settings } from '~/config';

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
        attachments: action.result.items.map(item => ({
          ...item,
          url: item['@id'].replace(settings.apiPath, ''),
        })),
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

    default:
      return state;
  }
}

const createInitialState = {
  error: null,
  created_attachment: null,
  loaded: false,
  loading: false,
};

export function create_attachment(state = createInitialState, action = {}) {
  switch (action.type) {
    case `${CREATE_ATTACHMENT}_PENDING`:
      return {
        ...state,
        created_attachment: null,
        error: null,
        loaded: false,
        loading: true,
      };
    case `${CREATE_ATTACHMENT}_SUCCESS`:
      console.log('Success creating attachment', action.result);
      return {
        ...state,
        error: null,
        created_attachment: action.result,
        loaded: true,
        loading: false,
      };
    case `${CREATE_ATTACHMENT}_FAIL`:
      return {
        ...state,
        error: action.error,
        created_attachment: null,
        loaded: false,
        loading: false,
      };
    default:
      return state;
  }
}
