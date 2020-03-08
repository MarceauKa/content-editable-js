<?php

/*
 * Example server: don't use it in production!
 */

$token = 'your-token';
$groups = [
    'default' => ['alert'],
    'homepage' => ['img', 'title', 'body'],
    'openings' => ['title', 'items'],
];

function response($data, int $http_code = 200) {
    http_response_code($http_code);
    header('Content-Type: application/json');
    header("Cache-Control: no-cache, must-revalidate");

    echo json_encode($data);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $header = getallheaders()['Authorization'];
    $expected = sprintf('Bearer %s', $token);

    if ($expected !== $header) {
        response('Authorization header is missing or invalid', 403);
    }

    $request = file_get_contents('php://input');

    try {
        $payload = json_decode($request, true);
    } catch (\Exception $e) {
        response('Invalid JSON payload', 422);
    }

    $group = $_GET['group'] ?? 'default';

    if (false === array_key_exists($group, $groups)) {
        response('Invalid group', 422);
    }

    $keys = $groups[$group];
    $values = array_filter($payload, function ($item) use ($keys) {
        return in_array($item['name'], $keys);
    });

    response($values, 200);
}

response('It works!', 200);
