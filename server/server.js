require("dotenv").config()
const express = require("express");
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workouts");
const app = express();

// environmental variables
const Port = process.env.PORT;
const Mongodb_URI = process.env.MONGO_URI;

// mongodb conenction
mongoose.connect(Mongodb_URI)
.then(() =>{
    app.listen(Port, () =>{
        console.log("Coonected to db & server running at port 4000");
    })
}).catch((error) =>{
    console.log(error)
})

// middlewares
app.use(express.json())
app.use((req, res, next) =>{
    console.log(req.method, req.path)
    next()
})

// routes
app.use("/api/workouts", workoutRoutes)
