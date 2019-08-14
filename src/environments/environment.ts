// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl : 'http://192.168.1.27:3000/api/',
  imageUrl:'http://192.168.1.27:3000/',

  firebaseConfig : {
    apikey:"AIzaSyDVF3cXrQr7t7Ab9eTJ0QTtOOUecZVIZvw",
    authDomain: "313104804796-2n9i4k22k3d0voqnrljsurf9paqlgmnc.apps.googleusercontent.com",
    databaseURL: "https://ctlkart.firebaseio.com",
    projectId: "ctlkart",
    storageBucket: "ctlkart.appspot.com",
    messagingSenderId: "313104804796"
    }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
