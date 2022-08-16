import React from "react";
import Track from "../Track/Track";

import "./TrackList.css";

const TrackList = ({ searchResults, addSong, removeSong, isRemoval }) => {
  return (
    <div className="TrackList">
      {searchResults &&
        searchResults.map((track) => (
          <Track
            key={track.id}
            track={track}
            addSong={addSong}
            removeSong={removeSong}
            isRemoval={isRemoval}
          />
        ))}
    </div>
  );
};

export default TrackList;
