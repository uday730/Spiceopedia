// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

//http://spiceopediaapi.azurewebsites.net/
//http://spiceopedia-identity.azurewebsites.net/
//https://spiceopedia.azurewebsites.net

//'https://localhost:5003/
//https://localhost:5001/api/"
//http://localhost:4201

export const environment = {
  production: false,

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

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
