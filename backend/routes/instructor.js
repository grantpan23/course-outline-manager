const express = require('express');
const router = express.Router({mergeParams: true});
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const helpers = require('./helpers.js');
const Schemas = require('../models/schemas.js');


const EditHistory = Schemas.EditHistory;



router.use(express.json());

module.exports = router;

router
    .route('/activity')
    .post  (async(req,res) => {
            
    const newChange = new EditHistory({
        userID: req.body.userID,
        timeStamp:req.body.timeStamp,
        activity: req.body.activity,
        docID: req.body.docID
       
    })

    await newChange.save((err) => {
        if(err){
            return res.status(500).send(err);
        } else {
            return res.json(newChange);
        }
    })
})