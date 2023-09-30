<?php
header('Content-Type: application/json; charset=UTF-8'); // Set the response content type

$data = file_get_contents("php://input");
$activeUser = json_decode($data);

$gadaxdisIstoria = json_decode(file_get_contents('gadaxdisIstoria.json'), true);

if (!isset($gadaxdisIstoria['active'])) {
    $gadaxdisIstoria['active'] = [];
}

$gadaxdisIstoria['active'][] = $activeUser;

array_walk_recursive($gadaxdisIstoria, function (&$value) {
    if (is_string($value)) {
        $value = mb_convert_encoding($value, 'UTF-8', 'auto');
    }
});

file_put_contents('gadaxdisIstoria.json', json_encode($gadaxdisIstoria, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));

$response = ['message' => 'Data added successfully'];
echo json_encode($response);
?>
