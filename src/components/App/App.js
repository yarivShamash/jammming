import React from "react";

import './App.css';

import {Button} from '../Button/Button';
import {SearchBar} from '../SearchBar/SearchBar';
import {SearchResults} from '../SearchResults/SearchResults';
import {Playlist} from '../Playlist/Playlist';
import {userAccessToken, Spotify} from '../../util/Spotify';

export class App extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            searchResults: [],
            playlistName: 'New Playlist',
            playlistTracks: [],
            hasLoggedIn: false,
        }

        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.updatePlaylistName = this.updatePlaylistName.bind(this);
        this.savePlaylist = this.savePlaylist.bind(this);
        this.search = this.search.bind(this);
    }

    componentDidMount() {
        const { hasLoggedIn } = this.state
        
        if (!hasLoggedIn) {
        //   console.log(`Button's userAccessToken before calling the fn: ${userAccessToken ? 'holds the access token' : 'Empty as a bucket'}`)
          const hasLoggedIn = Spotify.getUserAccessToken()
          this.setState({
            hasLoggedIn,
          });
        //   console.log(`Button's userAccessToken after calling the fn: ${userAccessToken ? 'holds the access token' : 'Empty as a bucket'}`);
  
        } 
      };
    
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
            tracks => {
                this.setState({
                searchResults: tracks
            })
          }
        );
    }


    render() {

        const {
            searchResults,
            playlistName,
            playlistTracks,
            hasLoggedIn,
        } = this.state;
        
        if(!hasLoggedIn){ 
            // console.log(`App.js userAccessToken is ${userAccessToken ? userAccessToken : `Very Empty :(`} So only Button is renderd`); // I used this to see if the accesss token does exist at this stage
            return (
                <div>
                     <h1>Ja<span className="highlight">mmm</span>ing</h1>
                
                    <div className="app"> {/*a block level element*/}
                   
                      <Button />

                      <SearchBar 
                        onSearch={this.search}/>

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
                            onSave={this.savePlaylist}/>

                        </div>
                    </div>
                </div>
            )
        };

        // console.log(`App.js userAccessToken is ${userAccessToken ? userAccessToken : `Very Empty :(`} So we can proceed`); // I used this to see if the accesss token does exist at this stage

        return (
            <div>

                <h1>Ja<span className="highlight">mmm</span>ing</h1>
                
                <div className="app"> {/*a block level element*/}
                   
                    <SearchBar 
                        onSearch={this.search}/>

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
                            onSave={this.savePlaylist}/>
                    
                    </div>
                </div>
            </div>
        )
    }
};

