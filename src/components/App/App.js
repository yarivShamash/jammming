import React from "react";
import ReactDOM from "react-dom";

import './App.css';

import {SearchBar} from '../SearchBar/SearchBar';
import {SearchResults} from '../SearchResults/SearchResults';
import {Playlist} from '../Playlist/Playlist';


export class App extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            searchResults: [
                { name: 'Besame', artist: 'Chico', album: 'Sonrisas', id: 1 },
                { name: 'Never', artist: 'Willy', album: 'Babilon', id: 2 }, 
                { name: 'Always', artist: 'Koko', album: 'Amsterdam', id: 3 }
            ],
            playlistName: 'Yabadabadu',
            playlistTracks: [
                { name: 'Theme Song', artist: 'Flintstones', album: 'The Rock', id: 4},
                { name: 'Fred Rocks', artist: 'Flintstones', album: 'The Rock', id: 5},
                { name: 'Barney PopStar', artist: 'Flintstones', album: 'The Rock', id: 6}
            ]
        }

        this.addTrack = this.addTrack.bind(this);

        this.removeTrack = this.removeTrack.bind(this);
        
        this.updatePlaylistName = this.updatePlaylistName.bind(this);
    }

    addTrack(track){

        const { playlistTracks } = this.state

        const hasTrack = playlistTracks.find(savedTrack => savedTrack.id === track.id)
/*the above logic will compare between the id of the passed track argument and 
the id of each track in the playlistTracks array and return true if the .find()
method does not return 'undefined'. Only then will it setState using the Spread
operator, the meaning of the code is keep 'this.state.playlistTracks' and add 'track' */

        if (hasTrack){
            return;             
        }
        this.setState({
            playlistTracks: [...playlistTracks, track]
        })

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
                    
                    <SearchBar />

                    <div className="App-playlist">
                    
                        <SearchResults 
                            searchResults={searchResults} 
                            onAdd={this.addTrack}/>
                        
                        <Playlist 
                            playlistName={playlistName} 
                            playlistTracks={playlistTracks}
                            onRemove={this.removeTrack}
                            onNameChange={this.updatePlaylistName}/>
                    
                    </div>
                </div>
            </div>
        )
    }
};


ReactDOM.render(<App />, document.getElementById('app'));