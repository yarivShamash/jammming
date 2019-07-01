import { map, get } from 'lodash';


let userAccessToken = '';

const url = 'https://accounts.spotify.com/authorize';
// const proxyurl = "https://cors-anywhere.herokuapp.com/";

const ClientID = '0ef05acd1d204d45901fd22d4624dbe8';
/*This is the Client ID I got from Spotify when I registered the app */

const redirectURI = 'http://localhost:3000/';
/*Required. The URI to redirect to after the user grants/denies permission.
This URI needs to be entered in the URI whitelist that you specify when you 
register your application. */

const responseType = 'token';
/*The API suggested to set it to 'token' */

const scope = 'playlist-modify-public';
/*This scope lets you write access to a user's private playlist */

const endPoint = `${url}?client_id=${ClientID}&response_type=${responseType}&scope=${scope}&redirect_uri=${redirectURI}`;

const SPOTIFY_SEARCH_ENDPOINT = 'https://api.spotify.com/v1';

export const Spotify = {
    getUserAccessToken: () =>{
        if(userAccessToken){
            return userAccessToken;
        }
        
        /*Using the below definitions with http://localhost:3000 creates problems because window.location.href evaluates to http://localhost:3000/ */
        let userAccessTokenMatch = window.location.href.match(/access_token=([^&]*)/); /*returns an array with the item access_token=<whatever it is set to> untill the '&' sign*/
        let expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);  /*returns an array with the item expires_in=<whatever it is set to> untill the '&' sign*/
        
        if (userAccessTokenMatch && expiresInMatch) {
          
          userAccessToken = userAccessTokenMatch[1];
          const expiresIn = Number(expiresInMatch[1]);

          window.setTimeout(() => (userAccessToken = ''), expiresIn * 1000);
          window.history.pushState('Access Token', null, '/');// This clears the parameters, allowing us to grab a new access token when it expires.
            
            return userAccessToken;
          } else {
            window.location = endPoint;
          }
         
        },
    
    async search (term) {
      
      const topic = 'Searching Spotify\'s API.'

      const searchTermURI = encodeURI(term); // this converts the search term passed as a parameter to a URI format

      let response;
      let JSONResponse;
      let error;

      if (!userAccessToken){
        return Promise.reject(new Error(`${topic} No Access Token. Please perss the "Start Jammming" button twice or confirm connection to your Spotify account.`)).then(()=>{}, error => console.log(error));
      };
      
      //The code below tries to contact Spotifies API
      try {
        response =  await fetch(`${SPOTIFY_SEARCH_ENDPOINT}/search?type=track&q=${searchTermURI}`, {
        headers: {Authorization: `Bearer ${userAccessToken}`}
      })      
      } catch (e) {
        error = new Error(`Network error, while ${topic}.`);
        return Promise.reject(error);
      }

      if (!response.ok) {
        error = new Error(`Server error, status: ${response.status}, while ${topic}.`);
        return Promise.reject(error);
      }

      // The code below will try to convert the response to JSON format

      try {
        JSONResponse = await response.json();

      } catch (err){
        error = new Error(`Fail to read response, while ${topic}.`);
        return Promise.reject(error);
      }

      
      let JSONTracks = (JSONResponse.tracks && JSONResponse.tracks.items)
      ? get(JSONResponse, ['tracks', 'items'], [] ) : console.log(`JSONResponse.tracks was not found`);

      let mappedTracks = map(JSONTracks, track => ({

        id: track.id,
        name: track.name,
        artist: get(track, ['artists', 0, 'name'], 'No artist name'),
        album: get(track, ['album', 'name'], 'No album name'),
        uri: track.uri 

    }))
      

        // this is the map method neede to be implied on mapped tracks:

        /**
          .map())
         */
      return Promise.resolve(mappedTracks);
    },


    savePlaylist(playlistName, trackURI){
      if (!playlistName || !trackURI.length){
        return;
      }

      // const userAccessToken = Spotify.getUserAccessToken(); 
      // I commented this out becaues it is already defined in 
      // the global of this file
      
      const headers = {Authorization: `Bearer ${userAccessToken}`};
      let userID;
      
      /*This fetch is set to GET the user's ID */
      return fetch(`${SPOTIFY_SEARCH_ENDPOINT}/me`, {
        method: 'GET',
        headers: headers
      })
      .then(response => response.json())
      .then(jsonResponse => {
        userID = jsonResponse.id;
        
        /*This fetch is set to POST creates a new playlist in the user’s account and returns a playlist ID */
        return fetch(`${SPOTIFY_SEARCH_ENDPOINT}/users/${userID}/playlists`, {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({name: playlistName})

          })
          .then(response => response.json())
          .then(jsonResponse => {
            const playlistId = jsonResponse.id

            /*This fetch is to POST the track URIs*/
            return fetch(`${SPOTIFY_SEARCH_ENDPOINT}/users/${userID}/playlists/${playlistId}/tracks`, {
              headers: headers,
              method: 'POST',
              body: JSON.stringify({uris: trackURI})
            });
          });
        });
      }
};