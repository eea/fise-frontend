/**
 * Header component.
 * @module components/theme/Header/Header
 */

import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { Logo, Navigation, Breadcrumbs } from '@plone/volto/components';

import HeaderImage from '~/components/theme/Header/HeaderImage';
import HomepageSlider from '~/components/theme/Header/HomepageSlider';
import MobileSearchWidget from '~/components/theme/MobileSearchWidget/MobileSearchWidget';
import Sticky from 'react-stickynode';
import HeaderBackground from './header-bg.png';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHomepage: this.props.actualPathName === '/',
      url: null,
      description: null,
      title: null,
      frontPageSlides: null,
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
    folderHeader: PropTypes.any,
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.actualPathName !== this.props.actualPathName) {
      this.setState({
        isHomepage: nextProps.actualPathName === '/',
      });
    }
    if (
      JSON.stringify(nextProps.folderHeader.url) !==
      JSON.stringify(this.props.folderHeader.url)
    ) {
      this.setState({
        url: nextProps.folderHeader.url,
        description: nextProps.folderHeader.description,
        title: nextProps.folderHeader.title,
        image: nextProps.folderHeader.image,
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
                    <div className="search">
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

              <HeaderImage url={headerImageUrl} />
            </div>
          )}
        </Container>
      </div>
    );
  }
}

export default compose(
  connect(state => ({
    token: state.userSession.token,
    folder_header: state.folder_header.items,
  })),
)(Header);
