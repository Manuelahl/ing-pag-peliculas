const User = require('../models/User');
const bcrypt = require('bcryptjs');

const createUser = async (req, res) => {
    try {
        const { nombre, email, contraseña, rol } = req.body;

        // Encriptar contraseña
        const contraseñaHash = await bcrypt.hash(contraseña, 10);

        const nuevoUsuario = new User({
        nombre,
        email,
        contraseña: contraseñaHash,
        rol
        });

        await nuevoUsuario.save();

        res.status(201).json({ mensaje: 'Usuario creado correctamente', usuario: nuevoUsuario });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al crear usuario' });
    }
};

module.exports = { createUser };
