function cargarContenidoInicio() {  
    setInterval(cambiarImagen, 1000);  

    cargarParrillaSugerencias();

    document.getElementById("cajaBusqueda").addEventListener("keyup", function() {
        if (event.keyCode === 13) {
            location.href='html/explorar.html?buscar=' + cajaBusqueda.value;
          }
    });
}

function cambiarImagen() {
    if(typeof numImagen == 'undefined') {
        numImagen = 0;
    }
    var novedadesImagen = document.getElementById("novedadesImagen");
    var imagenes = [
        "/img/paseImagenes/imagen1.png",
        "/img/paseImagenes/imagen2.png",
        "/img/paseImagenes/imagen3.png"
    ]

    switch(numImagen) {
        case 0:
            novedadesImagen.src = imagenes[numImagen];
            numImagen++;
            break;
        case 1:
            novedadesImagen.src = imagenes[numImagen];
            numImagen++;
            break;
        case 2:
            novedadesImagen.src = imagenes[numImagen];
            numImagen = 0;
            break;
    }
}

function cargarParrillaSugerencias() {
    getElementos("1", "SELECT id, nombre, foto FROM productos ORDER BY RAND() LIMIT 10");
}

function crearParrilla(elementos, parrilla) {
    var parrillaDestino = document.getElementById(parrilla);

    // Variables que se va a utilizar en el bucle
    var parrillaItem;
    var parrillaImg;
    var parrillaTexto;
    var parrillaEnlace;
    var parrillaCaracteristicas;

    parrillaDestino.innerHTML = ""; // Se vacia en caso de que se vaya a refrescar

    for(var i = 0; i < elementos.length; i++) {
        parrillaItem = document.createElement("li");
        parrillaItem.className = "parrillaItem";
        
        parrillaTexto = document.createElement("p");
        parrillaTexto.innerHTML = elementos[i][1];

        // Se cambian los nombres de los filtros (caracterísiticas) por unos más familiares
        if(elementos[i][3] != null) {
            elementos[i][3] = procesarFiltros(elementos[i][3]);
        }
        parrillaCaracteristicas = document.createElement("p");
        parrillaCaracteristicas.className = "parrillaCaracteristicas elementoOculto";
        parrillaCaracteristicas.innerHTML = elementos[i][3];

        parrillaEnlace = document.createElement("a");
        parrillaEnlace.title = elementos[i][1];
        parrillaEnlace.href = "/html/explorar.html?ref=" + elementos[i][0];

        parrillaImg = document.createElement("img");
        parrillaImg.src = elementos[i][2];

        parrillaEnlace.appendChild(parrillaImg);
        parrillaEnlace.appendChild(parrillaTexto);
        parrillaEnlace.appendChild(parrillaCaracteristicas);

        parrillaItem.appendChild(parrillaEnlace);
        parrillaDestino.appendChild(parrillaItem);
    }
}

function mostrarOcultarBusqueda() {
    var cabecera = document.getElementById("cabecera");
    var cabeceraBusqueda = document.getElementById("cabeceraBusqueda");
    var cabeceraBotonBusqueda = document.getElementById("cabeceraBotonBusqueda");
    var overlay = document.getElementById("overlay");

    /* Comprueba si se está mostrando el menú. Si es el caso lo cierra */
    if(!document.getElementById("menu").className.includes("elementoOculto")) {
        mostrarOcultarMenu();
    }

    if(cabeceraBusqueda.className.includes("cabeceraBusquedaAlt")) {
        cabeceraBusqueda.className = cabeceraBusqueda.className.replace("cabeceraBusquedaAlt", "");
        cabecera.className = cabecera.className.replace("altura120", "altura60");
        cabeceraBotonBusqueda.className = cabeceraBotonBusqueda.className.replace(" enlaceAltPulsado", "")
        overlay.className = overlay.className.replace("elementoOculto", "");
    } else {
        cabeceraBusqueda.className = cabeceraBusqueda.className + "cabeceraBusquedaAlt";
        cabecera.className = cabecera.className.replace("altura60", "altura120");
        cabeceraBotonBusqueda.className = cabeceraBotonBusqueda.className + " enlaceAltPulsado";
        overlay.className = overlay.className + "elementoOculto";
    }

    /* Añade funcionalidad al overlay */
    overlay.removeEventListener("click", mostrarOcultarMenu);
    overlay.addEventListener("click", mostrarOcultarBusqueda);
}

