const { userManager } = require('../services/user.services.js');
const { cookieManager } = require('../services/cookie.services.js');


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
        // console.log(response)
        if( response === ''){
            res.status(400).send({
                msg: 'Login Error'
            });
        }else{
            //sends token to client
            //server sends cookie to client and clients assigns it automatically
            const cookie = cookieManager.generateCookie(response);
            res.cookie('jwtToken', cookie[0], cookie[1]);
            res.status(200).send({
                msg: 'login successful'
            });
            
        }
    }).catch( (error) => {
        console.error( error );
        res.status(500).send({
            msg: 'Internal server error'
        });
    });

}
const signOut = (req, res, next) =>{
    userManager.signOut()
    .then( (response) =>{
        res.status(200).send({
            msg: 'sign out'
        });
    }).catch( (error) =>{
        res.status(500).send({
            msg: 'Internal server error'
        });
    })
}
const setCookie = (req, res, next) =>{
    userManager.verifyToken(req.body.newToken)
    .then( (response) =>{
        if(response.length === 0)   throw new Error('no valid token');
        if(response.access != res.locals.access){
            const cookie = cookieManager.generateCookie(response);
            res.setHeader('Set-Cookie', cookie);
            res.status(200).send({
                msg: 'cookie updated'
            });
        }
    }).catch( (error) =>{
        res.status(400).send({
            msg: error.message
        })
    })
}
module.exports = { signUp, login, signOut, setCookie };