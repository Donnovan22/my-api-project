const express = require('express');
const routes = express.Router();

routes.get('/', (req, res) => {
  return res.send('Main Page');
});

routes.use('/books', require('./books'));
routes.use('/authors', require('./authors'));

module.exports = routes;
