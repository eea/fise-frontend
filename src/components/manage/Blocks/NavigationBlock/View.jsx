/* REACT */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
/* SEMANTIC UI */
import { Menu } from 'semantic-ui-react';
/* HELPERS */
import cx from 'classnames';
import { isActive, getNavigationByParent, getBasePath } from './helpers';
import {
  deleteQueryParam,
  setQueryParam,
} from '@eeacms/volto-datablocks/actions';
import { useEffect } from 'react';
import './styles.css';
import cookie from 'react-cookie';
import { Icon } from '@plone/volto/components';
import downIcon from '@plone/volto/icons/down-key.svg';
import closeIcon from '@plone/volto/icons/clear.svg';

const View = ({ content, ...props }) => {
  const { data } = props;
  const [state, setState] = useState({
    activeItem: '',
  });
  const [navigationItems, setNavigationItems] = useState([]);
  const [pages, setPages] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [expand, setExpand] = useState(false);

  const isLoggedIn = cookie.load('auth_token');

  const parent =
    data?.navFromParent?.value && props.properties?.parent
      ? getBasePath(props.properties?.parent?.['@id'])
      : data.parent?.value;
  const history = useHistory();
  useEffect(() => {
    const pagesProperties = data.pages?.value
      ? data.pages?.value?.properties || {}
      : {};
    const newPages =
      Object.keys(pagesProperties).map((page) => pagesProperties[page]) || [];
    setPages(newPages);
    setNavigationItems([...(props.navigation?.items || []), ...newPages]);

    const width = window && window.innerWidth ? window.innerWidth : '';
    if (width && width <= 600) {
      setIsMobile(true);
    }
    if (width && width > 600) {
      setIsMobile(false);
    }
  }, [props.navigation, data.pages?.value]);

  const isFixed = props.fixedTabs;

  const getActiveItemName = () => {
    const activeItem = navigationItems.filter(
      (i) => getBasePath(i.url) === props.pathname,
    );
    const name = activeItem && activeItem[0] ? activeItem[0].title : '';

    return name;
  };

  const handleNavigate = (url) => {
    setExpand(false);
    if (props.mode !== 'edit' && url !== history.location.pathname) {
      history.push(`${url}${props.query}`);
    }
  };

  if (navigationItems.length === 0 && props.mode !== 'edit') return null;
  return (props.navigation?.items?.length && parent) || pages.length ? (
    <div
      className={`tabs-view-menu modern-tabs ${isFixed ? '' : 'sticky-tabs'} ${
        !isFixed && isLoggedIn ? 'mobile-authenticated-sticky' : ''
      }`}
    >
      <Menu
        widths={
          navigationItems.length ||
          props.navigation?.items?.length ||
          pages.length
        }
        className={
          props.data.className?.value ? props.data.className.value : ''
        }
      >
        {isMobile ? (
          <React.Fragment>
            {expand ? (
              <div style={{ position: 'relative' }}>
                {navigationItems.map((item, index) => {
                  const url = getBasePath(item.url);
                  const name = item.title;
                  if (
                    props.navigation?.items?.filter(
                      (navItem) => navItem.title === item.title,
                    ).length
                  ) {
                    if (
                      isActive(url, props.pathname) &&
                      url !== state.activeItem
                    ) {
                      setState({
                        ...state,
                        activeItem: url,
                      });
                    } else if (
                      !isActive(url, props.pathname) &&
                      url === state.activeItem
                    ) {
                      setState({
                        ...state,
                        activeItem: '',
                      });
                    }
                  }

                  return (
                    <div style={{ position: 'relative' }}>
                      <Menu.Item
                        className={cx(
                          index > 0 ? 'sibling-on-left' : '',
                          index < navigationItems.length - 1
                            ? 'sibling-on-right'
                            : '',
                          'nav-tab-item',
                        )}
                        name={name}
                        key={url}
                        active={
                          state.activeItem
                            ? state.activeItem === url
                            : !url
                            ? isActive(url, props.pathname)
                            : false
                        }
                        onClick={() => handleNavigate(url)}
                      ></Menu.Item>
                      {isActive(url, props.pathname) && (
                        <Icon
                          className="mobile-nav-icon"
                          name={closeIcon}
                          size="30px"
                          onClick={() => setExpand(false)}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div style={{ position: 'relative' }}>
                <Menu.Item
                  className={'nav-tab-item active-nav-tab'}
                  name={getActiveItemName()}
                  active={true}
                  onClick={() => setExpand(true)}
                />
                <Icon
                  className="mobile-nav-icon"
                  name={downIcon}
                  size="35px"
                  onClick={() => setExpand(true)}
                />
              </div>
            )}
          </React.Fragment>
        ) : (
          navigationItems.map((item, index) => {
            const url = getBasePath(item.url);
            const name = item.title;
            if (
              props.navigation?.items?.filter(
                (navItem) => navItem.title === item.title,
              ).length
            ) {
              if (isActive(url, props.pathname) && url !== state.activeItem) {
                setState({
                  ...state,
                  activeItem: url,
                });
              } else if (
                !isActive(url, props.pathname) &&
                url === state.activeItem
              ) {
                setState({
                  ...state,
                  activeItem: '',
                });
              }
            }

            return (
              <Menu.Item
                className={cx(
                  index > 0 ? 'sibling-on-left' : '',
                  index < navigationItems.length - 1 ? 'sibling-on-right' : '',
                  'nav-tab-item',
                )}
                name={name}
                key={url}
                active={
                  state.activeItem
                    ? state.activeItem === url
                    : !url
                    ? isActive(url, props.pathname)
                    : false
                }
                onClick={() => handleNavigate(url)}
              />
            );
          })
        )}
      </Menu>
    </div>
  ) : props.mode === 'edit' ? (
    <p>
      There are no pages inside of selected page. Make sure you add pages or
      delete the block
    </p>
  ) : (
    ''
  );
};

export default compose(
  connect(
    (state, props) => ({
      query: state.router.location.search,
      content: state.content.data,
      pathname: state.router.location.pathname,
      discodata_query: state.discodata_query,
      discodata_resources: state.discodata_resources,
      navItems: state.navigation?.items,
      flags: state.flags,
      fixedTabs: props.data?.fixedTabs?.value,
      navigation: props.properties?.parent
        ? getNavigationByParent(
            state.navigation?.items,
            props.data?.navFromParent?.value
              ? getBasePath(props.properties?.parent?.['@id'])
              : props.data?.parent?.value,
          )
        : {},
    }),
    { deleteQueryParam, setQueryParam },
  ),
)(View);
