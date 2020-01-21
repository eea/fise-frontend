import React, { Component } from 'react';
import PropTypes from 'prop-types';

import 'react-image-gallery/styles/css/image-gallery.css';

import ImageGallery from 'react-image-gallery';

class HomepageSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slides: [],
    };
    this.getSlides = this.getSlides.bind(this);
  }

  static propTypes = {
    items: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        url: PropTypes.string,
        description: PropTypes.string,
      }),
    ),
  };

  renderSlide = item => {
    return (
      <div className="slider-slide">
        <div
          className="slide-img"
          style={{ backgroundImage: `url(${item.original})` }}
        />
        <div className="slide-overlay" />
        <div className="slide-body">
          <div className="slide-title">{item.title}</div>
          <div className="slide-description">{item.description}</div>
        </div>
      </div>
    );
  };

  getSlides(items) {
    const slidesArr = items ? items : this.props.items;

    const slidesUrl = slidesArr.map((item, index) => {
      return {
        original: item.image,
        thumbnail: item.image,
        title: item.title,
        description: item.description,
      };
    });
    this.setState({
      slides: slidesUrl,
    });

    return slidesUrl;
  }

  componentDidMount() {
    if (this.props.items && this.props.items.length) {
      this.getSlides();
    } else {
      this.setState({
        slides: [],
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (
      !this.state.slides.length &&
      this.props.items &&
      this.props.items.length
    ) {
      this.getSlides();
    }
  }

  render() {
    if (!this.state.slides.length) return '';
    return (
      <div className="slider-wrapper">
        <ImageGallery
          className="mainSlider"
          items={this.state.slides}
          showFullscreenButton={false}
          showPlayButton={false}
          autoPlay
          renderItem={this.renderSlide}
          // renderThumbInner={this.renderThumbnail}
          showThumbnails={false}
          showBullets={true}
          slideDuration={300}
          slideInterval={258000}
        />
      </div>
    );
  }
}

export default HomepageSlider;
