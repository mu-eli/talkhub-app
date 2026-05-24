<?php
if ($_SERVER["REQUEST_METHOD"] !== "POST") exit;

function clean(string $value): string {
    return htmlspecialchars(trim($value));
}

function bail(string $message = "error"): never {
    echo $message;
    exit;
}

if (!empty($_POST["website"])) bail();

$fullname = clean($_POST["fullname"] ?? "");
$email    = clean($_POST["email"]    ?? "");
$message  = clean($_POST["Message"]  ?? "");

if (!$fullname || !$email || !$message) bail();
if (!filter_var($email, FILTER_VALIDATE_EMAIL))  bail();

$to      = "info@elmwo.com";
$subject = "New connection message: $fullname";
$body    = "Ad Soyad: $fullname\nE-posta: $email\n\nMesaj:\n$message";
$headers = "From: $email\r\nReply-To: $email";

mail($to, $subject, $body, $headers) ? bail("success") : bail();