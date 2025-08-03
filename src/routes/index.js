const express = require('express');
const messageRoutes = require('./messages');
const whatsappService = require('../services/whatsappService');

const router = express.Router();

// Routes principales
router.use('/api/messages', messageRoutes);

// Route de santé
router.get('/health', (req, res) => {
    try {
        const whatsappReady = whatsappService.isClientReady();
        const qrStatus = whatsappService.getQRStatus();
        
        res.status(200).json({
            status: 'OK',
            service: 'WhatsApp Message Sender',
            whatsapp: {
                connected: whatsappReady,
                status: whatsappReady ? 'ready' : 'not ready'
            },
            qrCode: {
                available: qrStatus.hasQR,
                path: qrStatus.qrPath,
                needsScanning: !whatsappReady && qrStatus.hasQR
            },
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({
            status: 'ERROR',
            service: 'WhatsApp Message Sender',
            whatsapp: {
                connected: false,
                status: 'error',
                error: error.message
            },
            qrCode: {
                available: false,
                path: null,
                needsScanning: false
            },
            timestamp: new Date().toISOString()
        });
    }
});

// Route par défaut
router.get('/', (req, res) => {
    res.status(200).json({
        message: 'WhatsApp Code Sender API',
        version: '1.0.0',
        endpoints: {
            health: 'GET /health',
            sendMessage: 'POST /api/messages/send-message',
            status: 'GET /api/messages/status',
            qrPage: 'GET /qr (Page web pour scanner le QR code)'
        }
    });
});

// Route pour la page QR
router.get('/qr', (req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

// Route pour la version locale de test
router.get('/local', (req, res) => {
    res.sendFile('local.html', { root: 'public' });
});

module.exports = router;
