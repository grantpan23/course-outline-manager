const express = require('express');
const router = express.Router({mergeParams: true});
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const helpers = require('./helpers.js');
const Schemas = require('../models/schemas.js');

const Course = Schemas.Course;
const User = Schemas.User;

//import middleware
router.use(express.json());
router.use(bodyParser.json());
router.use(cookieParser());

//functional middleware
router.use(helpers.authenticateToken);
router.use(helpers.authenticateInstructor);

//courses routes
router
    .route('/courses/:username')
    .get((req,res) => {
        Course.find({ instructors: { $in: [req.params.username]}}, (err,data) => {
            if(err){
                return res.status(50).send(err);
            } else {
                const courses = data;
                return res.json(courses);
            }
        })
    })

module.exports = router;
