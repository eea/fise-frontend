import React from 'react';
import { Icon } from '@plone/volto/components';
import globeSVG from '@plone/volto/icons/globe.svg';
import tableSVG from '@plone/volto/icons/table.svg';
import showBlocksSVG from '@plone/volto/icons/show-blocks.svg';
import doumentDetailsSVG from '@plone/volto/icons/doument-details.svg';
import contentExistingSVG from '@plone/volto/icons/content-existing.svg';
 
const DataIcon = ({type}) => {
    switch (type) {
      case 'Tabular data':
        return (
          <Icon
            className="format-icon"
            name={tableSVG}
            size="18px"
            color="white"
          />
        );
        case 'Documentation':
        return (
          <Icon
            className="format-icon"
            name={contentExistingSVG}
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

  export default DataIcon;