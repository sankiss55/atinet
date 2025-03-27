<?php
//include('/home3/atinet65/notariosatinet.com.mx/utilerias_appliweb/conexion.php');
include('conexion.php');
$cp = $_POST['cp'];

// Consulta la base de datos para obtener el código postal
$sql = "SELECT d_asenta, D_mnpio, d_estado, d_ciudad FROM cat_cp WHERE d_codigo = '$cp'";
$result = $conexion2->query($sql);
$colonias = array();
$municipio = '';
$estado = '';
$ciudad = '';

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $municipio = $row['D_mnpio'];
    $estado = $row['d_estado'];
    $ciudad = $row['d_ciudad'];

    // Reiniciamos el puntero para obtener las colonias
    $result->data_seek(0);

    while ($row = $result->fetch_assoc()) {
        $colonia = $row['d_asenta'];
        
        // Verifica si la colonia ya se agregó antes
        if (!isset($coloniasUnicas[$colonia])) {
            $coloniasUnicas[$colonia] = true; // Marca la colonia como agregada
            $colonias[] = $colonia; // Agrega la colonia como una cadena
        }
    }    
} else {
    $municipio = '';
    $estado = '';
    $ciudad = '';
}

// Devolver el código postal como respuesta en formato JSON
echo json_encode([
    'municipio' => $municipio,
    'estado' => $estado,
    'ciudad' => $ciudad,
    'colonias' => $colonias
]);
?>