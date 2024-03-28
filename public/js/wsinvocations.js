const toNumber = require("strnum");

function getReserva(reservaId) {
    let myUrl = "/reservas/" + reservaId;
    $.ajax({
        type: "GET",
        dataType: "json",
        url: myUrl,
        success: function(data) {
            $(".tabla_result table tbody").empty(); // Limpiar contenido previo de la tabla

            // Crear una nueva fila de la tabla con los datos de la reserva
            var newRow = "<tr>" +
                "<td>" + data.nombre + "</td>" +
                "<td>" + data.apellidos + "</td>" +
                "<td>" + data.email + "</td>" +
                "<td>" + data.taller + "</td>" +
                "<td>" + data.n_personas + "</td>" +
                "<td>" + data.hora_inicio_fin[0] + "</td>" +
                "<td>" + data.hora_inicio_fin[1] + "</td>" +
                "</tr>";

            // Agregar la nueva fila a la tabla
            $(".tabla_result table tbody").append(newRow);
        },
        error: function(res) {
            let mensaje = JSON.parse(res.responseText);
            alert("ERROR: " + mensaje.msg);
        }
    });
}


function postReserva() {
    var formData = {
        nombre: $("#nombre").val(),
        apellidos: $("#apellidos").val(),
        email: $("#email").val(),
        taller: $("#actividad").val(),
        n_personas:$("#personas").val(),
        hora_inicio_fin:[
            $("#inicio").val(),
            $("#fin").val()
        ]
    };

    $.ajax({
        type: "POST",
        url: "/reservas", // Ruta del servidor para manejar las reservas
        contentType: "application/json",
        dataType: "text",
        data: JSON.stringify(formData),
        success: function(data) {
           console.log("Éxito");
        },
        error: function(res) {
            alert("ERROR: " + res.statusText);
        }
    });
}


function getAllReservas() {
    let myUrl = "/reservas";
    $.ajax({
        type: "GET",
        dataType: "json",
        url: myUrl,
        success: function(data) {
            // Limpiar contenido previo de la tabla
            $(".tabla_result table tbody").empty();

            // Iterar sobre los datos y agregar filas a la tabla
            $.each(data, function(index, reserva) {
                var aux;
                switch(Number(reserva.n_personas))
                {
                    case 1:
                        aux = "<td>" + "Grafitis" + "</td>";
                        break;
                    case 2:
                        aux = "<td>" + "Manualidades" + "</td>";
                        break;
                    case 3:
                        aux = "<td>" + "Bellas Artes" + "</td>";
                        break;
                }
                // Crear una nueva fila de la tabla con los datos de la reserva
                var newRow = "<tr>" +
                    "<td>" + reserva.nombre + "</td>" +
                    "<td>" + reserva.apellidos + "</td>" +
                    "<td>" + reserva.email + "</td>" +
                    aux +
                    "<td>" + reserva.taller + "</td>" +
                    "<td>" + reserva.hora_inicio_fin[0] + "</td>" +
                    "<td>" + reserva.hora_inicio_fin[1] + "</td>" +
                    "<td> <button type=\"button\" onclick=\"deleteReserva('" + reserva._id.toString() + "')\">Eliminar</button></td>" +
                    "</tr>";
                
                // Agregar la nueva fila a la tabla
                $(".tabla_result table tbody").append(newRow);
            });
        },
        error: function(res) {
            console.error("ERROR:", res.status, res.statusText);
        }
    });
}

function deleteReserva(reservaId)
{
    let myUrl = "/reservas/" + reservaId;
    $.ajax({
        type: "DELETE",
        dataType: "text",
        url: myUrl,
        success: function(data)
        {
            alert("Eliminado con éxito");
            getAllReservas();

        },
        error: function(err)
        {
            console.error("ERROR:", res.status, res.statusText);
        }
    })
}

function deleteAllReserva()
{
    let myUrl = "/reservas";
    $.ajax({
        type: "DELETE",
        dataType: "text",
        url: myUrl,
        success: function(data)
        {
            //$("#resPelicula").html(JSON.parse(data).msg); Aqui iria lo que muestra por pantalla
        },
        error: function(err)
        {
            console.error("ERROR:", res.status, res.statusText);
        }
    })
}

function putReserva(reservaId)
{
    let myUrl = "/reservas/" + movieId;
    $.ajax({
        type: "PUT",
        dataType: "json",
        url: myUrl,
        data: movieData,
        success: function(data)
        {
            //$("#resReserva").html(JSON.parse(data).msg); Aqui iria lo que muestra por pantalla
        },
        error: function(err)
        {
            console.error("ERROR:", res.status, res.statusText);
        }
    })
}