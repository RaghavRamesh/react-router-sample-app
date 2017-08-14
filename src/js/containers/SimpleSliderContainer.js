import React from 'react';
import { Link } from 'react-router';
import config from '../config';
import SimpleSlider from '../components/SimpleSlider';
import VODService from '../services/VODService';
import Modal from '../components/Modal';
import style from '../../sass/styles.scss';

let vodService = new VODService(config.vodService.endpointUrl);

export default class SimpleSliderContainer extends React.Component {
	constructor(props) {
		super(props);
		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.state = {
			videoData: [],
			modal: {
				isOpen: false,
				videoData: []
			}
		};
	}

	componentDidMount() {
		vodService.getData()
		.then(videoData =>
			this.setState({
				videoData
			})
		);
	}

	openModal(data) {
		this.setState({
      modal: {
      	isOpen: !this.state.modal.isOpen,
      	url: data.contents[0].url,
      	title: data.title,
      	width: data.contents[0].width,
      	height: data.contents[0].height
      }
    });
	}

	closeModal() {
		this.setState({
			modal: {
				isOpen: !this.state.modal.isOpen
			}
		});
	}

	render() {
		return (
			<div>
				<SimpleSlider videoData={this.state.videoData} onClickTriggered={(data) => this.openModal(data)}></SimpleSlider>
				<Modal show={this.state.modal.isOpen} onClose={this.closeModal} url={this.state.modal.url} title={this.state.modal.title}>
        </Modal>
			</div>
		);
	}
}
