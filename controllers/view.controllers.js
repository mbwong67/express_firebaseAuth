const { userManager } = require("../services/user.services.js");

const renderHome = ( req, res, next ) => {
    const rolPrivilege = res.locals.privilege;

    if( rolPrivilege === 2 ){
        res.redirect(302, 'admin/panel');
        // res.render('layouts/home', {
        //     title: 'Admin Panel',
        //     rol: 'admin'
        // });

    }else if( rolPrivilege === 1){
        // res.send('you are a common user');
        let access = true;
        if(!res.locals.access) access = false;
        res.render('layouts/home', {
            title: 'Home',
            rol: 'common_user',
            'access': access
        });
    }else{
        res.redirect( 302,'/user/login' );
        // res.status(401).send({
        //     msg: 'Your session is not valid!'
        // });
    }
}

module.exports = { renderHome };