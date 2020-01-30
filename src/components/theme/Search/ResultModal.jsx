import React, { Component } from 'react';
import { Icon } from '@plone/volto/components';
import { Modal } from 'semantic-ui-react'
import { BodyClass } from '@plone/volto/helpers';
import collapseDownSVG from '@plone/volto/icons/collapse-down.svg';
import globeSVG from '@plone/volto/icons/globe.svg';
import tableSVG from '@plone/volto/icons/table.svg';
import showBlocksSVG from '@plone/volto/icons/show-blocks.svg';
import doumentDetailsSVG from '@plone/volto/icons/doument-details.svg';
import clearSVG from '@plone/volto/icons/clear.svg';

const ResultModal = ({ open, item, handleClose }) => {
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
        <Modal
            open={open}
            className="search-modal"
            centered={false}
            onClose={handleClose}
        >
            <div style={{display:"flex", justifyContent:"flex-end"}}>
            <Icon
                className="close-modal"
                name={clearSVG}
                size="35px"
                color="#CD4200"
                onClick={handleClose}
            />
            </div>
            <Modal.Header style={{ border: "none", padding: "0 1.5rem 0 1.5rem" }}>
                <p className="modal-header">
                    {item.title}
                </p>

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
            </Modal.Header>
            <Modal.Content className="modal-content" style={{ display: 'contents' }}>
                <Modal.Description className="modal-description">
                    <hr className="nfi-hr" />
                    <p >
                        {item.description}
                    </p>
                    <div >
                        <span className="result-tag">{data_set}</span>
                        {item.published_year && (
                            <span className="result-date"> · {item.published_year}</span>
                        )}
                    </div>
                    <hr className="nfi-hr" />
                    {has_download && (
                        <button
                            className="download-button"
                            onClick={() => console.log('will download')}
                        >
                            <Icon name={collapseDownSVG} size="16px" color="#005555" />
                            <p className="download-text">Download</p>
                            <p className="file-size">({item.file_size})</p>
                        </button>
                    )}
                </Modal.Description>
            </Modal.Content>
        </Modal>
    )
}

export default ResultModal;