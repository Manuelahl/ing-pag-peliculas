const jwt = require('jsonwebtoken');

// Verifica que el token JWT esté presente y sea válido
function verificarToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ mensaje: 'Token requerido' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = decoded; // Guarda datos del token para el siguiente middleware o ruta
        next();
    } catch (err) {
        return res.status(401).json({ mensaje: 'Token inválido' });
    }
}

// Permite solo a usuarios con rol administrador
function soloAdmin(req, res, next) {
    if (req.usuario.rol !== 'administrador') {
        return res.status(403).json({ mensaje: 'Acceso solo para administradores' });
    }
    next();
}

// Permite solo a docentes
function soloDocente(req, res, next) {
    if (req.usuario.rol !== 'docente') {
        return res.status(403).json({ mensaje: 'Acceso solo para docentes' });
    }
    next();
}

module.exports = { verificarToken, soloAdmin, soloDocente };
