require("dotenv").config();

module.exports = {
    // Configuration du serveur
    server: {
        port: process.env.PORT || 5001,
        host: process.env.HOST || 'localhost'
    },

    // Configuration WhatsApp
    whatsapp: {
        puppeteerOptions: {
            headless: true,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--remote-debugging-port=9222',
            ],
        }
    },

    // Configuration des fichiers
    files: {
        savePath: process.env.SAVE_PATH || './save.json'
    }
};
