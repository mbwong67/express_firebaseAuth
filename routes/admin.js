//TODO ajustar a lo que se quiere usar
//specific route example
const express = require('express');
const adminMiddleware = require("../middleware/admin.middleware.js");
const userMiddleware = require("../middleware/user.middleware.js");
const adminController = require("../controllers/admin.controllers.js");


const router  = express.Router();
// router.get('/sign-up',(req, res) => {
//     res.render('layouts/form.ejs', {
//         title: "Admin Sign Up"
//     })
// })
// router.post('/sign-up',userMiddleware.validateRegister, adminController.signUp);
router.post('/modify', adminMiddleware.isAdminLoggedIn, adminController.modifyAccess);
router.get('/panel',adminMiddleware.isAdminLoggedIn, adminController.renderUsers)

module.exports = router; 