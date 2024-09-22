const express = require('express');
const ideasRouter = express.Router();

// Import Codecademy's helper functions
const { getAllFromDatabase, getFromDatabaseById, addToDatabase, updateInstanceInDatabase, deleteFromDatabasebyId } = require('./db');
const checkMillionDollarIdea = require('./checkMillionDollarIdea');

// Middleware for assigning idea id to request object
ideasRouter.param('ideaId', (req, res, next, id) => {
    const idea = getFromDatabaseById('ideas', id);    
    if (idea) {
        req.idea = idea;
        next();
    } else {
        res.status(404).send('No idea found with that id');
    }
});

// GET all ideas from database
ideasRouter.get('/', (req, res) => {
    res.send(getAllFromDatabase('ideas'));
});

// GET one specific idea from database by id
ideasRouter.get('/:ideaId', (req, res) => {
    res.send(req.idea);
});

// POST a new idea to database
ideasRouter.post('/', checkMillionDollarIdea, (req, res) => {
    const newIdea = addToDatabase('ideas', req.body);
    res.status(201).send(newIdea);
});

// PUT an existing idea to database by id
ideasRouter.put('/:ideaId', (req, res) => {
    const updatedIdea = updateInstanceInDatabase('ideas', {...req.idea, ...req.body});
    res.status(202).send(updatedIdea);
});

// DELETE an existing idea from database by id
ideasRouter.delete('/:ideaId', (req, res) => {
    const isDeleted = deleteFromDatabasebyId('ideas', req.idea.id);
    if (isDeleted) {
        res.status(204).send();
    } else {
        res.status(404).send('No idea found with that id');
    }
});

module.exports = ideasRouter;