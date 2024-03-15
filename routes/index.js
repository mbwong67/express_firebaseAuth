const userMiddleware = require("../middleware/user.middleware.js");
const viewController = require("../controllers/view.controllers.js");

const adminRoute = require("./admin.js");
const usuarioRoute = require("./users.js");

const express = require('express'); //express package
const router = express.Router();


router.use(express.json());



// how 2 use router
router.use('/admin', adminRoute);
router.use('/user', usuarioRoute);
router.get('/', (req, res) =>{
    
    res.render('layouts/form');
})
router.get('/home', userMiddleware.isLoggedIn, viewController.renderHome);
module.exports = router;