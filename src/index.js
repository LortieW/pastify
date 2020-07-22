import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Topbar from "./components/Header/Header";
import MainView from "./components/MainView/MainView";
import Navbar from "./components/Navbar/Navbar";
import Bottombar from "./components/Footer/Footer";
import intializeSpotifyWebApi from "./auth/spotify-api";
import "./index.css";

function RootContainer(props) {
  intializeSpotifyWebApi();

  return (
    <div className="root-container">
      <Topbar />
      <MainView />
      <Navbar />
      <Bottombar />
    </div>
  );
}

ReactDOM.render(<RootContainer />, document.getElementById("root"));
