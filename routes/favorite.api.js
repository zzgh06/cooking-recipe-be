const express = require('express');
const authController = require('../controllers/auth.controller');
const favoriteController = require('../controllers/favorite.controller');


const router = express.Router();

router.get('/', authController.authenticate, favoriteController.getRecipeFavorites);
router.put('/:id', authController.authenticate, favoriteController.addRecipeFavorites);
router.delete('/:id', authController.authenticate, favoriteController.deleteRecipeFavorites);

module.exports = router;