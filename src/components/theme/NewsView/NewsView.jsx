import React, { useState } from 'react';
import { Helmet, BodyClass } from '@plone/volto/helpers';
import { Container } from 'semantic-ui-react';
import { Icon } from '@plone/volto/components';
import { Link } from 'react-router-dom'
import NewsItem from './NewsItem';
import WidthBasedLayoutProvider from 'volto-base/components/theme/LayoutProvider/WidthBasedLayoutProvider';
import downKey from '@plone/volto/icons/down-key.svg';
import rss from '@plone/volto/icons/rss.svg';

const getItems = (propsItems, type = null) => {
  return propsItems.map(item => ({
    id: item['@id'],
    date: item.effective,
    start: item.start,
    end: item.end,
    type: item['@type'],
    title: item.title,
    image: item.image ? item.image.download : null,
    description: item.description,
    text: item.text,
    topics: item.topics,
    blocks: item.blocks,
    blocks_layout: item.blocks_layout
  })).sort((a, b) => {
    return new Date(b.date) - new Date(a.date) 
  });
}

const getTitle = (propsLocation) => {
  const title = propsLocation.pathname.split('/')[1].toLowerCase()
  return {
    lowerCase: title,
    capitalized: title.charAt(0).toUpperCase() + title.slice(1)
  }
}

const NewsView = (props) => {
  const [show, setShow] = useState(3);
  const limit = 3;
  const grid = {
    phone: 'twelve',
    tablet: 'twelve',
    desktop: 'twelve',
    widescreen: 'twelve'
  };
  const title = getTitle(props.location);
  const items = getItems(props.content.items, title.lowerCase);
  const rssButton = (
    <Link className="rss-feed" to='/rss' color="teal">
      <span>Subscribe via RSS</span>
      <Icon name={rss} size="14px" />
    </Link>
  );
  if (!items) return (<h1>{ title.capitalized }</h1>);
  return (
    <Container>
      <Helmet title={ title.capitalized } />
      <div className="news-page-content">
        <BodyClass />
        { rssButton }
        <div className={`news-wrapper-view ${props.layout_type}-${grid[props.layout_type]}`}>
          { items && items.map((item, index) => {
            if (index < show) return (<NewsItem key={item.id} item={item}  />)
          })}
        </div>
        { items.length > limit && show <= limit && (
            <button className="news-expand-button" onClick={() => { setShow(items.length) }}>
              <span />
              <Icon name={downKey} size="60px" color="#E7E7E7" />
              <span />
            </button>
          )
        }
      </div>
    </Container>
  );
}

export default WidthBasedLayoutProvider(NewsView);