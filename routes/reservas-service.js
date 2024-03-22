'use strict';

const MongoClient = require('mongodb').MongoClient;
let db;
let ObjectId = require('mongodb').ObjectId;
const Reservas = function () {
};

Reservas.prototype.connectDb = function (callback) {
    MongoClient.connect("mongodb+srv://dani:juanitojuan@dpa-pnet-2023-2024.bmcbrxd.mongodb.net/?retryWrites=true&w=majority&appName=dpa-pnet-2023-2024",
        {useNewUrlParser: true, useUnifiedTopology: true},
        function (err, database) {
            if (err) {
				console.log(err);
				callback(err);
            }

			db = database.db('dpa-pnet-2023-2024').collection('Reservas');
			console.log("Conexión correcta");

            callback(err, database);
        });
};

Reservas.prototype.add = function (movie, callback) {
    return db.insertOne(movie, callback);
};

Reservas.prototype.get = function (_id, callback) {
    return db.find({_id: ObjectId(_id)}).toArray(callback);
};

Reservas.prototype.getAll = function (callback) {
    return db.find({}).toArray(callback);
};

Reservas.prototype.update = function (_id, updatedMovie, callback) {
    delete updatedMovie._id;
    return db.updateOne({_id: ObjectId(_id)}, {$set: updatedMovie}, callback);};

Reservas.prototype.remove = function (_id, callback) {
    return db.deleteOne({_id: ObjectId(_id)}, callback);
};

Reservas.prototype.removeAll = function (callback) {
    return db.deleteMany({}, callback);
};

module.exports = new Movies();