import React from 'react';
import PropTypes from 'prop-types';
import style from '../../sass/dialog.scss';

export default class Modal extends React.Component {
  render() {
    // Render nothing if the "show" prop is false
    if(!this.props.show) {
      return null;
    }

    return (
      <div className="dialog-backdrop">
        <div className="dialog-main">
          <div className="dialog-header">
            <h4 className="dialog-title">{this.props.title}</h4>
            <a className="dialog-close-btn" onClick={this.props.onClose}></a>
          </div>
          <video className="dialog-video" width="640" height="480" controls>
            <source src={this.props.url} type="video/mp4" />
          </video>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node,
  title: PropTypes.string,
  url: PropTypes.string
};
