import React from 'react';
import PropTypes from 'prop-types';
import Track from '../Track/Track';
import './TrackList.css';

const TrackList = (props) => {
  const {
    tracks,
    onAdd,
    onRemove,
    isRemoval,
  } = props;

  return (

    <div className="trackList">
      {
        tracks.map(track => (
          <Track
            key={track.id}
            trackInfo={track}
            onAdd={onAdd}
            onRemove={onRemove}
            isRemoval={isRemoval}
          />
        ))
    }
    </div>
  );
};

export default TrackList;

TrackList.propTypes = {
  tracks: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.string,
    ),
  ).isRequired,
  onAdd: PropTypes.func,
  onRemove: PropTypes.func,
  isRemoval: PropTypes.bool.isRequired,
};
// onAdd and onRemove at first I added .isRequired but it logged an error saying it's undefined
// is it because TrackList was not rendered yet?
