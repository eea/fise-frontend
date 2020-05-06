import { GET_LATEST_RELEASE } from '~/constants/ActionTypes';

const initialState = {
  error: null,
  data: {},
  loaded: false,
  loading: false,
};

export default function release(state = initialState, action = {}) {
  switch (action.type) {
    case `${GET_LATEST_RELEASE}_PENDING`:
      return {
        ...state,
        error: null,
        loaded: false,
        loading: true,
      };
    case `${GET_LATEST_RELEASE}_SUCCESS`:
      return {
        ...state,
        error: null,
        data: action.result,
        loaded: true,
        loading: false,
      };
    case `${GET_LATEST_RELEASE}_FAIL`:
      return {
        ...state,
        error: action.error,
        data: [],
        loaded: false,
        loading: false,
      };
    default:
      return state;
  }
}
