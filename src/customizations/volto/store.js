import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { connectRouter, routerMiddleware } from 'connected-react-router';

import reducers from '~/reducers';

import { api, crashReporter } from '@plone/volto/middleware';
import { matchPath } from 'react-router';
import { settings } from '~/config';
import routes from '~/routes';

const defaultRoutes = routes[0].routes;

const PREFETCH_ROUTER_LOCATION_CHANGE = 'PREFETCH_ROUTER_LOCATION_CHANGE';

const matchCurrentPath = path => {
  // const pathsList = ['/', '/**'];
  let foundMatch;

  for (let pathOption of defaultRoutes) {
    // console.log('pathOption', pathOption);
    const match = matchPath(path, pathOption);
    if (match) {
      foundMatch = true;
    }
    if (match && !foundMatch && (match.path === '/**' || match.path === '/')) {
      // console.log('got match', match);
      // console.log('got match path', path);
      // console.log('got match pathOption', pathOption);
      return true;
    }
  }
};

const precacheContentStart = ({ dispatch, getState }) => next => action => {
  if (typeof action === 'function') {
    return next(action);
  }
  console.log('action', action.type);

  // shouldUseFullObjectsAndExpandStuff &&
  // settings.contentExpand.length
  //   ? `${path}?fullobjects&expand=${settings.contentExpand.join(
  //       ',',
  //     )}`
  //   : path,

  switch (action.type) {
    case '@@router/LOCATION_CHANGE':
      if (!action.payload?.prefetched) {
        const path = action.payload.location.pathname;
        console.log('intercepting', path);
        const isGetContent = matchCurrentPath(path);
        const expand =
          isGetContent && settings.contentExpand?.length
            ? `&expand=${settings.contentExpand.join(',')}`
            : '';
        const fullObjects = `${isGetContent ? '?fullobjects' : ''}${expand}`;
        const prefetchAction = {
          type: PREFETCH_ROUTER_LOCATION_CHANGE,
          path,
          originalAction: action,
          request: {
            op: 'get',
            path: `${path}${fullObjects}`,
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
