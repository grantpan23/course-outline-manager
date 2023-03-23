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

//functional middlewar
module.exports = router;

router.route('/getga').post(async(req,res)=> {

    const knowledge = req.body.KnowledgeBase
    const problem = req.body.ProblemAnalysis
    const investigation= req.body.Investigation
    const design = req.body.Design
    const use = req.body.UseOfEngineeringTools
    const individual = req.body.IndividualAndTeamWork
    const communication = req.body.CommunicationSkills
    const professionalism = req.body.Professionalism
    const impact = req.body.ImpactOfEngineeringOnSocietyAndTheEnvironment
    const ethics = req.body.EthicsAndEquity
    const economics = req.body.EconomicsAndProjectManagement
    const life =req.body.LifeLongLearning
  
    const gaIndicators = " KnowledgeBase: " + knowledge + "   Problem Analysis: " +  problem + "    Investigation: " + investigation 
    + "    Design: " + design + "    Use Of EngineeringT ools: " + use + "    IndividualAndTeamWork: " + individual + "    CommunicationSkills: " 
    + communication + "    Professionalism: " + professionalism + "   Impact Of Engineering On Society And The Environment " + impact 
    + "    Ethics And Equity: " +  ethics + "    Economics And Project Management: " + economics + "    Life Long Learning: " + life

    return res.send(gaIndicators)

})
