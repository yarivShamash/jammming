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
    
        /*the search(term) method appearently returns undefined.. Browser writes:
        Tracklist.js, cannot read property 'map' of undefined, and pointing on the
        traks of the TrackList.. I couldn't understand why.*/
    async search (term) {
      
      const topic = 'Searching Spotify\'s API.'

      const mainTerm = encodeURI(term); // this converts the term passed as a parameter to a URI format

      let response;
      let JSONResponse;
      let error;
      let mappedTracks;

      if (!userAccessToken){
        console.log('No Access Token.');
        return ;
      };
      
      //The code below tries to contact Spotifies API
      try {
        response =  await fetch(`https://api.spotify.com/v1/search?type=track&q=${mainTerm}`, {
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

      try{
        JSONResponse = await response.json();

      } catch (err){
        error = new Error(`Fail to read response, while ${topic}.`);
        return Promise.reject(error);
      }

      
      let searchResults =  () => {

        if (!JSONResponse.tracks){
          mappedTracks =  [];
        }
        mappedTracks = JSONResponse.tracks.items.map(track => ({

          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri 
      }));
      }

      searchResults();
      

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
      return fetch('https://api.spotify.com/v1/me', {
        method: 'GET',
        headers: headers
      })
      .then(response => response.json())
      .then(jsonResponse => {
        userID = jsonResponse.id;
        
        /*This fetch is set to POST creates a new playlist in the user’s account and returns a playlist ID */
        return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({name: playlistName})

          })
          .then(response => response.json())
          .then(jsonResponse => {
            const playlistId = jsonResponse.id

            /*This fetch is to POST the track URIs*/
            return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistId}/tracks`, {
              headers: headers,
              method: 'POST',
              body: JSON.stringify({uris: trackURI})
            });
          });
        });
      }
};