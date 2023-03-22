const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const Schemas = require('../models/schemas.js');

const Document = Schemas.Document;

router.use(express.json());

router
    .route('/:documentID')
    .get(async (req,res) => {
        const document = await findOrCreateDocument(req.params.documentID);
        res.send(document.data);
    })


async function findOrCreateDocument(id) {
        if (id == null) return;
      
        const document = await Document.findById(id);
        if (document) return document;
      
        const template = await Document.findById('1d95c4b1-7381-44e1-9fbd-39138db53f2a');
        return await Document.create({_id : id, data: template.data})
}

module.exports = router;
