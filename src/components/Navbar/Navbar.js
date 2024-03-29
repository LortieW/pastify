import React, { useState, useEffect } from "react";
import Spotify from "spotify-web-api-js";

/*************************************************/
const spotifyWebApi = new Spotify();

/**
 * Taken from spotify's server authentication exemple
 * Obtains parameters from the hash of the URL
 * @return Object
 */
function getHashParams() {
  var hashParams = {};
  var e,
    r = /([^&;=]+)=?([^&;]*)/g,
    q = window.location.hash.substring(1);
  while ((e = r.exec(q))) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
  }
  return hashParams;
}
/*************************************************/

const menuTitles = [
  {
    name: "Home",
    viewBox: "0 0 512 512",
    path:
      "M448 463.746h-149.333v-149.333h-85.334v149.333h-149.333v-315.428l192-111.746 192 110.984v316.19z",
  },
  {
    name: "Search",
    viewBox: "0 0 512 512",
    path:
      "M349.714 347.937l93.714 109.969-16.254 13.969-93.969-109.969q-48.508 36.825-109.207 36.825-36.826 0-70.476-14.349t-57.905-38.603-38.603-57.905-14.349-70.476 14.349-70.476 38.603-57.905 57.905-38.603 70.476-14.349 70.476 14.349 57.905 38.603 38.603 57.905 14.349 70.476q0 37.841-14.73 71.619t-40.889 58.921zM224 377.397q43.428 0 80.254-21.461t58.286-58.286 21.461-80.254-21.461-80.254-58.286-58.285-80.254-21.46-80.254 21.46-58.285 58.285-21.46 80.254 21.46 80.254 58.285 58.286 80.254 21.461z",
  },
  {
    name: "Your Library",
    viewBox: "0 0 512 512",
    path:
      "M291.301 81.778l166.349 373.587-19.301 8.635-166.349-373.587zM64 463.746v-384h21.334v384h-21.334zM192 463.746v-384h21.334v384h-21.334z",
  },
];

// Review implementation - Should follow same pattern accross each elements
const listMenuTitles = menuTitles.map((menu) => (
  <li className="navbar-item">
    <a className="navbar-link" href="/">
      <div>
        <svg viewBox={menu.viewBox} width="24" height="24">
          <path fill="#b3b3b3" d={menu.path} />
        </svg>
      </div>
      <span>{menu.name}</span>
    </a>
  </li>
));

// Review implementation - Should follow same pattern accross each elements
const playlistButton = {
  name: "Create Playlist",
  viewBox: "0 0 36 36",
  path: "m28 20h-8v8h-4v-8h-8v-4h8v-8h4v8h8v4z",
};

function playlistItems(items) {
  return items.map((item) => {
    return <li>{item.name}</li>;
  });
}

function usePlaylist() {
  const [playlists, setPlaylists] = useState(null);

  useEffect(() => {
    spotifyWebApi.getUserPlaylists().then((response) => {
      setPlaylists(response.items);
    });
  }, []);

  return playlists;
}

function PlaylistView() {
  const playlists = usePlaylist();

  if (playlists === null) {
    return <div>{"Fetching playlist..."}</div>;
  }

  return <ul>{playlistItems(playlists)}</ul>;
}

