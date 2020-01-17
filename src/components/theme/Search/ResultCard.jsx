import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@plone/volto/components';
import collapseDownSVG from '@plone/volto/icons/collapse-down.svg';
import globeSVG from '@plone/volto/icons/globe.svg';
import spreadsheetSVG from '@plone/volto/icons/spreadsheet.svg';
import tableSVG from '@plone/volto/icons/table.svg';
import showBlocksSVG from '@plone/volto/icons/show-blocks.svg';
import doumentDetailsSVG from '@plone/volto/icons/doument-details.svg';

const ResultCard = ({ item, id }) => {
  const has_download = item.download_url ? true : false;
  const data_set =
    item.data_set === 'NFI' ? 'FISE Content' : 'Forest Inventories';

  const DataIcon = () => {
    switch (item.resource_type) {
      case 'Tabular data':
        return (
          <Icon
            className="format-icon"
            name={tableSVG}
            size="18px"
            color="white"
          />
        );
      case 'Article':
        return (
          <Icon
            className="format-icon"
            name={globeSVG}
            size="18px"
            color="white"
          />
        );
      case 'Raster data':
        return (
          <Icon
            className="format-icon"
            name={showBlocksSVG}
            size="18px"
            color="white"
          />
        );
      case 'Report':
        return (
          <Icon
            className="format-icon"
            name={doumentDetailsSVG}
            size="18px"
            color="white"
          />
        );
      case 'PDF Document':
        return <div className="format-icon">PDF</div>;
      default:
        return <div className="format-icon" />;
    }
  };
  return (
    <div className="block-content">
      <article className="block-item" key={item['@id']}>
        <Link to={item['@id']} className="block-headline" title={item['@type']}>
          {item.title}
        </Link>
        <div className="meta-data">
          {item.resource_type && (
            <React.Fragment>
              <DataIcon />
              <div className="text-tab">
                <span className="format-text">Format: </span>
                <span className="format-type">{item.resource_type}</span>
              </div>
            </React.Fragment>
          )}
          {item.topic_category && (
            <div className="text-tab">
              <span className="format-text">Topics: </span>
              <span className="format-type">{item.topic_category}</span>
            </div>
          )}
          {has_download && (
            <div className="text-tab">
              <span className="format-text">File Size: </span>
              <span className="format-type">{item.file_size}</span>
            </div>
          )}
        </div>
        <div className="block-content">
          {item.description && (
            <div className="blockBody">
              <span className="description">{item.description}</span>
            </div>
          )}
          {has_download && (
            <div className="download-area">
              <button
                className="download-button"
                onClick={() => console.log('will download')}
              >
                <Icon name={collapseDownSVG} size="16px" color="#005555" />
                <p className="download-text">Download</p>
                <p className="file-size">({item.file_size})</p>
              </button>
            </div>
          )}
        </div>
        <div className="tag-tab">
          <span className="result-tag">{data_set}</span>
          {item.published_year && (
            <span className="result-date"> · {item.published_year}</span>
          )}
        </div>
      </article>
    </div>
  );
};

export default ResultCard;
