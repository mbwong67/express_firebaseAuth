//TODO: eliminar esto en caso de que no se use
// const { verify } = require("jsonwebtoken");
// const jwt_verify = verify;
// const secretKey = require('../helpers/config').J_KEY;
const { auth } = require("../helpers/firebase"); //verificar si sirve
const { authAdmin } = require('../helpers/firebase_admin');

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
            const idToken = await auth.currentUser.getIdTokenResult();

            if( idToken.claims.admin )  res.locals.privilege = 2;
            else    res.locals.privilege = 1;
            
            next();
        } catch ( error ) {
            return res.status(401).send({
            msg: 'Your session is not valid!'
            });
        }
    }
}