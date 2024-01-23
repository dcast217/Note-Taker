const express = require('express');
const app = express();
const path = require('path');
const notes = require('./public/js/notes');

app.use(express.static ('public'));

app.use('/api', notes);

app.get('/notes', function (req, res) {
  res.sendFile(path.join(__dirname, '/public/notes.html'))
});

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '/public/index.html'))
});

app.listen(3001);
const port = process.env.port || 3001;
