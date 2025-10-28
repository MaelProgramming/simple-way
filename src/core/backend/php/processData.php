<?php
header('Content-Type: application/json');

$input = json_decode(file_get_contents('php://input'), true);
$data = $input['data'] ?? null;

echo json_encode([
    "received" => $data,
    "processedAt" => date('c')
]);
