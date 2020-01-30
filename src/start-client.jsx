// customized to include animation wrapper from PR

import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-intl-redux';
import { ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { ReduxAsyncConnect } from 'redux-connect';
import routes from '~/routes';
import '~/theme';

import configureStore from '@plone/volto/store';
import { Api, persistAuthToken, ScrollToTop } from '@plone/volto/helpers';
import { MatomoProvider, createInstance } from '@datapunt/matomo-tracker-react';

export const history = createBrowserHistory();

const matomo = createInstance({
  urlBase: 'https://matomo.eea.europa.eu/',
  siteId: 46, // optional, default value: `1`
  // trackerUrl: 'https://LINK.TO.DOMAIN/tracking.php', // optional, default value: `${urlBase}matomo.php`
  // srcUrl: 'https://LINK.TO.DOMAIN/tracking.js', // optional, default value: `${urlBase}matomo.js`
});

export default () => {
  const api = new Api();

  const store = configureStore(window.__data, history, api);
  persistAuthToken(store);

  hydrate(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <MatomoProvider value={matomo}>
          <ScrollToTop>
            <ReduxAsyncConnect routes={routes} helpers={api} />
          </ScrollToTop>
        </MatomoProvider>
      </ConnectedRouter>
    </Provider>,
    document.getElementById('main'),
  );
};
