import React from 'react';
import './App.css';
import WellcomeScreen from '../WellcomeScreen/WellcomeScreen';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [],
      playlistName: 'New Playlist',
      playlistTracks: [],
      hasLoggedIn: false,
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  componentDidMount() {
    let { hasLoggedIn } = this.state;

    if (!hasLoggedIn) {
      hasLoggedIn = Spotify.getUserAccessToken();
      this.setState({
        hasLoggedIn,
      });
    }
  }

  addTrack(track) {
    const { playlistTracks } = this.state;

    const hasTrack = playlistTracks.find(savedTrack => savedTrack.id === track.id);

    if (hasTrack) {
      return;
    }

    this.setState({
      playlistTracks: [...playlistTracks, track],
    });
  }

  removeTrack(track) {
    const { playlistTracks } = this.state;

    const filteredTracks = playlistTracks.filter(item => item.id !== track.id);
    this.setState({
      playlistTracks: filteredTracks,
    });
  }

  updatePlaylistName(name) {
    this.setState({
      playlistName: name,
    });
  }

  savePlaylist() {
    const {
      playlistTracks,
      playlistName,
    } = this.state;
    const tracksURI = playlistTracks.map(track => track.uri);

    Spotify.savePlaylist(playlistName, tracksURI).then(() => {
      this.setState({
        playlistName: 'New Playlist', /* Resetting the playlist name */
        playlistTracks: [], /* Resetting playlist Tracks */
      });
    });
  }

  search(searchTerm) {
    Spotify.search(searchTerm).then(
      (tracks) => {
        this.setState({
          searchResults: tracks,
        });
      },
    );
  }


  render() {
    const {
      searchResults,
      playlistName,
      playlistTracks,
      hasLoggedIn,
    } = this.state;

    if (!hasLoggedIn) {
      return (
        <div>
          <h1>
            Ja
            <span className="highlight">mmm</span>
            ing
          </h1>

          <div className="app">
            
            <WellcomeScreen />

            <SearchBar
              onSearch={this.search}
            />

            <div className="app-playlist">
              <SearchResults
                searchResults={searchResults}
                onAdd={this.addTrack}
              />

              <Playlist
                playlistName={playlistName}
                playlistTracks={playlistTracks}
                onRemove={this.removeTrack}
                onNameChange={this.updatePlaylistName}
                onSave={this.savePlaylist}
              />
            </div>
          </div>
        </div>
      );
    }

    return (
      <div>
        <h1>
          Ja
          <span className="highlight">mmm</span>
          ing
        </h1>
        <div className="app">
          <SearchBar
            onSearch={this.search}
          />

          <div className="app-playlist">
            <SearchResults
              searchResults={searchResults}
              onAdd={this.addTrack}
            />

            <Playlist
              playlistName={playlistName}
              playlistTracks={playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
