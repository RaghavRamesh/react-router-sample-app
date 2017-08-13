import React from 'react';
import { Link } from 'react-router';
import Slider from 'react-slick';
import style from '../../sass/styles.scss';

export default class SimpleSlider extends React.Component {
	constructor(props) {
		super(props);
		this.state =  {
			settings: {
				accessibility: true,
				dots: true,
				focusOnSelect: true,
				infinite: false,
				slideCount: this.props.videoData.length,
				slidesToShow: 5,
				slidesToScroll: 1,
				speed: 500,
				responsive: [{
					breakpoint: 480,
					settings: {
						slidesToShow: 1
					}
				}, {
					breakpoint: 768,
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

	render() {
		let videos = this.props.videoData;
		if (!videos || videos.length === 0) {
			return <div>Loading videos ...</div>;
		}

		let slides = videos.map(video => {
			return (
				<div key={video.id.toString()} class="slide-item" >
					<img src={video.images[0].url} />
					<div class="details">
						<h4 class="title">{video.title}</h4>
						<p class="sub-title">
							<span class="year">{new Date(video.publishedDate).getFullYear()}</span>
							<span class="lang">{video.metadata[0].value.toUpperCase()}</span>
						</p>
						<p class="description">{video.description}</p>
						<table class="more-details">
							<tbody>
								<tr>
									<td class="field">Director</td>
									<td class="value">{video.credits[0].name}</td>
								</tr>
								<tr>
									<td class="field">Cast</td>
									<td class="value">
									{
										video.credits.map((c, i, a) => {
											if (i > 0) {
												if (i < a.length - 1)
													return c.name + ', ';
												else
													return c.name;
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
