function crearOyentesFiltros() {
    var radiosCategorias = document.filtros.categoria;
    var radiosSubcategorias = [
        document.filtros.subcategoriaMoviles,
        document.filtros.subcategoriaWereables,
        document.filtros.subcategoriaAccesorios
    ]

    /* Oyente para los radio de las categorías */
    for(var i = 0; i < radiosCategorias.length; i++) {
        radiosCategorias[i].addEventListener("change", function() {
            mostrarFiltrosCategoria(this.value);
        })
    }

    /* Oyente para los checkbox de las subcategorías */
    for(var i = 0; i < radiosSubcategorias.length; i++) {
        for(var j = 0; j < radiosSubcategorias[i].length; j++) {
            radiosSubcategorias[i][j].addEventListener("change", function() {
                mostrarFiltrosSubcategoria(this.value);
            })
        }
    }
}

function getVariables(variable) {
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}

function cargarContenidoExplorar(consulta) {
    var subcategorias = getVariables('cat');
    var referencia = getVariables('ref');
    var tienda = getVariables('tienda');
    var nombre = getVariables('buscar');
    var condicion = "";
    
    if(subcategorias) { 
        condicion = "WHERE subcategoria IN (" + subcategorias + ") ";
        
        switch(subcategorias) {
            case "1":
                document.filtros.categoria[1].checked = true;
                mostrarFiltrosCategoria("Moviles");
                document.filtros.subcategoriaMoviles[1].checked = true;
                mostrarFiltrosSubcategoria("MovilBasico");
                break;
            case "2":
                document.filtros.categoria[1].checked = true;
                mostrarFiltrosCategoria("Moviles");
                document.filtros.subcategoriaMoviles[2].checked = true;
                mostrarFiltrosSubcategoria("Smartphone");
                break;
            case "1,2":
                document.filtros.categoria[1].checked = true;
                mostrarFiltrosCategoria("Moviles");
                break;
            case "3":
                document.filtros.categoria[2].checked = true;
                mostrarFiltrosCategoria("Wereables");
                document.filtros.subcategoriaWereables[1].checked = true;
                mostrarFiltrosSubcategoria("PulseraActividad");
                break;
            case "4":
                document.filtros.categoria[2].checked = true;
                mostrarFiltrosCategoria("Wereables");
                document.filtros.subcategoriaWereables[2].checked = true;
                mostrarFiltrosSubcategoria("Smartwatch");
                break;
            case "3,4":
                document.filtros.categoria[2].checked = true;
                mostrarFiltrosCategoria("Wereables");
                break;
            case "5":
                document.filtros.categoria[3].checked = true;
                mostrarFiltrosCategoria("Accesorios");
                document.filtros.subcategoriaAccesorios[1].checked = true;
                mostrarFiltrosSubcategoria("CarcasasFundas");
                break;
            case "6":
                document.filtros.categoria[3].checked = true;
                mostrarFiltrosCategoria("Accesorios");
                document.filtros.subcategoriaAccesorios[2].checked = true;
                mostrarFiltrosSubcategoria("ProtectoresPantalla");
                break;
            case "7":
                document.filtros.categoria[3].checked = true;
                mostrarFiltrosCategoria("Accesorios");
                document.filtros.subcategoriaAccesorios[3].checked = true;
                mostrarFiltrosSubcategoria("Cargadores");
                break;
            case "8":
                document.filtros.categoria[3].checked = true;
                mostrarFiltrosCategoria("Accesorios");
                document.filtros.subcategoriaAccesorios[4].checked = true;
                mostrarFiltrosSubcategoria("Almacenamiento");
                break;
            case "5,6,7,8":
                document.filtros.categoria[3].checked = true;
                mostrarFiltrosCategoria("Accesorios");
                break;
            case "9":
                document.filtros.categoria[4].checked = true;
                mostrarFiltrosCategoria("GafasRV");
                break;
        }
    }

    if(referencia) {
        condicion = "WHERE id = '" + referencia + "' ";
    }

    if(tienda) {
        condicion = "WHERE idTienda = '" + tienda + "' ";
        document.filtros.tienda.selectedIndex = tienda;
    }

    if(nombre) {
        condicion = "WHERE nombre LIKE '%" + nombre + "%' "
        document.getElementById("cajaBusqueda").value = nombre;
    }

    if(consulta == "") {
        consulta = "SELECT id, nombre, foto, filtros FROM productos " + condicion + "ORDER BY nombre";
    }

    /* Borra los parametros de la URL para que el usuario pueda modificar los filtros */
    window.history.replaceState({}, document.title, "/" + "html/explorar.html");

    ponerMarcadores(consulta);

    getElementos("3", consulta);
}

