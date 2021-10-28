import React from 'react';
import { Menu } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';

const HeaderNavigation = ({ items }) => {
  const [activeItem, setActiveItem] = React.useState('');
  const history = useHistory();

  React.useEffect(() => {
    const activeRouteDetected = items.filter(
      (item) => item.url === history.location.pathname,
    );
    if (activeRouteDetected && activeRouteDetected.length > 0) {
      setActiveItem(activeRouteDetected[0]);
    }
  }, [items]);

  return (
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
  );
};

export default HeaderNavigation;