// this function is getting too long...
export default function Navbar(props) {
  const params = getHashParams();

  if (params.access_token) {
    spotifyWebApi.setAccessToken(params.access_token);
  }

  return (
    <div className="navbar">
      <nav className="navbar-content">
        <div className="navbar-banner">
          <a href="http://localhost:8888/">
            <svg viewBox="0 0 1134 340" className="navbar-logo-banner">
              <title>Spotify</title>
              <path
                fill="#b3b3b3"
                d="M8 171c0 92 76 168 168 168s168-76 168-168S268 4 176 4 8 79 8 171zm230 78c-39-24-89-30-147-17-14 2-16-18-4-20 64-15 118-8 162 19 11 7 0 24-11 18zm17-45c-45-28-114-36-167-20-17 5-23-21-7-25 61-18 136-9 188 23 14 9 0 31-14 22zM80 133c-17 6-28-23-9-30 59-18 159-15 221 22 17 9 1 37-17 27-54-32-144-35-195-19zm379 91c-17 0-33-6-47-20-1 0-1 1-1 1l-16 19c-1 1-1 2 0 3 18 16 40 24 64 24 34 0 55-19 55-47 0-24-15-37-50-46-29-7-34-12-34-22s10-16 23-16 25 5 39 15c0 0 1 1 2 1s1-1 1-1l14-20c1-1 1-1 0-2-16-13-35-20-56-20-31 0-53 19-53 46 0 29 20 38 52 46 28 6 32 12 32 22 0 11-10 17-25 17zm95-77v-13c0-1-1-2-2-2h-26c-1 0-2 1-2 2v147c0 1 1 2 2 2h26c1 0 2-1 2-2v-46c10 11 21 16 36 16 27 0 54-21 54-61s-27-60-54-60c-15 0-26 5-36 17zm30 78c-18 0-31-15-31-35s13-34 31-34 30 14 30 34-12 35-30 35zm68-34c0 34 27 60 62 60s62-27 62-61-26-60-61-60-63 27-63 61zm30-1c0-20 13-34 32-34s33 15 33 35-13 34-32 34-33-15-33-35zm140-58v-29c0-1 0-2-1-2h-26c-1 0-2 1-2 2v29h-13c-1 0-2 1-2 2v22c0 1 1 2 2 2h13v58c0 23 11 35 34 35 9 0 18-2 25-6 1 0 1-1 1-2v-21c0-1 0-2-1-2h-2c-5 3-11 4-16 4-8 0-12-4-12-12v-54h30c1 0 2-1 2-2v-22c0-1-1-2-2-2h-30zm129-3c0-11 4-15 13-15 5 0 10 0 15 2h1s1-1 1-2V93c0-1 0-2-1-2-5-2-12-3-22-3-24 0-36 14-36 39v5h-13c-1 0-2 1-2 2v22c0 1 1 2 2 2h13v89c0 1 1 2 2 2h26c1 0 1-1 1-2v-89h25l37 89c-4 9-8 11-14 11-5 0-10-1-15-4h-1l-1 1-9 19c0 1 0 3 1 3 9 5 17 7 27 7 19 0 30-9 39-33l45-116v-2c0-1-1-1-2-1h-27c-1 0-1 1-1 2l-28 78-30-78c0-1-1-2-2-2h-44v-3zm-83 3c-1 0-2 1-2 2v113c0 1 1 2 2 2h26c1 0 1-1 1-2V134c0-1 0-2-1-2h-26zm-6-33c0 10 9 19 19 19s18-9 18-19-8-18-18-18-19 8-19 18zm245 69c10 0 19-8 19-18s-9-18-19-18-18 8-18 18 8 18 18 18zm0-34c9 0 17 7 17 16s-8 16-17 16-16-7-16-16 7-16 16-16zm4 18c3-1 5-3 5-6 0-4-4-6-8-6h-8v19h4v-6h4l4 6h5zm-3-9c2 0 4 1 4 3s-2 3-4 3h-4v-6h4z"
              />
            </svg>
          </a>
        </div>
        <div className="navbar-menu">
          <ul>{listMenuTitles}</ul>
        </div>
        <div className="navbar-playlists">
          <div className="navbar-playlists-children">
            <h1 className="navbar-playlists-header">Playlists</h1>
            <div>
              <div>
                <button type="button" className="navbar-button">
                  <svg
                    className="navbar-button-svg"
                    viewBox={playlistButton.viewBox}
                  >
                    <path d={playlistButton.path} />
                  </svg>
                  <span className="navbar-span">Create Playlist</span>
                </button>
              </div>
              <div>
                <a className="navbar-link navbar-playlists-link" href="/">
                  <div className="navbar-button-svg"></div>
                  <span className="navbar-span">Liked Songs</span>
                </a>
              </div>
            </div>
            <hr className="navbar-divider" />
            <div className="navbar-playlists-user">
              <div className="navbar-playlists-size">
                <div className="navbar-playlists-scroll">{PlaylistView()}</div>
              </div>
            </div>
          </div>
        </div>
        <div>Install App</div>
      </nav>
    </div>
  );
}
