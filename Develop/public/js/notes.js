const router = require('express').Router();

const fs = require('fs');

router.post('/api/notes', (req, res) => {
    // Read the db.json file
    fs.readFile(path.join(__dirname, 'db.json'), 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to read notes.' });
      } else {
        // Parse the JSON data
        const notes = JSON.parse(data);
        // Generate a unique ID for the new note
        const newNoteId = generateUniqueId();
        // Create the new note object
        const newNote = {
          id: newNoteId,
          title: req.body.title,
          content: req.body.content,
        };
        // Add the new note to the notes array
        notes.push(newNote);
        // Write the updated notes array to the db.json file
        fs.writeFile(path.join(__dirname, 'db.json'), JSON.stringify(notes), (err) => {
          if (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to save note.' });
          } else {
            // Return the new note to the client
            res.json(newNote);
          }
        });
      }
    });
  });

  