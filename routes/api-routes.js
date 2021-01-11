const { Workout } = require("../models");
const db = require("../models");

module.exports = function (app) {

    // get workouts
    app.get("/api/workouts", (req, res) => {
        Workout.aggregate([
            {
                $addFields: {
                    totalDuration: {
                        $sum: "$exercises.duration",
                    },
                },
            },
        ])
            .then((data) => {
                res.json(data);
            })
            .catch((err) => {
                res.json(err);
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
        Workout.findByIdAndUpdate(
            req.params.id,
            {
                $push: { exercises: req.body },
            },
            { new: true, runValidators: true })
            .then(dbWorkout => {
                res.json(dbWorkout)
            }).catch((err) => {
                res.status(400).json(err)
            })
    });

    // workouts in range
    app.get("/api/workouts/range", (req, res) => {
        Workout.aggregate([
            { $sort: { day: -1 } },
            { $limit: 7 },
            {
                $addFields: {
                    totalDuration: {
                        $sum: "$exercises.duration",
                    },
                },
            },
        ])
            .then((dbWorkout) => {
                res.json(dbWorkout.reverse());
            })
            .catch((err) => {
                res.json(err);
            });
    });
}