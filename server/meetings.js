const express = require('express');
const meetingsRouter = express.Router();

// Import Codecademy helper functions
const { getAllFromDatabase, addToDatabase, deleteAllFromDatabase, createMeeting } = require('./db');

// GET all meetings from database
meetingsRouter.get('/', (req, res) => {
    res.send(getAllFromDatabase('meetings'));
});

// POST a new meeting to database
meetingsRouter.post('/', (req, res) => {
    const newMeeting = addToDatabase('meetings', createMeeting(req, res));
    res.status(201).send(newMeeting);
});

// DELETE all meetings from database
meetingsRouter.delete('/', (req, res) => {
    const isDeleted = deleteAllFromDatabase('meetings');
    if (!isDeleted) return res.status(500).send("Could not delete meetings from database");
    res.status(204).send("Deleted all meetings from database");
});

module.exports = meetingsRouter;