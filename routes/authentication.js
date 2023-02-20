const express = require('express');
const router = express.Router();

const authController = require('../controllers/authentication')

router.get('/', authController.authenticate);
router.get('/oauth-callback', authController.callback);

module.exports = router;