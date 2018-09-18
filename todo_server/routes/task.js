var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Task = require('../models/Task');

/* Get all tasks :: GET */
router.get('/', (req, res, next) => {
    Task.find((err, tasks) => {
        if (err) {
            return next(err);
        }
        res.json(tasks)
    });
});


/* Get a task by id :: GET/:id */
router.get('/:id', (req, res, next) => {
    Task.findById(req.params.id, function (err, task) {
        if (err) {
            return next(err);
        }
        res.json(task);
    });
});

/* Save Task :: POST */
router.post('/', (req, res, next) => {
    Task.create(req.body, function (err, task) {
        if (err) {
            return next(err);
        }
        res.json(task);
    });
});

/* Update a task :: PUT */
router.put('/:id', (req, res, next) => {
    var update = req.body;
    Task.findByIdAndUpdate(req.params.id, update, function (err, task) {
        if (err) {
            return next(err);
        }
        res.json(task);
    });
});

/*Update a task :: PATCH */
router.patch('/:id', (req, res, next) => {
    var update = req.body;
    Task.findByIdAndUpdate(req.params.id, update, function (err, task) {
        if (err) {
            return next(err);
        }
        res.json(task);
    })
});

/* Delete task :: DELETE */
router.delete('/:id', (req, res, next) => {
    Task.findByIdAndRemove(req.params.id, function (err, task) {
        if (err) {
            return next(err);
        }
        res.json(task);
    })
})

module.exports = router;