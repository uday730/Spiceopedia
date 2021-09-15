export const environment = {
  production: true,
  // IDENTITY_SERVER: 'https://spiceopedia-identity.azurewebsites.net/',
  // CLIENT_ID: 'spicyui',
  // REDIRECT_URI: 'https://spiceopedia.azurewebsites.net/auth-callback',
  // POSTLOGOUT_URI: 'https://spiceopedia.azurewebsites.net/logout',
  // RESPONSE_TYPE:"code",
  // SCOPE:"openid profile email role api1.read",

  // WEBAPI_URI:"https://spiceopediaapi.azurewebsites.net/api/"

  IDENTITY_SERVER: 'https://localhost:5003/',
  CLIENT_ID: 'spicyui',
  REDIRECT_URI: 'http://localhost:4201/auth-callback',
  POSTLOGOUT_URI: 'http://localhost:4201/logout',
  RESPONSE_TYPE:"code",
  SCOPE:"openid profile email role api1.read",

  WEBAPI_URI:"https://localhost:5001/api/"
};
