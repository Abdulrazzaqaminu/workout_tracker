const Workout = require("../models/Workouts");
const mongosoe = require("mongoose");

// get all workouts
const getAllWorkouts = async (req, res) =>{
    const workouts = await Workout.find({}).sort({createdAt: -1});
    res.status(200).json(workouts)
}

// get single workout
const getSingleWorkout = async (req, res) =>{
    const { id } = req.params; 
    if(!mongosoe.Types.ObjectId.isValid(id)){
        return res.status(404).json({
            error: "Id is not valid"
        })
    }
    const workout = await Workout.findById(id);
    if(!workout){
        return res.status(404).json({
            error: "No such workout"
        })
    }
    res.status(200).json(workout)
}

// create new workout
const createWorkout = async (req, res) =>{
    const {title, reps, load} = req.body;
    try {
        const workout = await Workout.create({
            title, 
            reps, 
            load
        })
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
}

// delete single workout
const deleteSingleWorkout = async (req, res) =>{
    const { id } = req.params;
    if(!mongosoe.Types.ObjectId.isValid(id)){
        return res.status(404).json({
            error: "Id is not valid"
        })
    }
    const workout = await Workout.findOneAndDelete({
        _id: id
    })
    if(!workout){
        return res.status(400).json({
            error: "Cannot delete workout because it does not exist"
        })
    }
    res.status(200).json(workout)
}

// update single workout
const updateSingleWorkout = async (req, res) =>{
    const { id } = req.params;
    if(!mongosoe.Types.ObjectId.isValid(id)){
        return res.status(404).json({
            error: "Id is not valid"
        })
    }

    const workout = await Workout.findOneAndUpdate({
        _id: id
    }, {
        ...req.body
    })

    if(!workout){
        return res.status(400).json({
            error: "Cannot update workout because it does not exist"
        })
    }
    res.status(200).json(workout)
}

module.exports = {
    getAllWorkouts,
    getSingleWorkout,
    createWorkout,
    deleteSingleWorkout,
    updateSingleWorkout
}