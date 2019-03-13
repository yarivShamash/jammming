import React from "react";

import './SearchBar.css';


export class SearchBar extends React.Component {
    constructor(props){
        super(props);

        this.search = this.search.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
    }

    handleTermChange(event){
        this.setState({
            term: event.target.value
        })
    }
    search(searchTerm){
        this.props.onSearch(searchTerm);
    }

    render () {

        const{
            onSearch,
        } = this.props;

        return (
            <div className="SearchBar">
                <input 
                placeholder="Enter A Song, Album, or Artist"
                onChange={this.handleTermChange} />
                <a href="www.#.com">SEARCH</a>
            </div>
        );
    }
};
