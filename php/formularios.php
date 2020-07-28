<?php
$baseDatos = "9263-DM2E-buscaPhone";
if(isset($_REQUEST["consulta"])) {
    $consulta = $_REQUEST["consulta"];
}

$conexion = mysqli_connect('localhost', 'buscaPhone', 'buscaPhone1');
if (!$conexion) {
    die('No pudo conectarse a la base de datos.');
}

$baseDatos = "9263-dm2e-buscaphone";
if (!mysqli_select_db($conexion,$baseDatos)) {
    echo 'No se pudo seleccionar la base de datos';
    exit;
}

mysqli_select_db($conexion,$baseDatos);
$resultado = mysqli_query($conexion, $consulta) or die("");
exit;
?>