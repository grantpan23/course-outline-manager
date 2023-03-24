const express = require('express');
const bodyParser = require("body-parser");
const router = express.Router();
const Schemas = require('../models/schemas.js');

const Document = Schemas.Document;

router.use(bodyParser());
router.use(express.json());

router
    .route('/outlines/:type')
    .get(async (req,res) => {
        const query = {status:req.params.type};

        Document.find(query, {"_id": 1}, (err,data) => {
            if(err){
                return res.status(500).send(err);
            } else {
                return res.json(data);
            }
        })
    })

router
    .route('/outlines/:documentID/status')
    .put(async (req,res) => {
        const document = await Document.findByIdAndUpdate(req.params.documentID, { status: req.body.status }, {new:true});
        res.send(document);
    })

module.exports = router;
