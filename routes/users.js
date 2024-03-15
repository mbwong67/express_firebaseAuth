//TODO ajustar a lo que se quiere usar
//specific route example
const express = require('express');
const userMiddleware = require("../middleware/user.middleware.js");
const userController = require("../controllers/user.controllers.js");


const router  = express.Router(); 

router.get('/sign-up',(req, res) => {
    res.render('layouts/form.ejs', {
        title: "Sign Up"
    })
})
router.post('/sign-up',userMiddleware.validateRegister, userController.signUp);
router.post('/try',(req, res) =>{
    console.log("caca");
})
router.get('/login', (req, res) =>{
    res.render('layouts/form.ejs', {
        title: "Sign In"
    })
})
router.post('/login', userController.login);

router.get('/secret-route',userMiddleware.isLoggedIn, (req, res, next) => {
    console.log(req.userData);
    res.send('This is the secret content. Only logged in users can see that!');
});

module.exports = router;