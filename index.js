const App = require('./src/app');

// Créer l'application
const app = new App();

// Gérer l'arrêt propre
process.on('SIGINT', () => {
    console.log('\n Arrêt du serveur...');
    process.exit(0);
});

process.on('SIGTERM', () => {
    console.log('\n Arrêt du serveur...');
    process.exit(0);
});

// Démarrer le serveur
app.start();
