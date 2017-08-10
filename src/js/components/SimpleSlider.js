import React from 'react';
import { Link } from 'react-router';
import Slider from 'react-slick';

export default class SimpleSlider extends React.Component {
	constructor(props) {
		super(props);
		this.state =  {
			settings: {
				accessibility: true,
				dots: false,
				focusOnSelect: true,
				infinite: false,
				slideCount: this.props.videoData.length,
				slidesToShow: 5,
				slidesToScroll: 1,
				speed: 500
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
				<div key={video.id.toString()} >
					<div>{video.title}</div>
					<div>{video.description}</div>
					<img src={video.img}/>
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