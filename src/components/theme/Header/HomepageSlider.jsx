import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Icon } from '@plone/volto/components';

import Slider from 'react-slick';
import left from '@plone/volto/icons/left-key.svg';
import right from '@plone/volto/icons/right-key.svg';

// Import css files
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import SliderCaret from './slidercarret.svg';

function SampleNextArrow(props) {
  const { onClick } = props;
  return (
    <div className="slideArrow nextArrow" onClick={onClick}>
      <Icon name={right} size="45px" />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { onClick } = props;
  return (
    <div className="slideArrow prevArrow" onClick={onClick}>
      <Icon name={left} size="45px" />
    </div>
  );
}

class HomepageSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nav1: null,
      nav2: null,
      slides: [],
    };
    this.getSlides = this.getSlides.bind(this);
    // this.SampleNextArrow = this.SampleNextArrow.bind(this);
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

  getSlides(items) {
    const slidesArr = items ? items : this.props.items;

    const slidesUrl = slidesArr.map((item, index) => {
      return (
        <div className="slider-slide" key={index}>
          <div
            className="slider-image"
            style={{ backgroundImage: `url(${item.image})` }}
          />
          <div className="slide-overlay" />
          <div className="slide-body">
            <div className="slide-title">{item.title}</div>
            <div className="slide-description">{item.description}</div>
          </div>
        </div>
      );
    });
    this.setState({
      slides: slidesUrl,
    });
    this.setState({
      nav1: this.slider1,
      nav2: this.slider2,
    });
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
      !this.state.nav1 &&
      !this.state.nav2 &&
      this.state.slides &&
      this.state.slides.length
    ) {
      this.setState({
        nav1: this.slider1,
        nav2: this.slider2,
      });
    }
  }
  // componentDidUpdate(prevProps) {
  //   if((JSON.stringify(this.props.items) !== JSON.stringify(prevProps.items) && this.props.items && this.props.items.length)) {
  //     this.getSlides();
  //   }
  // }

  componentWillReceiveProps(nextProps) {
    if (
      JSON.stringify(nextProps.items) !== JSON.stringify(this.props.items) &&
      nextProps.items &&
      nextProps.items.length
    ) {
      this.getSlides(nextProps.items);
    }
  }
  render() {
    const settings = {
      dots: false,
      // infinite: true,
      // lazyLoad: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
    };

    if (!this.state.slides.length) return '';
    return (
      <div className="slider-wrapper">
        <Slider
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
          swipeToSlide={true}
          focusOnSelect={true}
        >
          {this.state.slides}
        </Slider>
        <img className="slider-caret" src={SliderCaret} alt="" />
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
