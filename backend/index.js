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


app.route('/login')
    // Login
    .post(async (req, res) => {
        // CHANGE IT TO FIND USER FROM MONGO DB
        const user = users.find(user => user.email === req.body.email)

        // If user not exist w/ this email, error
        if (user == null) {
            return res.status(400).send('Cannot find user')
        }
        try {
            
                // CHANGE IT TO MONGO DB
            if(user.password == req.body.password){
                // create JWT
                // const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '300s'})
                // const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
                
                res.status(200).json({
                    message: 'Success',
                    name: user.name, // CHANGE ATTRIBUTE NAME IF NEEDED
                    role: user.role // CHANGE ATTRIBUTE NAME IF NEEDED
                    // aToken: accessToken,
                    // rToken: refreshToken
                })
            }
        } catch {
            res.status(500).send("Error")
        }
    })
    // Log out

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
