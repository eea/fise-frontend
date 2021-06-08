/**
 * Document view component.
 * @module components/theme/View/DefaultViewWide
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from '@plone/volto/helpers';
import { injectIntl } from 'react-intl'; // defineMessages,
import { Grid } from 'semantic-ui-react';
import { BodyClass } from '@plone/volto/helpers';

import { Container, Image } from 'semantic-ui-react';
import { map } from 'lodash';

import config from '@plone/volto/registry';

import {
  getBlocksFieldname,
  getBlocksLayoutFieldname,
  hasBlocksData,
  getBaseUrl,
} from '@plone/volto/helpers';
// import { samePath } from 'volto-mosaic/helpers';
import { connect } from 'react-redux';
// import Spinner from 'volto-mosaic/components/theme/Spinner';

// const messages = defineMessages({
//   unknownBlock: {
//     id: 'Unknown Block',
//     defaultMessage: 'Unknown Block {block}',
//   },
// });

/**
 * Component to display the default view.
 * @function DefaultViewWide
 * @param {Object} content Content object.
 * @returns {string} Markup of the component.
 */
const DefaultViewWide = (props) => {
  const { content } = props;
  const { location } = props;
  const blocksFieldname = getBlocksFieldname(content);
  const blocksLayoutFieldname = getBlocksLayoutFieldname(content);

  console.log('default view props', props);

  // const currentUrl = content?.['@id'];
  // const shouldRenderRoutes =
  //   typeof currentUrl !== 'undefined' && samePath(currentUrl, props.pathname)
  //     ? true
  //     : false;
  //
  // if (!shouldRenderRoutes) return <Spinner />;
  return (
    <>
      <BodyClass className={`document_wide_view`} />

      <Grid columns="equal" className="zero-margin">
        {/* {renderPortletManager('plone.leftcolumn', 2, { ...props })}
      <Grid.Column
        style={{ position: 'static' }}
        tablet={12}
        largeScreen={6}
        widescreen={6}
        computer={8}
      > */}
        {hasBlocksData(content) ? (
          <div id="page-document" className="ui container">
            <Helmet title={content.title} />
            {map(content[blocksLayoutFieldname].items, (block) => {
              const Block =
                config.blocks.blocksConfig[
                  content[blocksFieldname]?.[block]?.['@type']
                ]?.['view'] || null;
              return Block !== null &&
                content[blocksFieldname][block]['@type'] !== 'title' ? (
                <Block
                  key={block}
                  id={block}
                  properties={content}
                  data={content[blocksFieldname][block]}
                  path={getBaseUrl(location?.pathname || '')}
                />
              ) : (
                //   <div key={block}>
                //     {intl.formatMessage(messages.unknownBlock, {
                //       block: content[blocksFieldname]?.[block]?.['@type'],
                //     })}
                //   </div>
                ''
              );
            })}
            <div id="forest-metadata-slot">{''}</div>
          </div>
        ) : (
          <Container id="page-document">
            {/* <Helmet title={content.title} />
      <h1 className="documentFirstHeading">{content.title}</h1>
      {content.description && (
        <p className="documentDescription">{content.description}</p>
      )} */}
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
                    `a href="${config.settings.apiPath}$1/download/file"`,
                  ),
                }}
              />
            )}
            <div id="forest-metadata-slot">{''}</div>
          </Container>
        )}
        {/* </Grid.Column> */}

        {/* {renderPortletManager('plone.rightcolumn', 3, { ...props })} */}
      </Grid>
    </>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
DefaultViewWide.propTypes = {
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

// export default injectIntl(DefaultViewWide);

export default connect((state, props) => ({
  pathname: state.router.location.pathname, //props.location.pathname,
}))(injectIntl(DefaultViewWide));
