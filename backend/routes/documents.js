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
    .route('/:courseCode/:year')
    .get(async (req,res) => {
        const course = await Course.findOne({code: req.params.courseCode});

        if(!course.finalOutlines[req.params.year]) res.status(400).send(`Course outline with year ${req.params.year} does not exist.`);

        const outline = course.finalOutlines[req.params.year];
        res.send(outline);
    })
    .post(async (req,res) => {
        //receives body with documentID
        const document = await Document.findById(req.body.documentID);
        const course = await Course.findOne({code: req.params.courseCode})

        if(course.finalOutlines[req.params.year] != null) return res.status(400).send('Course outline for that year already exists.');

        course.finalOutlines[req.params.year] = document.data;

        await Course.findOneAndUpdate({code: req.params.courseCode}, course);
        res.send(course);
    })

async function findOrCreateDocument(id) {
        if (id == null) return;
      
        const document = await Document.findById(id);
        if (document) return document;
      
        const template = await Document.findById('1d95c4b1-7381-44e1-9fbd-39138db53f2a');
        return await Document.create({_id : id, data: template.data})
}

module.exports = router;
