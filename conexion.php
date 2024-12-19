<?php
$conexion = mysqli_connect("localhost", "root", "123456", "atinet65_aplicativos");
$conexion->set_charset("utf8");
if (!$conexion) {
    echo "Error en la conexion 1";
} else {
}
$conexion2 = mysqli_connect("localhost", "root", "123456", "base_cat");
$conexion2->set_charset("utf8");
if (!$conexion2) {
    echo "Error en la conexion 2";
} else {
}
