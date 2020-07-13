/**
 * App container.
 * @module components/theme/App/App
 */

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { asyncConnect } from 'redux-connect';
import { Segment, Container } from 'semantic-ui-react';
import { renderRoutes } from 'react-router-config';
import { Slide, ToastContainer, toast } from 'react-toastify';
import ViewletsRenderer from 'volto-addons/Viewlets/Render';
import loadable from '@loadable/component';

import Error from '@plone/volto/error';

import {
  Icon,
  Messages,
  Footer,
  Header,
  OutdatedBrowser,
  AppExtras,
} from '@plone/volto/components';
import { BodyClass, getBaseUrl, getView } from '@plone/volto/helpers';
import {
  getContent,
  getNavigation,
  getTypes,
  getWorkflow,
  purgeMessages,
} from '@plone/volto/actions';
import { getFrontpageSlides, getDefaultHeaderImage } from '~/actions';
import { getPortlets } from 'volto-addons/actions';

import clearSVG from '@plone/volto/icons/clear.svg';

class App extends Component {
  render() {
    return <Footer />;
  }
}

export default App;
