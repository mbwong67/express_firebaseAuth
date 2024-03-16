//TODO: eliminar esto en caso de que no se use
const { auth } = require('../helpers/firebase');
const { getIdToken } = require("firebase/auth");
const { authAdmin } = require('../helpers/firebase_admin');
const { cookieManager } = require('../services/cookie.services');

module.exports = {
    validateRegister: (req, res, next) => {
    try{
        let usernameTemp = req.body.username;
        const pass = req.body.password;
        const pass_repeat = req.body.confirm_password;

        //validate if str username is an email
        const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if( !regexCorreo.test(usernameTemp) )  throw new Error("Please enter a valid email");

        const username = usernameTemp.trim();

        // password min 6 chars
        if ( !pass || pass.length < 6 )   throw new Error("Please enter a password with min. 6 chars");

        // password (repeat) does not match
        if ( !pass_repeat || pass != pass_repeat )   throw new Error("Both passwords must match");

        //send variable to controller
        res.locals.username = username;
        next();
    }catch( error ){
        return res.status(400).send({
            msg: error.message
        });
    }
    
    },
    isLoggedIn: async (req, res, next) => {
        try {
            //TODO: cheque el token
            //maybe ya jala
            const cookieToken = cookieManager.parseCookie(req.headers.cookie);
            // const idToken = await auth.currentUser.getIdTokenResult();
            const idToken = await authAdmin.verifyIdToken(cookieToken);
            const idTokenAccess = idToken.access;
            
            if( !idTokenAccess )    throw new Error('User not allowed');
            // await authAdmin.getIdToken()
            // 
            // // res.locals.access = idToken.claims.access;
            res.locals.access = idTokenAccess;

            // // console.log(`ìsLoggedIn {${JSON.stringify(idToken.claims)}}`)
            if( idToken.admin === true ){
                res.locals.privilege = 2;
            }  
            else if( idToken.admin === false){   
                res.locals.privilege = 1;
                // const uid = idToken.uid;
                // const user = await authAdmin.getUser(uid);
                // const userAccess = user.customClaims.access;
                // //if user access that is stored directly from firebase is different from the cookie, change it
                // if(idTokenAccess != userAccess){
                //     const newToken = await getIdToken(user, true);
                //     res.locals.newToken = newToken;
                // }
            }
            else {
                throw new Error('No claim in token');
            }
            
            next();
        } catch ( error ) {
            console.error( error.message );
            const cookie = cookieManager.generateCookie('');
            res.setHeader('Set-Cookie', cookie);
            res.redirect( 302,'/user/login');
            // res.status(401).location('user/location').end();
        }
    }
}