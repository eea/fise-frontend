import React from 'react';
import { Portal } from 'react-portal';

const ForestMetadata = props => (
  <Portal node={__CLIENT__ && document.getElementById('view')}>
    <strong>Geo coverage:</strong>
    <ul id="forest-metadata-geo-coverage">
      {props.content.geo_coverage.map(el => (
        <li key={el.token}>{el.title}</li>
      ))}
    </ul>
  </Portal>
);
export default ForestMetadata;
