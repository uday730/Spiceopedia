export const environment = {
  production: true,
  IDENTITY_SERVER: 'https://spiceopedia-identity.azurewebsites.net/',
  CLIENT_ID: 'spicyui',
  REDIRECT_URI: 'https://spiceopedia.azurewebsites.net/auth-callback',
  POSTLOGOUT_URI: 'https://spiceopedia.azurewebsites.net/logout',
  RESPONSE_TYPE:"code",
  SCOPE:"openid profile email role api1.read",

  WEBAPI_URI:"https://spiceopediaapi.azurewebsites.net/api/"
};
