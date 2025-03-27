<?php
//En este archivo se realiza la consulta a gemini para extraer los datos frontales de la INE.
$apiKey = "AIzaSyBEKvr9j1eq7Ik38rW2GF8c3lA92jfn11o";
$endpoint = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=$apiKey";

// Comprobar si el archivo ha sido recibido
if (isset($_FILES)) {
    $imageData = file_get_contents($_FILES['file']['tmp_name']);
    $base64Image = base64_encode($imageData);

    // $SecondimageData = file_get_contents("../assets/img/INE_Exp_1.png");
    // $Secondbase64Image = base64_encode($SecondimageData);


    // Preparar el cuerpo de la solicitud
    $requestData = [
        "contents" => [
            [
                "parts" => [
                    ["text" => "Saca el OCR y corrige todas las discrepancias que puede haber, despues acomoda los datos en Formtato JSON, las claves son: nombre, apellido paterno, apellido materno, estado de nacimiento (sacalo de su curp), sexo, fecha de nacimento, vigencia, curp, clave del lector, domicilio (separada las siguientes secciones tambien como claves: mz, lote, calle,codigo postal, numero interior, numero exterior, municipio, y estado) el formato que debe ser: clave con minusculas y si hay espacios pon guiones bajos y su informacion debe que tener formato la primera mayuscula si es nombres o calle, si son fechas pon en formato para html5 para solo poner el valor mas rapidamente y en vigencia solo traeras el valor de la vigencia limite.
                    Regresa todos los datos en mayusculas y que tenga coherencia los datos que me des, no puedes poner un apellido como nombre o nombre como apellido o cositas asi, evalua la informacion y regresala "],
                    // [
                    //     "inline_data" => [
                    //         "mime_type" => "image/png", // Otro tipo MIME para la segunda imagen
                    //         "data" => $Secondbase64Image, // Solo un valor para `data`, no un array
                    //     ]
                    // ],
                    [
                       
                        "inline_data" => [
                            "mime_type" => "image/jpeg", // Un solo tipo MIME
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


/*
"Saca el OCR y corrige todas las discrepancias que puede haber, despues acomoda los datos en Formtato JSON, las claves son: nombre, apellido paterno, apellido materno, estado de nacimiento (sacalo de su curp), sexo, fecha de nacimento, vigencia, curp, clave del lector, domicilio (separada las siguientes secciones tambien como claves: mz, lote, calle,codigo postal, numero interior, numero exterior, municipio, y estado) el formato que debe ser: clave con minusculas y si hay espacios pon guiones bajos y su informacion debe que tener formato la primera mayuscula si es nombres o calle, si son fechas pon en formato para html5 para solo poner el valor mas rapidamente y en vigencia solo trairas el valor de la vigencia limite.
                    Regresa todos los datos en mayusculas "
*/


/* 

Saca el OCR y corrige todas las discrepancias que puede haber, despues acomoda los datos en Formtato JSON, las claves seran: nombre, apellido paterno, apellido materno, estado de nacimiento (sacalo de su curp), sexo, fecha de nacimento, vigencia, curp, clave del lector, domicilio (separada las siguientes secciones tambien como claves: mz, lote, calle,codigo postal, numero interior, numero exterior, municipio, y estado), llevaras a cabo esto de la siguiente forma:
    1. Evalua la imagen de nombre 'INE_Exp_1.png', su contenido dicta la forma en que sacaras los datos, los contornos son solamente para que tengas referencia de las secciones en que se dividen la información:
        -La sección con contorno de color en codigo HEX #e92b8b pertenece a las claves de 'nombre', 'apellido paterno' y 'materno': Dentro del primer renglon encontraras la clave 'apellido paterno', en el segundo renglon encontraras la clave 'apellido materno', y en el tercero encontraras la clave 'nombre', ten en cuenta que el tercer renglon puede contener dos nombres, ambos los extraeras.
        -La sección con contorno de color en codigo HEX #5af282 pertenece a la seccion de Domilio, de esta seccion identificaras las claves 'mz', 'lote', 'calle','codigo postal', 'numero interior', 'numero exterior', 'municipio,' y 'estado'.
        -La sección con contorno de color en codigo HEX #ffb300 pertenece a las clave 'clave de lector'.
        -La sección con contorno de color en codigo HEX #ff002f pertenece a las clave 'curp'.
        -La sección con contorno de color en codigo HEX #9000ff pertenece a las clave 'fecha de nacimiento'.
        -La sección con contorno de color en codigo HEX #c3ff00 no se toma en cuenta.
        -La sección con contorno de color en codigo HEX #5bfaff no se toma en cuenta.
        -La sección con contorno de color en codigo HEX #ffe600 pertenece a las clave 'vigencia'.
        -La sección con contorno de color en codigo HEX #383eff pertenece a las clave 'sexo'.

    2. Una vez tengas en cuenta esta información, Saca la información de la segunda imagen enviada, nunca envies informacion referente a la imagen de nombre 'INE_Exp_1.png',  de no existir alguno de los campos o claves solicitadas deja el valor de la clave vacio.

*/


/* 
" 1. Evalua la siguiente imagen, su contenido dicta la forma en que sacaras los datos, los contornos son solamente para que tengas referencia de las secciones en que se dividen la información, no envies como respuesta informacion referente de la siguiente imagen, solamente escribe true si entendiste la instruccion:
-La sección con contorno de color en codigo HEX #e92b8b pertenece a las claves de 'nombre', 'apellido paterno' y 'materno': Dentro del primer renglon encontraras la clave 'apellido paterno', en el segundo renglon encontraras la clave 'apellido materno', y en el tercero encontraras la clave 'nombre', ten en cuenta que el tercer renglon puede contener dos nombres, ambos los extraeras.
-La sección con contorno de color en codigo HEX #5af282 pertenece a la seccion de Domilio, de esta seccion identificaras las claves 'mz', 'lote', 'calle','codigo postal', 'numero interior', 'numero exterior', 'municipio,' y 'estado'.
-La sección con contorno de color en codigo HEX #ffb300 pertenece a las clave 'clave de lector'.
-La sección con contorno de color en codigo HEX #ff002f pertenece a las clave 'curp'.
-La sección con contorno de color en codigo HEX #9000ff pertenece a las clave 'fecha de nacimiento'.
-La sección con contorno de color en codigo HEX #c3ff00 no se toma en cuenta.
-La sección con contorno de color en codigo HEX #5bfaff no se toma en cuenta.
-La sección con contorno de color en codigo HEX #ffe600 pertenece a las clave 'vigencia'.
-La sección con contorno de color en codigo HEX #383eff pertenece a las clave 'sexo'.

2.Una vez tengas en cuenta esta información, Saca la información de la siguiente imagen en Formtato JSON, con las mismas claves que eran: nombre, apellido paterno, apellido materno, estado de nacimiento (sacalo de su curp), sexo, fecha de nacimento, vigencia, curp, clave del lector, domicilio (separada las siguientes secciones tambien como claves: mz, lote, calle,codigo postal, numero interior, numero exterior, municipio, y estado) de no existir alguno de los campos o claves solicitadas deja el valor de la clave vacio."
*/