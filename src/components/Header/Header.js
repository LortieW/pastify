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

const goBackButton = {
  title: "Go Backward",
  viewBox: "0 0 24 24",
  path: "M15.54 21.15L5.095 12.23 15.54 3.31l.65.76-9.555 8.16 9.555 8.16",
};

const goFowardButton = {
  title: "Go Foward",
  viewBox: "0 0 24 24",
  path: "M7.96 21.15l-.65-.76 9.555-8.16L7.31 4.07l.65-.76 10.445 8.92",
};

function useUser() {
  const [user, setUser] = useState({
    name: "Username",
    url: "/",
  });

  useEffect(() => {
    spotifyWebApi.getMe().then((response) => {
      if (response !== null) {
        setUser({
          name: response.display_name,
          url: response.images[0].url,
        });
      }
    });
  }, []);

  return user;
}

function Avatar(props) {
  return (
    <figure title={props.name}>
      <img className="top-bar-avatar" src={props.url} />
    </figure>
  );
}

// rename function and/or class to a single name
function UserMenu(props) {
  return (
    <div>
      <button className="top-bar-button">
        <Avatar name={props.user.name} url={props.user.url} />
        <span className="top-bar-span">{props.user.name}</span>
        <span className="top-bar-chart-down"></span>
      </button>
    </div>
  );
}

function NavigationButton(props) {
  return (
    <button className="top-bar-nav-button" title={props.title}>
      <svg className="top-bar-nav-svg" viewBox={props.viewBox}>
        <path fill="#fff" d={props.path} />
      </svg>
    </button>
  );
}

/**
 *
 */

function Navigation(props) {
  return (
    <div className="top-bar-nav-button-container">
      <NavigationButton
        title={goBackButton.title}
        viewBox={goBackButton.viewBox}
        path={goBackButton.path}
      />
      <NavigationButton
        title={goFowardButton.title}
        viewBox={goFowardButton.viewBox}
        path={goFowardButton.path}
      />
    </div>
  );
}

export default function Topbar(props) {
  const params = getHashParams();

  if (params.access_token) {
    spotifyWebApi.setAccessToken(params.access_token);
  }

  const user = useUser();

  return (
    <div className="top-bar">
      <header className="top-bar-header">
        <Navigation />
        <UserMenu user={user} />
      </header>
    </div>
  );
}
