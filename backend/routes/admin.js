const express = require('express');
const router = express.Router({mergeParams: true});
const mongoose = require('mongoose');

const helpers = require('./helpers.js');
const Schemas = require('../models/schemas.js');
const Course = Schemas.Course;
const User = Schemas.User;

//middleware
router.use(express.json());
router.use(helpers.authenticateToken);
router.use(helpers.authenticateAdmin);

//change to router.route, .get, etc
router.get('/instructors', (req,res) => {
    const users = Schemas.User;

    users.find({role:'instructor'}, (err,data) => {
        if(err){
            res.status(500).send(err);
        } else {
            const instructors = data.map(instructor => {
                return {
                    id:instructor.id,
                  firstName: instructor.firstName,
                  lastName: instructor.lastName,
                  username: instructor.username,
                  coursesTaught: instructor.coursesTaught
                };
              });
              res.json(instructors);        
        }
    })
})

router
    .route('/:courseCode/assign-instructor')
    .post(async (req,res) =>{

        const courseCode = req.params.courseCode;
        const instructorUsername = req.body.instructorUsername;

        const session = await mongoose.startSession();
        session.startTransaction();

        try {

            const course = await Course.findOneAndUpdate(
                {code:courseCode},
                { $addToSet: { instructors: instructorUsername } },
                { new: true, session }
            );

            //need to check if instructor really is instructor
            const instructor = await User.findOneAndUpdate(
                {
                    $and: [
                        {username:instructorUsername},
                        {role:"instructor"}
                    ]
                },
                { $addToSet: { coursesTaught: courseCode } },
                { new: true, session }
            );

            //instructor will be null if not found in above search
            if (!instructor){
                throw new Error("Not an instructor")
            }

            await session.commitTransaction();
            session.endSession();

            return res.status(200).json({ course, instructor });
        } catch (error) {
            await session.abortTransaction();
            session.endSession();

            return res.status(500).json({ error: error.message });
        }
    })

module.exports = router;
