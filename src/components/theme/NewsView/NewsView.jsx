import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { asyncConnect } from 'redux-connect';
import { getNews } from '~/actions';
import { Helmet, BodyClass } from '@plone/volto/helpers';
import { Container } from 'semantic-ui-react';
import { Icon } from '@plone/volto/components';
import NewsItem from './NewsItem';
import WidthBasedLayoutProvider from 'volto-base/components/theme/LayoutProvider/WidthBasedLayoutProvider';
import downKey from '@plone/volto/icons/down-key.svg';

class NewsView extends Component {
  static propTypes = {
    getNews: PropTypes.func.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        type: PropTypes.string,
        title: PropTypes.string,
        description: PropTypes.string,
      }),
    ),
  };

  state = {
    limit: 3,
    show: 3,
    grid: {
      phone: 'twelve',
      tablet: 'twelve',
      desktop: 'twelve',
      widescreen: 'twelve',
    }
  }

  componentDidMount() {}

  render() {
    if (!this.props.items) return (<h1>Bye World!</h1>);
    return (
      <Container>
        <Helmet title="News" />
        <div className="news-page-content">
          <BodyClass />
          <div className={`news-wrapper-view ${this.props.layout_type}-${this.state.grid[this.props.layout_type]}`}>
            { this.props.items && this.props.items.map((item, index) => {
              if (index < this.state.show) return (<NewsItem key={item.id} item={item}  />)
            })}
          </div>
          { this.state.show <= this.state.limit && (
              <button className="news-expand-button" onClick={() => { this.setState({ show: this.props.items.length }) }}>
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
}

export default compose(
  connect(
    (state, props) => ({
      items: state.news.items ? state.news.items : null, 
    }),
    {
      getNews
    },
  ),
  asyncConnect([
    {
      key: 'news',
      promise: ({ location, store: { dispatch } }) => dispatch(getNews())
    },
  ]),
)(WidthBasedLayoutProvider(NewsView));