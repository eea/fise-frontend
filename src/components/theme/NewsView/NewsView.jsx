import React, { Component } from 'react';
import { Helmet, BodyClass } from '@plone/volto/helpers';
import { Container, Popup } from 'semantic-ui-react';
import { Icon } from '@plone/volto/components';
import { Label } from 'semantic-ui-react';
import NewsItem from './NewsItem';
import WidthBasedLayoutProvider from 'volto-base/components/theme/LayoutProvider/WidthBasedLayoutProvider';
import downKey from '@plone/volto/icons/down-key.svg';
import rss from '@plone/volto/icons/rss.svg';
import { settings } from '~/config';

class NewsView extends Component {
  state = {
    items: [],
    limit: 3,
    show: 3,
    grid: {
      phone: 'twelve',
      tablet: 'twelve',
      desktop: 'twelve',
      widescreen: 'twelve',
    },
  };

  componentDidMount() {
    const items = this.props.content.items
      .map(item => ({
        id: item['@id'],
        date: item.effective,
        type: item['@type'],
        title: item.title,
        image: item.image ? item.image.download : null,
        description: item.description,
        text: item.text,
        topics: item.topics,
        blocks: item.blocks,
        blocks_layout: item.blocks_layout,
      }))
      .sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      })
      .filter(item => item.type === 'News Item');
    this.setState({ items });
  }

  render() {
    if (!this.state.items) return <h1>News</h1>;
    return (
      <Container>
        <Helmet title="News" />
        <div className="news-page-content">
          <BodyClass />
          <Label
            className="rss-feed"
            as="a"
            size="large"
            href={settings.apiPath + '/news/RSS'}
            target="_blank"
            color="teal"
          >
            <span>Subscribe via RSS</span>
            <Icon name={rss} size="14px" />
          </Label>
          <div
            className={`news-wrapper-view ${this.props.layout_type}-${
              this.state.grid[this.props.layout_type]
            }`}
          >
            {this.state.items &&
              this.state.items.map((item, index) => {
                if (index < this.state.show)
                  return <NewsItem key={item.id} item={item} />;
              })}
          </div>
          {this.state.items.length > this.state.limit &&
            this.state.show <= this.state.limit && (
              <button
                className="news-expand-button"
                onClick={() => {
                  this.setState({ show: this.state.items.length });
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
  }
}

export default WidthBasedLayoutProvider(NewsView);
