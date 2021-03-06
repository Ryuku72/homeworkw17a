const express = require("express");
const router = express.Router();
const db = require("../models");

//Get WorkOuts
router.get("/api/workouts", function (req, res) {
  db.Workout.find({})
    .then((data) => {
      //console.log(data);
      res.json(data);
    })
    .catch((error) => {
      res.json(error);
    });
});

//Create new Workout ID
router.post("/api/workouts", (req, res) => {
    //new request = new ID
    db.Workout.create({ req })
      .then((result) => {
        res.json(result);
      })
      .catch((error) => {
        res.json(error);
      });
  });

//Continue WorkOut for previous ID
router.put("/api/workouts/:id", function (req, res) {
  //only works for continue workout
  //console.log(req.params.id); // userID
  //console.log(req.body) // the exercise choices
  db.Workout.findOneAndUpdate(
    { _id: req.params.id },
    { $push: { exercises: req.body } },
    { new: true }
  )
  // add the total duration
    .then((result) => {
      let duration = 0;
      result.exercises.forEach((exercise) => (duration += exercise.duration));
      db.Workout.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { totalDuration: duration } },
        { new: true }
      ).then((result) => {
        res.json(result);
      });
    })
    .catch((error) => {
      res.json(error);
    });
});
  
// Populate Graph
router.get("/api/workouts/range", (req, res) => {
//populate graph
  db.Workout.find({})
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json(error);
    });
});

module.exports = router;
