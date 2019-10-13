/**
 * Document view component.
 * @module components/theme/View/ListingView
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

class ListingView extends Component {
  static propTypes = {
    content: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
      items: PropTypes.arrayOf(
        PropTypes.shape({
          '@id': PropTypes.string,
          '@type': PropTypes.string,
          description: PropTypes.string,
          review_state: PropTypes.string,
          title: PropTypes.string,
          url: PropTypes.string,
        }),
      ),
    }).isRequired,
  };

  render() {
    const content = this.props.content;
    return (
      <Container id="page-home">
        <Helmet title={content.title} />
        <section id="content-core">
          {content.items.map(item => (
            <article key={item.url}>
              <h2>
                <Link to={item.url} title={item['@type']}>
                  {item.title}
                </Link>
              </h2>
              {item.description && <p>{item.description}</p>}
            </article>
          ))}
        </section>
      </Container>
    );
  }
}

export default ListingView;
