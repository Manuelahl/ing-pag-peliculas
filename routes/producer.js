const { Router } = require('express');
const Producer = require('../models/Producer');
const { validationResult, check } = require('express-validator');

const router = Router();

//SERVICIOS

router.post('/', [
    check('name', 'invalid.name').not().isEmpty(),
    check('state', 'invalid.state').isIn([ 'Activo', 'Inactivo' ]),
    check('slogan', 'invalid.slogan').not().isEmpty(),
    check('description', 'invalid.description').not().isEmpty(),
], async function (req, res) {
    
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() });
        }

        let producer = new Producer();
        producer.name = req.body.name;
        producer.state = req.body.state;
        producer.slogan = req.body.slogan;
        producer.description = req.body.description;
        producer.createdAt = new Date();
        producer.updatedAt = new Date();

        producer = await producer.save(); //insertar a la tabla
        res.send(producer)

    } catch (error) {
        console.log(error);
        res.status(500).send('message error')
    }

});

router.get('/', async function(req, res) {
    try {
        const producers = await Producer.find();
        res.send(producers);

    } catch (error) {
        console.log(error);
        res.status(500).send('messsage error')
    }
});

router.put('/:producerId', [
    check('name', 'invalid.name').not().isEmpty(),
    check('state', 'invalid.state').isIn([ 'Activo', 'Inactivo' ]),
    check('slogan', 'invalid.slogan').not().isEmpty(),
    check('description', 'invalid.description').not().isEmpty(),
], async function (req, res) {
    
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() });
        }

        let producer = await Producer.findById(req.params.producerId);
        if (!producer) {
            return res.status(400).send('Producer not exist');
        }

        producer.name = req.body.name;
        producer.state = req.body.state;
        producer.slogan = req.body.slogan;
        producer.description = req.body.description;
        producer.updatedAt = new Date();

        producer = await producer.save(); //insertar a la tabla
        res.send(producer)

    } catch (error) {
        console.log(error);
        res.status(500).send('message error')
    }

});

module.exports = router;