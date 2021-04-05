import React, { useState } from 'react';
import { Helmet, BodyClass } from '@plone/volto/helpers';
import { Container } from 'semantic-ui-react';
import { Icon } from '@plone/volto/components';
import { Link } from 'react-router-dom';
import NewsItem from './NewsItem';
import WidthBasedLayoutProvider from 'volto-plotlycharts/LayoutProvider/WidthBasedLayoutProvider';
import downKey from '@plone/volto/icons/down-key.svg';
import rss from '@plone/volto/icons/rss.svg';

const getItems = (propsItems, type = null) => {
  return propsItems
    .sort((a, b) => {
      return new Date(b.start) - new Date(a.start);
    })
    .sort((a, b) => {
      return new Date(b.effective) - new Date(a.effective);
    })
    .map((item, index) => ({
      id: item['@id'],
      date: item.effective,
      start: item.start,
      end: item.end,
      location: item.location,
      type: item['@type'],
      title: item.title,
      image: item.image ? item.image.download : null,
      description: item.description,
      text: item.text,
      initial_index: index,
      topics: item.topics,
      blocks: item.blocks,
      blocks_layout: item.blocks_layout,
    }));
};

const getTitle = (propsLocation) => {
  const title = propsLocation.pathname.split('/')[1].toLowerCase();
  return {
    lowerCase: title,
    capitalized: title.charAt(0).toUpperCase() + title.slice(1),
  };
};

const NewsView = (props) => {
  const [show, setShow] = useState(6);
  const limit = 6;
  const grid = {
    phone: 'twelve',
    tablet: 'twelve',
    desktop: 'twelve',
    widescreen: 'twelve',
  };
  const title = getTitle(props.location);
  const items = getItems(props.content.items, title.lowerCase);

  if (!items) return <h1>{title.capitalized}</h1>;

  const rssButton = (
    <Link className="rss-feed" to="rss-feed" color="teal">
      <span>Subscribe via RSS</span>
      <Icon name={rss} size="14px" />
    </Link>
  );

  const itemsByYear = {};
  // const yearOptions = [];
  items.forEach((item) => {
    let year;
    if (item.start) year = new Date(item.start).getFullYear();
    //  For events
    else if (item.date) year = new Date(item.date).getFullYear(); //  For news
    if (!itemsByYear[year]) itemsByYear[year] = [];
    itemsByYear[year].push(item);
  });

  return (
    <Container>
      <Helmet title={title.capitalized} />
      <div className="news-page-content">
        <BodyClass />
        {rssButton}
        <div
          className={`news-wrapper-view ${props.layout_type}-${
            grid[props.layout_type]
          }`}
        >
          {itemsByYear &&
            Object.keys(itemsByYear)
              .sort((a, b) => b - a)
              .map((year, yearIndex) => {
                return itemsByYear[year].map((item, index) => {
                  if (item.initial_index < show) {
                    return (
                      <React.Fragment>
                        {index === 0 ? (
                          <h2 className="text-center">
                            {year !== 'undefined' ? year : ''}
                          </h2>
                        ) : (
                          ''
                        )}
                        <NewsItem key={item.id} item={item} />
                      </React.Fragment>
                    );
                  }
                });
              })}
        </div>
        {items.length > limit && show <= limit && (
          <button
            className="news-expand-button"
            onClick={() => {
              setShow(items.length);
            }}
          >
            <span />
            <Icon name={downKey} size="60px" color="#E7E7E7" />
            <span />
          </button>
        )}
      </div>
    </Container>
  );
};

export default WidthBasedLayoutProvider(NewsView);
