// const secretKey = require("../helpers/config.js").J_KEY;
// const { hash, compare } = require("bcryptjs");
// const { sign } = require("jsonwebtoken");
// const jwt_sign = sign;
const { userManager } = require('../services/user.services.js');



const signUp = ( req, res, next ) => {
    //TODO
    /**
     *  manejo de errores puede que ya
     */
    const email = res.locals.username;
    const pass = req.body.password;

    userManager.register(email, pass)
    .then((response) => {
        if (response === 1) {
            res.status(201).send({
                msg: 'Sign Up success'
            });
        } else {
            res.status(400).send({
                msg: 'Error authenticating'
            });
        }
    })
    .catch((error) => {
        console.error(error);
        res.status(500).send({
            msg: 'Internal server error'
        });
    });
}

const login = ( req, res, next ) => {
    const email = req.body.username;
    const pass = req.body.password;

    userManager.authenticate(email, pass)
    .then((response) => {
        if( response === 1){
            res.status(200).send({
                msg: 'login successful'
            });
        }else{
            res.status(400).send({
                msg: 'Login Error'
            });
        }
    }).catch( (error) => {
        console.error( error );
        res.status(500).send({
            msg: 'Internal server error'
        });
    });

}
module.exports = { signUp, login };