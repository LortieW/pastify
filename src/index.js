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
        <div className="top-bar-filler" />
        <div className="section-view">
            <CustomSection name="Recently played"/>
            <CustomSection name="Jump back in"/>
            <CustomSection name="Your heavy rotation"/>
            <CustomSection name="Made for {user.name}"/>
            <CustomSection name="Throwback"/>
            <CustomSection name="New releases for you"/>
            <CustomSection name="Your favorite albums and s.artistongs"/>
            <CustomSection name="For fans of {user.followed.artist.name}"/>
            <CustomSection name="For fans of {user.followed.style.name}"/>
            <CustomSection name="Popular new releases"/>
        </div>
    </div>
}

function CustomSection(props) {
    return <section className="custom-section">
        {props.name}
    </section>
}

function Navbar(props) {
    return <div className="nav-bar">
        <nav>
            <div>Banner</div>
            <div>Menu</div>
            <div>Playlists</div>
            <div>Install App</div>
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