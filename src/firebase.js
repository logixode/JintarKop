import firebase from "firebase/app";
import "firebase/database";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBfSC9AkeIAiUpusRVJ49hMAX5U18xA8sk",
  authDomain: "jintarkop-2b9d2.firebaseapp.com",
  databaseURL: "https://jintarkop-2b9d2.firebaseio.com",
  projectId: "jintarkop-2b9d2",
  storageBucket: "jintarkop-2b9d2.appspot.com",
  messagingSenderId: "602636053987",
  appId: "1:602636053987:web:c39f1527c1dd52dcea04d6"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

export const db = firebase.database();
export default firebaseApp;