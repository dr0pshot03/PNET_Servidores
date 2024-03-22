'use strict';

const express = require('express');
const router = express.Router();
const reservasService = require('./reservas-service');

router.get('/', function (req, res) {
    reservasService.getAll((err, reservas) => {
            if (err) {
                res.status(500).send({
                    msg: err
                });
            } else if (movies.length == 0){
            	res.status(500).send({
                    msg: "Reserva nula."
                });
            } else {
                res.status(200).send(reservas);
            }
        }
    );
});

router.post('/', function (req, res) {
    let reserva = req.body;
    if (Object.entries(reserva).length === 0){
        res.status(400).send({
            msg: 'Reserva nula.'
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
                    msg: 'Reserva creada.'
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
                msg: 'Todas las reservas han sido eliminadas.'
            });
        }
    });
});


router.get('/:_id', function (req, res) {
    let _id = req.params._id;
    reservasService.get(_id, (err, movie) => {
            if (err) {
                res.status(500).send({
                	msg: err
            	});
            } else if (movie.length == 0){
            	res.status(500).send({
                    msg: "La reserva es nula."
                });
            } else {
                res.status(200).send(movie);
            }
        }
    );
});


router.put('/:_id', function (req, res) {
    const _id = req.params._id;
    const updatedMovie = req.body;
    reservasService.update(_id, updatedMovie, (err, numUpdates) => {
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
                msg: 'Reserva actualizada.'
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
                msg: 'Reserva eliminada.'
            });
        }
    });
});

module.exports = router;
