const router = require('express').Router();
const notesRouter = require('./notes');


router.use('/notes', notesRouter);

//Export out when 'needed'
module.exports = router;