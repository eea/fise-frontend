import React from 'react';
import { Menu } from 'semantic-ui-react';

const HeaderNavigation = ({ items }) => {
  const [activeItem, setActiveItems] = React.useState('');
  const handleItemClick = (e, { name }) => setActiveItems(name);

  return (
    <div className="header-navigation-lead">
      {items.length > 0 &&
        items.map((item, index) => <div key={index}>{item.title}</div>)}
      <Menu tabular>
        <Menu.Item
          name="bio"
          active={activeItem === 'bio'}
          onClick={handleItemClick}
        />
        <Menu.Item
          name="photos"
          active={activeItem === 'photos'}
          onClick={handleItemClick}
        />
      </Menu>
    </div>
  );
};

export default HeaderNavigation;
