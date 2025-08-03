const express = require('express');
const path = require('path');
const config = require('./config');
const routes = require('./routes');
const { requestLogger, errorHandler, notFoundHandler } = require('./middleware');

class App {
    constructor() {
        this.app = express();
        this.port = config.server.port;
        this.setupMiddleware();
        this.setupRoutes();
        this.setupErrorHandling();
    }

    setupMiddleware() {
        // Middleware de base
        this.app.use(express.json({ limit: '10mb' }));
        this.app.use(express.urlencoded({ extended: true }));
        
        
        
        // Logger personnalisé
        this.app.use(requestLogger);
        
        // Headers CORS si nécessaire
        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
            
            if (req.method === 'OPTIONS') {
                res.sendStatus(200);
            } else {
                next();
            }
        });
    }

    setupRoutes() {
        // Routes principales
        this.app.use('/', routes);

        // Servir les fichiers statiques
        this.app.use(express.static(path.join(__dirname, '../public')));
    }

    setupErrorHandling() {
        // Gestionnaire pour les routes non trouvées
        this.app.use(notFoundHandler);
        
        // Gestionnaire d'erreurs global
        this.app.use(errorHandler);
    }

    start() {
        this.app.listen(this.port, () => {
            console.log(` Serveur démarré sur http://localhost:${this.port}`);
            console.log(` En attente de la connexion WhatsApp...`);
        });
    }

    getApp() {
        return this.app;
    }
}

module.exports = App;
