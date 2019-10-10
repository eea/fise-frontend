/**
 * Full view component.
 * @module components/theme/View/FullView
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import { Container, Image } from 'semantic-ui-react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { 
  // setFolderHeader, 
  setFolderTabs } from '~/actions';

/**
 * Full view component class.
 * @function FullView
 * @param {Object} content Content object.
 * @returns {string} Markup of the component.
 */

const numberToWord = {
  1: 'one',
  2: 'two',
  3: 'three',
  4: 'four',
  5: 'five',
  6: 'six',
  7: 'seven',
  8: 'eight',
  9: 'nine',
  10: 'ten',
  11: 'eleven',
  12: 'twelve',
};

const mapDispatchToProps = {
  // setFolderHeader,
  setFolderTabs,
};

class FullView extends Component {
  static propTypes = {
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
       * Child items of the object
       */
      items: PropTypes.arrayOf(
        PropTypes.shape({
          /**
           * Title of the item
           */
          title: PropTypes.string,
          /**
           * Description of the item
           */
          description: PropTypes.string,
          /**
           * Url of the item
           */
          url: PropTypes.string,
          /**
           * Image of the item
           */
          image: PropTypes.object,
          /**
           * Image caption of the item
           */
          image_caption: PropTypes.string,
          /**
           * Type of the item
           */
          '@type': PropTypes.string,
        }),
      ),
    }).isRequired,
  };
  constructor(props) {
    super(props);
    this.getFolderHeader = this.getFolderHeader.bind(this);
    this.renderTabs = this.renderTabs.bind(this);

    this.state = {
      tabs: null,
    };
  }

  getFolderHeader(nextContent) {
    const content = nextContent ? nextContent : this.props.content;
    const title = content.title;
    const description = content.description;
    const image =
      content.items && content.items.find(c => c['@type'] === 'Image');
    const url = image && image.image.download;
    const inCountryFolder = true;
    // this.props.setFolderHeader({ title, description, url, inCountryFolder });
  }

  renderTabs(nextContent) {
    const items = nextContent ? nextContent.items : this.props.content.items;
    const content = items.filter(i => i.title !== 'folder_info');
    const tabs = (
      <div
        className={
          'ui item stackable tabs menu ' + numberToWord[content.length]
        }
      >
        {content.map(item => (
          <Link
            key={item.url}
            className="item"
            to={item.url}
            title={item['@type']}
          >
            {item.title}
          </Link>
        ))}
      </div>
    );
    this.setState({
      tabs: tabs,
    });
    this.props.setFolderTabs(content);
  }

  componentDidMount() {
    this.getFolderHeader();
    this.renderTabs();
  }

  componentWillReceiveProps(nextProps) {
    if (
      JSON.stringify(nextProps.content) !== JSON.stringify(this.props.content)
    ) {
      this.getFolderHeader(nextProps.content);
      this.renderTabs(nextProps.content);
    }
  }

  componentWillUnmount() {
    // this.props.setFolderHeader({ inCountryFolder: false });
  }

  render() {
    const content = this.props.content;
    return (
      <Container className="view-wrapper">
        <Helmet title={content.title} />
        <article id="content">
          <section id="content-core">{this.state.tabs}</section>
        </article>
      </Container>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps,
)(FullView);
