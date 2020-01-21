import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from '@plone/volto/helpers';
import { Link } from 'react-router-dom';
import { getLocalnavigation } from '~/actions';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getBaseUrl, flattenToAppURL } from '@plone/volto/helpers';

// import { injectIntl } from 'react-intl'; // defineMessages,

import { Container, Image, Grid } from 'semantic-ui-react';
import { map } from 'lodash';

import { settings, blocks } from '~/config';
import { asyncConnect } from 'redux-connect';

import {
  getBlocksFieldname,
  getBlocksLayoutFieldname,
  hasBlocksData,
} from '@plone/volto/helpers';
import { samePath } from 'volto-mosaic/helpers';
import Spinner from 'volto-mosaic/components/theme/Spinner';

class ListingView extends Component {
  static propTypes = {
    localNavigation: PropTypes.any,
    getLocalnavigation: PropTypes.func.isRequired,
    pathname: PropTypes.any,
    content: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
      text: PropTypes.shape({
        data: PropTypes.string,
      }),
      items: PropTypes.arrayOf(
        PropTypes.shape({
          '@id': PropTypes.string,
          '@type': PropTypes.string,
          description: PropTypes.string,
          review_state: PropTypes.string,
          title: PropTypes.string,
          url: PropTypes.string,
        }),
      ),
    }).isRequired,
  };

  constructor(props) {
    super(props);

    const url = props.content['@id']
      .replace(settings.apiPath, '')
      .replace(settings.internalApiPath, '');

    // this.props.getLocalnavigation(url);
  }

  // componentDidMount() {
  //   const url = this.props.content['@id']
  //     .replace(settings.apiPath, '')
  //     .replace(settings.internalApiPath, '');
  //
  //   this.props.getLocalnavigation(url);
  // }
  //
  // componentDidUpdate(prevProps) {
  //   if (prevProps.pathname !== this.props.pathname) {
  //     const url = this.props.pathname;
  //     this.props.getLocalnavigation(url);
  //   }
  // }

  render() {
    console.log('asynclocalnav prop', this.props);
    const content = this.props.content;
    // const intl = this.props.intl;
    const blocksFieldname = getBlocksFieldname(content);
    const blocksLayoutFieldname = getBlocksLayoutFieldname(content);
    const localNavigation =
      (this.props.localNavigation &&
        this.props.localNavigation.items &&
        this.props.localNavigation.items.filter(
          item => item.title !== 'Home',
        )) ||
      [];

    const currentUrl = this.props.content?.['@id'];
    const shouldRenderRoutes =
      typeof currentUrl !== 'undefined' &&
      samePath(currentUrl, this.props.pathname)
        ? true
        : false;
    if (!shouldRenderRoutes) return <Spinner />;

    let pageTemplate = hasBlocksData(content) ? (
      <div id="page-document">
        <Helmet title={content.title} />
        {map(content[blocksLayoutFieldname].items, block => {
          const Block =
            blocks.blocksConfig[
              (content[blocksFieldname]?.[block]?.['@type'])
            ]?.['view'] || null;
          return Block !== null &&
            content[blocksFieldname][block]['@type'] !== 'title' ? (
            <Block
              key={block}
              id={block}
              properties={content}
              data={content[blocksFieldname][block]}
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
      </div>
    ) : (
      <Container id="page-document">
        <Helmet title={content.title} />
        {/* <h1 className="documentFirstHeading">{content.title}</h1>
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
                `a href="${settings.apiPath}$1/download/file"`,
              ),
            }}
          />
        )}
      </Container>
    );
    if (!localNavigation.length) {
      pageTemplate = hasBlocksData(content) ? (
        <div id="page-document">
          <Helmet title={content.title} />
          {map(content[blocksLayoutFieldname].items, block => {
            const Block =
              blocks.blocksConfig[
                (content[blocksFieldname]?.[block]?.['@type'])
              ]?.['view'] || null;
            return Block !== null &&
              content[blocksFieldname][block]['@type'] !== 'title' ? (
              <Block
                key={block}
                id={block}
                properties={content}
                data={content[blocksFieldname][block]}
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
        </div>
      ) : (
        <Container id="page-document">
          <Helmet title={content.title} />
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
    return pageTemplate;
  }
}

export default compose(
  asyncConnect([
    {
      key: 'localnavigation',
      promise: ({ location, store: { content, dispatch } }) =>
        dispatch(getLocalnavigation(getBaseUrl(location.pathname))),
    },
  ]),
  connect(
    (state, props) => ({
      localNavigation: state.localnavigation.items,
      pathname: props.location.pathname,
      // localnavigation: state.localnavigation,
    }),
    { getLocalnavigation },
  ),
)(ListingView);
