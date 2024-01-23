const express = require('express');
const path = require('path');
const notes = require('./routes/index.js');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', notes);

app.use(express.static('public'));
app.get('/notes', function (req, res) {
  res.sendFile(path.join(__dirname, '/public/notes.html'))
});

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '/public/index.html'))
});

app.listen(3001);
const port = process.env.port || 3001;

