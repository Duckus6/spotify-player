const express = require('express')
const dotenv = require('dotenv');

const app = express();
const port = 8080

dotenv.config()

var spotify_client_id = process.env.SPOTIFY_CLIENT_ID
var spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET


//update this
const generateRandomString = function (length) {
	const text = '';
	const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
	for (const i = 0; i < length; i++) {
	  text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
  };
  

app.get('/auth/login', (req, res) => {
	const scope = "streaming user-read-email user-read-private"
	const state = generateRandomString(16);
  
	const auth_query_parameters = new URLSearchParams({
	  response_type: "code",
	  client_id: spotify_client_id,
	  scope: scope,
	  redirect_uri: spotify_redirect_uri,
	  state: state
	})
  
	res.redirect('https://accounts.spotify.com/authorize/?' + auth_query_parameters.toString());
})
  

app.get('/auth/callback', (req, res) => {
	const code = req.query.code
	const authOptions = {
		body: {
			code: code,
			redirect_uri: `http://localhost:${port}/auth/callback`,
			grant_type: 'authorization_code'
		},
		headers: {
			'Authorization': 'Basic ' + (Buffer.from(spotify_client_id + ':' + spotify_client_secret).toString('base64')),
			'Content-Type' : 'application/x-www-form-urlencoded'
		},
		json: true
	}
	fetch("https://accounts.spotify.com/api/token")
})

app.listen(port, () => {
  console.log(`Listening on ${port}`)
})


//https://developer.spotify.com/documentation/web-playback-sdk/guide/ request access token