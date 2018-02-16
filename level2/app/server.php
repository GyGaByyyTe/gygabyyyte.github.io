<?php

    $admin_email = 'admin@dev-lebedev.ru';
    $order_email = 'order@dev-lebedev.ru';

    $name = $_POST['user-name'];
    $phone = $_POST['user-phone'];
    $street = $_POST['user-street'];
    $house = $_POST['user-house'];
    $house_part = $_POST['user-house-part'];
    $appartment = $_POST['user-appartment'];
    $floor = $_POST['user-floor'];
    $comment = $_POST['user-comment'];
    $pay = $_POST['pay-option'];

    $disturb = $_POST['dont-disturb']; // 1 или null
    $disturb = isset($disturb) ? 'НЕТ' : 'ДА';

//            <li>Email: ' . $email . '</li>
    $mail_message = '
    <html>
    <head>
        <title>Заявка</title>
    </head>
    <body>
        <h2>Заказ</h2>
        <ul>
            <li>Имя:' . $name . '</li>
            <li>Телефон:' . $phone . '</li>
            <li>Улица:' . $street . '</li>
            <li>Дом:' . $house . '</li>
            <li>Корпус:' . $house_part . '</li>
            <li>Квартира:' . $appartment . '</li>
            <li>Этаж:' . $floor . '</li>
            <li>Способ оплаты: ' . $pay . '</li>
            <li>Комментарий к заказу: ' . $comment . '</li>
            <li>Нужно ли перезванивать клиенту: ' . $disturb . '</li>
        </ul>
    </body>
    </html>';

    $headers = "From: Администратор сайта <". $admin_email .">\r\n".
                "MIME-Version: 1.0" . "\r\n" .
                "Content-type: text/html; charset=UTF-8" . "\r\n";

    $mail = mail($order_email, 'Заказ', $mail_message, $headers);

    $data = [];

    if ($mail) {
        $data['status'] = "OK";
        $data['mes'] = "Письмо успешно отправлено";
    }else{
        $data['status'] = "NO";
        $data['mes'] = "На сервере произошла ошибка";
    }

    echo json_encode($data);

?>