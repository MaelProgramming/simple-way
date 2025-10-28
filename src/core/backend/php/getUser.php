<?php
header('Content-Type: application/json');

$input = json_decode(file_get_contents('php://input'), true);
$userId = $input['userId'] ?? null;

$users = [
    "1" => ["id" => "1", "name" => "Mael"],
    "2" => ["id" => "2", "name" => "Alice"]
];

echo json_encode($users[$userId] ?? null);