function actualizarParrilla() {
    var subcategoria = getSubcategoria();
    var filtro = getFiltro();
    var tienda = getTienda();
    var nombre = getNombre();

    var consulta = "SELECT id, nombre, foto, filtros FROM productos where subcategoria IN (" + subcategoria + ")" + filtro +  tienda + nombre + " ORDER BY nombre";
    cargarContenidoExplorar(consulta);
}

function getSubcategoria() {
    var radiosCategorias = document.filtros.categoria;
    var checkSubcategorias;
    var valorRadioSeleccionado = "1, 2, 3, 4, 5, 6, 7, 8, 9";

    /* Se comprueba la categoría seleccionada */
    for(var i = 0; i < radiosCategorias.length; i++) {

        if(radiosCategorias[i].checked) {

            switch(radiosCategorias[i].value) {
                case "Todas":
                    break;

                case "Moviles":
                    checkSubcategorias = document.filtros.subcategoriaMoviles;
                    valorRadioSeleccionado = "1, 2"; // Se muestran todas las subcategorías

                    /* Se comprueba si solo una de las subcategoría está seleccionada */
                    if(checkSubcategorias[0].checked) {
                        valorRadioSeleccionado = "1, 2";
                    } else if(checkSubcategorias[1].checked) {
                        valorRadioSeleccionado = "1";
                    } else if(checkSubcategorias[2].checked) {
                        valorRadioSeleccionado = "2";
                    }

                    break;
                case "Wereables":
                    checkSubcategorias = document.filtros.subcategoriaWereables;
                    valorRadioSeleccionado = "3, 4";

                    if(checkSubcategorias[0].checked) {
                        valorRadioSeleccionado = "3, 4";
                    } else if(checkSubcategorias[1].checked) {
                            valorRadioSeleccionado = "3";
                    } else if(checkSubcategorias[2].checked) {
                        valorRadioSeleccionado = "4";
                    }

                    break;
                case "Accesorios":
                    checkSubcategorias = document.filtros.subcategoriaAccesorios;
                    valorRadioSeleccionado = "5, 6, 7, 8";

                    if(checkSubcategorias[0].checked) {
                        valorRadioSeleccionado = "5, 6, 7, 8";
                    } else if(checkSubcategorias[1].checked) {
                        valorRadioSeleccionado = "5";
                    } else if(checkSubcategorias[2].checked) {
                        valorRadioSeleccionado = "6";
                    } else if(checkSubcategorias[3].checked) {
                        valorRadioSeleccionado = "7";
                    } else if(checkSubcategorias[4].checked) {
                        valorRadioSeleccionado = "8";
                    }

                    break;
                case "GafasRV":
                    valorRadioSeleccionado = "9";
                    break;
            }
        }
    }

    return valorRadioSeleccionado;
}

function getFiltro() {
    var filtros = new Array();
    var filtro = "";

    var grupoFiltrosArray = [
        document.filtros.filtroMovilBarato, document.filtros.filtroSmartphone,
        document.filtros.filtroPulseraActividad, document.filtros.filtroSmartwatch,
        document.filtros.filtroCaracteristicasCarcasasFundas,
        document.filtros.filtroCaracteristicasProtectoresPantalla,
        document.filtros.filtroCaracteristicasCargadores,
        document.filtros.filtroCaracteristicasAlmacenamiento,
        document.filtros.filtroCaracteristicasGafasRV
    ];
    var grupoFiltros;

    for(var i = 0; i < grupoFiltrosArray.length; i++) {
        grupoFiltros = grupoFiltrosArray[i];

        for(var j = 0; j < grupoFiltros.length; j++) {
            if(grupoFiltros[j].checked) {
                filtros.push(grupoFiltros[j].value);
            }
        }
    }

    for(var i = 0; i < filtros.length; i++) {
        if(i == 0) {
            filtro = " AND filtros LIKE '%" + filtros[i] + "%'";
        } else {
            filtro = filtro + " OR filtros LIKE '%" + filtros[i] + "%'";
        }
    }

    return filtro;
}

function getTienda() {
    var seleccionada = document.filtros.tienda[document.filtros.tienda.selectedIndex].value;

    if(seleccionada == "todas") {
        seleccionada = "";
    } else {
        seleccionada = " AND idTienda = '" + seleccionada + "'";
    }

    return seleccionada;
}

function getNombre() {
    var buscado = document.getElementById("cajaBusqueda").value;
    var nombre;

    if(buscado == "") {
        nombre = "";
    } else {
        nombre = " AND nombre LIKE '%" + buscado + "%'";
    }

    return nombre;
}

