let userAccessToken = '';

const url = 'https://accounts.spotify.com/authorize';
// const proxyurl = "https://cors-anywhere.herokuapp.com/";

const ClientID = '0ef05acd1d204d45901fd22d4624dbe8';
/*This is the Client ID I got from Spotify when I registered the app */

const redirect_uri = 'http://localhost:3000/';
/*Required. The URI to redirect to after the user grants/denies permission.
This URI needs to be entered in the URI whitelist that you specify when you 
register your application. */

const responseType = 'token';
/*The API suggested to set it to 'token' */

const scope = 'playlist-modify-public';
/*This scope lets you write access to a user's private playlist */

const endPoint = `${url}?client_id=${ClientID}&response_type=${responseType}&scope=${scope}&redirect_uri=${redirect_uri}`;

export const Spotify = {
    getUserAccessToken: () =>{
        if(userAccessToken){
            return userAccessToken;
        }else if (
            window.location.href.match(/access_token=([^&]*)/) && /*returns an array with the item access_token=<whatever it is set to> untill the '&' sign*/
            window.location.href.match(/expires_in=([^&]*)/) /*returns an array with the item expires_in=<whatever it is set to> untill the '&' sign*/
            ) {
            
            let userAccessToken = window.location.href.match(/access_token=([^&]*)/)[1];
            let expiresIn = window.location.href.match(/expires_in=([^&]*)/)[1];
            
            window.setTimeout(() => (userAccessToken = ''), expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            
            console.log(userAccessToken);
            
            return userAccessToken;
          } else {
            window.location = endPoint;
          }
         
        },
    
    search(term){
      let userAccessToken = this.getUserAccessToken();
      
      if (!userAccessToken){
        console.log('No Access Token.');
        return;
      };

      const mainTerm = encodeURI(term); /* this converts the term passed as a parameter to a URI format */
      
      return fetch(`https://api.spotify.com/v1/search?type=track&q=${mainTerm}`, {
        headers: {Authorization: `Bearer ${userAccessToken}`}
      })
      .then(response => {
          if(response.ok){
              return response.json()
          }
          throw new Error('Request failed');
      },networkError => console.log(networkError.message)
      ).then(jsonResponse => {
          if (jsonResponse){
            
            jsonResponse.tracks.items.map(track => ({
              
                id: track.id,
                name: track.name,
                artist: track.artist[0].name,
                album: track.album.name,
                uri: track.uri //this was problematic for some reason..
              }))
          
          } else {
            return [];
          }
      })
    },

    savePlaylist(playlistName, trackURI){
      if (!playlistName && !trackURI.length){
        return;
      }

      const userAccessToken = this.getUserAccessToken();
      const headers = {Authorization: `Bearer ${userAccessToken}`};
      let userID;
      
      /*This fetch is set to GET the user's ID */
      return fetch('https://api.spotify.com/v1/me', {
        headers: headers
      }).then(response => {
      if (response.ok) {
        return response.json()
      }
      throw new Error('Request Failed!');
      }, networkError => console.log(networkError.message)
      ).then(jsonResponse => {
        userID = jsonResponse.id;
        
        /*This fetch is set to POST creates a new playlist in the user’s account and returns a playlist ID */
        return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({name: playlistName})

          }).then(response => {
          if (response.ok) {
            return response.json()
          }
          throw new Error('Request Failed!');
          }, networkError => console.log(networkError.message)
          ).then(jsonResponse => {
            const playlistId = jsonResponse.id;

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