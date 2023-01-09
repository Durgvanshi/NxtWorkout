const express = require("express");
const router = express.Router();
const Workouts = require("../models/workoutModel");

router.get("/", (req, res, next) => {
  Workouts.find({})
    .then((workout) => {
      res.status(201).json(workout);
    })
    .catch((err) => {
      next(err);
    });
});

router.post("/", (req, res, next) => {
  Workouts.create(req.body)
    .then((workout) => {
      res.status(200).json(workout);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