function mostrarFiltrosCategoria(categoria) {
    var categorias = ["Moviles", "Wereables", "Accesorios"];

    /* Se ocultan todas las subcategorías */
    for(var i = 0; i < categorias.length; i++) {
        if(!document.getElementById("filtrosCategoria" + categorias[i]).className.includes("elementoOculto")) {
            mostrarOcultarElemento("filtrosCategoria" + categorias[i]);
        }
    }

    /* Se desmarcan todos los filtros */
    desmarcarFiltros();

    /* Se muestra lo necesario */
    if(categoria == "GafasRV") {
        mostrarFiltrosSubcategoria(categoria);
    } else if(categoria != "Todas") {
        mostrarOcultarElemento("filtrosCategoria" + categoria);

        /* Para ocultar los filtros de las gafas RV cuando se pulsa otra categoría */
        if(!document.getElementById("filtrosSubcategoriaGafasRV").className.includes("elementoOculto")) {
            mostrarFiltrosSubcategoria("GafasRV");
        }
    } else {
        mostrarFiltrosSubcategoria(null);
    }
}

function mostrarFiltrosSubcategoria(subcategoria) {
    var subcategorias = [
        "filtrosSubcategoriaMovilBasico", "filtrosSubcategoriaSmartphone",
        "filtrosSubcategoriaPulseraActividad", "filtrosSubcategoriaSmartwatch",
        "filtrosSubcategoriaCarcasasFundas", "filtrosSubcategoriaProtectoresPantalla",
        "filtrosSubcategoriaCargadores", "filtrosSubcategoriaAlmacenamiento",
        "filtrosSubcategoriaGafasRV"
    ];
    var contenedorFiltros;
    
    if(subcategoria == null) {
        for(var i = 0; i < subcategorias.length; i++) {
            contenedorFiltros = document.getElementById(subcategorias[i]);
    
            if(!contenedorFiltros.className.includes("elementoOculto")) {
                mostrarOcultarElemento(contenedorFiltros.id);
            }
        }
    } else {
        for(var i = 0; i < subcategorias.length; i++) {
            contenedorFiltros = document.getElementById(subcategorias[i]);
    
            /* Se ocultan todos los filtros */
            if(!contenedorFiltros.className.includes("elementoOculto")) {
                mostrarOcultarElemento(contenedorFiltros.id);
            }
    
            /* Se muestra la subcategoría seleccionada */
            if(subcategorias[i] == "filtrosSubcategoria" + subcategoria) {
                mostrarOcultarElemento(contenedorFiltros.id);
            }
        }
    }

    /* Se desmarcan los filtros */
    var grupoFiltrosArray = [
        document.filtros.filtroMovilBarato, document.filtros.filtroSmartphone,
        document.filtros.filtroPulseraActividad, document.filtros.filtroSmartwatch,
        document.filtros.filtroCaracteristicasCarcasasFundas,
        document.filtros.filtroCaracteristicasProtectoresPantalla,
        document.filtros.filtroCaracteristicasCargadores,
        document.filtros.filtroCaracteristicasAlmacenamiento,
        document.filtros.filtroCaracteristicasGafasRV
    ];

    for(var i = 0; i < grupoFiltrosArray.length; i++) {
        grupoFiltros = grupoFiltrosArray[i];

        for(var j = 0; j < grupoFiltros.length; j++) {
            if(grupoFiltros[j].checked) {
                grupoFiltros[j].checked = false;
            }
        }
    }
}

function desmarcarFiltros() {
    var grupoFiltrosArray = [
        document.filtros.filtroMovilBarato, document.filtros.filtroSmartphone,
        document.filtros.filtroPulseraActividad, document.filtros.filtroSmartwatch,
        document.filtros.filtroCaracteristicasCarcasasFundas,
        document.filtros.filtroCaracteristicasProtectoresPantalla,
        document.filtros.filtroCaracteristicasCargadores,
        document.filtros.filtroCaracteristicasAlmacenamiento,
        document.filtros.filtroCaracteristicasGafasRV
    ];

    for(var i = 0; i < grupoFiltrosArray.length; i++) {
        grupoFiltros = grupoFiltrosArray[i];

        for(var j = 0; j < grupoFiltros.length; j++) {
            if(grupoFiltros[j].checked) {
                grupoFiltros[j].checked = false;
            }
        }
    }
}

function getNombreSubcategoria(num) {
    var nombresSubategoria = [
        "MovilBasico", "Smartphone",
        "PulseraActividad", "Smartwatch",
        "CarcasasFundas", "ProtectoresPantalla",
        "Cargadores", "Almacenamiento",
        "GafasRV"
    ];
    var nombre;

    nombre = nombresSubategoria[num+1];

    return nombre;
}

function cambiarVistaParrilla(vista) {
    var parrillaExplorar = document.getElementById("parrillaExplorar");
    var leyendaDetalle = document.getElementById("leyendaDetalle");

    if(vista == "detalle") {
        parrillaExplorar.className = "parrillaDetalle";
        leyendaDetalle.className = leyendaDetalle.className.replace("elementoOculto", "");
    } else if(vista == "ficha") {
        parrillaExplorar.className = "parrilla";
        leyendaDetalle.className = "elementoOculto"
    }
}