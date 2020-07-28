<?php
if(isset($_REQUEST["consulta"])) {
    $consulta = $_REQUEST["consulta"];
}
$datos = Array();

$conexion = mysqli_connect('localhost', 'buscaPhone', 'buscaPhone1');

$baseDatos = "9263-dm2e-buscaphone";
mysqli_select_db($conexion,$baseDatos);

$resultado = mysqli_query($conexion, $consulta);

//$datos = $resultado->fetch_all(); // No funciona en el hosting

while ($fila = $resultado->fetch_array()) {
    $datos[] = $fila;
}

echo json_encode($datos);
exit;
?>