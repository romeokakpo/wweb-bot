const fs = require('fs').promises;
const path = require('path');

class FileUtils {
    static async readJSON(filePath) {
        try {
            const data = await fs.readFile(filePath, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            if (error.code === 'ENOENT') {
                return null; // Fichier n'existe pas
            }
            throw error;
        }
    }

    static async writeJSON(filePath, data) {
        try {
            const dir = path.dirname(filePath);
            await fs.mkdir(dir, { recursive: true });
            await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
            return true;
        } catch (error) {
            console.error('Erreur lors de l\'écriture du fichier:', error);
            throw error;
        }
    }

    static async fileExists(filePath) {
        try {
            await fs.access(filePath);
            return true;
        } catch {
            return false;
        }
    }

    static async createDirectory(dirPath) {
        try {
            await fs.mkdir(dirPath, { recursive: true });
            return true;
        } catch (error) {
            console.error('Erreur lors de la création du dossier:', error);
            throw error;
        }
    }
}

module.exports = FileUtils;
