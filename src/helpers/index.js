/**
 * Add your helpers here.
 * @module helpers
 * @example
 * export { Api } from './Api/Api';
 */
import React from 'react';
import { portlets } from '~/config';

export function renderPortlets(props) {
  console.log('portlets', portlets);
  return (
    (portlets &&
      portlets.map((Portlet, i) => (
        <Portlet key={`portlet-${i}`} {...props} />
      ))) ||
    ''
  );
}
