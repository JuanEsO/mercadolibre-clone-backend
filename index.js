const express = require('express');
// const axios = require('axios');
const app = express();
const { searchItems, getItemById } = require('./src/controllers/search');

const port = 3001;

//endpoint to search for items from mercadolibre api

app.get('/api/items', (req, res) => {
  const { q } = req.query;

  searchItems(q)
    .then((resData) => {
      res.json(resData);
    })
    .catch((error) => {
      // console.log(error);
      res.status(500).json({ error: 'Internal server error: ' + error });
    });
});

app.get('/api/items/:id', (req, res) => {
  const id = req.params.id;

  getItemById(id)
    .then((resData) => {
      res.json(resData);
    })
    .catch((error) => {
      // console.log(error);
      res.status(500).json({ error: 'Internal server error: ' + error });
    });

  // res.json({ id });
});

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
