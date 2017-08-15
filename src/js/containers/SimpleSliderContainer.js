import React from 'react';
import { Link } from 'react-router';
import config from '../config';
import SimpleSlider from '../components/SimpleSlider';
import VODService from '../services/VODService';
import Modal from '../components/Modal';
import style from '../../sass/styles.scss';

const vodService = new VODService(config.vodService.endpointUrl);

/**
 * Represents the SimpleSliderContainer component which is responsible for
 * fetching data from VODService and passing to the Slider component.
 * The class also renders a Modal component upon the Slider's request.
 * FIXME: Container should only render the component it's meant to render.
 */
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

	/**
	 * Updates the state which causes the Modal to be show the video whose data is
	 * now available as props to the component.
	 * @param {Object} data
	 * @param {String} data.title
	 * @param {String} data.url
	 */
	openModal(data) {
		this.setState({
      modal: {
      	isOpen: !this.state.modal.isOpen,
      	title: data.title,
      	url: data.url
      }
    });
	}

	/**
	 * Updates the state which causes the modal to hide. Clears the video related data.
   */
	closeModal() {
		this.setState({
			modal: {
				isOpen: !this.state.modal.isOpen,
				url: null,
				title: null
			}
		});
	}

	/**
	 * Renders the SimpleSlider component and a Modal.
	 */
	render() {
		return (
			<div>
				<SimpleSlider
					videoData={this.state.videoData}
					onClickTriggered={(data) => this.openModal(data)}>
				</SimpleSlider>
				<Modal
					show={this.state.modal.isOpen}
					onClose={this.closeModal}
					url={this.state.modal.url}
					title={this.state.modal.title}>
        </Modal>
			</div>
		);
	}
}
