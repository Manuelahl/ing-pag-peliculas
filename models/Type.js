const { Schema, model } = require('mongoose');

const TypeSchema = Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true }
})

module.exports = model('Type', TypeSchema);