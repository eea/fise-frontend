import React from 'react';
import { Portal } from 'react-portal';

const ForestMetadata = props => {
  const {
    resource_type,
    data_source,
    dataset,
    publisher,
    external_url,
    geo_coverage,
    publishing_year,
    collection_year_start,
    collection_year_end,
    topics,
    keywords,
    info_level,
    accessibility_level,
  } = props.content;

  return (
    <Portal node={__CLIENT__ && document.getElementById('view')}>
      {resource_type && (
        <div id="forest-metadata-resource_type">
          <strong>Resource type:</strong> {resource_type}
        </div>
      )}

      {data_source && (
        <div id="forest-metadata-data_source">
          <strong>Data source:</strong> {data_source}
        </div>
      )}

      {dataset && (
        <div id="forest-metadata-dataset">
          <strong>Dataset:</strong> {dataset}
        </div>
      )}

      {publisher && (
        <div id="forest-metadata-publisher">
          <strong>Publisher:</strong> {publisher}
        </div>
      )}

      {external_url && (
        <div id="forest-metadata-external_url">
          <strong>External url:</strong> {external_url}
        </div>
      )}

      {geo_coverage && (
        <div id="forest-metadata-geo-coverage">
          <strong>Geo coverage:</strong>
          <ul>
            {geo_coverage.map(el => (
              <li key={el.token}>{el.title}</li>
            ))}
          </ul>
        </div>
      )}
    </Portal>
  );
};
export default ForestMetadata;
