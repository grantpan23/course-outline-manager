const express = require('express');
const router = express.Router();
const expressSanitizer = require('express-sanitizer');
const mongoose = require('mongoose');
const Schemas = require('../models/schemas.js');
const User = Schemas.User;

//middleware
router.use(express.json());
router.use(expressSanitizer());

router
    .route('/login')
    .post((req,res) => {

        const username = req.sanitize(req.body.username);
        const password = req.sanitize(req.body.password);


    })

module.exports = router;
