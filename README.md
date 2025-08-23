# WhatsApp Web Message Bot API

# WhatsApp Code Sender

Service for sending codes and messages via WhatsApp Web with admin authentication.

## Project Structure

```
wasendcode/
├── src/
│   ├── config/           # Application configuration
│   │   └── index.js
│   ├── controllers/      # Route control logic
│   │   └── messageController.js
│   ├── services/         # Business services
│   │   └── whatsappService.js
│   ├── routes/           # Route definitions
│   │   ├── index.js
│   │   └── messages.js
│   ├── middleware/       # Custom middleware
│   │   ├── index.js
│   │   └── auth.js
│   ├── utils/           # Reusable utilities
│   │   ├── fileUtils.js
│   │   └── validationUtils.js
│   └── app.js           # Express configuration
├── public/              # Static files
│   └── index.html      # QR code page
├── index.js             # Entry point
├── package.json
├── .env.example
└── README.md
```

## Installation

1. Clone the project
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env` and configure variables
4. Start the application: `npm start`

## Available Scripts

- `npm start`: Start the application
- `npm run dev`: Start in development mode (with nodemon)

## API Endpoints

### GET /health
Server status check

### GET /api/messages/status
WhatsApp service status check

### POST /api/messages/send-message
Send a custom message
```json
{
  "message": "Your message here",
  "phoneNumber": "22960015516@c.us"
}
```

## Configuration

Configure environment variables in the `.env` file:

- `PORT`: Server port (default: 5001)
- `HOST`: Server host (default: localhost)
- `SAVE_PATH`: WhatsApp data save path
- `NODE_ENV`: Environment (development/production)

## Project Extension

The modular structure facilitates adding new features:

1. **New services**: Add in `src/services/`
2. **New routes**: Add in `src/routes/`
3. **New controllers**: Add in `src/controllers/`
4. **Custom middleware**: Add in `src/middleware/`
5. **Utilities**: Add in `src/utils/`
