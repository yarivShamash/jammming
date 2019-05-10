
# Refactor Spofity API Layer + Create better user experience


- Today when user enters the app he is prompted to click the "Start Jaming" button twice.
- This user experience, is a cause of an implementation issue. In other words, not ideal code design.
- And after the first redirect we are prompted with the same message again, altho we laready dont need to click twice.
- Technicaly we need 1. redirect the user to spotify url. 2. grab some token from their redirect, for future use.
- Right now it all happens in the same function `getUserAccessToken` which is called on "Start Jaming" click.
- When thinking about the optimal user experice, there should be only one "Start Jaming" click.
- After which this button should go away, and we should see a new screen. 
- There should be a conditioning logic in `App` that decides whether it renders the "Start Jaming" button, or the rest of the UI.
- This conditioning logic should be based on the state of a dedicated boolean somthing like `hasUserLoggedIn`
- In Spofity.js there is a function called `getUserAccessToken` which should be renamed and refactored, or even removed.
- Naming; `getUserAccessToken` suggest that the function gets something, altho it implicitly "gets the redirect url" with the token, in reality no one calling it uses what it gets as a return value.
- Logic; main business logic is to redirect. In this case, its a very simple fn.
- You can even export the redirect url from Spotify.js and import it in App.js and pass it to the href. thats it.
- Now we need to add some state to the App component which will hold `hasUserLoggedIn` and the `token`
- You can use react lifecylce method called `componentDidMount` which will check the url.
- If the URL contains a token it should call a dedicated method like `retrieveToken`
- Which will:  1. take the token and the expiration from the url query params, 2. saving the `token` alogn with `hasUserLoggedIn` in the state, 3. clearing those query params.
- In react lifecycle next method to be caled after `setState` is `render` which will look in `this.state.hasUserLoggedIn` and decide what to render next.
- Either "Start Jaming" button or the rest of the UI.
- Whenever you will call `search` or `savePlaylist` you will take the token from the state of App and pass it.