const { UserManager } = require("../services/user.services.js");

const renderHome = ( req, res, next ) => {
    const rolPrivilege = res.locals.privilege;

    if( rolPrivilege === 2 ){
        res.render('layouts/home', {
            title: 'Admin Panel',
            rol: 'admin'
        });

    }else if( rolPrivilege === 1){
        res.render('layouts/home', {
            title: 'Home',
            rol: 'common_user'
        });
    }else{
        res.status(401).send({
            msg: 'Your session is not valid!'
        });
    }
}

module.exports = { renderHome };