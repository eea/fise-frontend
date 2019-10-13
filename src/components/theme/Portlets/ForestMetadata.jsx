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
          <strong>External url:</strong> <a href={external_url}>Go to link</a>
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

      {publishing_year && (
        <div id="forest-metadata-publishing_year">
          <strong>Publishing year:</strong> {publisher}
        </div>
      )}

      {collection_year_start && (
        <div id="forest-metadata-collection_years">
          <strong>Collection period:</strong>{' '}
          <span>{collection_year_start}</span>
          {collection_year_end && <span>- {collection_year_end}</span>}
        </div>
      )}

      {topics && (
        <div id="forest-metadata-topics">
          <strong>Topics:</strong>
          <ul>
            {topics.map(el => (
              <li key={el.token}>{el.title}</li>
            ))}
          </ul>
        </div>
      )}

      {keywords && (
        <div id="forest-metadata-keywords">
          <strong>Keywords:</strong>
          <ul>
            {keywords.map(el => (
              <li key={el.token}>{el.title}</li>
            ))}
          </ul>
        </div>
      )}

      {info_level && (
        <div id="forest-metadata-info_level">
          <strong>Info level:</strong> {info_level}
        </div>
      )}

      {accessibility_level && (
        <div id="forest-metadata-accessibility_level">
          <strong>Accessibility level:</strong> {accessibility_level}
        </div>
      )}
    </Portal>
  );
};
export default ForestMetadata;
