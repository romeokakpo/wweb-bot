const express = require('express');
const messageController = require('../controllers/messageController');

const router = express.Router();

// Route pour envoyer un message personnalisé
router.post('/send-message', messageController.sendCustomMessage);

router.post('/send-media-b64', messageController.sendMediaFromBase64);

// Route pour vérifier le statut du service
router.get('/status', messageController.getStatus);

module.exports = router;
