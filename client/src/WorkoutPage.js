import React, { useState } from "react";
import { Box, TextField, Button, Alert } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { alertType } from "./AlertType";
import axios from "axios";

const WorkoutPage = () => {
  const [workoutStats, setWorkoutStats] = useState([
    {
      exercise: "",
      reps: 0,
      sets: 0,
    },
  ]);

  const [displayAlert, setDisplayAlert] = useState("");

  const workoutChangeHandler = (i, e) => {
    let workouts = [...workoutStats];
    workouts[i][e.target.id] = e.target.value;
    setWorkoutStats(workouts);
  };

  const addFormFields = () => {
    setWorkoutStats([...workoutStats, { exercise: "", sets: 0, reps: 0 }]);
  };

  const removeFormFields = (i) => {
    let workouts = [...workoutStats];
    workouts.splice(i, 1);
    setWorkoutStats(workouts);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:5000/workouts",
        { workoutStats: workoutStats },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((response) => {
        console.log(response.status);
        setDisplayAlert(alertType(response.status));
      })
      .catch((err) => {
        console.log(err.response.status);
        console.log(err);
        setDisplayAlert(alertType(err.response.status));
      });
  };

  return (
    <Box
      component="form"
      autoComplete="on"
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {displayAlert && (
        <Alert severity={displayAlert} sx={{ mb: 7 }}>
          This is an error alert — check it out!
        </Alert>
      )}
      {workoutStats.map((element, index) => {
        return (
          <Box
            key={index}
            sx={{
              display: "flex",
              gap: "1.5rem",
              marginBottom: "1.3rem",
            }}
          >
            <TextField
              type="text"
              label="Exercise"
              id="exercise"
              name="exercise"
              required
              value={element.exercise || ""}
              onChange={(e) => workoutChangeHandler(index, e)}
            />
            <TextField
              type="number"
              label="Reps"
              id="reps"
              required
              name="reps"
              min="1"
              value={element.reps || 0}
              onChange={(e) => workoutChangeHandler(index, e)}
            />
            <TextField
              type="number"
              label="Sets"
              required
              id="sets"
              min="1"
              name="sets"
              value={element.sets || 0}
              onChange={(e) => workoutChangeHandler(index, e)}
            />
            {index ? (
              <Button
                variant="outlined"
                startIcon={<RemoveIcon />}
                onClick={removeFormFields}
                sx={{ minWidth: "120px" }}
              >
                Remove
              </Button>
            ) : (
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={addFormFields}
                sx={{ minWidth: "118px" }}
              >
                Add
              </Button>
            )}
          </Box>
        );
      })}
      <Button variant="outlined" type="submit" onClick={submitHandler}>
        Submit
      </Button>
    </Box>
  );
};

export default WorkoutPage;
