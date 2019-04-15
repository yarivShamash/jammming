import React from "react";

import './SearchResults.css';

import {TrackList} from '../TrackList/TrackList';

export class SearchResults extends React.Component{


    render () {

        const {
            searchResults,
            onAdd
        } = this.props;

        return (
            <div className="SearchResults">
                <h2>Results</h2>
                
                <TrackList 
                    tracks={searchResults} 
                    onAdd={onAdd} 
                    isRemoval={false}/>
            </div>
        );
    };
};