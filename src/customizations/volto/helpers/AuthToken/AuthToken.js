/**
 * AuthToken helper.
 * @module helpers/AuthToken
 */

import cookie from 'react-cookie';
import jwtDecode from 'jwt-decode';

import { loginRenew } from '@plone/volto/actions';
import { push } from 'connected-react-router';

/**
 * Get auth token method.
 * @method getAuthToken
 * @returns {undefined}
 */
export function getAuthToken() {
  return cookie.load('auth_token');
}

/**
 * Persist auth token method.
 * @method persistAuthToken
 * @param {object} store Redux store.
 * @returns {undefined}
 */
export function persistAuthToken(store) {
  let currentValue = getAuthToken();

  // console.log('currentValue', currentValue);

  /**
   * handleChange method.
   * @method handleChange
   * @param {bool} initial Initial call.
   * @returns {undefined}
   */
  function handleChange(initial) {
    // console.log('handling change', initial, currentValue);
    const previousValue = currentValue;
    const state = store.getState();
    currentValue = state.userSession.token;
    if (previousValue !== currentValue || initial) {
      // console.log('handling further');
      if (!currentValue) {
        cookie.remove('auth_token', { path: '/' });
      } else {
        cookie.save('auth_token', currentValue, {
          path: '/',
          expires: new Date(jwtDecode(currentValue).exp * 1000),
        });
        // console.log('saved cookie');
        setTimeout(() => {
          const x =
            jwtDecode(store.getState().userSession.token).exp * 1000 >
            new Date().getTime();
          // console.log('auth token', store.getState().userSession, x);

          if (store.getState().userSession.token) {
            if (
              jwtDecode(store.getState().userSession.token).exp * 1000 >
              new Date().getTime()
            ) {
              store.dispatch(loginRenew());
            } else {
              // store.dispatch(
              //   push(
              //     `/logout?return_url=${
              //       store.getState().router.location.pathname
              //     }`,
              //   ),
              // );
            }
          }
        }, (jwtDecode(store.getState().userSession.token).exp * 1000 - new Date().getTime()) * 0.9);
      }
    }
  }

  store.subscribe(handleChange);
  handleChange(true);
}
