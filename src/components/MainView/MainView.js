import React from "react";

const sectionTitles = [
  "Recently played",
  "Jump back in",
  "Your heavy rotation",
  "Made for {user.name}",
  "Throwback",
  "New releases for you",
  "Your favorite albums and s.artistongs",
  "For fans of {user.followed.artist.name}",
  "For fans of {user.followed.style.name}",
  "Popular new releases",
];

function CustomSection(props) {
  return <section className="custom-section">{props.name}</section>;
}

// Review implementation - Should follow same pattern accross each elements
const listSectionTitles = sectionTitles.map((section) => (
  <CustomSection name={section} />
));

export default function MainView(props) {
  return (
    <div className="main-view">
      <div className="top-bar-filler" />
      <div className="section-view">{listSectionTitles}</div>
    </div>
  );
}
