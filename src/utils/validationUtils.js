class ValidationUtils {
    static isValidPhoneNumber(phoneNumber) {
        // Vérifie le format WhatsApp: number@c.us
        const regex = /^\d+@c\.us$/;
        return regex.test(phoneNumber);
    }

    static formatPhoneNumber(phoneNumber) {
        // Supprime tous les caractères non numériques
        const cleaned = phoneNumber.replace(/\D/g, '');
        
        // Ajoute @c.us si nécessaire
        if (!phoneNumber.includes('@c.us')) {
            return `${cleaned}@c.us`;
        }
        
        return phoneNumber;
    }

    static isValidCode(code) {
        // Vérifie que le code n'est pas vide et fait au moins 1 caractère
        return code && typeof code === 'string' && code.trim().length > 0;
    }

    static sanitizeMessage(message) {
        // Supprime les caractères potentiellement dangereux
        return message.trim().substring(0, 1000); // Limite à 1000 caractères
    }
}

module.exports = ValidationUtils;
