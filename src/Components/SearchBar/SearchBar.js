import React, { useState } from "react";
import "./SearchBar.css";

const SearchBar = ({ search, setSearchResults }) => {
  const [searchText, setSearchText] = useState("");

  const executeSearch = async () => {
    if (searchText) {
      setSearchResults(await search(searchText));
    } else alert("Enter something to search!");
  };

  const setSearchTerm = (e) => {
    setSearchText(e.target.value);
  };
  return (
    <div className="SearchBar">
      <input
        placeholder="Enter A Song, Album, or Artist"
        onChange={setSearchTerm}
      />
      <button className="SearchButton" onClick={executeSearch}>
        SEARCH
      </button>
    </div>
  );
};

export default SearchBar;
