import axios from 'axios';

/**
 * Represents a class that communicates with an external API.
 */
export default class VODService {
	/**
	 * Constructor function that stores the passed in API endpoint URL as a data
	 * member.
	 * @param {String} API URL
	 */
	constructor(endpointUrl) {
		this.endpointUrl = endpointUrl;
	}

	/**
	 * GETs video data from the configured endpoint. Logs the error if the request
	 * failed.
	 * @returns {Array<Object>}
	 */
	getData() {
		return axios.get(this.endpointUrl)
			.then(response =>
				response.status === 200 ? response.data.entries : []
			)
			.catch(error =>
				[]
			);
	}
}
