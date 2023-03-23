//express and port
const express = require('express');
const app = express();
const cors = require ('cors');
const port = process.env.PORT || 4000;
const mongoose = require('mongoose');
require('dotenv/config');

// setting up socket 

//import routes
const admin = require('./routes/admin');
const auth = require('./routes/auth');
const instructor = require('./routes/instructor');

const documents = require('./routes/documents');
// const edits = require('./routes/edits');

//middleware
app.use(cors());
app.use('/api/admin/:adminUser', admin);
app.use('/api/auth', auth);
app.use('/api/instructor',instructor);
app.use('/api/documents', documents);
// app.use('/api/edits', edits);

//DB Connection
mongoose.connect(process.env.DB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log('DB connected.')
})
.catch((err) => {
    console.log(err);
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
