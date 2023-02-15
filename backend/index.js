//express and port
const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const mongoose = require('mongoose');
const Schemas = require("./models/schemas")
const Document = Schemas.Document;
require('dotenv/config');

// setting up socket 

//import routes
const admin = require('./routes/admin');
const auth = require('./routes/auth')

//middleware
app.use('/api/admin/:adminUser', admin);
app.use('/api/auth', auth);

//DB Connection
mongoose.connect(process.env.DB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log('DB connected.')
})
.catch((err) => {
    console.log(err);
})


var server = app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

//connect to socket
const io = require ("socket.io")( server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],

    },
})

io.on("connection", socket => {
    console.log("connected");
    socket.on('get-document', async documentId => {
        const document = await findOrCreateDocument(documentId)
        socket.join(documentId)
        socket.emit('load-document', document.data)
        socket.on("send-changes", delta => {
            socket.broadcast.to(documentId).emit("receive-changes", delta)
        })

    socket.on("save-document", async data => {
        await Document.findByIdAndUpdate(documentId, { data })
    })
    }) 
})

async function findOrCreateDocument(id){
    if (id==null) return

    const document = await Document.findById(id)
    if(document) return document 
    return await Document.create({_id: id, data: '' })

}

