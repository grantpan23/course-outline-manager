//express and port
const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const mongoose = require('mongoose');
const initSocket = require("./services/quillSocket");
require('dotenv/config');

// setting up socket 

//import routes
const admin = require('./routes/admin');
const auth = require('./routes/auth');
const edits = require('./routes/edits');

//middleware
app.use('/api/admin/:adminUser', admin);
app.use('/api/auth', auth);
app.use('/api/edits', edits);

//DB Connection
mongoose.connect(process.env.DB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log('DB connected.')
})
.catch((err) => {
    console.log(err);
})

const server = app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

const io = initSocket(server);
