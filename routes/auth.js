const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.post('/login', async (req, res) => {
    const { email, contraseña } = req.body;

    try {
        const usuario = await User.findOne({ email });
        if (!usuario) {
        return res.status(400).json({ mensaje: 'Usuario no encontrado' });
        }

        const contraseñaValida = await bcrypt.compare(contraseña, usuario.contraseña);
        if (!contraseñaValida) {
        return res.status(400).json({ mensaje: 'Contraseña incorrecta' });
        }

        const token = jwt.sign(
        {
            id: usuario._id,
            rol: usuario.rol
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
        );

        res.json({
        mensaje: 'Autenticación exitosa',
        token
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
});

module.exports = router;
