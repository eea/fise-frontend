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
  }, []);

  const handleNavigate = (item) => {
    setActiveItem(item);
    history.push(`${item.url}`);
  };

  return (
    <div className="header-navigation-lead">
      <Menu tabular>
        {items.length > 0 &&
          items.map((item, index) => (
            <Menu.Item
              className="lead-navigation-item"
              name={item.title}
              active={activeItem.title === item.title}
              onClick={() => handleNavigate(item)}
            />
          ))}
      </Menu>
    </div>
  );
};

export default HeaderNavigation;
