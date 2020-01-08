import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@plone/volto/components';
import collapseDownSVG from '@plone/volto/icons/collapse-down.svg';

const ResultCard = ({ item }) => {
    const hasDownload = true;
    return (
        <div className="block-content">
            <article className="block-item" key={item['@id']}>
                <Link to={item['@id']} className="block-headline" title={item['@type']}>
                    {item.title}
                </Link>
                <div className="meta-data">
                    <span className="format-icon">PDF</span>
                    <div className="text-tab">
                        <span className="format-text">Format: </span>
                        <span className="format-type">PDF Document</span>
                    </div>
                    <div className="text-tab">
                        <span className="format-text">Topics: </span>
                        <span className="format-type">Growing Stock</span>
                    </div>
                    <div className="text-tab">
                        <span className="format-text">File Size: </span>
                        <span className="format-type">234 KB</span>
                    </div>
                </div>
                <div className="block-content">
                    {item.description && (
                        <div className="blockBody">
                            <span className="description">{item.description}</span>
                        </div>
                    )}
                    {hasDownload && (
                        <div className="download-area">
                            <button
                                className="download-button"
                                onClick={() => console.log('will download')}
                            >
                                <Icon name={collapseDownSVG} size="16px" color="#005555" />
                                <p className="download-text">Download</p>
                                <p className="file-size">(234kb)</p>
                            </button>
                        </div>
                    )}
                </div>
                <div className="tag-tab">
                    <span className="result-tag">Forest Inventories</span>
                    <span className="result-date"> · 29/08/2019</span>
                </div>
            </article>
        </div>
    );
};

export default ResultCard;
