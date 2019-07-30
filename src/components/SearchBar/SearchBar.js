import React from 'react';
import PropTypes from 'prop-types';
import './SearchBar.css';


class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      term: '',
    };

    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
    this.searchWithEnter = this.searchWithEnter.bind(this);
  }

  handleTermChange(e) {
    this.setState({
      term: e.target.value,
    });
  }

  search() {
    const {
      onSearch,
    } = this.props;

    const {
      term,
    } = this.state;

    onSearch(term);
  }

  searchWithEnter(event) {
    if (event.keyCode === 13) {
      this.search();
    }
  }

  render() {
    return (
      <div className="search-bar">
        <input
          placeholder="Enter A Song, Album, or Artist"
          onChange={this.handleTermChange}
          onKeyDown={this.searchWithEnter}
        />

        <button
          type="button"
          className="search-bar__button"
          onClick={this.search}
        >
        SEARCH
        </button>

      </div>
    );
  }
}

export default SearchBar;

// SearchBar.propTypes = {
//   onSearch: PropTypes.func,
// };

// SearchBar.defaultProps = {
//   onSearch: SearchBar.props.onSearch,
// };
