const requestLogger = (req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.url} - IP: ${req.ip}`);
    next();
};

const errorHandler = (err, req, res, next) => {
    console.error('Erreur non gérée:', err);
    
    res.status(err.status || 500).json({
        error: 'Erreur interne du serveur',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Une erreur est survenue',
        timestamp: new Date().toISOString()
    });
};

const notFoundHandler = (req, res) => {
    res.status(404).json({
        error: 'Route non trouvée',
        message: `La route ${req.method} ${req.url} n'existe pas`,
        timestamp: new Date().toISOString()
    });
};

module.exports = {
    requestLogger,
    errorHandler,
    notFoundHandler
};
