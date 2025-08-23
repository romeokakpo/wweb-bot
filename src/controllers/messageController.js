const whatsappService = require('../services/whatsappService');

class MessageController {
    // Méthode pour valider le format du numéro
    validatePhoneNumber(phoneNumber) {
        // Vérifier si le numéro se termine par @c.us
        if (!phoneNumber.endsWith('@c.us')) {
            return false;
        }
        
        // Vérifier que la partie avant @c.us contient uniquement des chiffres
        const numberPart = phoneNumber.replace('@c.us', '');
        return /^\d+$/.test(numberPart) && numberPart.length > 0;
    }

    // Méthode pour formater automatiquement le numéro si nécessaire
    formatPhoneNumber(phoneNumber) {
        // Si le numéro ne contient que des chiffres, ajouter @c.us
        if (/^\d+$/.test(phoneNumber)) {
            return phoneNumber + '@c.us';
        }
        return phoneNumber;
    }

    // Utiliser une arrow function pour préserver le contexte 'this'
    sendCustomMessage = async (req, res) => {
        let { message, phoneNumber } = req.body;

        if (!message || !phoneNumber) {
            return res.status(400).json({ 
                error: 'Message et numéro de téléphone sont requis.',
                required: ['message', 'phoneNumber']
            });
        }

        // Formater le numéro automatiquement
        phoneNumber = this.formatPhoneNumber(phoneNumber);

        // Valider le format du numéro
        if (!this.validatePhoneNumber(phoneNumber)) {
            return res.status(400).json({ 
                error: 'Format de numéro invalide. Le numéro doit être au format: 22996762103@c.us ou 22996762103',
                received: phoneNumber
            });
        }

        try {
            if (!whatsappService.isClientReady()) {
                return res.status(503).json({ 
                    error: 'Service WhatsApp non disponible.'
                });
            }

            await whatsappService.sendMessage(phoneNumber, message);
            
            res.status(200).json({ 
                success: true, 
                message: 'Message envoyé avec succès.',
                phoneNumber: phoneNumber,
                timestamp: new Date().toISOString()
            });

        } catch (error) {
            console.error('Erreur lors de l\'envoi du message:', error);
            res.status(500).json({ 
                error: 'Erreur lors de l\'envoi du message.',
                details: error.message
            });
        }
    }

    // Utiliser une arrow function pour préserver le contexte 'this'
    sendMediaFromBase64 = async (req, res) => {
        let { phoneNumber, base64Data, mimeType, caption } = req.body;

        if (!phoneNumber || !base64Data || !mimeType) {
            return res.status(400).json({
                error: 'Numéro de téléphone, données en base64 et type MIME sont requis.',
                required: ['phoneNumber', 'base64Data', 'mimeType']
            });
        }

        // Formater le numéro automatiquement
        phoneNumber = this.formatPhoneNumber(phoneNumber);

        // Valider le format du numéro
        if (!this.validatePhoneNumber(phoneNumber)) {
            return res.status(400).json({
                error: 'Format de numéro invalide. Le numéro doit être au format: 22996762103@c.us ou 22996762103',
                received: phoneNumber
            });
        }

        try {
            if (!whatsappService.isClientReady()) {
                return res.status(503).json({
                    error: 'Service WhatsApp non disponible.'
                });
            }

            await whatsappService.sendMediaFromBase64(phoneNumber, base64Data, mimeType, caption);

            res.status(200).json({
                success: true,
                message: 'Média envoyé avec succès.',
                phoneNumber: phoneNumber,
                timestamp: new Date().toISOString()
            });

        } catch (error) {
            console.error('Erreur lors de l\'envoi du média:', error);
            res.status(500).json({
                error: 'Erreur lors de l\'envoi du média.',
                details: error.message
            });
        }
    }

    // Utiliser une arrow function pour préserver le contexte 'this'
    getStatus = async (req, res) => {
        try {
            const isReady = whatsappService.isClientReady();
            res.status(200).json({
                whatsappReady: isReady,
                timestamp: new Date().toISOString()
            });
        } catch (error) {
            res.status(500).json({
                error: 'Erreur lors de la vérification du statut',
                details: error.message
            });
        }
    }
}

module.exports = new MessageController();
