import React from "react";
import "./Track.css";

const Track = ({ track, addSong, removeSong, isRemoval }) => {
  const handleClick = () => {
    if (isRemoval) {
      removeSong(track);
    } else addSong(track);
  };

  return (
    <div className="Track">
      <div className="Track-information">
        <h3>{track.name}</h3>
        <p>
          {track.artist} | {track.album}
        </p>
      </div>
      <button onClick={handleClick} className="Track-action">
        {isRemoval ? "-" : "+"}
      </button>
    </div>
  );
};

export default Track;
