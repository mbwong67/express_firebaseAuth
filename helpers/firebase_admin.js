const { initializeApp, getApps, getApp } = require('firebase-admin/app');
const { admin, credential } = require('firebase-admin');
const { SA_KEY_PATH, DATABASE_URL } = require('./config');
const { getAuth } = require('firebase-admin/auth');


// admin.app.initializeApp({
//     credential: admin.credential.cert(SA_KEY_PATH),
//     databaseURL: DATABASE_URL
// });
// const adminApp = initializeApp({
//     credential: applicationDefault(),
//     databaseURL: DATABASE_URL
// });
const adminCredentials = {
    credential: credential.cert(SA_KEY_PATH),
    databaseURL: DATABASE_URL
}
const adminApp = getApps().length === 0 ? initializeApp(adminCredentials) : getApp();
const authAdmin = getAuth(adminApp);
module.exports = { authAdmin };