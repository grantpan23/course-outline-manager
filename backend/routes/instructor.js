const express = require('express');
const router = express.Router({ mergeParams: true });
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
    .get((req, res) => {
        Course.find({ instructors: { $in: [req.params.username] } }, (err, data) => {
            if (err) {
                return res.status(50).send(err);
            } else {
                const courses = data;
                return res.json(courses);
            }
        })
    })

// GET DRAFTS FROM COURSE CODE
router
    .route('/draft-outlines/:courseCode')
    .get(async (req, res) => {
        const course = await Course.findOne({ code: req.params.courseCode });
        if (!course) return res.status(400).send(`Course with code ${req.params.courseCode} does not exist.`);

        const outlines = course.draftOutlines;
        return res.send(outlines);
    })

router
    .route('/:documentID')
    .get(async (req, res) => {
        const document = await findOrCreateDocument(req.params.documentID);
        return res.send(document.data);
    })

module.exports = router;
