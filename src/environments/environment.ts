// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  // IDENTITY_SERVER: 'https://tgidp.azurewebsites.net/',
  // WEBAPI_URI:"https://tgapi1.azurewebsites.net/api/",
  // CLIENT_ID: 'tgadminui',
  // REDIRECT_URI: 'https://tgadmin.azurewebsites.net/auth-callback',
  // POSTLOGOUT_URI: 'https://tgadmin.azurewebsites.net/logout',
  // RESPONSE_TYPE:"code",
  // SCOPE:"openid profile email role api1.read",
 

  // IDENTITY_SERVER: 'https://localhost/tastegenidp/',
  // CLIENT_ID: 'spicyui',
  // REDIRECT_URI: 'http://localhost/tastegen/auth-callback',
  // POSTLOGOUT_URI: 'http://localhost/tastegen/logout',
  // RESPONSE_TYPE:"code",
  // SCOPE:"openid profile email role api1.read",
  // WEBAPI_URI:"https://localhost/tastegenapi/api/"

  // IDENTITY_SERVER: 'http://desktop-333h1tu/tastegenIDP/',
  // WEBAPI_URI:"http://desktop-333h1tu/tastegenapi/api/",
  // CLIENT_ID: 'spicyui',
  // REDIRECT_URI: 'http://desktop-333h1tu/spiceopedia/auth-callback',
  // POSTLOGOUT_URI: 'http://desktop-333h1tu/spiceopedia/logout',
  // RESPONSE_TYPE:"code",
  // SCOPE:"openid profile email role api1.read"
  

  IDENTITY_SERVER: 'https://tgidp.azurewebsites.net/',
  WEBAPI_URI:"https://tgapi1.azurewebsites.net/api/",
  CLIENT_ID: 'tgadminui',
  REDIRECT_URI: 'http://localhost:4201/auth-callback',
  POSTLOGOUT_URI: 'http://localhost:4201/logout',
  RESPONSE_TYPE:"code",
  SCOPE:"openid profile email role api1.read",
  


  //   IDENTITY_SERVER: 'http://desktop-333h1tu/tastegenIDP',
  // WEBAPI_URI:"http://desktop-333h1tu/tastegenapi/api/",
  // CLIENT_ID: 'spicyui',
  // REDIRECT_URI: 'http://localhost:4201/auth-callback',
  // POSTLOGOUT_URI: 'http://localhost:4201/logout',
  // RESPONSE_TYPE:"code",
  // SCOPE:"openid profile email role api1.read"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
