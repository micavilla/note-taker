const router = require('express').Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const util = require('util');

const readFileAsync = util.promisify(fs.readFile);
const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
  err ? console.error(err) : console.info('\nNotes changed!')
);

router.get('/notes', (req, res) => {
  readFileAsync('./db/db.json').then((data) => res.json(JSON.parse(data)))
  .catch(err => console.log(err));
});

router.post('/notes', (req, res) => {
  const { title, text } = req.body;
  const newNote = {
    title,
    text,
    id: uuidv4(),
  }

  readFileAsync('db/db.json').then((data) => {
    const parsedNotes = JSON.parse(data);
    parsedNotes.push(newNote);
    writeToFile('./db/db.json', parsedNotes);
    res.json(newNote)
  })
  .catch(err => console.log(err));
});

router.delete('/notes/:id', (req, res) => {
  const noteIdToDelete = req.params.id;

  readFileAsync('db/db.json').then((data) => {
    const parsedNotes = JSON.parse(data);
    const filteredNotes =  parsedNotes.filter((item) => item.id !== noteIdToDelete);

    writeToFile('./db/db.json', filteredNotes);
    res.json(filteredNotes);
  })
  .catch(err => console.log(err));
});

module.exports = router;