const express = require('express');
const router = express.Router();
const db = require('../db');
const ObjectID = require('mongodb').ObjectID;

router.get('/', (req, res) => {
  const collection = db.get().collection('surveys');

  collection.find().toArray((err, surveys) => {
    res.send(surveys);
  });
});

router.get('/namesandids', (req, res) => {
  const collection = db.get().collection('surveys');

  // Find returns a cursor. We can then sort / limit / take data before buffering.
  collection.find({}, { "_id": 1, "name": 1 })
    .sort({ 'name': -1 })
    .limit(3)
    .toArray((err, surveys) => {
      res.send(surveys);
    });
});

router.post('/', (req, res) => {
  const collection = db.get().collection('surveys');

  collection.insert(req.body, (err, result) => {
    res.send(result);
  });
});

router.put('/:id', (req, res) => {
  const collection = db.get().collection('surveys');
  
  collection.update({ _id: ObjectID(req.params.id) }, req.body, (err, result) => {
    res.send({});
  });
});

router.put('/:id/responses', (req, res) => {
  const collection = db.get().collection('surveys');
  
  const updateStatement = {
    $set: {
      responses: parseInt(req.body.responses)
    }
  };

  collection.update({ _id: ObjectID(req.params.id) }, updateStatement, (err, result) => {
    res.send({});
  });
});

router.put('/:id/incrementresponses', (req, res) => {
  const collection = db.get().collection('surveys');
  
  const updateStatement = {
    $inc: {
      responses: parseInt(req.body.responses)
    }
  };
  
  collection.update({ _id: ObjectID(req.params.id) }, updateStatement, (err, result) => {
    res.send({});
  });
});

router.get('/firstsurvey', (req, res) => {
  const collection = db.get().collection('surveys');
  
  collection.find({ name: 'My First Survey' }).toArray((err, surveys) => {
    res.send(surveys);
  });
});

router.post('/find', (req, res) => {
  const collection = db.get().collection('surveys');

  collection.find(req.body).toArray((err, surveys) => {
    res.send(surveys);
  });
});

router.post('findnames', (req, res) => {
  const collection = db.get().collection('surveys');

  collection.find(req.body, { "name": 1 }).toArray((err, surveys) => {
    res.send(surveys);
  });
});

router.post('/addnameindex', (req, res) => {
  const collection = db.get().collection('surveys');
  
  collection.createIndex({ "name": 1 }, { "name": "SurveyName" }, (err, result) => {
    res.send('Ok');
  });
});

router.post('/dropnameindex', (req, res) => {
  const collection = db.get().collection('surveys');
  
  // Can also drop the index by the parameters, i.e. { "name": 1 }
  collection.dropIndex('SurveyName', (err, result) => {
    res.send('Ok');
  });
});


module.exports = router;