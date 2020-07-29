"use strict"

function mostrarOcultarMenu() {
    var menu = document.getElementById("menu");
    var cabeceraBotonMenu = document.getElementById("cabeceraBotonMenu");
    var overlay = document.getElementById("overlay");
    var submenus = [document.getElementById("submenuTipoDispositivo"), document.getElementById("submenuWereables"), document.getElementById("submenuAccesorios")];
    var enlacesSubmenu = [document.getElementById("enlaceSubmenuTipoDispositivo"), document.getElementById("enlaceSubmenuWereables"), document.getElementById("enlaceSubmenuAccesorios")];

    /* Comprueba si se está mostrando la búsqueda (en modos tablet/móvil). Si es el caso lo cierra */
    if (document.getElementById("cabeceraBusqueda").className.includes("cabeceraBusquedaAlt")) {
        mostrarOcultarBusqueda();
    }

    if (menu.className.includes("elementoOculto")) {
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

function mostrarOcultarBusqueda() {
    var cabecera = document.getElementById("cabecera");
    var cabeceraBusqueda = document.getElementById("cabeceraBusqueda");
    var cabeceraBotonBusqueda = document.getElementById("cabeceraBotonBusqueda");
    var overlay = document.getElementById("overlay");

    /* Comprueba si se está mostrando el menú. Si es el caso lo cierra */
    if (!document.getElementById("menu").className.includes("elementoOculto")) {
        mostrarOcultarMenu();
    }

    if (cabeceraBusqueda.className.includes("cabeceraBusquedaAlt")) {
        cabeceraBusqueda.className = cabeceraBusqueda.className.replace("cabeceraBusquedaAlt", "");
        cabecera.className = cabecera.className.replace("altura120", "altura60");
        cabeceraBotonBusqueda.className = cabeceraBotonBusqueda.className.replace(" enlaceAltPulsado", "");
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

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { search: "" }

        this.handleSearchKeyUp = this.handleSearchKeyUp.bind(this);
    }

    render() {
        return (
            <header id="cabecera" className="altura60">
                <div id="cabeceraLogo" >
                    <a href="/index.html" title="Volver a la página principal"><img src="/img/logo.png" alt="Logo de buscaPhone" /></a>
                </div>

                <div id="cabeceraBotonMenu" className="enlaceAlt alinearIzquierda" onClick={mostrarOcultarMenu}>
                    <i className="material-icons">menu</i>
                    <p>Menú</p>
                </div>
                
                <div id="cabeceraBusqueda">
                    <div id="contenedorResultadosBusqueda" style={{position: "relative", width: 0, height: 0}}>
                            <div id="resultadosBusqueda"></div>
                    </div>
                    <input id="cajaBusqueda" type="text" placeholder="¿Buscas algo concreto?" onKeyUp={this.handleSearchKeyUp}/>
                    <input type="button" value="Buscar" onClick={this.searchFull} />
                </div>

                <div id="cabeceraBotonBusqueda" className="enlaceAlt alinearDerecha" onClick={mostrarOcultarBusqueda}>
                    <i className="material-icons">search</i>
                    <p>Buscar</p>
                </div>
            </header>
        );
    }

    handleSearchKeyUp(event) {
        this.setState({search: event.target.value});
        this.searchPreview();
    }

    searchPreview() {
        var consulta;
        if (this.state.search.length >= 2) {
            consulta = "(SELECT nombre as resultados, 'producto' as tabla, id FROM productos WHERE nombre LIKE '%" + this.state.search + "%') UNION (SELECT nombre as resultados, 'tienda' as tabla, id FROM tiendas WHERE nombre LIKE '%" + this.state.search + "%') UNION (SELECT nombre as resultados, 'categoria' as tabla, id FROM categorias WHERE nombre LIKE '%" + this.state.search + "%') UNION (SELECT nombre as resultados, 'subcategoria' as tabla, id FROM subcategorias WHERE nombre LIKE '%" + this.state.search + "%') LIMIT 6";
            getElementos("2", consulta);
        } else {
            document.getElementById("resultadosBusqueda").innerHTML = "";
        }
    }
    
    searchFull() {
        location.href='/html/explorar.html?buscar=' + this.state.search + '';
    }
}

ReactDOM.render(<NavBar />, document.querySelector("#nav-bar"));