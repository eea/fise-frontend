/**
 * Document view component.
 * @module components/theme/View/DocumentView
 */

import 'react-mosaic-component/react-mosaic-component.css';

import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { Container, Image } from 'semantic-ui-react';
// import { map } from 'lodash';
import { settings, blocks } from '~/config';

import {
  Mosaic,
  MosaicWindow,
  // Corner,
  // createBalancedTreeFromLeaves,
  // getLeaves,
  // getNodeAtPath,
  // getOtherDirection,
  // getPathToCorner,
  // MosaicDirection,
  // MosaicNode,
  // MosaicParent,
  // MosaicZeroState,
  // updateTree,
} from 'react-mosaic-component';

import {
  getBlocksFieldname,
  getBlocksLayoutFieldname,
  // hasBlocksData,
} from '@plone/volto/helpers';

/**
 * Component to display the document view.
 * @function DocumentView
 * @param {Object} content Content object.
 * @returns {string} Markup of the component.
 */

class MosaicView extends Component {
  constructor(props) {
    super(props);

    let content = props.content;
    console.log('content', content);
    const blocksLayoutFieldname = getBlocksLayoutFieldname(content);

    let layout = content[blocksLayoutFieldname].layout;

    if (!__SERVER__) {
      this.state = {
        currentNode: layout,
      };
    }

    console.log('This.state in constructor', this.state, content);
  }

  createNode = () => {
    // this.onAddBlock('text', 0);
    console.log('Called createNode');
  };

  onChange = currentNode => {
    this.setState({ currentNode });
  };

  onRelease = currentNode => {
    console.log('Mosaic.onRelease():', currentNode);
  };

  renderBlock(blockid) {
    const content = this.props.content;
    const blocksFieldname = getBlocksFieldname(content);
    const availableBlocks = content[blocksFieldname];
    const blocktype = availableBlocks[blockid]['@type'];

    console.log('Rendering block:', blockid, blocktype, blocksFieldname, content);

    let Block = null;
    Block = blocks.defaultBlocksViewMap[blocktype];

    return Block !== null ? (
      <div class="block-container">
        <Block key={blockid} properties={content} data={availableBlocks[blockid]} />
      </div>
    ) : (
      <div> {JSON.stringify(blocktype)} </div>
    );
  }

  render() {
    const content = this.props.content;
    console.log('This.state in render: ', this.state);

    const blocksLayoutFieldname = getBlocksLayoutFieldname(content);
    const height = content[blocksLayoutFieldname].layout_height || 500;

    return true ? (
      <div id="page-document" className="ui wrapper" style={{ height: height }}>
        {/* <Helmet title={content.title} /> */}
        <Mosaic
          renderBlock={(blockid, path) => (
            <MosaicWindow
              title={`Window ${blockid}`}
              createNode={this.createNode}
              path={path}
            >
              {this.renderBlock(blockid)}
            </MosaicWindow>
          )}
          value={this.state.currentNode}
          onChange={this.onChange}
          onRelease={this.onRelease}
        />
      </div>
    ) : (
      <Container id="page-document">
        <Helmet title={content.title} />
        <h1 className="documentFirstHeading">{content.title}</h1>
        {content.description && (
          <p className="documentDescription">{content.description}</p>
        )}
        {content.image && (
          <Image
            className="document-image"
            src={content.image.scales.thumb.download}
            floated="right"
          />
        )}
        {content.remoteUrl && (
          <span>
            The link address is:
            <a href={content.remoteUrl}>{content.remoteUrl}</a>
          </span>
        )}
        {content.text && (
          <div
            dangerouslySetInnerHTML={{
              __html: content.text.data.replace(
                /a href="([^"]*\.[^"]*)"/g,
                `a href="${settings.apiPath}$1/download/file"`,
              ),
            }}
          />
        )}
      </Container>
    );
  }
}

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */

MosaicView.propTypes = {
  /**
   * Content of the object
   */
  content: PropTypes.shape({
    /**
     * Title of the object
     */
    title: PropTypes.string,
    /**
     * Description of the object
     */
    description: PropTypes.string,
    /**
     * Text of the object
     */
    text: PropTypes.shape({
      /**
       * Data of the text of the object
       */
      data: PropTypes.string,
    }),
  }).isRequired,
};

export default MosaicView;
