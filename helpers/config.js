const dotenvx = require('@dotenvx/dotenvx');
const path = require('path');

//TODO: descomentar esto al subirlo al repo
// dotenvx.config({
//   path: path.resolve(__dirname, process.env.NODE_ENV + '.env')
// });
dotenvx.config({
    path: path.resolve(__dirname, '.env.development')
});

const myCredentials = process.env;

module.exports = {
    API_KEY: myCredentials.API_KEY,
    AUTH_DOMAIN: myCredentials.AUTH_DOMAIN,
    PROJECT_ID: myCredentials.PROJECT_ID,
    STORAGE_BUCKET: myCredentials.STORAGE_BUCKET,
    MESSAGING_SENDER_ID: myCredentials.MESSAGING_SENDER_ID,
    APP_ID: myCredentials.APP_ID,
    MEASUREMENT_ID: myCredentials.MEASUREMENT_ID,
    S_KEY: myCredentials.S_KEY,
    PORT: myCredentials.PORT,
    BASE_URL: myCredentials.BASE_URL,
    SA_KEY_PATH: myCredentials.SA_KEY_PATH,
    DATABASE_URL: myCredentials.DATABASE_URL
}