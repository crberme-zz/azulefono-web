function mostrarOcultarMapa() {
    mostrarOcultarElemento("contenedorMapa");
    mostrarOcultarElemento("overlayMapa");
}

function ponerMarcadores(consultaProductos) {
    var posicionIncialMapa = new google.maps.LatLng(40.4178283,-3.7153598);
    var opcionesMapa = {
        zoom: 15,
        center: posicionIncialMapa,
    };
    var consulta = "SELECT t.direccion, t.nombre, t.idTienda, p.nombre from tiendasdirecciones t, productos p where t.idTienda IN (" + consultaProductos.replace("id, nombre, foto,", "idTienda") + ")";

    mapa = new google.maps.Map(document.getElementById('mapa'), opcionesMapa);
    getElementos("4", consulta);
}

function rellenarMapa(elementos) {
    var coordenadas;
    var marcadores = Array();
    var marcador;

    for(var i = 0; i < elementos.length; i++) {
        coordenadas = new google.maps.LatLng(elementos[i][0].split(",")[0], elementos[i][0].split(",")[1]);

        marcador = new google.maps.Marker({
            position: coordenadas,
            map: mapa,
            title: elementos[i][1]
        });
        console.log(marcador);

        marcadores.push(marcador);
    }
}