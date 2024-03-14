const { adminManager } = require('../services/admin.services.js');

const modifyAccess = (req, res, next) =>{
    const uid = req.body.uid;
    const accessFlag = req.body.accessFlag;
    
    adminManager.modifyAccess(uid, accessFlag)
    .then( (response) => {
        if( response === 1){
            res.status(200).send({
                msg: 'user´s access has been modified'
            });
        }else{
            res.status(400).send({
                msg: 'error while modifying access'
            })
        }
    }).catch((error) => {
        console.error(error);
        res.status(500).send({
            msg: 'Internal server error'
        });
    });

    
}
const renderUsers = (req, res, next) => {
    adminManager.allUsers()
    .then( (response) =>{
       res.render('layouts/admin_panel.ejs', {
        title: 'admin panel',
        users: response
       });
    }).catch( (error ) =>{
        res.status(500).send({
            msg: 'Internal server error'
        });
    })
}
const signUp = ( req, res, next ) => {
    //TODO
    /**
     *  manejo de errores puede que ya
     */
    const email = res.locals.username;
    const pass = req.body.password;

    adminManager.register(email, pass)
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
module.exports = { modifyAccess, renderUsers, signUp }