import React from 'react';

import './WellcomeScreen.css';
import { Spotify } from '../../util/Spotify';


const WellcomeScreen = () => {
  return (
    <div className="start-jammming">
      <h2>Wellcome to Jammming!</h2>
      <p>
        Jammming is an app to create Spotify playlists.
        <br />
        To use this app you'll need to approve it over at Spotify.
        <br />
        So..
        <br />
      </p>
      <h1>Press the button and Jammm!</h1>
      <br />
      <button
        type="button"
        onClick={
        Spotify.redirect
     }>
          Start Jammming!
      </button>
    </div>
  );
};

export default WellcomeScreen;
