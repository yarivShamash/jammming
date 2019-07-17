import React from "react";

import './Button.css';
import {userAccessToken, Spotify} from '../../util/Spotify'

export class Button extends React.Component {
  componentDidMount() {

      if (!userAccessToken) {
        
        console.log(`Button's UAT before calling the fn: ${userAccessToken}`)
        Spotify.getUserAccessToken();
        console.log(`Button's UAT after calling the fn: ${userAccessToken}`);

      } 
    }
  render () {

      return (
        <div className="start-jammming"> {/*a block level element*/}
        <h1>Press the button and Jammm!</h1> <br></br>
        <a onClick={
          Spotify.getUserAccessToken
          }>Start Jammming!</a>
        </div>  
          
      )

  }
}