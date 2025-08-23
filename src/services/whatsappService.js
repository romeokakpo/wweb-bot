const { Client, LocalAuth, MessageMedia } = require("whatsapp-web.js");
const QRCode = require("qrcode");
const fs = require('fs').promises;
const path = require('path');
const config = require('../config');

class WhatsAppService {
    constructor() {
        this.client = null;
        this.isReady = false;
        this.currentQR = null;
        this.qrFilePath = path.join(__dirname, '../../public/qr-code.png');
        this.initialize();
    }

    initialize() {
        this.client = new Client({
            authStrategy: new LocalAuth(),
            puppeteer: config.whatsapp.puppeteerOptions,
        });

        this.setupEventHandlers();
        this.client.initialize();
    }

    setupEventHandlers() {
        // Gestion du QR Code
        this.client.on("qr", async (qr) => {
            console.log("Veuillez scanner le QR code avec WhatsApp:");
            // Sauvegarder le QR code
            this.currentQR = qr;
            await this.saveQRCode(qr);
        });

        // Client prêt
        this.client.on("ready", () => {
            console.log("WhatsApp Client is ready!");
            this.isReady = true;
            this.currentQR = null;
            // Supprimer le fichier QR code quand connecté
            this.deleteQRCode();
        });

        // Gestion des erreurs
        this.client.on("auth_failure", (msg) => {
            console.error("Échec de l'authentification:", msg);
        });

        this.client.on("disconnected", (reason) => {
            console.log("Client déconnecté:", reason);
            this.isReady = false;
        });
    }

    async sendMessage(phoneNumber, message) {
        if (!this.isReady) {
            throw new Error("Le client WhatsApp n'est pas prêt");
        }

        try {
            await this.client.sendMessage(phoneNumber, message);
            console.log(`Message envoyé à ${phoneNumber}`);
            return { success: true };
        } catch (error) {
            console.error("Erreur lors de l'envoi du message:", error);
            throw error;
        }
    }

    async sendMediaFromBase64(phoneNumber, base64Data, mimeType, caption) {
        if (!this.isReady) {
            throw new Error("Le client WhatsApp n'est pas prêt");
        }

        try {
            const media = new MessageMedia(mimeType, base64Data);
            await this.client.sendMessage(phoneNumber, media, { caption });
            console.log(`Média envoyé à ${phoneNumber}`);
            return { success: true };
        } catch (error) {
            console.error("Erreur lors de l'envoi du média:", error);
            throw error;
        }
    }

    isClientReady() {
        return this.isReady;
    }

    async getChats() {
        if (!this.isReady) {
            throw new Error("Le client WhatsApp n'est pas prêt");
        }
        return await this.client.getChats();
    }

    async getContacts() {
        if (!this.isReady) {
            throw new Error("Le client WhatsApp n'est pas prêt");
        }
        return await this.client.getContacts();
    }

    async saveQRCode(qrData) {
        try {
            // Créer le dossier public s'il n'existe pas
            const publicDir = path.dirname(this.qrFilePath);
            await fs.mkdir(publicDir, { recursive: true });

            // Générer le QR code en PNG
            await QRCode.toFile(this.qrFilePath, qrData, {
                width: 300,
                margin: 2,
                color: {
                    dark: '#000000',
                    light: '#FFFFFF'
                }
            });

            console.log(`QR Code sauvegardé dans: ${this.qrFilePath}`);
        } catch (error) {
            console.error('Erreur lors de la sauvegarde du QR code:', error);
        }
    }

    async deleteQRCode() {
        try {
            await fs.unlink(this.qrFilePath);
            console.log('QR Code supprimé (connexion établie)');
        } catch (error) {
            // Fichier n'existe pas, pas de problème
            if (error.code !== 'ENOENT') {
                console.error('Erreur lors de la suppression du QR code:', error);
            }
        }
    }

    getQRStatus() {
        return {
            hasQR: this.currentQR !== null,
            isReady: this.isReady,
            qrPath: this.isReady ? null : '/qr-code.png'
        };
    }
}

module.exports = new WhatsAppService();
