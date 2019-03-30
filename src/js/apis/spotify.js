import Cookies from 'js-cookie'
import axiosHelper from "@/js/helpers/axios"

const AUTH = "Basic ZGM3Njg0OTRkYzU2NDVlMGEyMGYyMTUxN2FhNjBjY2I6OGI0YTk5NWEyMGZiNGY5ZGE2YmFiYTIzMzgyNzIwOTE=";
const AUTH_URL = "https://accounts.spotify.com/api/token"

async function getToken() {
  if (!Cookies.get('spotify_token')) {
    const body = { "grant_type" : "client_credentials" }
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": AUTH
    }
    const authResponse = axiosHelper.axiosPost(AUTH_URL, body, options);
    const token = authResponse.token_type + " " + authResponse.access_token;
    Cookies.set('spotify_token', token, { expires: (authResponse.expires_in - 10) / 3600.0 / 24.0 })
  }

  return Cookies.get('spotify_token')
}

async function parseOptions(token) {
  const token = await getToken();
  return {
    headers: {
      "Authorization": token
    }
  };
}
