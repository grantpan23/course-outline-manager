require("dotenv").config();
const jwt = require('jsonwebtoken');

module.exports = {
    authenticateToken: (req,res,next) => {
        const token = req.headers.authorization;
        if(token == null) return res.status(401).send(token);

        try {
            const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            // If the token is valid, attach the payload to the request object
            req.user = payload;
            // Call the next middleware or route handler
            next();
        } catch (error) {
            // If the token is invalid, send an error response to the client
            return res.status(401).send(error);
        }
    } ,

    authenticateAdmin: (req,res,next) => {

        if(req.params.adminUser != req.user.username) return res.status(401).send("Not the same user");
        if(req.user.role != "admin") return res.status(401).send("Not an admin");

        next();
    }
}