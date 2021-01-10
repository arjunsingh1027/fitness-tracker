const { Workout } = require("../models");
const db = require("../models");

module.exports = function (app) {

    // get workouts
    app.get("/api/workouts", (req, res) => {
        Workout.find({})
            .then(dbWorkout => {
                res.json(dbWorkout);
            })
            .catch(err => {
                res.status(400).json(err);
            });
    });

    // create workout
    app.post("/api/workouts", (req, res) => {
        Workout.create({}).then(dbWorkout => {
            res.json(dbWorkout);
        }).catch(err => {
            res.status(400).json(err);
        });
    });

    // add exercise
    app.put("/api/workouts/:id", (req, res) => {
        Workout.findByIdAndUpdate(req.params.id, {$push: {exercises: req.body}})
        .then(dbWorkout => {
            res.json(dbWorkout)
        }).catch((err) => {
            res.status(400).json(err)
        })
    });

    // workouts in range
    app.get("/api/workouts/range", (req, res) => {
        Workout.find({}).then(dbWorkout => {
            res.json(dbWorkout);
        }).catch(err => {
            res.json(err);
        });
    });
}