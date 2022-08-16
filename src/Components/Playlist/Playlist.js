import React from "react";
import TrackList from "../TrackList/TrackList";
import "./Playlist.css";

const Playlist = ({ playlistData, removeSong, updatePlaylistName }) => {
  return (
    <div className="Playlist">
      <input
        defaultValue={playlistData.name || "New Playlist"}
        onChange={updatePlaylistName}
      />
      <TrackList
        searchResults={playlistData.tracks}
        isRemoval={true}
        removeSong={removeSong}
      />
      <button className="Playlist-save">SAVE TO SPOTIFY</button>
    </div>
  );
};

export default Playlist;
