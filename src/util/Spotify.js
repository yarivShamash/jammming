import { map, get } from 'lodash';


export let userAccessToken = '';


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

    redirect () {
      if(window.location === endPoint){
        return
      };
      window.location = endPoint;
    },

    getUserAccessToken () {
        if(userAccessToken){
          console.log(`Spotify.js userAccessToken: ${userAccessToken ? 'holds the access token' : 'Empty as a bucket'}`) // I used this to see if the accesss token does exist at this stage
          return userAccessToken;
        }
        
        let userAccessTokenMatch = window.location.href.match(/access_token=([^&]*)/); /*returns an array with the item access_token=<whatever it is set to> untill the '&' sign*/
        let expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);  /*returns an array with the item expires_in=<whatever it is set to> untill the '&' sign*/
        
        if (userAccessTokenMatch && expiresInMatch) {
          
          userAccessToken = userAccessTokenMatch[1];
          const expiresIn = Number(expiresInMatch[1]);

          window.setTimeout(() => (userAccessToken = ''), expiresIn * 1000);
          window.history.pushState('Access Token', null, '/');// This clears the parameters, allowing us to grab a new access token when it expires.
           
          // console.log(`Spotify.js userAccessToken: ${userAccessToken ? 'holds the access token' : 'Empty as a bucket'}`) // I used this to see if the accesss token does exist at this stage
          return userAccessToken;

          };

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
      
      //The code below tries to contact Spotifies API and search for the searchTermURI
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
        error = new Error(`Fail to convert response to JSON format, while ${topic}.`);
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
      
      return Promise.resolve(mappedTracks);
    },


    async savePlaylist(playlistName, trackURI){
      
      const topic = `Saving Playlist to Spotify`;

      let response;
      let error;
      const headers = {Authorization: `Bearer ${userAccessToken}`};
      let userID;
      let playlistID;

      if (!playlistName || !trackURI.length){
        return Promise.reject(new Error(`${topic} failed. Confirm that the playlist has a name and some songs in it`)).then(()=>{}, error => console.log(error));
      }
      
      
      
      /*The code below tries to GET the user's ID from the spotify API */

      try {
        response = await fetch(`${SPOTIFY_SEARCH_ENDPOINT}/me`, {
          method: 'GET',
          headers: headers
        })
        .then( response => response.json())
        .then(JSONResponse => userID = JSONResponse.id)

      } catch (e) {
        error = new Error(`Network error, while ${topic}.`);
        return Promise.reject(error);
      };

      
      /*The code below tries to POST a new playlist in the user’s account and returns a playlist ID */
      try {
        response = await fetch(`${SPOTIFY_SEARCH_ENDPOINT}/users/${userID}/playlists`, {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({name: playlistName})
          })
          .then(response => response.json())
          .then(JSONResponse => playlistID = JSONResponse.id)
          
      } catch (e) {
        error = new Error(`Network error, while posting the PlaylistID during ${topic}.`);
        return Promise.reject(error);
      };


       /*The code below tries to POST the track URIs to the above playlist*/
      try {
        response = await fetch(`${SPOTIFY_SEARCH_ENDPOINT}/users/${userID}/playlists/${playlistID}/tracks`, {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({uris: trackURI})
          })
      } catch (e) {
        error = new Error(`Network error, while posting Track URIs to Playlist during ${topic}.`);
        return Promise.reject(error);
      };

      }
};

export default Spotify;
