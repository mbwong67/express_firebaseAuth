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
            const cookieToken = cookieManager.parseCookie(req.headers.cookie);

            const idToken = await authAdmin.verifyIdToken(cookieToken);
            // const cookie = cookieManager.generateCookie(idToken);
            // res.cookie('jwtToken', cookie[0], cookie[1]);
            const idTokenAccess = idToken.access;
            
            if( !idTokenAccess )    throw new Error('User not allowed');

            res.locals.access = idTokenAccess;

            if( idToken.admin === true ){
                res.locals.privilege = 2;
            }  
            else if( idToken.admin === false){   
                res.locals.privilege = 1;

            }
            else {
                throw new Error('No claim in token');
            }
            
            next();
        } catch ( error ) {
            console.error( error.message );
            res.clearCookie('jwtToken');
            res.redirect( 302,'/user/login');
        }
    },
    removeCookies: (req, res, next) =>{
        try{
            res.clearCookie('jwtToken');

            res.status(200).send({
                msg: 'sign out'
            })
        }catch( error ){
            return res.status(400).send({
                msg: 'Token Error'
            })
        }
    }
}