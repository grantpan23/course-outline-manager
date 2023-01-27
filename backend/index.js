//express and port
const express = require('express');
const app = express();
const port = 4000;

//import routes
const admin = require('./routes/admin');

//middleware
app.use('/api/admin', admin);

app.get('/', (req,res) => {
    res.send('works');
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
