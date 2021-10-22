/**
 * Header component.
 * @module components/theme/Header/Header
 */

import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Logo, Navigation, Breadcrumbs } from '@plone/volto/components';

import { getBaseUrl } from '@plone/volto/helpers';

import HeaderImage from '~/components/theme/Header/HeaderImage';
import HomepageSlider from '~/components/theme/Header/HomepageSlider';
import MobileSearchWidget from '~/components/theme/MobileSearchWidget/MobileSearchWidget';
import Sticky from 'react-stickynode';
import HeaderBackground from './header-bg.png';
import axios from 'axios';

// export function getParentData(url) {
//   return axios
//     .get(url, {
//       headers: {
//         accept: 'application/json',
//       },
//     })
//     .then((response) => {
//       return response.data;
//     })
//     .catch((error) => {
//       return error;
//     });
// }
/**
 * Header component class.
 * @class Header
 * @extends Component
 */
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHomepage: this.props.actualPathName === '/',
      url: null,
      description: null,
      title: null,
      frontPageSlides: null,
      inheritedImage: '',
      inheritedText: '',
    };
  }
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    token: PropTypes.string,
    pathname: PropTypes.string.isRequired,
    actualPathName: PropTypes.string.isRequired,
    defaultHeaderImage: PropTypes.any,
    frontPageSlides: PropTypes.array,
  };

  /**
   * Default properties.
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    token: null,
  };

  componentDidMount() {
    const { inheritLeadingData, parentData } = this.props.extraData;
    if (inheritLeadingData) {
      const parentUrl = parentData['@id'];
      axios
        .get(parentUrl, {
          headers: {
            accept: 'application/json',
          },
        })
        .then((response) => {
          const parentImage =
            response.data && response.data.image && response.data.image.download
              ? response.data.image.download
              : '';

          const parentText =
            response.data && response.data.text && response.data.text.data
              ? response.data.text.data
              : '';
          this.setState({ inheritedImage: parentImage });
          this.setState({ inheritedText: parentText });
        })
        .catch((error) => {
          return error;
        });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.actualPathName !== this.props.actualPathName) {
      this.setState({
        isHomepage: nextProps.actualPathName === '/',
      });
    }

    if (
      JSON.stringify(nextProps.frontPageSlides) !==
      JSON.stringify(this.props.frontPageSlides)
    ) {
      this.setState({
        frontPageSlides: nextProps.frontPageSlides,
      });
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.actualPathName !== this.props.actualPathName) {
      this.setState({
        isHomepage: this.props.actualPathName === '/',
      });
    }
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const defaultHeaderImage = this.props.defaultHeaderImage;
    let headerImageUrl = defaultHeaderImage?.image || defaultHeaderImage;
    const pathName = this.props.pathname;
    const hideSearch = ['/header', '/head', '/footer'].includes(pathName);

    const { bigLeading, inheritLeadingData, parentData } = this.props.extraData;

    return (
      <div className="header-wrapper" role="banner">
        <Sticky enabled={true} top={0}>
          <Container>
            <div className="header">
              <div className="logo-nav-wrapper space-between">
                <div className="logo">
                  <Logo />
                </div>
                {!hideSearch ? (
                  <div className="nav-actions-mobile large screen hidden">
                    <div className="search-widget">
                      <MobileSearchWidget pathname={this.props.pathname} />
                    </div>
                  </div>
                ) : null}
                <Navigation
                  navigation={this.props.navigationItems}
                  pathname={this.props.pathname}
                />
              </div>
            </div>
          </Container>
        </Sticky>
        <Container>
          <div
            className={`header-bg ${
              this.state.isHomepage ? 'homepage' : 'contentpage'
            }`}
          >
            <img src={HeaderBackground} alt="" />
          </div>

          {this.state.isHomepage ? (
            <HomepageSlider items={this.props.frontpage_slides} />
          ) : (
            <div style={{ position: 'relative' }}>
              <Breadcrumbs pathname={this.props.pathname} />

              <HeaderImage
                bigImage={bigLeading}
                metadata={inheritLeadingData ? this.state.inheritedText : ''}
                url={
                  inheritLeadingData
                    ? this.state.inheritedImage
                    : headerImageUrl
                }
              />
            </div>
          )}
        </Container>
      </div>
    );
  }
}
export default connect((state) => ({
  token: state.userSession.token,
}))(Header);
