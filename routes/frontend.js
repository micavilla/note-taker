// Imports Node path module and Express Router function
const path = require("path");
const page =  require('express').Router();

// Route for /notes path to serve notes.html
page.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '../public/notes.html'))
);

// Wildcard route to serve index.html for any unmatched routes
page.get('*', (req, res) =>{
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Exports router as a module
module.exports = page;