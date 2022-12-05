const express = require("express");
const {
    getAllWorkouts,
    getSingleWorkout,
    createWorkout,
    deleteSingleWorkout,
    updateSingleWorkout } = require("../controllers/workoutControllers")
const router = express.Router();

// GET all workouts
router.get("/", getAllWorkouts)

// GET single workout
router.get("/:id", getSingleWorkout)

// POST new workout
router.post("/", createWorkout)

// DELETE single workout
router.delete("/:id", deleteSingleWorkout)

// UPDATE single workout
router.patch("/:id", updateSingleWorkout)

module.exports = router;