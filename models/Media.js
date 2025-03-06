const { Schema, model } = require('mongoose');

const MediaSchema = Schema({
    serial: {type: String, required: true, unique: true },
    title: { type: String, required: true },
    sinopsis: { type: String, required: true },
    url: { type: String, required: true, unique: true },
    photo: { type: String, required: true },
    releaseYear: { type: String, required: true },
    genre: { type: Schema.Types.ObjectId, ref: 'Genre', required: true },
    director: { type: Schema.Types.ObjectId, ref: 'Director', required: true },
    producer: { type: Schema.Types.ObjectId, ref: 'Producer', required: true },
    type: { type: Schema.Types.ObjectId, ref: 'Type', required: true },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true }
})

module.exports = model('Media', MediaSchema);