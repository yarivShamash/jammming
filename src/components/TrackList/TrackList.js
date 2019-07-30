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
