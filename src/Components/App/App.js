import { useState } from "react";
import "./App.css";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import { tracks } from "../../testing/mockData";
import {
  getAccessToken,
  searchSpotify,
  saveUsersPlaylist,
} from "../../util/Spotify";

function App() {
  getAccessToken();
  const [playlistData, setPlaylistData] = useState({ tracks: [], name: "" });
  const [searchResults, setSearchResults] = useState(playlistData.tracks || []);

  //Handle adding song to playlist
  const addSong = (track) => {
    const currentTracks = playlistData.tracks;
    //First check to see if track is already on list
    if (
      currentTracks.findIndex((plTrack) => {
        return plTrack.id === track.id;
      }) !== -1
    ) {
      alert("This track is already in your playlist!");
    } else {
      currentTracks.push(track);
      setPlaylistData({
        tracks: currentTracks,
        name: playlistData.name,
      });
    }
    console.log(playlistData);
  };

  //Handle removing song from playlist
  const removeSong = (track) => {
    const currentTracks = playlistData.tracks;

    const tracks = currentTracks.filter((plTrack) => plTrack.id !== track.id);

    setPlaylistData({
      tracks: tracks,
      name: playlistData.name,
    });
  };

  //Handle updating playlist name
  const updatePlaylistName = (e) => {
    const name = e.target.value;

    setPlaylistData({ name, tracks: playlistData.tracks });
    console.log(playlistData);
  };

  // Handle playlist save
  const savePlaylist = async () => {
    const trackURIs = [];
    playlistData.tracks.forEach((item) => {
      trackURIs.push(item.uri);
    });

    await saveUsersPlaylist(playlistData.name, trackURIs).then((res) => {
      console.log(res);
    });
  };

  // Handle spoify search
  const search = async (searchTerm) => {
    return await searchSpotify(searchTerm);
  };

  //Handle playlist saving
  const sendPlaylistToSpotify = async () => {
    const playlistTracks = savePlaylist();
  };

  return (
    <div>
      <h1>
        Ja<span className="highlight">mmm</span>ing
      </h1>
      <div className="App">
        <SearchBar setSearchResults={setSearchResults} search={search} />

        <div className="App-playlist">
          <SearchResults searchResults={searchResults} addSong={addSong} />
          <Playlist
            playlistData={playlistData}
            removeSong={removeSong}
            updatePlaylistName={updatePlaylistName}
            onSave={savePlaylist}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
