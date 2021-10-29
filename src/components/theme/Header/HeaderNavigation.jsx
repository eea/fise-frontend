/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { Menu } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';

const MobileNav = ({ items, activeItem }) => {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <div className="lead-mobile-nav">
      {expanded ? (
        <div className="nav-items-container">
          {items &&
            items.length > 0 &&
            items.map((item, i) => (
              <a
                className={`lead-nav-item ${
                  activeItem.title === item.title ? 'active-mobile-nav' : ''
                }`}
                href={item.url}
                key={i}
              >
                {item.title}
              </a>
            ))}
        </div>
      ) : (
        <div className="nav-items-container">
          <p
            className="lead-nav-item active-mobile-nav"
            onClick={() => setExpanded(true)}
          >
            {activeItem.title}
          </p>
        </div>
      )}
    </div>
  );
};

const HeaderNavigation = ({ items }) => {
  const [activeItem, setActiveItem] = React.useState('');
  const [isMobile, setIsMobile] = React.useState(false);
  const history = useHistory();

  React.useEffect(() => {
    const activeRouteDetected = items.filter(
      (item) => item.url === history.location.pathname,
    );
    if (activeRouteDetected && activeRouteDetected.length > 0) {
      setActiveItem(activeRouteDetected[0]);
    }
    const width = window && window.innerWidth ? window.innerWidth : '';
    if (width && width <= 600) {
      setIsMobile(true);
    }
    if (width && width > 600) {
      setIsMobile(false);
    }
  }, [items]);

  return (
    <React.Fragment>
      {isMobile ? (
        <MobileNav activeItem={activeItem} items={items} />
      ) : (
        <div className="header-navigation-lead">
          {items.length > 0 &&
            items.map((item, index) => (
              <a
                key={index}
                className={`lead-navigation-item ${
                  activeItem.title === item.title ? 'active-lead-nav' : ''
                }`}
                href={item.url}
              >
                {item.title}
              </a>
            ))}
        </div>
      )}
    </React.Fragment>
  );
};

export default HeaderNavigation;
