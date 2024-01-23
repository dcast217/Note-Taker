const { v4: uuidv4 } = require('uuid');
const router = require('express').Router();
const fs = require('fs');

router.get('/', (req,res)=> {
 console.log('reading file');
  fs.readFile('./db/db.json', 'utf8', (err,data) =>{
    res.json(JSON.parse(data))
  })
}); 

// DELETE route
router.delete('/:id', (req, res) => {
  const id = req.params.id;

  // Read the contents of the db.json file
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    // Parse the JSON data
    const notes = JSON.parse(data);

    // Find the index of the note with the matching id
    const index = notes.findIndex(note => note.id === id);

    // If the note is found, remove it from the array
    if (index !== -1) {
      notes.splice(index, 1);

      // Convert the modified data back to JSON
      const updatedData = JSON.stringify(notes);

      // Write the updated JSON data back to the db.json file
      fs.writeFile('./db/db.json', updatedData, 'utf8', err => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Internal server error' });
        }

        // Send a response indicating success
        res.json({ message: 'Note deleted successfully' });
      });
    } else {
      // If the note is not found, send a response indicating failure
      res.status(404).json({ error: 'Note not found' });
    }
  });
});


router.post('/', (req, res) => {
    // Read the db.json file
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to read notes.' });
      } else {
        // Parse the JSON data
        const notes = JSON.parse(data);
        // Generate a unique ID for the new note
        const newNoteId = uuidv4();
        // Create the new note object
        const newNote = {
          id: newNoteId,
          title: req.body.title,
          text: req.body.text,
        };
        // Add the new note to the notes array
        notes.push(newNote);
        // Write the updated notes array to the db.json file
        fs.writeFile('./db/db.json', JSON.stringify(notes), (err) => {
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
module.exports = router;