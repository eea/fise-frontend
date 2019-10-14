import React from 'react';
import { Portal } from 'react-portal';
import { Label, Grid } from 'semantic-ui-react';

const ForestMetadata = props => {
  const {
    nuts_level,
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
      <Grid columns={2} className="page_metadata">
        <Grid.Column width={3}>
          {nuts_level && nuts_level.length > 0 && (
            <div id="forest-metadata-resource_type">
              <h5>NUTS Level</h5>
              <div>
                {nuts_level.map(el => (
                  <Label key={el.token}>{el.title}</Label>
                ))}
              </div>
            </div>
          )}

          {geo_coverage && geo_coverage.length > 0 && (
            <div id="forest-metadata-geo-coverage">
              <h5>Geo coverage</h5>
              <div>
                {geo_coverage.map(el => (
                  <Label key={el.token}>{el.title}</Label>
                ))}
              </div>
            </div>
          )}

          {topics && topics.length > 0 && (
            <div id="forest-metadata-topics">
              <h5>Topics</h5>
              <div>
                {topics.map(el => (
                  <Label key={el}>{el}</Label>
                ))}
              </div>
            </div>
          )}

          {keywords && keywords.length > 0 && (
            <div id="forest-metadata-keywords">
              <h5>Keywords</h5>
              <div>
                {keywords.map(el => (
                  <Label key={el}>{el}</Label>
                ))}
              </div>
            </div>
          )}
          {publisher && publisher.length > 0 && (
            <div id="forest-metadata-publisher">
              <h5>Publisher</h5>
              {publisher.map((p, i) => (
                <Label key={i}>{p}</Label>
              ))}
            </div>
          )}
        </Grid.Column>
        <Grid.Column className="inline-headings">
          {resource_type && (
            <div id="forest-metadata-resource_type">
              <h5>Resource type</h5>: {resource_type.title}
            </div>
          )}
          {data_source && (
            <div id="forest-metadata-data_source">
              <h5>Data source</h5>: {data_source.title}
            </div>
          )}

          {dataset && (
            <div id="forest-metadata-dataset">
              <h5>Dataset</h5>: {dataset.title}
            </div>
          )}

          {external_url && (
            <div id="forest-metadata-external_url">
              <h5>External url</h5>: <a href={external_url}>Go to link</a>
            </div>
          )}

          {publishing_year && (
            <div id="forest-metadata-publishing_year">
              <h5>Publishing year</h5>: {publisher}
            </div>
          )}

          {collection_year_start && (
            <div id="forest-metadata-collection_years">
              <h5>Collection period</h5>: <span>{collection_year_start}</span>
              {collection_year_end && (
                <span>
                  {' '}
                  - <span>{collection_year_end}</span>
                </span>
              )}
            </div>
          )}

          {info_level && (
            <div id="forest-metadata-info_level">
              <h5>Info level</h5>: {info_level.title}
            </div>
          )}

          {accessibility_level && (
            <div id="forest-metadata-accessibility_level">
              <h5>Accessibility level</h5>: {accessibility_level.title}
            </div>
          )}
        </Grid.Column>
      </Grid>
    </Portal>
  );
};
export default ForestMetadata;
