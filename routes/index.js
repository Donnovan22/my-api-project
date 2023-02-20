const express = require('express');
const routes = express.Router();

routes.get('/', (req, res) => {res.send("Main Page");});
routes.use('/auth', require('./authentication'));
routes.use('/books', require('./books'));
routes.use('/authors', require('./authors'));

module.exports = routes;
