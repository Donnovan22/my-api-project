const express = require('express');
const { requiresAuth } = require('express-openid-connect');
const router = express.Router();

const booksController = require('../controllers/books');
const validation = require('../middleware/validate');


router.get('/', requiresAuth(), booksController.getAll);

router.get('/:id', requiresAuth(), booksController.getSingle);

router.post('/', requiresAuth(), validation.saveBook, booksController.addBook);

router.put('/:id', requiresAuth(), validation.saveBook, booksController.updateBook);

router.delete('/:id', requiresAuth(), booksController.deleteBook);

module.exports = router;
