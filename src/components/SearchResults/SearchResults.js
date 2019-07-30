import React from 'react';
import PropTypes from 'prop-types';
import './SearchResults.css';

import TrackList from '../TrackList/TrackList';

const SearchResults = (props) => {
  const {
    searchResults,
    onAdd,
  } = props;

  return (
    <div className="search-results">
      <h2
        className="search-results__heading"
      >
      Results
      </h2>

      <TrackList
        tracks={searchResults}
        onAdd={onAdd}
        isRemoval={false}
      />
    </div>
  );
};

export default SearchResults;

SearchResults.propTypes = {
  searchResults: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.string
    )
  ),
  onAdd: PropTypes.func.isRequired,
};
