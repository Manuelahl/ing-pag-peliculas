const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contraseña: { type: String, required: true }, // encriptada
    rol: {
        type: String,
        enum: ['administrador', 'docente'],
        default: 'docente',
    },
});

module.exports = mongoose.model('User', userSchema);
