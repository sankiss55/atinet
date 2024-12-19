<?php
if (isset($_FILES)) {
    require __DIR__ . '/vendor/autoload.php';
    $target_dir = "uploads/";
    $uploadOk = 1;
    $FileType = strtolower(pathinfo($_FILES["attachment"]["name"], PATHINFO_EXTENSION));
    $target_file = $target_dir . generateRandomString() . '.' . $FileType;
    // Check file size
    if ($_FILES["attachment"]["size"] > 500000) {
        header('HTTP/1.0 403 Forbidden');
        echo "Sorry, your file is too large.";
        $uploadOk = 0;
    }
    if ($FileType != "pdf" && $FileType != "png" && $FileType != "jpg") {
        header('HTTP/1.0 403 Forbidden');
        echo "Sorry, please upload a pdf file";
        $uploadOk = 0;
    }
    if ($uploadOk == 1) {

        if (move_uploaded_file($_FILES["attachment"]["tmp_name"], $target_file)) {
            $respuesta_fun = uploadToApi($target_file);
            unlink($target_file);
            echo json_encode($respuesta_fun['ParsedResults']);
            
        } else {
            header('HTTP/1.0 403 Forbidden');
            echo "Sorry, there was an error uploading your file.";
        }
    }
} else {
    header('HTTP/1.0 403 Forbidden');
    echo "Sorry, please upload a pdf file";
}

function uploadToApi($target_file)
{
    require __DIR__ . '/vendor/autoload.php';
    $fileData = fopen($target_file, 'r');
    $client = new \GuzzleHttp\Client();
    try {
        $r = $client->request('POST', 'https://api.ocr.space/parse/image', [
            'headers' => ['apiKey' => 'K87768057788957'],
            'multipart' => [
                [
                    'name' => 'file',
                    'contents' => $fileData
                ],
                [
                    'name' => 'language',
                    'contents' => 'spa'
                ],
                [
                    'name' => 'isOverlayRequired',
                    'contents' => 'true'
                ],
                [
                    'name' => 'detectOrientation',
                    'contents' => 'true'
                ],
                [
                    'name' => 'scale',
                    'contents' => 'true'
                ],
                [
                    'name' => 'OCREngine',
                    'contents' => '2'
                ]
            ]

        ], ['file' => $fileData]);
        $response =  json_decode($r->getBody(), true);
        return $response;
    } catch (Exception $err) {
        header('HTTP/1.0 403 Forbidden');
        echo $err->getMessage();
    }
}

function generateRandomString($length = 10)
{
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
}
