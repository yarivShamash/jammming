import React from "react";

import './Track.css';


export class Track extends React.Component{

    constructor(props){
        super(props);

        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
    }


    addTrack(){
        this.props.onAdd(this.props.trackInfo);
    }
    /*Step 45: Create an .addTrack() method in the Track component.
     Use it to add this.props.trackInfo to the playlist. */

     removeTrack() {
         this.props.onRemove(this.props.trackInfo)
     }

    render (){
        const {
            trackInfo,
            isRemoval,
            removeTrack,
            addTrack,
             
        } = this.props;


        return (
/*Step 35: Render the track name, artist, and album.
After passing the track as an attirbute in TrackList.js I used the info
here to render. Hoping each time it renders something different. */
            
            <div className="Track">
                <div className="Track-information">
                    <h3>{trackInfo.name}</h3>
                    <p>{trackInfo.artist} | {trackInfo.album}</p>
                </div>
                {
                        isRemoval
                        
                            ? <a 
                            className="Track-action" 
                            onClick={removeTrack} 
                            href="www.#.com">-</a>

                            : <a className="Track-action"
                                 onClick={addTrack} 
                                 href="www.#.com">+</a>
                    }
            </div>
        );
    }
};
