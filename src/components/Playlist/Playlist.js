import React from "react";


import './Playlist.css';

import {TrackList} from '../TrackList/TrackList';

export class Playlist extends React.Component {

    constructor(props){
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
    }

    handleNameChange(e){
        const playlistNewName = e.target.value; /**not sure if that's rigth */
        this.props.onNameChange(playlistNewName);
    }

    render () {

        const {
            playlistTracks,
            onRemove
        } = this.props;
        
        return (
            <div className="Playlist">
                
                <input 
                    value="New Playlist" 
                    onChange={this.handleNameChange}/>
                
                <TrackList 
                    tracks={playlistTracks} 
                    onRemove={onRemove}
                    isRemoval={true}/>

                <a 
                className="Playlist-save" 
                href="www.#.com">SAVE TO SPOTIFY</a>
            </div>
        );
    };
};
