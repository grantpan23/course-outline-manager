const express = require('express');
const router = express.Router();
const Schemas = require('../models/schemas.js');

router.use(express.json());

router.get('/instructors', (req,res) => {
    const instructors = Schemas.Instructors;

    instructors.find({}, (err,data) => {
        if(err){
            res.status(500).send(err);
        } else {
            res.json(data);
        }
    })
})

module.exports = router;
