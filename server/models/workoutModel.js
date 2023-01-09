const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workoutDetails = new Schema(
  {
    exercise: {
      type: String,
      required: true,
    },
    sets: {
      type: Number,
      required: true,
    },
    reps: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const workoutSchema = new Schema({ workoutStats: [workoutDetails] });

const workoutModel = mongoose.model("Workout", workoutSchema);

module.exports = workoutModel;
