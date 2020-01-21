import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { connectRouter, routerMiddleware } from 'connected-react-router';

import reducers from '~/reducers';

import { api, crashReporter } from '@plone/volto/middleware';
import { matchPath } from 'react-router';
import { settings } from '~/config';

const PREFETCH_ROUTER_LOCATION_CHANGE = 'PREFETCH_ROUTER_LOCATION_CHANGE';

const matchCurrentPath = path => {
  const pathsList = ['/', '/**'];

  for (let pathOption of pathsList) {
    const match = matchPath(path, {
      path: pathOption,
      exact: true,
      strict: false,
    });
    if (match) {
      return true;
    }
  }
};

const precacheContentStart = ({ dispatch, getState }) => next => action => {
  if (typeof action === 'function') {
    return next(action);
  }
  console.log('action', action.type);
  // TODO: match for View
  //

  switch (action.type) {
    case '@@router/LOCATION_CHANGE':
      if (!action.payload?.prefetched) {
        const path = action.payload.location.pathname;
        const shouldUseFullObjectsAndExpandStuff = matchCurrentPath(path);
        const prefetchAction = {
          type: PREFETCH_ROUTER_LOCATION_CHANGE,
          path,
          originalAction: action,
          request: {
            op: 'get',
            // path: `${path}?fullobjects`, // TODO: identify only needed routes, based on route matching
            path:
              shouldUseFullObjectsAndExpandStuff &&
              settings.contentExpand.length
                ? `${path}?fullobjects&expand=${settings.contentExpand.join(
                    ',',
                  )}`
                : path,
          },
        };
        return next(prefetchAction);
      }
      return next(action);
    default:
      return next(action);
  }
};

const precacheContentEnd = ({ dispatch, getState }) => next => action => {
  if (typeof action === 'function') {
    return next(action);
  }

  const type = `${PREFETCH_ROUTER_LOCATION_CHANGE}_SUCCESS`;

  if (action.type === type) {
    console.log('prefetch action end', action);
    return dispatch({
      ...action.originalAction,
      payload: {
        ...action.originalAction.payload,
        prefetched: action.result,
      },
    });
  }

  return next(action);
};

function prefetch(state = {}, action = {}) {
  switch (action.type) {
    case `@@router/LOCATION_CHANGE`:
      console.log('action location change', action);
      return action.payload?.prefetched
        ? {
            ...state,
            [action.payload.location.pathname]: action.payload.prefetched,
          }
        : state;
    default:
      return state;
  }
}

const configureStore = (initialState, history, apiHelper) => {
  const middlewares = composeWithDevTools(
    applyMiddleware(
      precacheContentStart,
      routerMiddleware(history),
      crashReporter,
      thunk,
      api(apiHelper),
      precacheContentEnd,
    ),
  );

  const store = createStore(
    combineReducers({
      router: connectRouter(history),
      ...reducers,
      prefetch,
    }),
    initialState,
    middlewares,
  );

  return store;
};

export default configureStore;
