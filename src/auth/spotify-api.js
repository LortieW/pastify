import Spotify from "spotify-web-api-js";

export const spotifyWebApi = new Spotify();

export default function intializeSpotifyWebApi() {
  const params = getHashParams();

  if (params.access_token) {
    spotifyWebApi.setAccessToken(params.access_token);
  }
}

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
