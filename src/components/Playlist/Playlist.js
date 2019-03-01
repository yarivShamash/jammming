import React from "react";


import './Playlist.css';

import {TrackList} from '../TrackList/TrackList';

class Playlist extends React.Component {


    render () {
        return (
            <div className="Playlist">
                <input value="New Playlist"/>
                <TrackList />
                <a className="Playlist-save" href="www.#.com">SAVE TO SPOTIFY</a>
            </div>
        );
    };
};

export default Playlist;