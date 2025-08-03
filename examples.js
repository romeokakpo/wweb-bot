// Exemples d'utilisation de l'API
const examples = {
    // Test de santé du serveur
    health: {
        method: 'GET',
        url: 'http://localhost:5001/health',
        description: 'Vérifier si le serveur fonctionne'
    },

    // Vérifier le statut WhatsApp
    status: {
        method: 'GET',
        url: 'http://localhost:5001/api/messages/status',
        description: 'Vérifier si WhatsApp est connecté'
    },

    // Envoyer un message personnalisé
    sendMessage: {
        method: 'POST',
        url: 'http://localhost:5001/api/messages/send-message',
        headers: {
            'Content-Type': 'application/json'
        },
        body: {
            message: 'Bonjour, ceci est un message de test',
            phoneNumber: '22996762103@c.us'
        },
        description: 'Envoyer un message personnalisé'
    }
};

// Exemple avec curl
console.log('Exemples d\'utilisation avec curl:');
console.log('');

console.log('1. Vérifier la santé du serveur:');
console.log('curl http://localhost:5001/health');
console.log('');

console.log('2. Vérifier le statut WhatsApp:');
console.log('curl http://localhost:5001/api/messages/status');
console.log('');

console.log('4. Envoyer un message:');
console.log('curl -X POST http://localhost:5001/api/messages/send-message \\');
console.log('  -H "Content-Type: application/json" \\');
console.log('  -d \'{"message":"Hello World","phoneNumber":"22996762103@c.us"}\'');

module.exports = examples;
