import React from "react";
import ReactDOM from "react-dom";

import './App.css';

import {SearchBar} from '../SearchBar/SearchBar';
import {SearchResults} from '../SearchResults/SearchResults';
import {Playlist} from '../Playlist/Playlist';


class App extends React.Component {

    constructor(props){
        super(props);

        this.state.searchResults = [{name: 'Besame', artist: 'Chico', album: 'Sonrisas', id: 101010}, {name: 'Besame', artist: 'Chico', album: 'Sonrisas', id: 101010}, {name: 'Besame', artist: 'Chico', album: 'Sonrisas', id: 101010}]

    }



    render() {
        return (
            <div>
                <h1>Ja<span className="highlight">mmm</span>ing</h1>
                
                <div className="App">
                    
                    <SearchBar />

                    <div className="App-playlist">
                    
                        <SearchResults searchResults={this.state.searchResults}/>
                        
                        <Playlist />
                    
                    </div>
                </div>
            </div>
        )
    }
};


ReactDOM.render(<App />, document.getElementById('app'));