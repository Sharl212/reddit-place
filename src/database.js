import firebase from 'firebase';

const config = { // credentials
    apiKey: "AIzaSyBtvTO7xTaAk0K0SiKNC5ME94FalbKO8iA",
    authDomain: "reddit-place-c2937.firebaseapp.com",
    databaseURL: "https://reddit-place-c2937.firebaseio.com",
    projectId: "reddit-place-c2937",
    storageBucket: "reddit-place-c2937.appspot.com",
    messagingSenderId: "713619768290"
};
const settings = {timestampsInSnapshots: true};
firebase.initializeApp(config); // create the app

const firestore = firebase.firestore(); // access firestore
firestore.settings(settings);

export {
    firestore,
    firebase
}