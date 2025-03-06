const { Router } = require('express');
const Genre = require('../models/Genre');
const { validationResult, check } = require('express-validator');

const router = Router();

//SERVICIOS

router.post('/', [
    check('name', 'invalid.name').not().isEmpty(),
    check('state', 'invalid.state').isIn([ 'Activo', 'Inactivo' ]),
    check('description', 'invalid.description').not().isEmpty(),
], async function (req, res) {
    
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() });
        }

        let genre = new Genre();
        genre.name = req.body.name;
        genre.state = req.body.state;
        genre.description = req.body.description;
        genre.createdAt = new Date();
        genre.updatedAt = new Date();

        genre = await genre.save(); //insertar a la tabla
        res.send(genre)

    } catch (error) {
        console.log(error);
        res.status(500).send('message error')
    }

});

router.get('/', async function(req, res) {
    try {
        const genres = await Genre.find();
        res.send(genres);

    } catch (error) {
        console.log(error);
        res.status(500).send('messsage error')
    }
});

router.put('/:genreId', [
    check('name', 'invalid.name').not().isEmpty(),
    check('state', 'invalid.state').isIn([ 'Activo', 'Inactivo' ]),
    check('description', 'invalid.description').not().isEmpty(),
], async function (req, res) {
    
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() });
        }

        let genre = await Genre.findById(req.params.genreId);
        if (!genre) {
            return res.status(400).send('Genre not exist');
        }

        genre.name = req.body.name;
        genre.state = req.body.state;
        genre.description = req.body.description;
        genre.updatedAt = new Date();

        genre = await genre.save(); //insertar a la tabla
        res.send(genre)

    } catch (error) {
        console.log(error);
        res.status(500).send('message error')
    }

});

module.exports = router;