import React from "react";

import './WellcomeScreen.css';
import {Spotify} from '../../util/Spotify'


export const WellcomeScreen = () => {
  return (
    <div className="start-jammming"> {/*a block level element*/}
    <h2>Wellcome to Jammming!</h2>
    <p>  
      Jammming is an app to create Spotify playlists.<br/>
      To use this app you'll need to approve it over at Spotify.<br/>
      So..<br/>
    </p>
    <h1>Press the button and Jammm!</h1> <br></br>
    <a onClick={
      Spotify.redirect
      }>Start Jammming!</a>
    </div>  
      
  )
};

// export const wellcomeScreen = wellcomeScreenElement();
