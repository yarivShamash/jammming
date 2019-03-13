let UserAccessToken = null;

const url = 'https://accounts.spotify.com/authorize';
const proxyurl = "https://cors-anywhere.herokuapp.com/";

const ClientID = '0ef05acd1d204d45901fd22d4624dbe8';
/*This is the Client ID I got from Spotify when I registered the app */

const redirect_uri = 'https://example.com/';
/*Required. The URI to redirect to after the user 
grants/denies permission. This URI needs to be entered in the URI whitelist 
that you specify when you register your application. 
I used this uri as a placeholder since I did not know what else to use*/

export const Spotify = {
    getUserAccessToken: () =>{
        if(UserAccessToken){
            return UserAccessToken;
            } else {
                const endPoint = `${url}?client_id=${ClientID}&redirect_uri=${redirect_uri}&scope=user-read-private%20user-read-email&response_type=token&state=ngjr3`
                async function getData(){
                    try{
                        const response = await fetch(proxyurl + endPoint);
                        if (response.ok){
                            const jsonResponse = await response.json();
                            console.log(jsonResponse);
                        }
                        throw new Error('Request failed!');

                    } catch(error) {
                        console.log(error + 'No way Jose! :(');
                    }
                }
                getData();
            }
            
        }
    };


/*
Things I tried and did not work out:
In getUserAccessToken, after the if(UserAccessToken), in the else part, I tried 
to connect to the Spotify API using fetch in this way: 

const endPoint = `${url}?client_id=${ClientID}&redirect_uri=${redirect_uri}&scope=user-read-private%20user-read-email&response_type=token&state=ngjr3`

fetch(endPoint)
.then(response => {
    if(response.ok){
        return response.json()
    }
    throw new Error('Request failed');
},networkError => console.log(networkError.message)
).then(jsonResponse => {
    console.log(jsonResponse);
})

I got an error to the console saying "Failed to fetch". I tried removing the
state=ngjr3 at the end but it did not work as well.

TAKE #2 on the same thing, tried the XMLHttpRequest:

 const xhr = new XMLHttpRequest();
                const endPoint = `${url}?client_id=${ClientID}&redirect_uri=${redirect_uri}&scope=user-read-private%20user-read-email&response_type=token&state=ngjr3`

                xhr.responseType = 'json';
                xhr.onreadystatechange = () =>{
                    if (xhr.readyState === XMLHttpRequest.DONE){
                        console.log(xhr.status);
                    }
                };

                xhr.open('GET', endPoint);
                xhr.send();

and got this:

Access to XMLHttpRequest at 'https://accounts.spotify.com/authorize?client_id=
0ef05acd1d204d45901fd22d4624dbe8&redirect_uri=https://github.com/jammming&
scope=user-read-private%20user-read-email&response_type=token&state=ngjr3'
from origin 'http://localhost:3000' has been blocked by CORS policy:
No 'Access-Control-Allow-Origin' header is present on the requested resource.
 */