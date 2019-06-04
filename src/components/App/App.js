import React from "react";

import './App.css';

import {SearchBar} from '../SearchBar/SearchBar';
import {SearchResults} from '../SearchResults/SearchResults';
import {Playlist} from '../Playlist/Playlist';
import {Spotify} from '../../util/Spotify'


export class App extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            searchResults: [],
            playlistName: 'New Playlist',
            playlistTracks: []
        }

        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.updatePlaylistName = this.updatePlaylistName.bind(this);
        this.savePlaylist = this.savePlaylist.bind(this);
        this.search = this.search.bind(this);
    }

    
    addTrack(track){

        const { playlistTracks } = this.state

        const hasTrack = playlistTracks.find(savedTrack => savedTrack.id === track.id)

        if (hasTrack){
            return;             
        }
        this.setState({
            playlistTracks: [...playlistTracks, track]
        })

        /*the above logic will compare between the id of the passed track argument and 
the id of each track in the playlistTracks array and return true if the .find()
method does not return 'undefined'. Only then will it setState using the Spread
operator, the meaning of the code is keep 'this.state.playlistTracks' and add 'track' */
    }

    removeTrack(track){
        const { playlistTracks } = this.state

        let filteredTracks = playlistTracks.filter(item => item.id !== track.id);
        this.setState({
            playlistTracks: filteredTracks
        })
    }
    
    updatePlaylistName(name){
        this.setState({
            playlistName: name
        })
    }

    savePlaylist(){
        
        const tracksURI = this.state.playlistTracks.map(track => track.uri);

        Spotify.savePlaylist(this.state.playlistName, tracksURI).then(() => {
            this.setState({
                playlistName: 'New Playlist',/*Resetting the playlist name */
                playlistTracks: [] /*Resetting playlist Tracks */
            });
        });/*Saving the new Playlist to Spotify */ 
    }


    search(searchTerm){
        
        Spotify.search(searchTerm).then(
            tracks => {this.setState({
                searchResults: tracks
            })});
        
        /*const results = Spotify.search(searchTerm);
        this.setState({
            searchResults: results
        });
        console.log(results);
        it did not work..*/
    }

    render() {

        const {
            searchResults,
            playlistName,
            playlistTracks
        } = this.state;

        return (
            <div>

                <h1>Ja<span className="highlight">mmm</span>ing</h1>
                
                <div className="App">
                    <div className="Start-Jammming">
                        <a onClick={Spotify.getUserAccessToken}>Start Jammming!</a>
                    </div>
                    
                    <SearchBar 
                        onSearch={this.search}/>

                    <div className="App-playlist">
                    
                        <SearchResults 
                            searchResults={searchResults} 
                            onAdd={this.addTrack}
                            />
                        
                        <Playlist 
                            playlistName={playlistName} 
                            playlistTracks={playlistTracks}
                            onRemove={this.removeTrack}
                            onNameChange={this.updatePlaylistName}
                            onSave={this.savePlaylist}/>
                    
                    </div>
                </div>
            </div>
        )
    }
};

