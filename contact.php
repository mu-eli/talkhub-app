<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {

  if (!empty($_POST["website"])) {
        echo "error";
        exit;
    }

    $recaptchaSecret = "6Lcv3OwrAAAAAObonrfXL75QjZDWQzWnv3EjfeMX";
    $recaptchaResponse = $_POST["g-recaptcha-response"] ?? "";

    if (!empty($recaptchaSecret)) {
        if (empty($recaptchaResponse)) {
            echo "error";
            exit;
        }

        $verifyResponse = file_get_contents(
            "https://www.google.com/recaptcha/api/siteverify?secret={$recaptchaSecret}&response={$recaptchaResponse}"
        );
        $responseData = json_decode($verifyResponse);

        if (!$responseData->success) {
            echo "error";
            exit;
        }
    }

    $fullname = htmlspecialchars(trim($_POST["fullname"] ?? ""));
    $email = htmlspecialchars(trim($_POST["email"] ?? ""));
    $message = htmlspecialchars(trim($_POST["Message"] ?? ""));

    if (empty($fullname) || empty($email) || empty($message)) {
        echo "error";
        exit;
    }

    $to = "info@elmwo.com";
    $subject = "New connection message: $fullname";
    $body = "Ad Soyad: $fullname\nE-posta: $email\n\nMesaj:\n$message";
    $headers = "From: $email\r\nReply-To: $email";

    if (mail($to, $subject, $body, $headers)) {
        echo "success";
    } else {
        error_log("Mail sending failed for: " . json_encode($_POST));
        echo "error";
    }
}
?>
