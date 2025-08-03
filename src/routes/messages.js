const express = require('express');
const messageController = require('../controllers/messageController');

const router = express.Router();

// Route pour envoyer un message personnalisé
router.post('/send-message', messageController.sendCustomMessage);

// Route pour vérifier le statut du service
router.get('/status', messageController.getStatus);

module.exports = router;
