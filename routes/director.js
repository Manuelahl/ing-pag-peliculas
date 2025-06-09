const { Router } = require('express');
const Director = require('../models/Director');
const { validationResult, check } = require('express-validator');
const { verificarToken, soloAdmin } = require('../middleware/auth');

const router = Router();

//SERVICIOS

router.post('/', verificarToken, soloAdmin, [
    check('name', 'invalid.name').not().isEmpty(),
    check('state', 'invalid.state').isIn([ 'Activo', 'Inactivo' ]),
], async function (req, res) {
    
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() });
        }

        let director = new Director();
        director.name = req.body.name;
        director.state = req.body.state;
        director.createdAt = new Date();
        director.updatedAt = new Date();

        director = await director.save(); //insertar a la tabla
        res.send(director)

    } catch (error) {
        console.log(error);
        res.status(500).send('message error')
    }

});

router.get('/', verificarToken, async function(req, res) {
    try {
        const directors = await Director.find();
        res.send(directors);

    } catch (error) {
        console.log(error);
        res.status(500).send('messsage error')
    }
});

router.put('/:directorId', verificarToken, soloAdmin, [
    check('name', 'invalid.name').not().isEmpty(),
    check('state', 'invalid.state').isIn([ 'Activo', 'Inactivo' ]),
], async function (req, res) {
    
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() });
        }

        let director = await Director.findById(req.params.directorId);
        if (!director) {
            return res.status(400).send('Director not exist');
        }

        director.name = req.body.name;
        director.state = req.body.state;
        director.updatedAt = new Date();

        director = await director.save(); //insertar a la tabla
        res.send(director)

    } catch (error) {
        console.log(error);
        res.status(500).send('message error')
    }

});

module.exports = router;