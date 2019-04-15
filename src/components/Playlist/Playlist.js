import React from "react";


import './Playlist.css';

import {TrackList} from '../TrackList/TrackList';

export class Playlist extends React.Component {

    constructor(props){
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
    }

    handleNameChange(event){
        const playlistNewName = event.target.value; /**not sure if that's rigth */
        this.props.onNameChange(playlistNewName);
    }

    render () {

        const {
            playlistTracks,
            onRemove,
            onSave
        } = this.props;
        
        return (
            <div className="Playlist">
                
                <input 
                    defaultValue={"New Playlist"} 
                    onChange={this.handleNameChange}/>
                
                <TrackList 
                    tracks={playlistTracks} 
                    onRemove={onRemove}
                    isRemoval={true}/>

                <a 
                className="Playlist-save" 
                // href="www.#.com"
                onClick={onSave}>SAVE TO SPOTIFY</a>
            </div>
        );
    };
};
