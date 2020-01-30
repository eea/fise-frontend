import React, { Component } from 'react';
import PropTypes from 'prop-types';

import 'react-image-gallery/styles/css/image-gallery.css';

import ImageGallery from 'react-image-gallery';
// import HomepageSliderPlaceholder from './HomepageSliderPlaceholder';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Placeholder } from 'semantic-ui-react';
import { getBasePath } from '~/helpers';
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
      <div className="slider-thumbnail" key={getBasePath(item.original)}>
        {/* <img src={item.original} /> */}
        <div
          className="thumbnail-img"
          style={{ backgroundImage: `url(${getBasePath(item.original)})` }}
        />
        <div className="slide-title">{item.title}</div>
      </div>
    );
  };

  renderSlide = item => {
    return (
      <div className="slider-slide">
        {/* <div
          className="slide-img"
          style={{ backgroundImage: `url(${item.original})` }}
        > */}
        {item.original ? (
          <LazyLoadImage
            className="slide-img"
            // alt={image.alt}
            height={601}
            effect="blur"
            // delayMethod={'debounce'}
            // delayTime={1900}
            // src={item.original} // use normal <img> attributes as props
            style={{ backgroundImage: `url(${getBasePath(item.original)})` }}
            width={'100%'}
            visibleByDefault={true}
            placeholder={
              <Placeholder>
                <Placeholder.Image rectangular />
              </Placeholder>
            }
          />
        ) : (
          <Placeholder>
            <Placeholder.Image rectangular />
          </Placeholder>
        )}

        {/* </div> */}

        <div className="slide-overlay" />
        <div className="slide-body">
          <div className="slide-title">{item.title || ''}</div>
          <div className="slide-description">{item.description || ''}</div>
        </div>
      </div>
    );
  };

  getSlides(items) {
    const slidesArr = items ? items : this.props.items;

    const slidesUrl =
      (slidesArr &&
        slidesArr.map((item, index) => {
          return {
            original: item.image,
            thumbnail: item.image,
            title: item.title,
            description: item.description,
          };
        })) ||
      [];
    // this.setState({
    //   slides: slidesUrl,
    // });

    return slidesUrl;
  }

  // componentDidMount() {
  //   if (this.props.items && this.props.items.length) {
  //     this.getSlides();
  //   } else {
  //     this.setState({
  //       slides: [],
  //     });
  //   }
  // }

  // componentDidUpdate(prevProps) {
  //   if (
  //     !this.state.slides.length &&
  //     this.props.items &&
  //     this.props.items.length
  //   ) {
  //     this.getSlides();
  //   }
  // }

  render() {
    // if (!this.state.slides.length) return '';
    const slides = this.getSlides(this.props.items);
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
          items={slides}
          showFullscreenButton={false}
          showPlayButton={false}
          autoPlay
          renderItem={this.renderSlide}
          renderThumbInner={this.renderThumbnail}
          slideDuration={300}
          slideInterval={10000}
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
