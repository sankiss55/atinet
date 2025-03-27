<?php
//En este archivo se realiza la consulta a gemini para extraer los datos traseros de la INE.
$apiKey = "AIzaSyBEKvr9j1eq7Ik38rW2GF8c3lA92jfn11o"; 
$endpoint = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=$apiKey";

// Comprobar si el archivo ha sido recibido
if (isset($_FILES)) {
    $imageData = file_get_contents($_FILES['file']['tmp_name']);
    $base64Image = base64_encode($imageData);

    // Preparar el cuerpo de la solicitud
    $requestData = [
        "contents" => [
            [
                "parts" => [
                    ["text" => "Saca el OCR y corrige todas las discrepancias, despues acomoda los datos en Formtato JSON, las claves son: IDMEX, ZCR una vez encontrado IDMEX, el valor de ZCR se dara de la siguiente manera: asigna toda la demas informacion como parte del valor elimina todo signo que sea < o <<"],
                    [
                        "inline_data" => [
                            "mime_type" => "image/jpeg",
                            "data" => $base64Image
                        ]
                    ]
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

    curl_close($ch);

//Reenvio de respuesta a main_nuevo.js como formato JSON
        echo $response;
   
}
?>