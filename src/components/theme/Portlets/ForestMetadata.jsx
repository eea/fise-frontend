import React from 'react';
import { Portal } from 'react-portal';

const ForestMetadata = props => (
  <Portal node={__CLIENT__ && document.getElementById('view')}>
    {props.content.geo_coverage && (
      <div id="forest-metadata-geo-coverage">
        <strong>Geo coverage:</strong>
        <ul>
          {props.content.geo_coverage.map(el => (
            <li key={el.token}>{el.title}</li>
          ))}
        </ul>
      </div>
    )}
  </Portal>
);
export default ForestMetadata;
