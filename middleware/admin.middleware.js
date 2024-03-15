const { auth } = require("../helpers/firebase"); //verificar si sirve
const { authAdmin } = require('../helpers/firebase_admin');

module.exports = {
    isAdminLoggedIn: async (req, res, next) =>{
        try {

            const idToken = await auth.currentUser.getIdTokenResult();

            //TODO: ver si se necesita pasar algo al entorno locals
            // res.locals.access = idToken.claims.access;

            if( idToken.claims.admin === false ){
                return res.status(401).end();
            }

            next();
        } catch ( error ) {
            //There is no token so redirects to login
            console.error( error.message );
            res.redirect( 302,'/user/login');
            // res.status(401).location('user/location').end();
        }
    }
}