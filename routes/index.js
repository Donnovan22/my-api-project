const express = require('express');
const routes = express.Router();

routes.get('/', (req, res) => {res.send(req.oidc.isAuthenticated() ? "Logged in" : "logged out");});
routes.use('/books', require('./books'));
routes.use('/authors', require('./authors'));

module.exports = routes;
