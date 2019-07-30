import React from 'react';
import PropTypes from 'prop-types'
import './Track.css';


class Track extends React.Component {
  constructor(props) {
    super(props);

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  addTrack() {
    const {
      onAdd,
      trackInfo,
    } = this.props;

    onAdd(trackInfo);
  }

  removeTrack() {
    const {
      onRemove,
      trackInfo,
    } = this.props;

    onRemove(trackInfo);
  }

  render() {
    const {
      trackInfo,
      isRemoval,  
    } = this.props;


    return (
      <div className="track">
        <div className="track__information">
          <h3>{trackInfo.name}</h3>
          <p>
            {trackInfo.artist}
            |
            {trackInfo.album}
          </p>
        </div>
        {
          isRemoval
            ? (
              <button
                type="button"
                className="track__action"
                onClick={this.removeTrack}
              >
                -
              </button>
            )
            : (
              <button
                type="button"
                className="track__action"
                onClick={this.addTrack}
              >
              +
              </button>
            )
        }
      </div>
    );
  }
}

export default Track;

Track.propTypes = {
  onAdd: PropTypes.func,
  onRemove: PropTypes.func,
  trackInfo: PropTypes.PropTypes.objectOf(
    PropTypes.string
  ).isRequired,
  isRemoval: PropTypes.bool.isRequired,
};
