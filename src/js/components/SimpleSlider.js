import React from 'react';
import { Link } from 'react-router';
import Slider from 'react-slick';
import style from '../../sass/styles.scss';

/**
 * Represents the SimpleSlider component which is responsible for rendering the
 * data received from its parent component. It also communicates to its parent
 * via a callback prop when the user interacts with a slide.
 */
export default class SimpleSlider extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);

    this.state =  {
      // Set react-slick configuration settings
      settings: {
        accessibility: true,
        dots: true,
        focusOnSelect: false,
        infinite: true,
        slideCount: this.props.videoData.length,
        slidesToShow: 5,
        slidesToScroll: 1,
        speed: 500,
        responsive: [{
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            dots: false
          }
        }, {
          breakpoint: 668,
          settings: {
            slidesToShow: 2
          }
        }, {
          breakpoint: 1000,
          settings: {
            slidesToShow: 3
          }
        }, {
          breakpoint: 1200,
          settings: {
            slidesToShow: 4
          }
        }]
      }
    };
  }

  /**
   * Calls the callback provided by the parent component, with the data passed to it.
   * @param {Object} data
   * @param {String} data.title
   * @param {String} data.url
   */
  handleClick(data) {
    this.props.onClickTriggered(data);
  }

  /**
   * Parses the video data obtained from the parent component, generates a slide
   * for each video and renders them in a Slider component.
   */
  render() {
    const videos = this.props.videoData;
    if (!videos || videos.length === 0) {
      // TODO: Add an animated indicator
      return <h3 class="placeholder-text">Loading content ...</h3>;
    }

    // Generates the slide DOM for each video
    // TODO: Extract into a Slide component
    const slides = videos.map(video => {
      console.log(video.images[0].url);
      return (
        <div key={video.id.toString()} class="slide-item">
          <div class="placeholder-image"></div>
          <img
            class="image"
            alt="Image not found"
            title="Click to watch video"
            src={video.images[0].url
                  ? video.images[0].url
                  : "../../assets/images/placeholder-image.jpg"}
            onClick={() => this.handleClick({ url: video.contents[0].url, title: video.title })}
          />
          <div class="details">
            <h4
              class="title"
              title="Click to watch video"
              onClick={() => this.handleClick({ url: video.contents[0].url, title: video.title })}>
              {video.title}
            </h4>
            <p class="sub-title">
              <span class="year">{new Date(video.publishedDate).getFullYear()}</span>
              <span class="lang">{video.metadata[0].value.toUpperCase()}</span>
            </p>
            <p class="description" title={video.description}>{video.description}</p>
            <table class="metadata-table">
              <tbody>
                <tr>
                  <td class="field">Director</td>
                  <td class="value">{video.credits[0].name}</td>
                </tr>
                <tr>
                  <td class="field">Cast</td>
                  <td class="value">
                  {
                    video.credits.map((credit, index, array) => {
                      if (index > 0) {
                        if (index < array.length - 1)
                          return credit.name + ', ';
                        else
                          return credit.name;
                      }
                    })
                  }
                  </td>
                </tr>
                <tr>
                  <td class="field">Rating</td>
                  <td class="value">{video.parentalRatings[0].rating}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      );
    });

    return (
      <Slider {...this.state.settings}>
        {slides}
      </Slider>
    );
  }
}
