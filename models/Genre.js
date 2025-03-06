const { Schema, model } = require('mongoose');

const GenreSchema = Schema({
    name: { type: String, required: true },
    state: { type: String, required: true, enum: ['Activo', 'Inactivo'] },
    description: { type: String, required: true },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true }
})

module.exports = model('Genre', GenreSchema);