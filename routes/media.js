const { Router } = require('express');
const Media = require('../models/Media');
const Genre = require('../models/Genre');
const Director = require('../models/Director');
const Producer = require('../models/Producer');
const Type = require('../models/Type');
const { validationResult, check } = require('express-validator');

const router = Router();

//SERVICIOS

router.post('/', [
    check('serial', 'invalid.serial').not().isEmpty(),
    check('title', 'invalid.title').not().isEmpty(),
    check('sinopsis', 'invalid.sinopsis').not().isEmpty(),
    check('url', 'invalid.url').not().isEmpty(),
    check('photo', 'invalid.photo').not().isEmpty(),
    check('releaseYear', 'invalid.releaseYear').not().isEmpty(),
    check('genre', 'invalid.genre').not().isEmpty(),
    check('director', 'invalid.director').not().isEmpty(),
    check('producer', 'invalid.producer').not().isEmpty(),
    check('type', 'invalid.type').not().isEmpty(),
], async function (req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() });
        }

        // Verificar que genre, director y producer estén activos, y que type tenga un name válido
        const genre = await Genre.findById(req.body.genre);
        if (genre.state !== 'Activo') {
            return res.status(400).send('Genre not activo');
        }

        const director = await Director.findById(req.body.director);
        if (director.state !== 'Activo') {
            return res.status(400).send('Director not activo');
        }

        const producer = await Producer.findById(req.body.producer);
        if (producer.state !== 'Activo') {
            return res.status(400).send('Producer not activo');
        }

        const type = await Type.findById(req.body.type);
        if (type.name !== 'Pelicula' && type.name !== 'Serie') {
            return res.status(400).send('Type not defined');
        }        

        const existMediaForSerial = await Media.findOne({ serial: req.body.serial});
        if (existMediaForSerial) {
            return res.status(400).send('Exist serial');
        }

        const existMediaForUrl = await Media.findOne({ url: req.body.url});
        if (existMediaForUrl) {
            return res.status(400).send('Exist url');
        }

        let media = new Media();
        media.serial = req.body.serial;
        media.title = req.body.title;
        media.sinopsis = req.body.sinopsis;
        media.url = req.body.url;
        media.photo = req.body.photo;
        media.releaseYear = req.body.releaseYear;
        media.genre = req.body.genre._id;
        media.director = req.body.director._id;
        media.producer = req.body.producer._id;
        media.type = req.body.type._id;
        media.createdAt = new Date();
        media.updatedAt = new Date();

        media = await media.save(); //insertar a la tabla
        res.send(media)

    } catch (error) {
        console.log(error);
        res.status(500).send('message error')
    }

});

router.get('/', async function(req, res) {
    try {
        const medias = await Media.find().populate([
            { path: 'genre', select: 'name state' },
            { path: 'director', select: 'name state' },
            { path: 'producer', select: 'name state' },
            { path: 'type', select: 'name description' }
        ]);
        res.send(medias);

    } catch (error) {
        console.log(error);
        res.status(500).send('messsage error')
    }
});

router.put('/:mediaId', [
    check('serial', 'invalid.serial').not().isEmpty(),
    check('title', 'invalid.title').not().isEmpty(),
    check('sinopsis', 'invalid.sinopsis').not().isEmpty(),
    check('url', 'invalid.url').not().isEmpty(),
    check('photo', 'invalid.photo').not().isEmpty(),
    check('releaseYear', 'invalid.releaseYear').not().isEmpty(),
    check('genre', 'invalid.genre').not().isEmpty(),
    check('director', 'invalid.director').not().isEmpty(),
    check('producer', 'invalid.producer').not().isEmpty(),
    check('type', 'invalid.type').not().isEmpty(),
], async function (req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() });
        }

        let media = await Media.findById(req.params.mediaId);
        if (!media) {
            return res.status(400).send('Media not exist');
        }

        const existMediaForSerial = await Media.findOne({ serial: req.body.serial});
        if (existMediaForSerial) {
            return res.status(400).send('Exist serial');
        }

        const existMediaForUrl = await Media.findOne({ url: req.body.url});
        if (existMediaForUrl) {
            return res.status(400).send('Exist url');
        }

        media.serial = req.body.serial;
        media.title = req.body.title;
        media.sinopsis = req.body.sinopsis;
        media.url = req.body.url;
        media.photo = req.body.photo;
        media.releaseYear = req.body.releaseYear;
        media.genre = req.body.genre._id;
        media.director = req.body.director._id;
        media.producer = req.body.producer._id;
        media.type = req.body.type._id;
        media.updatedAt = new Date();

        media = await media.save(); //insertar a la tabla
        res.send(media)

    } catch (error) {
        console.log(error);
        res.status(500).send('message error')
    }

});

module.exports = router;