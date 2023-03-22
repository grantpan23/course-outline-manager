const express = require('express');
const router = express.Router({mergeParams: true});
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const helpers = require('./helpers.js');
const Schemas = require('../models/schemas.js');

const Course = Schemas.Course;
const User = Schemas.User;
const EditHistory = Schemas.EditHistory;
const Document = Schemas.Document;

//import middleware
router.use(express.json());
router.use(bodyParser.json());
router.use(cookieParser());

//functional middleware
router.use(helpers.authenticateToken);
router.use(helpers.authenticateAdmin);

module.exports = router;

router.route('/getGa').post(async(req,res)=> {

    const Indicators = "";

    const result = "this is the response"

    res.send(result)

})
