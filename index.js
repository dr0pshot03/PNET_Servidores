const express = require('express');
const app = express();
const logger = require('morgan');
const http = require('http');
const path = require('path');
const cors = require('cors');
const PORT = process.env.PORT || 8080;
const baseAPI = '/api/v1';


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(logger('dev'));

const reservasService = require('./routes/Reservas-service');
const reservas = require('./routes/Reservas');
app.use('/reservas', reservas);

app.use(express.static(path.join(__dirname, 'public'))); //Debe de ir detrás de las peticiones.

const server = http.createServer(app);

reservasService.connectDb(function (err) {
    if (err) {
        console.log('Could not connect with MongoDB – reservasService');
        process.exit(1);
    }

    server.listen(PORT, function () {
        console.log('Server up and running on localhost:' + PORT);
    });
});
