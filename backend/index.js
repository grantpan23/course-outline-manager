//express and port
const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const mongoose = require('mongoose');
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
    socket.on("send-changes", delta => {
        //console.log(delta)
        socket.broadcast.emit("receive-changes", delta)
    })
    
})

