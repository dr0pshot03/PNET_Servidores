'use strict';

const express = require('express');
const router = express.Router();
const reservasService = require('./Reservas-service');

router.get('/', function (req, res) {
    reservasService.getAll((err, reserva) => {
            if (err) {
                res.status(500).send({
                    msg: err
                });
            } else if (reserva.length == 0){
            	res.status(500).send({
                    msg: "Reservas null"
                });
            } else {
                
                res.status(200).send(reserva);
            }
        }
    );
});

router.get('/:_id', function (req, res) {
    let _id = req.params._id;
    reservasService.get(_id, (err, reserva) => {
            if (err) {
                res.status(500).send({
                	msg: err
            	});
            } else if (reserva.length == 0){
            	res.status(500).send({
                    msg: "Reserva is null"
                });
            } else {

                res.status(200).send(reserva);
                
            }
        }
    );
});


router.post('/', function (req, res) {
    let reserva = req.body;
    if (Object.entries(reserva).length === 0){
        res.status(400).send({
            msg: 'Empty Reserva'
        });
    }
	else{
		reservasService.add(reserva, (err, reserva) => {
            if (err) {
                res.status(500).send({
                    msg: err
                });
            } 
			else
			{
                res.status(201).send({
                    msg: 'Reserva created!'
                });
            }
        });
	}
});


router.delete('/', function (req, res) {
    reservasService.removeAll((err) => {
        if (err) {
            res.status(500).send({
                msg: err
            });
        } else {
            res.status(200).send({
                msg: 'Reserva deleted!'
            });
        }
    });
});

router.put('/:_id', function (req, res) {
    const _id = req.params._id;
    const updatedreserva = req.body;
    reservasService.update(_id, updatedreserva, (err, numUpdates) => {
        if (err) {
            res.status(500).send({
                msg: err
            });
	} else if(numUpdates.modifiedCount === 0) {
            res.status(500).send({
                msg: "Not updated"
            });
        } else {
            res.status(200).send({
                msg: 'Reserva updated!'
            });
        }
    });
});


router.delete('/:_id', function (req, res) {
    let _id = req.params._id;
    reservasService.remove(_id, (err) => {
        if (err) {
            res.status(500).send({
                msg: err
            });
        } else {
            res.status(200).send({
                msg: 'Reserva deleted!'
            });
        }
    });
});

module.exports = router;
