// customized server only to add the cors proxy
// right now it is disabled

import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-intl-redux';
import express from 'express';
import { renderToString } from 'react-dom/server';
import { createMemoryHistory } from 'history';
import { ReduxAsyncConnect, loadOnServer } from 'redux-connect';
import { parse as parseUrl } from 'url';
import { keys } from 'lodash';
import Raven from 'raven';
import cookie, { plugToRequest } from 'react-cookie';
import locale from 'locale';

import routes from '~/routes';
import nlLocale from '@plone/volto/../locales/nl.json';
import deLocale from '@plone/volto/../locales/de.json';
import enLocale from '@plone/volto/../locales/en.json';

import {
  Html,
  Api,
  persistAuthToken,
  generateSitemap,
  getAPIResourceWithAuth,
} from '@plone/volto/helpers';

import userSession from '@plone/volto/reducers/userSession/userSession';
import ErrorPage from '@plone/volto/error';
import languages from '@plone/volto/constants/Languages';
import configureStore from '@plone/volto/store';

// import { settings } from './config';
// import request from 'request';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const supported = new locale.Locales(keys(languages), 'en');
const locales = {
  en: enLocale,
  nl: nlLocale,
  de: deLocale,
};

const server = express();
server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))

  // .all('/*', function(req, res, next) {
  //   // console.log('all req', req.path);
  //   const match = req.path.match(/\/cors-proxy\/(.*)/);
  //   if (match && match.length === 2) {
  //     console.log('CORS method on path', req.path);
  //
  //     const targetURL = match[1];
  //     //
  //     // Set CORS headers: allow all origins, methods, and headers:
  //     // you may want to lock this down in a production environment
  //     res.header(
  //       'Access-Control-Allow-Origin',
  //       settings.allow_cors_origin || '*',
  //     );
  //     res.header('Access-Control-Allow-Methods', 'GET');
  //     // res.header('Access-Control-Allow-Headers', '');
  //
  //     if (req.method === 'OPTIONS') {
  //       res.send(); // CORS Preflight
  //     } else {
  //       request(
  //         {
  //           url: targetURL,
  //           method: req.method,
  //           json: req.body,
  //           headers: { Authorization: req.header('Authorization') },
  //         },
  //         function(error, response, body) {
  //           if (error) {
  //             console.error('error: ' + response.statusCode);
  //           }
  //           //                console.log(body);
  //         },
  //       ).pipe(res);
  //     }
  //   } else {
  //     next();
  //   }
  // })

  .get('/*', (req, res) => {
    plugToRequest(req, res);
    const api = new Api(req);

    const url = req.originalUrl || req.url;
    const location = parseUrl(url);

    const lang = new locale.Locales(
      cookie.load('lang') || req.headers['accept-language'],
    )
      .best(supported)
      .toString();

    const authToken = cookie.load('auth_token');

    const initialState = {
      userSession: { ...userSession(), token: authToken },
      form: req.body,
      intl: {
        defaultLocale: 'en',
        locale: lang,
        messages: locales[lang],
      },
    };
    const history = createMemoryHistory({
      initialEntries: [req.url],
    });

    // Create a new Redux store instance
    const store = configureStore(initialState, history, api);

    persistAuthToken(store);

    if (req.path === '/sitemap.xml.gz') {
      generateSitemap(req).then(sitemap => {
        res.set('Content-Type', 'application/x-gzip');
        res.set('Content-Encoding', 'gzip');
        res.set('Content-Disposition', 'attachment; filename="sitemap.xml.gz"');
        res.send(sitemap);
      });
    } else if (
      req.path.match(/(.*)\/@@images\/(.*)/) ||
      req.path.match(/(.*)\/@@download\/(.*)/)
    ) {
      getAPIResourceWithAuth(req).then(resource => {
        res.set('Content-Type', resource.headers['content-type']);
        if (resource.headers['content-disposition']) {
          res.set(
            'Content-Disposition',
            resource.headers['content-disposition'],
          );
        }
        res.send(resource.body);
      });
    } else {
      loadOnServer({ store, location, routes, api })
        .then(() => {
          const context = {};
          const markup = renderToString(
            <Provider store={store}>
              <StaticRouter context={context} location={req.url}>
                <ReduxAsyncConnect routes={routes} helpers={api} />
              </StaticRouter>
            </Provider>,
          );

          if (context.url) {
            res.redirect(context.url);
          } else {
            res.status(200).send(
              `<!doctype html>
                ${renderToString(
                  <Html assets={assets} markup={markup} store={store} />,
                )}
              `,
            );
          }
        })
        .catch(error => {
          const errorPage = <ErrorPage message={error.message} />;

          if (process.env.SENTRY_DSN) {
            Raven.captureException(error.message, {
              extra: JSON.stringify(error),
            });
          }
          res.set({
            'Cache-Control': 'public, max-age=60, no-transform',
          });

          // Displays error in console
          console.error(error);

          res.status(500).send(`<!doctype html> ${renderToString(errorPage)}`);
        });
    }
  });

export default server;
