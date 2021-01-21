import * as firebase from 'firebase'


var firebaseConfig = {
    apiKey: "AIzaSyCw9Lc6KvM9Zjz_GwmXj1UWMzNIRhdeY7w",
    authDomain: "myprojectvuejs.firebaseapp.com",
    databaseURL: "https://myprojectvuejs-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "myprojectvuejs",
    storageBucket: "myprojectvuejs.appspot.com",
    messagingSenderId: "974707805950",
    appId: "1:974707805950:web:055ab6c8e40f44f9fcdfaf",
    measurementId: "G-FC5DGJX89H"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

export default firebase  