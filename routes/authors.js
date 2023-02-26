const express = require('express');
const { requiresAuth } = require('express-openid-connect');
const router = express.Router();

const authorsController = require('../controllers/authors');
const validation = require('../middleware/validate');


router.get('/', requiresAuth(), authorsController.getAll);

router.get('/:id', requiresAuth(), authorsController.getSingle);

router.post('/', requiresAuth(), validation.saveAuthor, authorsController.addAuthor);

router.put('/:id',  requiresAuth(), validation.saveAuthor, authorsController.updateAuthor);

router.delete('/:id', requiresAuth(), authorsController.deleteAuthor);

module.exports = router;
