//express and port
const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const mongoose = require('mongoose');
require('dotenv/config');

//import routes
const admin = require('./routes/admin');

//middleware
app.use('/api/admin', admin);

//DB Connection
mongoose.connect(process.env.DB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log('DB connected.')
})
.catch((err) => {
    console.log(err);
})

app.get('/', (req,res) => {
    res.send('works');
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
