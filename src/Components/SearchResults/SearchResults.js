import React from "react";
import TrackList from "../TrackList/TrackList";
import "./SearchResults.css";

const SearchResults = ({ searchResults, addSong }) => {
  return (
    <div className="SearchResults">
      <h2>Results</h2>
      <TrackList
        searchResults={searchResults}
        addSong={addSong}
        isRemoval={false}
      />
    </div>
  );
};

export default SearchResults;
