import React from "react";

import './SearchBar.css';


export class SearchBar extends React.Component {
    constructor(props){
        super(props);

        this.search = this.search.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
        this.searchWithEnter = this.searchWithEnter.bind(this);
    }

    handleTermChange(e){
        this.setState({
            term: e.target.value
        })
    }
    
    /*Below is the new feature method it is passed as the 'onKeyDown' attribute to
    <input /> */
    searchWithEnter(event){
        if(event.keyCode === 13){
            this.search();
        }
    }

    search(){
        this.props.onSearch(this.state.term);
    }

    render () {


        return (
            <div className="SearchBar">
                <input 
                placeholder="Enter A Song, Album, or Artist"
                onChange={this.handleTermChange} 
                onKeyDown={this.searchWithEnter}/>
                <a onClick={this.search}>SEARCH</a>
            </div>
        );
    }
};
