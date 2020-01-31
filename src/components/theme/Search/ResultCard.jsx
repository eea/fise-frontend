import React, { Component } from 'react';
import { Icon } from '@plone/volto/components';
import collapseDownSVG from '@plone/volto/icons/collapse-down.svg';
import { Link } from 'react-router-dom';
import DataIcon from './DataIcon';

const ResultCard = ({ item, id, handleItemSelect, isPortal }) => {
  const has_download = item.download_url ? true : false;
  const data_set =
    item.data_set === 'NFI' ? 'FISE Content' : 'Forest Inventories';
  
  return (
    <div className="block-content">
      <article className="block-item" key={item['@id']}>
        {!isPortal && <span onClick={handleItemSelect} className="block-headline" title={item.title}>{item.title}</span>}
        {isPortal && <Link className="block-headline" to={item['@id']}>{item.title}</Link>}
        <div className="meta-data">
          {item.resource_type && (
            <React.Fragment>
              <DataIcon type={item.resource_type} />
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
