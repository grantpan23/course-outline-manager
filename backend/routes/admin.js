const express = require('express');
const router = express.Router();
const Schemas = require('../models/schemas.js');

router.use(express.json());

//change to router.route, .get, etc
router.get('/instructors', (req,res) => {
    const users = Schemas.User;

    users.find({role:'instructor'}, (err,data) => {
        if(err){
            res.status(500).send(err);
        } else {
            // const instructors = data.map(instructor => {
            //     return {
            //       firstName: instructor.firstName,
            //       lastName: instructor.lastName,
            //       username: instructor.username,
            //       courses: instructor.courses
            //     };
            //   });
            //   res.json(instructors); 
            data.forEach(instructor => {
                instructor.courses = instructor.getCourses();
              });
              res.json(data);
        }
    })
})

router.route('/edit-course/:instructorID',)

module.exports = router;
