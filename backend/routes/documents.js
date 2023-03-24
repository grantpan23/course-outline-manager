const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const Schemas = require('../models/schemas.js');

const Document = Schemas.Document;
const Course = Schemas.Course;

router.use(express.json());
router.use(bodyParser());

router
    .route('/:documentID')
    .get(async (req,res) => {
        const document = await findOrCreateDocument(req.params.documentID);
        res.send(document.data);
    })
    .put(async (req,res) => {
        await Document.findByIdAndUpdate(req.params.documentID, {data: req.body});
        res.send(req.body);
    })

router
    .route('/draft-outlines/:courseCode')
    .get(async (req,res) => {
        const course = await Course.findOne({code: req.params.courseCode});
        if(!course) return res.status(400).send(`Course with code ${req.params.courseCode} does not exist.`);

        const outlines = course.draftOutlines;
        return res.send(outlines);
    })

router
    .route('/draft-outlines/:courseCode/:name')
    .get(async (req,res) => {
        const course = await Course.findOne({code: req.params.courseCode});

        if(!course.draftOutlines.has(req.params.name)) return res.status(400).send(`Course outline with that name does not exist.`);

        const outline = course.draftOutlines.get(req.params.name);
        return res.send(outline);
    })
    .post(async (req,res) => {
        const course = await Course.findOne({code: req.params.courseCode});
        const document = await Document.findById(req.body.documentID);

        if(!course) return res.status(400).send(`Course with code ${req.params.courseCode} does not exist.`);
        if(!document) return res.status(400).send('Document does not exist');
        if(Array.from(course.draftOutlines.values()).includes(req.body.documentID)) return res.status(400).send('Draft with that documentID already exists');
        if(course.draftOutlines.has(req.params.name)) return res.status(400).send('Draft with that name already exists');

        course.draftOutlines.set(req.params.name, document._id);
        await course.save();
        return res.send(course);
    })

router
    .route('/final-outlines/:courseCode')
    .get(async (req,res) => {
        const course = await Course.findOne({code: req.params.courseCode});
        if(!course) return res.status(400).send(`Course with code ${req.params.courseCode} does not exist.`);

        const outlines = course.finalOutlines;
        return res.send(outlines);
    })

router
    .route('/final-outlines/:courseCode/:year')
    .get(async (req,res) => {
        const course = await Course.findOne({code: req.params.courseCode});

        if(!course.finalOutlines.has(req.params.year)) return res.status(400).send(`Course outline with year ${req.params.year} does not exist.`);

        const outline = course.finalOutlines.get(req.params.year);
        return res.send(outline);
    })
    .post(async (req,res) => {
        //receives body with documentID
        const document = await Document.findById(req.body.documentID);
        const course = await Course.findOne({code: req.params.courseCode});

        if(course.finalOutlines.has(req.params.year) != null) return res.status(400).send('Course outline for that year already exists.');
        if(!document) return res.status(400).send('Document does not exist');

        course.finalOutlines.set(req.params.year, document._id);

        await course.save();
        return res.send(course);
    })

async function findOrCreateDocument(id) {
        if (id == null) return;
      
        const document = await Document.findById(id);
        if (document) return document;
      
        const template = await Document.findById('1d95c4b1-7381-44e1-9fbd-39138db53f2a');
        return await Document.create({_id : id, data: template.data})
}

module.exports = router;
