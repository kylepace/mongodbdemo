const express = require('express');
const router = express.Router();
const db = require('../db');
const ObjectID = require('mongodb').ObjectID;

router.get('/', (req, res) => {
  const collection = db.get().collection('surveys');
  
  // Going to want an index here.
  collection.distinct('questions.tags', { }, (err, tags) => {
    res.send(tags);
  });
});

router.get('/withnumbers', (req, res) => {
  const collection = db.get().collection('surveys');
  
  const regexFilter = { "name": { $regex: /\d/ } };

  // Regex filters can use indexes as well.
  collection.distinct('questions.tags', regexFilter, (err, tags) => {
    res.send(tags);
  });
});

router.get('/withcounts', (req, res) => {
  const collection = db.get().collection('surveys');
  
  collection.aggregate([
    { $unwind: '$questions' },
    { $unwind: '$questions.tags' },
    { $group: { _id: "$questions.tags", count: { $sum: 1 } } }
  ], (err, tags) => {

    res.send(tags);
  });

  // See also Map Reduce here.
});

module.exports = router;