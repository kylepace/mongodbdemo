const db = require('./db');
const express = require('express');
const app = express();
const surveys = require('./controllers/surveys');
const tags = require('./controllers/tags');
const projects = require('./controllers/projects');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use('/surveys', surveys);
app.use('/tags', tags);
app.use('/projects', projects);

app.get('/', (req, res) => {
  res.send('Hola.');
});

const uri = // link to your Mongo instance
console.log('Connecting to MongoDB at Atlas...');
db.connect(uri, function(err) {
  if (err) {
    console.log('Could not connect to MongoDB instance, bailing.');
    process.exit(1);
  } else {
    console.log('Connected to MongoDB, woohoo!');

    app.listen(3000, () => {
      console.log('Listing on port 3000.');
    });
  }
});