# WhatsApp Code Sender

Service d'envoi de codes et messages via WhatsApp Web.

## Structure du projet

```
wasendcode/
├── src/
│   ├── config/           # Configuration de l'application
│   │   └── index.js
│   ├── controllers/      # Logique de contrôle des routes
│   │   └── messageController.js
│   ├── services/         # Services métier
│   │   └── whatsappService.js
│   ├── routes/           # Définition des routes
│   │   ├── index.js
│   │   └── messages.js
│   ├── middleware/       # Middleware personnalisés
│   │   ├── index.js
│   │   └── auth.js
│   ├── utils/           # Utilitaires
│   │   ├── fileUtils.js
│   │   └── validationUtils.js
│   └── app.js           # Configuration Express
├── public/              # Fichiers statiques
│   └── index.html      # Page QR code
├── index.js             # Point d'entrée
├── package.json
├── .env.example
└── README.md
```

## Installation

1. Cloner le projet
2. Installer les dépendances : `npm install`
3. Copier `.env.example` vers `.env` et configurer les variables
4. Démarrer l'application : `npm start`

## Scripts disponibles

- `npm start` : Démarre l'application
- `npm run dev` : Démarre en mode développement (avec nodemon)

## API Endpoints

### GET /health
Vérification de l'état du serveur

### GET /api/messages/status
Vérification de l'état du service WhatsApp


### POST /api/messages/send-message
Envoie un message personnalisé
```json
{
  "message": "Votre message ici",
  "phoneNumber": "22960015516@c.us"
}
```

## Configuration

Configurez les variables d'environnement dans le fichier `.env` :

- `PORT` : Port du serveur (défaut: 5001)
- `HOST` : Hôte du serveur (défaut: localhost)
- `SAVE_PATH` : Chemin de sauvegarde des données WhatsApp
- `NODE_ENV` : Environnement (development/production)

## Extension du projet

La structure modulaire facilite l'ajout de nouvelles fonctionnalités :

1. **Nouveaux services** : Ajouter dans `src/services/`
2. **Nouvelles routes** : Ajouter dans `src/routes/`
3. **Nouveaux contrôleurs** : Ajouter dans `src/controllers/`
4. **Middleware personnalisés** : Ajouter dans `src/middleware/`
5. **Utilitaires** : Ajouter dans `src/utils/`
