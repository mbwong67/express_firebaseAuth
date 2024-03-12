//env credentials
const { API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID, MEASUREMENT_ID } = require("./config.js");

// Import the functions you need from the SDKs you need
const fApp = require("firebase/app");
const { getAuth } = require ("firebase/auth");

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID
};
// Initialize Firebase
const app = fApp.initializeApp(firebaseConfig);
// // Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
module.exports = { auth };