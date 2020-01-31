import React, { Component } from 'react';
import { Icon } from '@plone/volto/components';
import { Modal } from 'semantic-ui-react'
import collapseDownSVG from '@plone/volto/icons/collapse-down.svg';
import clearSVG from '@plone/volto/icons/clear.svg';
import DataIcon from './DataIcon';

const ResultModal = ({ open, item, handleClose }) => {
    const has_download = item.download_url ? true : false;
    const data_set =
        item.data_set === 'NFI' ? 'FISE Content' : 'Forest Inventories';
    return (
        <Modal
            open={open}
            className="search-modal"
            centered={false}
            onClose={handleClose}
        >
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
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
                        <div className="nif-download-area">
                        <a
                            className="nif-download-button"
                            href={item.download_url}
                        >
                            <Icon name={collapseDownSVG} size="16px" color="#005555" />
                            <p className="nif-download-text">Download</p>
                            <p className="file-size">({item.file_size})</p>
                        </a>
                        </div>
                    )}
                </Modal.Description>
            </Modal.Content>
        </Modal>
    )
}

export default ResultModal;