function mostrarOcultarMenu() {
    var menu = document.getElementById("menu");
    var cabeceraBotonMenu = document.getElementById("cabeceraBotonMenu");
    var overlay = document.getElementById("overlay");
    var submenus = [
        document.getElementById("submenuTipoDispositivo"),
        document.getElementById("submenuWereables"),
        document.getElementById("submenuAccesorios"),
    ]
    var enlacesSubmenu = [
        document.getElementById("enlaceSubmenuTipoDispositivo"),
        document.getElementById("enlaceSubmenuWereables"),
        document.getElementById("enlaceSubmenuAccesorios"),
    ]

    /* Comprueba si se está mostrando la búsqueda (en modos tablet/móvil). Si es el caso lo cierra */
    if(document.getElementById("cabeceraBusqueda").className.includes("cabeceraBusquedaAlt")) {
        mostrarOcultarBusqueda();
    }


    if(menu.className.includes("elementoOculto")) {
        cabeceraBotonMenu.className = cabeceraBotonMenu.className + " enlaceAltPulsado";
        overlay.className = overlay.className.replace("elementoOculto", "");
    } else {
        cabeceraBotonMenu.className = cabeceraBotonMenu.className.replace(" enlaceAltPulsado", "");
        overlay.className = overlay.className + "elementoOculto";
    }
    
    mostrarOcultarElemento(menu.id);

    /* Añade funcionalidad al overlay */
    overlay.removeEventListener("click", mostrarOcultarBusqueda);
    overlay.addEventListener("click", mostrarOcultarMenu);

}

function buscar(textoIntroducido) {
    var consulta;
    if(textoIntroducido.length >= 2) {
        consulta = "(SELECT nombre as resultados, 'producto' as tabla, id FROM productos WHERE nombre LIKE '%" + textoIntroducido + "%') UNION (SELECT nombre as resultados, 'tienda' as tabla, id FROM tiendas WHERE nombre LIKE '%" + textoIntroducido + "%') UNION (SELECT nombre as resultados, 'categoria' as tabla, id FROM categorias WHERE nombre LIKE '%" + textoIntroducido + "%') UNION (SELECT nombre as resultados, 'subcategoria' as tabla, id FROM subcategorias WHERE nombre LIKE '%" + textoIntroducido + "%') LIMIT 6";
        getElementos("2", consulta);
    } else {
        document.getElementById("resultadosBusqueda").innerHTML = "";
    }
}

function mostrarResultadosBusqueda(resultados) {
    var resultadosBusqueda = document.getElementById("resultadosBusqueda");
    var resultado;
    var resultadoProcedencia;

    resultadosBusqueda.innerHTML = "";

    if(resultados.length == 0) {
        resultado = document.createElement("p");
        resultado.className = "resultadoBusqueda";
        resultado.innerHTML = "No se han encontrado resultados";

        resultadosBusqueda.appendChild(resultado);
    } else {
        for(var i = 0; i < resultados.length; i++) {
            resultado = document.createElement("a");
            resultado.className = "resultadoBusqueda";
            resultado.innerHTML = resultados[i][0];
            resultado.title = resultados[i][0];

            if(resultados[i][1] == "producto") {
                resultado.href = "/html/explorar.html?ref=" + resultados[i][2];
            } else if(resultados[i][1] == "tienda") {
                resultado.href = "/html/explorar.html?tienda=" + resultados[i][2];
            } else if(resultados[i][1] == "categoria") {
                if(resultados[i][2] == "1") {
                    resultado.href = "/html/explorar.html?cat=1,2";
                } else if(resultados[i][2] == "2") {
                    resultado.href = "/html/explorar.html?cat=3,4";
                } else if(resultados[i][2] == "3") {
                    resultado.href = "/html/explorar.html?cat=5,6,7,8";
                } else if(resultados[i][2] == "4") {
                    resultado.href = "/html/explorar.html?cat=9";
                }
            } else if(resultados[i][1] == "subcategoria") {
                resultado.href = "/html/explorar.html?cat=" + resultados[i][2];
            }

            resultadoProcedencia = document.createElement("b");
            resultadoProcedencia.innerHTML = "  " + resultados[i][1];
    
            resultado.appendChild(resultadoProcedencia);
            resultadosBusqueda.appendChild(resultado);
        }
    }
}

function mostrarOcultarElemento(idElemento) {
    var elemento = document.getElementById(idElemento);

    if(elemento.className.includes("elementoOculto")) {
        elemento.className = elemento.className.replace("elementoOculto", "");
    } else {
        elemento.className = elemento.className + "elementoOculto";
    }
}

