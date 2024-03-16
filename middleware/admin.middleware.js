const { auth } = require("../helpers/firebase"); //verificar si sirve
const { authAdmin } = require('../helpers/firebase_admin');
const { cookieManager } = require('../services/cookie.services');

module.exports = {
    isAdminLoggedIn: async (req, res, next) =>{
        try {
            const cookieToken = cookieManager.parseCookie(req.headers.cookie);
            const idToken = await authAdmin.verifyIdToken(cookieToken);


            if( idToken.admin === false ){
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