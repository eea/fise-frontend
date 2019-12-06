import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import { getLocalnavigation } from '~/actions';
import { connect } from 'react-redux';
import { flattenToAppURL } from '@plone/volto/helpers';

import { injectIntl } from 'react-intl'; // defineMessages,

import { Container, Image, Grid } from 'semantic-ui-react';
import { map } from 'lodash';

import { settings, blocks } from '~/config';

import {
  getBlocksFieldname,
  getBlocksLayoutFieldname,
  hasBlocksData,
} from '@plone/volto/helpers';

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

  componentDidMount() {
    this.props.getLocalnavigation(flattenToAppURL(this.props.content['@id']));
  }

  componentDidUpdate(prevProps) {
    if (prevProps.pathname !== this.props.pathname) {
      this.props.getLocalnavigation(flattenToAppURL(this.props.pathname));
    }
  }

  render() {
    const content = this.props.content;
    // const intl = this.props.intl;
    const blocksFieldname = getBlocksFieldname(content);
    const blocksLayoutFieldname = getBlocksLayoutFieldname(content);
    const localNavigation =
      (this.props.localNavigation.items &&
        this.props.localNavigation.items.filter(
          item => item.title !== 'Home',
        )) ||
      [];

    if (
      __CLIENT__ &&
      localNavigation.length &&
      document.querySelector('.header-image .header-image')
    ) {
      const header = document.querySelector('.header-image .header-image');
      header.querySelector('h1') &&
        header.querySelector('h1').classList.add('left');
      header.querySelector('p') &&
        header.querySelector('p').classList.add('left');
    } else if (
      __CLIENT__ &&
      !localNavigation.length &&
      document.querySelector('.header-image .header-image')
    ) {
      const header = document.querySelector('.header-image .header-image');
      header.querySelector('h1') &&
        header.querySelector('h1').classList.remove('left');
      header.querySelector('p') &&
        header.querySelector('p').classList.remove('left');
    }
    let pageTemplate = (
      <Grid columns={3} className="folderWithContent">
        <Grid.Column tablet={12} largeScreen={6} widescreen={9}>
          {hasBlocksData(content) ? (
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
          )}
        </Grid.Column>
        <Grid.Column tablet={6} largeScreen={3} widescreen={3}>
          <ul className="localNavigation">
            <div className="localNavigationHeader">Navigation</div>
            {localNavigation.map(item => (
              <li>
                <Link to={flattenToAppURL(item['@id'])} key={item['@id']}>
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </Grid.Column>
      </Grid>
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

export default connect(
  (state, props) => ({
    localNavigation: state.localnavigation.items,
    pathname: props.location.pathname,
  }),
  { getLocalnavigation },
)(injectIntl(ListingView));
