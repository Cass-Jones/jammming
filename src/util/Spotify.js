const client_id = "0634080ac601482a846539efb1e7a6c5";
const client_secret = "3a815a48e6b44e3e809ffe8217e0f389";
const redirectURL = "http://localhost:3000/";

let accessToken;
let url = window.location.href;
const baseURL = "https://api.spotify.com";

export function getAccessToken() {
  if (accessToken) {
    return accessToken;
  } else if (
    url.match(/expires_in=([^&]*)/) &&
    url.match(/access_token=([^&]*)/)
  ) {
    const expiration = url.match(/expires_in=([^&]*)/)[1];
    accessToken = url.match(/access_token=([^&]*)/)[1];

    window.setTimeout(() => (accessToken = ""), expiration * 1000);
    window.history.pushState("Access Token", null, "/");
  } else {
    window.location = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURL}
`;
  }
}

export async function searchSpotify(searchTerm) {
  const endpoint = "/v1/search?type=album,artist,track";
  const query = `&q=${searchTerm}`;

  try {
    const results = await fetch(`${baseURL}${endpoint}${query}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const parseResults = await results.json();
    if (parseResults.tracks.items.length > 0) {
      return parseResults.tracks.items.map((track) => {
        return {
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri,
        };
      });
    } else return [];
  } catch (e) {
    console.error(e);
  }
}

export async function saveUsersPlaylist(name, tracks) {
  console.log(name, tracks);
  let userId;
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  if (!name || !tracks) {
    return;
  }
  try {
    //Get current users ID
    await fetch(`${baseURL}/v1/me`, { headers: headers })
      .then((res) => res.json())
      .then((parsed) => {
        userId = parsed.id;
        return fetch(`${baseURL}/v1/users/${userId}/playlists`, {
          headers: headers,
          method: "POST",
          body: JSON.stringify({
            name: name,
          }),
        });
      })
      .then((res) => res.json())
      .then((res2) => {
        console.log(res2);
        return fetch(`${baseURL}/v1/playlists/${res2.id}/tracks`, {
          headers: headers,
          method: "POST",
          body: JSON.stringify({
            uris: tracks,
          }),
        });
      })
      .then((res) => {
        return res;
      });

    // Post new playlist name and get PLaylist ID response

    // Post new playlist tracks
  } catch (e) {
    console.error(e);
  }
}
