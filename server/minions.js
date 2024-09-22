const express = require('express');
const minionsRouter = express.Router();

// Import Codecademy's helper functions
const { getAllFromDatabase, getFromDatabaseById, addToDatabase, updateInstanceInDatabase, deleteFromDatabasebyId } = require('./db');

// Middleware to assign minion id to request object
minionsRouter.param('minionId', (req, res, next, id) => {
    const minion = getFromDatabaseById('minions', id);
    if (minion) {
        req.minion = minion;
        next();
    } else {
        res.sendStatus(404);
    };
});


// GET all minions from the database
minionsRouter.get('/', (req, res) => {
    res.send(getAllFromDatabase('minions'));
});

// GET one specific minion from the database by ID
minionsRouter.get('/:minionId', (req, res) => {
    res.send(req.minion);
});

// GET work from all minions in the database
minionsRouter.get('/:minionId/work', (req, res) => {
    const work = getAllFromDatabase('work').filter(task => task.minionId === req.minion.id);
    res.send(work);
});

// POST a new minion to the database
minionsRouter.post('/', (req, res) => {
    const minion = addToDatabase('minions', req.body);
    res.status(201).send(minion);
});

// POST new work to the database by minion id
minionsRouter.post('/:minionId/work/', (req, res) => {
    const newWork = addToDatabase('work', req.body);
    res.status(201).send(newWork);
});

// PUT one specific minion in the database by ID (explicit)
minionsRouter.put('/:minionId', (req, res) => {
    const updatedMinion = updateInstanceInDatabase('minions', req.body);
    res.status(202).send(updatedMinion);
});

// PUT in a work task by id
minionsRouter.put('/:minionId/work/:workId', (req, res) => {
    if(req.minion.id !== req.body.minionId) return res.status(400).send();
    const updatedWork = updateInstanceInDatabase('work', req.body);

    res.status(202).send(updatedWork);
});

// DELETE one specific minion from the database by ID
minionsRouter.delete('/:minionId', (req, res) => {
    console.log(`${req.method} - minion${req.url}`);
    deleteFromDatabasebyId('minions', req.minion.id);
    res.sendStatus(204);
});

// DELETE one work task by id
minionsRouter.delete('/:minionId/work/:workId', (req, res) => {
    const isDeleted = deleteFromDatabasebyId('work', req.params.workId);
    if (isDeleted) {
        res.status(204).send();
    } else {
        res.status(404).send('No work task found with that id');
    }
});

module.exports = minionsRouter;