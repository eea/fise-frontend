import React, { Component } from 'react';
import { Icon } from '@plone/volto/components';
import { Modal, List, Label, Button } from 'semantic-ui-react'
import collapseDownSVG from '@plone/volto/icons/collapse-down.svg';
import clearSVG from '@plone/volto/icons/clear.svg';
import DataIcon from './DataIcon';

const parseHtml = (string) => {
    return string.replace('\n', '<br/>');
}

const renderContentItem = (label, entity, type, handleClose = null, handleKeywordChange = null, selectedKeywords = null) => {
    return (
        <div className="nfi-modal-item">
            <div className="nfi-modal-item-label">
                <Label>{label}</Label>
            </div>
            {type === 'string' && (
                <p className="nfi-modal-item-content" dangerouslySetInnerHTML={{ __html: parseHtml(entity) }}></p>
            )}
            {type === 'string2link' && (
                <a className="nfi-modal-item-content" href={entity} dangerouslySetInnerHTML={{ __html: parseHtml(entity) }}></a>
            )}
            {type === 'array2string' && (
                <p className="nfi-modal-item-content">{entity.join(', ')}</p>
            )}
            {type === 'array2buttons' && (
                <div className="nfi-modal-item-content">
                    {entity.map((e, index) =>
                        (
                            <Button
                                key={index}
                                size='mini'
                                onClick={() => {
                                    let isSelected = false;
                                    selectedKeywords.forEach(keyword => {
                                        if (keyword.toLowerCase() === e.toLowerCase()) {
                                            isSelected = true;
                                        }
                                    });
                                    if (!isSelected) {
                                        let value = [...selectedKeywords];
                                        value.push(e);
                                        handleKeywordChange(null, { value });
                                    }
                                }}
                            >{e}</Button>
                        )
                    )}
                </div>
            )}
        </div>
    )
}

const ResultModal = ({ open, item, handleClose, handleKeywordChange, selectedKeywords }) => {
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
            <div style={{ display: "flex", justifyContent: "flex-end", padding: "0.4rem 0.4rem" }}>
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
                    <hr className="nfi-hr-half" />
                    {item.countries && renderContentItem('Country', item.countries, 'array2string')}
                    <hr className="nfi-hr-half" />
                    {item.data_set && renderContentItem('Data set', item.data_set, 'string')}
                    <hr className="nfi-hr-half" />
                    {item.data_type && renderContentItem('Data type', item.data_type, 'string')}
                    <hr className="nfi-hr-half" />
                    {item.description && renderContentItem('Description', item.description, 'string')}
                    <hr className="nfi-hr-half" />
                    {item.resource_type && renderContentItem('Resource format', item.resource_type, 'string')}
                    <hr className="nfi-hr-half" />
                    {item.topic_category && renderContentItem('Topic', item.topic_category, 'string')}
                    <hr className="nfi-hr-half" />
                    {item.external_link && renderContentItem('Source', item.external_link, 'string2link')}
                    <hr className="nfi-hr-half" />
                    {item.organization_name && renderContentItem('Organization name', item.organization_name, 'string')}
                    <hr className="nfi-hr-half" />
                    {item.organization_email && renderContentItem('Organization email', item.organization_email, 'string')}
                    <hr className="nfi-hr-half" />
                    {item.nuts_levels && renderContentItem('NUTS levels', item.nuts_levels, 'array2string')}
                    <hr className="nfi-hr-half" />
                    {item.keywords && renderContentItem('Keywords', item.keywords, 'array2buttons', handleClose, handleKeywordChange, selectedKeywords)}
                    <hr className="nfi-hr-half" />
                    {item.info_level && renderContentItem('Info Level', item.info_level, 'string')}
                    <hr className="nfi-hr-half" />
                    <div className="flex justify-space-between">
                        <div>
                            <span className="result-tag">{data_set}</span>
                            {item.published_year && (
                                <span className="result-date"> · {item.published_year}</span>
                            )}
                        </div>
                        <div className="flex justify-left">
                            {has_download && (
                                <div className="nif-download-area mr-0">
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
                        </div>
                    </div>
                </Modal.Description>
            </Modal.Content>
        </Modal>
    )
}

export default ResultModal;