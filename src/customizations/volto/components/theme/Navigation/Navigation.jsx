/**
 * Navigation components.
 * @module components/theme/Navigation/Navigation
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isMatch } from 'lodash';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import { defineMessages, injectIntl } from 'react-intl';
import { Menu, Dropdown } from 'semantic-ui-react';
import cx from 'classnames';
import { getBasePath } from '~/helpers';

const messages = defineMessages({
  closeMobileMenu: {
    id: 'Close menu',
    defaultMessage: 'Close menu',
  },
  openMobileMenu: {
    id: 'Open menu',
    defaultMessage: 'Open menu',
  },
});

/**
 * Navigation container class.
 * @class Navigation
 * @extends Component
 */
class Navigation extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    // getNavigation: PropTypes.func.isRequired,
    pathname: PropTypes.string.isRequired,
    // items: PropTypes.arrayOf(
    //   PropTypes.shape({
    //     title: PropTypes.string,
    //     url: PropTypes.string,
    //     items: PropTypes.array,
    //   }),
    // ).isRequired,
  };

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs Navigation
   */
  constructor(props) {
    super(props);
    this.toggleMobileMenu = this.toggleMobileMenu.bind(this);
    this.closeMobileMenu = this.closeMobileMenu.bind(this);
    this.state = {
      isMobileMenuOpen: false,
      tappedMenu: null,
    };
  }

  /**
   * Component will mount
   * @method componentWillMount
   * @returns {undefined}getBasePath
   */
  componentWillMount() {
    // this.props.getNavigation(getBaseUrl(this.props.pathname), 2);
    this.closeMobileMenu();
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.pathname !== this.props.pathname) {
      // this.props.getNavigation(getBaseUrl(nextProps.pathname), 2);
      this.closeMobileMenu();
    }
  }

  /**
   * Check if menu is active
   * @method isActive
   * @param {string} url Url of the navigation item.
   * @returns {bool} Is menu active?
   */
  isActive(url) {
    return (
      (url === '' && this.props.pathname === '/') ||
      (url !== '' && isMatch(this.props.pathname.split('/'), url.split('/')))
    );
  }

  componentDidUpdate(nextProps) {
    // this hack prevents menu from staying open on route change
    if (__CLIENT__ && document.querySelector('body')) {
      document.querySelector('body').click();
    }
  }

  /**
   * Toggle mobile menu's open state
   * @method toggleMobileMenu
   * @returns {undefined}
   */
  toggleMobileMenu() {
    this.setState({ isMobileMenuOpen: !this.state.isMobileMenuOpen });
  }

  /**
   * Close mobile menu
   * @method closeMobileMenu
   * @returns {undefined}
   */
  closeMobileMenu() {
    if (!this.state.isMobileMenuOpen) {
      return;
    }
    this.setState({ isMobileMenuOpen: false });
  }

  formatNavUrl = nav => {
    return nav.map(navItem => ({
      ...navItem,
      url: navItem.url ? getBasePath(navItem.url) : '',
      items: navItem.items ? this.formatNavUrl(navItem.items) : false,
    }));
  };

  render() {
    const navigation = this.formatNavUrl(this.props.navigation);
    // return <div>{JSON.stringify(this.props.navigation)}</div>
    return (
      <nav className="navigation">
        <div className="hamburger-wrapper large screen hidden widescreen hidden">
          <button
            className={cx('hamburger hamburger--collapse', {
              'is-active': this.state.isMobileMenuOpen,
            })}
            aria-label={
              this.state.isMobileMenuOpen
                ? this.props.intl.formatMessage(messages.closeMobileMenu, {
                    type: this.props.type,
                  })
                : this.props.intl.formatMessage(messages.openMobileMenu, {
                    type: this.props.type,
                  })
            }
            title={
              this.state.isMobileMenuOpen
                ? this.props.intl.formatMessage(messages.closeMobileMenu, {
                    type: this.props.type,
                  })
                : this.props.intl.formatMessage(messages.openMobileMenu, {
                    type: this.props.type,
                  })
            }
            type="button"
            onClick={this.toggleMobileMenu}
          >
            <span className="hamburger-box">
              <span className="hamburger-inner" />
            </span>
          </button>
        </div>
        <Menu
          stackable
          pointing
          secondary
          className={
            this.state.isMobileMenuOpen
              ? 'open firstLevel'
              : 'computer large screen widescreen only'
          }
        >
          {navigation.map(item =>
            item.items && item.items.length ? (
              <div
                // className="ui item simple dropdown item firstLevel"
                // closeOnChange={true}
                className={
                  this.isActive(item.url)
                    ? 'ui item simple dropdown item menuActive firstLevel'
                    : 'ui item simple dropdown item firstLevel'
                }
                key={item.url}
                // trigger={

                // }
                item
                simple
              >
                <React.Fragment>
                  {item.items && item.items.length ? (
                    <div
                      onClick={() => {
                        if (
                          this.state.isMobileMenuOpen &&
                          this.state.tappedMenu === item.url
                        ) {
                          this.setState({ tappedMenu: null });
                          return;
                        }
                        this.state.isMobileMenuOpen &&
                          this.setState({ tappedMenu: item.url });
                      }}
                      className="firstLevel-title"
                    >
                      {item.title}
                    </div>
                  ) : (
                    <Link
                      onClick={e =>
                        item.items && item.items.length && e.preventDefault()
                      }
                      className="firstLevel"
                      to={
                        item.items && item.items.length
                          ? ''
                          : item.url === ''
                          ? '/'
                          : item.url
                      }
                      key={item.url}
                    >
                      {item.title}
                    </Link>
                  )}
                  {(this.state.isMobileMenuOpen &&
                    this.state.tappedMenu === item.url) ||
                  !this.state.isMobileMenuOpen ? (
                    <Dropdown.Menu className={`${item.title}--section`}>
                      {item.items.map(subitem => (
                        <Dropdown.Item
                          className={`${item.title}--section-item`}
                          id={subitem.title}
                          key={subitem.url}
                        >
                          {item.title === 'Countries' &&
                          subitem.title === 'Regions' ? (
                            <div
                              className={
                                this.isActive(subitem.url)
                                  ? 'item secondLevel menuActive'
                                  : 'item secondLevel'
                              }
                            >
                              {subitem.title}
                            </div>
                          ) : (
                            <Link
                              to={subitem.url === '' ? '/' : subitem.url}
                              key={subitem.url}
                              className={
                                this.isActive(subitem.url)
                                  ? 'item secondLevel menuActive'
                                  : 'item secondLevel'
                              }
                            >
                              {subitem.title}
                            </Link>
                          )}
                          {subitem.items && (
                            <div className="submenu-wrapper">
                              <div className="submenu">
                                {subitem.items.map(subsubitem => (
                                  <Link
                                    to={
                                      subsubitem.url === ''
                                        ? '/'
                                        : subsubitem.url
                                    }
                                    key={subsubitem.url}
                                    className={
                                      this.isActive(subsubitem.url)
                                        ? 'item thirdLevel menuActive'
                                        : 'item thirdLevel'
                                    }
                                  >
                                    {subsubitem.title}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          )}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  ) : (
                    ''
                  )}
                </React.Fragment>
              </div>
            ) : (
              <Link
                // style={{ display: `${__CLIENT__ ? 'block' : 'none'}` }}
                to={item.url === '' ? '/' : item.url}
                key={item.url}
                className={
                  this.isActive(item.url)
                    ? 'item menuActive firstLevel'
                    : 'item firstLevel'
                }
              >
                {item.title}
              </Link>
            ),
          )}
        </Menu>
      </nav>
    );
  }
}

export default compose(injectIntl)(Navigation);
