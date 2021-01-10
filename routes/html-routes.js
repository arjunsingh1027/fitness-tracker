const path = require("path");
const workout = require("../models/workout.js");

module.exports = function (app){

    // display last workout
    app.get("/", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });

    // create exercise
    app.get("/exercise", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/exercise.html"));
    });

    // display stats
    app.get("/stats", (req, res) => {
        res.sendFile(path.join(__dirname, "..public/stats.html"));
    }); 
};
