import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

ReactDOM.render(
    <RootContainer />,
    document.getElementById('root')
);

function RootContainer(props) {
    return <div className="root-container">
        <Topbar />
        <MainView />
        <Navbar />
        <Bottombar />
    </div>
}

function MainView(props) {
    return <div className="main-view">
        <div className="top-bar-filler"></div>
        <div>Content</div>
    </div>
}

function Navbar(props) {
    return <div className="nav-bar">
        <nav>
            <div>Banner</div>
            <div>NavMenu</div>
            <div>NavPlaylist</div>
            <div>AppDownload</div>
        </nav>
    </div>
}

// Topbar and Content should be merged under one div
function Topbar(props) {
    return <div className="top-bar">
        <header className="top-bar-header">
            <div>Navigation</div>
            <div>ProfileMenu</div>
        </header>
    </div>
}

function Bottombar(props) {
    return <div className="bottom-bar">
        <div>BottomRight</div>
        <div>BottomCenter</div>
        <div>BottomLeft</div>
    </div>
}