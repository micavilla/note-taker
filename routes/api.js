// Imports Express Router function and uuid Node package
const api = require('express').Router();
const { v4: uuidv4 } = require('uuid');

// Imports Node fs and util modules
const fs = require('fs');
const util = require('util');

// Promise version of fs.readFile and helper function for fs.writeFile
const readFileAsync = util.promisify(fs.readFile);
const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
  err ? console.error(err) : console.info('Notes changed!')
);

// GET route to retrieve all notes
api.get('/notes', (req, res) => {
  readFileAsync('./db/db.json').then((data) => res.json(JSON.parse(data)))
  .catch(err => console.log(err));
});

// POST route to create a new note
api.post('/notes', (req, res) => {
  const { title, text } = req.body;
  const newNote = {
    title,
    text,
    id: uuidv4()
  };
  readFileAsync('db/db.json').then((data) => {
    const parsedNotes = JSON.parse(data);
    parsedNotes.push(newNote);
    writeToFile('./db/db.json', parsedNotes);
    res.json(newNote);
  }).catch(err => console.log(err));
});

// DELETE route to remove a note by id
api.delete('/notes/:id', (req, res) => {
  const noteIdToDelete = req.params.id;
  readFileAsync('db/db.json').then((data) => {
    const parsedNotes = JSON.parse(data);
    const filteredNotes =  parsedNotes.filter((item) => item.id !== noteIdToDelete);
    writeToFile('./db/db.json', filteredNotes);
    res.json(filteredNotes);
  })
  .catch(err => console.log(err));
});

// Exports router as a module
module.exports = api;