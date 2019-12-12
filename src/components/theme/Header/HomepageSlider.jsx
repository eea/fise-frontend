import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Icon } from '@plone/volto/components';

// import Slider from 'react-slick';
import left from '@plone/volto/icons/left-key.svg';
import right from '@plone/volto/icons/right-key.svg';

// Import css files
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import SliderCaret from './slidercarret.svg';

import ImageGallery from 'react-image-gallery';

import 'react-image-gallery/styles/css/image-gallery.css';

// function SampleNextArrow(props) {
//   const { onClick } = props;
//   return (
//     <div
//       role="button"
//       className="slideArrow nextArrow"
//       onClick={onClick}
//       tabIndex={-1}
//       onKeyPress={() => {}}
//     >
//       <Icon name={right} size="45px" />
//     </div>
//   );
// }

// function SamplePrevArrow(props) {
//   const { onClick } = props;
//   return (
//     <div
//       role="button"
//       className="slideArrow prevArrow"
//       onClick={onClick}
//       tabIndex={-1}
//       onKeyPress={() => {}}
//     >
//       <Icon name={left} size="45px" />
//     </div>
//   );
// }

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

  renderThumbnail = item => {
    return (
      <div className="slider-thumbnail" key={item.original}>
        {/* <img src={item.original} /> */}
        <div
          className="thumbnail-img"
          style={{ backgroundImage: `url(${item.original})` }}
        />
        <div className="slide-title">{item.title}</div>
      </div>
    );
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
      !this.state.slides.length 
      &&
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
        {/* <Slider
          className="mainSlider"
          asNavFor={this.state.nav2}
          ref={slider => (this.slider1 = slider)}
          {...settings}
        >
          {this.state.slides}
        </Slider>
        <Slider
          className="navSlider"
          asNavFor={this.state.nav1}
          ref={slider => (this.slider2 = slider)}
          slidesToShow={3}
          slidesToScroll={1}
          swipeToSlide={true}
          focusOnSelect={true}
        >
          {this.state.slides}
        </Slider> */}
        {/* <img className="slider-caret" src={SliderCaret} alt="" /> */}
        <ImageGallery
          className="mainSlider"
          items={this.state.slides}
          showFullscreenButton={false}
          showPlayButton={false}
          autoPlay
          renderItem={this.renderSlide}
          renderThumbInner={this.renderThumbnail}
          slideDuration={300}
          slideInterval={120000}
        />
      </div>
    );
  }
}

// export default compose(
//   connect(
//     state => ({
//       items: state.frontpage_slides.items,
//     }),
//     { getFrontpageSlides },
//   ),
// )(HomepageSlider);

export default HomepageSlider;
