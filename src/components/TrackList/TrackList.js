import React from "react";

import {Track} from '../Track/Track'

import './TrackList.css';


export class TrackList extends React.Component {


    render () {
        
        const {
            tracks,
            onAdd,
            onRemove,
            isRemoval
        } =this.props;

        return (
           
            <div className="TrackList">

                {
                    tracks.map(track => (
                        <Track 
                            key={track.id} 
                            trackInfo={track} 
                            onAdd={onAdd}
                            onRemove={onRemove}
                            isRemoval={isRemoval}/>
                    ))
                }

{/* My logics: Using .map() to render the tracks in the searck results will 
return an array of Track items, passing the track info to each one as a prop
will make the information avalable for use in Track.js where I will set the
key and all the rest*/}
            </div>
        );
    }
    
};
