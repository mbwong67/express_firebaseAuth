//TODO import specific routes
const usuarioRoute = require("./users.js");

const express = require('express'); //express package
const router = express.Router();


router.use(express.json());



// how 2 use router
// router.use('/productos', productoRoute);
router.use('/user', usuarioRoute);
router.get('/', (req, res) =>{
    
    res.render('layouts/form');
})
module.exports = router;