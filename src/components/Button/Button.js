import React from "react";

import './Button.css';
import {userAccessToken, Spotify} from '../../util/Spotify'

export class Button extends React.Component {
  
    
  render () {

      return (
        <div className="start-jammming"> {/*a block level element*/}
        <h1>Press the button and Jammm!</h1> <br></br>
        <a onClick={
          Spotify.redirect
          }>Start Jammming!</a>
        </div>  
          
      )

  }
}