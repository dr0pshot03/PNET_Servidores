function getReserva(reservaId) {
    let myUrl = "/reservas/" + reservaId;
    $.ajax({
        type: "GET",
        dataType: "json",
        url: myUrl,
        success: function(data) {
	    $("#resPelicula").html(JSON.stringify(data[0]));
        },
        error: function(res) {
            let mensaje = JSON.parse(res.responseText);
            alert("ERROR: " + mensaje.msg);
        }
    });
}

function postReserva() {
    $.ajax({
        type: "POST",
        url: "/reservas",
        contentType: "application/json",
        dataType: "text",
        data: JSON.stringify({
            "title": "Dunkirk",
            "director": "Christopher Nolan",
            "year": 2017
        }),
        success: function(data) {
           $("#resPelicula").html(JSON.parse(data).msg);
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
	    	$("#resPelicula").html(JSON.stringify(data));
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
            //$("#resPelicula").html(JSON.parse(data).msg); Aqui iria lo que muestra por pantalla
        },
        error: function(err)
        {
            console.error("ERROR:", res.status, res.statusText);
        }
    })
}

function putMovie(reservaId)
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