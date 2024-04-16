const express = require('express');
const userMiddleware = require("../middleware/user.middleware.js");
const userController = require("../controllers/user.controllers.js");


const router  = express.Router(); 

router.get('/sign-up',(req, res) => {
    res.render('layouts/form.ejs', {
        title: "Sign Up"
    })
})
router.get('/login', (req, res) =>{
    res.render('layouts/form.ejs', {
        title: "Sign In"
    })
})
router.post('/sign-up',userMiddleware.validateRegister, userController.signUp);
router.post('/login', userController.login);
router.post('/sign-out', userMiddleware.removeCookies)
// router.post('/setCookie',userMiddleware.isLoggedIn,userController.setCookie);



module.exports = router;