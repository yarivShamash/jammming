import React from "react";

import './Button.css';
import {userAccessToken, Spotify} from '../../util/Spotify'

export class Button extends React.Component {
  componentDidMount() {

      if (!userAccessToken) {
        Spotify.getUserAccessToken()
      } 
    }
  render () {

      return (
        <div className="start-jammming"> {/*a block level element*/}
        <a onClick={
          Spotify.getUserAccessToken
          }>Start Jammming!</a>
        </div>  
          
      )

  }
}