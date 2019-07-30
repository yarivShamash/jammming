import React from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList';

class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(event) {
    const {
      onNameChange
    } = this.props;

    const playlistNewName = event.target.value;
    onNameChange(playlistNewName);
  }

  render() {
    const {
      playlistTracks,
      onRemove,
      onSave
    } = this.props;

    return (
      <div className="playlist">

        <input
          defaultValue="New Playlist"
          onChange={this.handleNameChange}
        />

        <TrackList
          tracks={playlistTracks}
          onRemove={onRemove}
          isRemoval={true}
        />

        <button
          type="button"
          className="playlist__button"
          onClick={onSave}
        >
        SAVE TO SPOTIFY
        </button>
      </div>
    );
  }
}

export default Playlist;
