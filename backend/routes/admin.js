const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Schemas = require('../models/schemas.js');
const Course = Schemas.Course;
const User = Schemas.User;

router.use(express.json());

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
    .post( async (req,res) =>{

        const courseCode = req.params.courseCode;
        const instructorID = req.body.instructorID;

        const session = await mongoose.startSession();
        session.startTransaction();

        try {

            const course = await Course.findOneAndUpdate(
                {code:courseCode},
                { $addToSet: { instructors: instructorID } },
                { new: true, session }
            );

            //need to check if instructor really is instructor
            const instructor = await User.findOneAndUpdate(
                {
                    $and: [
                        {_id:instructorID},
                        {role:"instructor"}
                    ]
                },
                { $addToSet: { coursesTaught: course.id } },
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