function procesarFiltros(filtros) {
    var arrayFiltros = filtros.split(" ");
    var filtros = "";

    if(arrayFiltros.length > 0) {
        for(var i = 0; i < arrayFiltros.length; i++) {
            switch(arrayFiltros[i]) {
                case "concha":
                    arrayFiltros[i] = "diseño de concha";
                    break;
                case "sos":
                    arrayFiltros[i] = "botón SOS";
                    break;
                case "mascamaras":
                    arrayFiltros[i] = "varias cámaras frontales/traseras";
                    break;
                case "todopantalla":
                    arrayFiltros[i] = "diseño 'todo pantalla'";
                    break;
                case "usbc":
                    arrayFiltros[i] = "USB tipo C";
                    break;
                case "jack35":
                    arrayFiltros[i] = "conexión para auriculares";
                    break;
                case "sumergible":
                    arrayFiltros[i] = "sumergible";
                    break;
                case "tactil":
                    arrayFiltros[i] = "pantalla táctil";
                    break;
                case "nfc":
                    arrayFiltros[i] = "conectividad NFC";
                    break;
                case "wifi":
                    arrayFiltros[i] = "conectividad WiFi";
                    break;
                case "duro":
                    arrayFiltros[i] = "material duro";
                    break;
                case "cubrepantalla":
                    arrayFiltros[i] = "cubre la pantalla";
                    break;
                case "plastico":
                    arrayFiltros[i] = "de plástico";
                    break;
                case "vidrio":
                    arrayFiltros[i] = "de vídrio";
                    break;
                case "apple":
                    arrayFiltros[i] = "conector Lightning";
                    break;
                case "microusb":
                    arrayFiltros[i] = "conector microUSB";
                    break;
                case "usbc":
                    arrayFiltros[i] = "USB tipo C";
                    break;
                case "adaptador":
                    arrayFiltros[i] = "Adaptador SD incluido";
                    break;
                case "8g":
                    arrayFiltros[i] = "8 GB";
                    break;
                case "16g":
                    arrayFiltros[i] = "16 GB";
                    break;
                case "32g":
                    arrayFiltros[i] = "32 GB";
                    break;
                case "64g":
                    arrayFiltros[i] = "64 GB";
                    break;
                case "128g":
                    arrayFiltros[i] = "128 GB";
                    break;
                case "256g":
                    arrayFiltros[i] = "256 GB";
                    break;
                case "samsung":
                    arrayFiltros[i] = "para dispositivos Samsung";
                    break;
                case "cualquiera":
                    arrayFiltros[i] = "para cualquier dispositivo";
                    break;
            }

            if(i == 0) {
                filtros = arrayFiltros[i].charAt(0).toUpperCase() + arrayFiltros[i].slice(1) + " ";
            } else {
                filtros = filtros + arrayFiltros[i];
            }
        }
    }

    return filtros;
}

function enviarFormulario() {
    var formulario = document.contacto;
    var consulta = "INSERT INTO formularios VALUES('" + document.contacto[0].value + "', '" + document.contacto[1].value + "', '" + document.contacto[2].value + "', '" + document.contacto[3].value + "', '" + document.contacto[4].value + "')";
    var peticion = new XMLHttpRequest();
    peticion.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            alert('Se han enviado los datos. Muchas gracias.');
        }
    };

    console.log("INFO> Se va a consultar al servidor: " + consulta);
    peticion.open("GET","/php/formularios.php?consulta=" + consulta, true);
    peticion.send();
}

/* Funciones PHP */
function getElementos(accion, consulta) {
    var elementos = new Array();
    var respuesta;
    var peticion = new XMLHttpRequest();
    peticion.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if(this.responseText != "") {
                console.log("INFO> El servidor ha respondido: " + this.responseText);
                elementos = eval("(" + this.responseText + ")");
            } else {
                console.log("INFO> El servidor ha enviado una respuesta vacía.")
            }

            switch(accion) {
                case "1":
                    crearParrilla(elementos, "parrillaSugerencias");
                    break;
                case "2":
                    mostrarResultadosBusqueda(elementos);
                    break;
                case "3":
                    crearParrilla(elementos, "parrillaExplorar");
                    break;
                case "4":
                    rellenarMapa(elementos);
                    break;
            }

        }
    };
    console.log("INFO> Se va a consultar al servidor: " + consulta);
    peticion.open("GET","/php/productos.php?consulta=" + consulta, true);
    peticion.send();
}