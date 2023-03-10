// const express = require('express');
// const router = express.Router({mergeParams: true});
// const mongoose = require('mongoose');
// const bodyParser = require("body-parser");

// const helpers = require('./helpers.js');
// const Schemas = require('../models/schemas.js');

// const Edit = Schemas.Edit;

// //import middleware
// router.use(express.json());
// router.use(bodyParser.json());

// //functional middleware
// router.use(helpers.authenticateToken);
// router.use(helpers.authenticateAdmin);

// function generateUniqueId() {
//     return uuidv4();
//   }

// router
//     .route('/edit/:document')
//     .post(async (req,res) => {


//     try {
//         const newEdit = new Edit({
//             id: generateUniqueId(),
//             time: new Date().toISOString(),
//             username: 'dummy var',
//             document: req.params.document
//         })

//         newEdit.save((err) => {
//             if(err){
//                 return res.status(500).send(err);
//             } else {
//                 return res.json(newEdit);
//             }
//         })

//     } catch(error) {
//         return res.status(500).send(error.message)
//     }
// })