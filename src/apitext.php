<?php
$apiKey = "AIzaSyBEKvr9j1eq7Ik38rW2GF8c3lA92jfn11o"; 
$endpoint = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=$apiKey";

$data = json_decode(file_get_contents("php://input"), true);

    $implode="";
if(is_array($data['url']) ){
    $implode=implode(" ", $data['url']);
}else{
    $implode=$data['url'];
}
$requestData = [
    "contents" => [
        [
            "parts" => [
                ["text" => "Establece en un formato JSON las siguientes claves: genero, nombre, apellido paterno,apellido materno (en las constancias morales no existira apellido paterno y materno solo nombre, ya que no son de personas fisicas), regimen fiscal (solo dame el nombre del regimen sin iniciar por 'Regimen de' o 'Regimen'), sexo (ponlo como: HOMBRE o MUJER), fecha de nacimiento o de costitucion (esta debe que estar en formato HTML5), vigencia, RFC, curp, correo, domicilio (separada las siguientes secciones tambien como claves: mz, lote, calle(incluye su tipo de calle ejmplo: cerrada),codigo postal, numero interior, numero exterior, municipio, y estado. Asigna su valor y no el nombre, las claves deben que estar en minusculas todas".$implode],
                
            ]
        ]
    ],
    "generationConfig" => [
        "response_mime_type" => "application/json",
        
    ]
];

// Inicializar cURL
$ch = curl_init($endpoint);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Content-Type: application/json"
]);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($requestData));

// Enviar la solicitud y obtener respuesta
$response = curl_exec($ch);

if (curl_errno($ch)) {
    echo "Error en cURL: " . curl_error($ch);
    curl_close($ch);
    exit;
}

//curl_close($ch);


    echo $response; 