const { initializeApp } = require('firebase-admin/app');
const { SA_KEY_PATH, DATABASE_URL } = require('./config');
const { getAuth } = require('firebase-admin/auth');


const admin = initializeApp({
    credential: admin.credential.cert(SA_KEY_PATH),
    databaseURL: DATABASE_URL
});
const authAdmin = getAuth(admin);
module.exports = { authAdmin };