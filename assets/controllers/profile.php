<?php
ini_set('display_errors', 1);
ini_set('error_reporting', -1);
define('MODX_API_MODE', true);
require_once dirname(dirname(dirname(__FILE__))) . '/index.php';

$modx->getService('error', 'error.modError');
$modx->setLogLevel(modX::LOG_LEVEL_ERROR);
$modx->setLogTarget('FILE');

if (empty($_POST['action'])) {
  return;
}

// $authFailMsg = 'Неправильное имя пользователя или пароль. Пожалуйста, проверьте введённые данные и попытайтесь снова.';
$authFailMsg = 'no user';

function sendMail($address, $msg, $subject, &$modx)
{
  $modx->getService('mail', 'mail.modPHPMailer');
  $modx->mail->set(modMail::MAIL_BODY, $msg);
  $modx->mail->set(modMail::MAIL_FROM, $modx->getOption('contact_email'));
  $modx->mail->set(modMail::MAIL_FROM_NAME, 'Магазин lemarc.ru');
  $modx->mail->set(modMail::MAIL_SUBJECT, $subject);
  $modx->mail->address('to', $address);
  $modx->mail->setHTML(true);
  if (!$modx->mail->send()) {
    $modx->log(modX::LOG_LEVEL_ERROR, 'An error occurred while trying to send the email: ' . $modx->mail->mailer->ErrorInfo);
  }
  $modx->mail->reset();
}

function createSMSCode($uid, &$modx)
{
  $usms = $modx->newObject('userSMS');
  $usms->code = rand(1000, 9999);
  $usms->refreshtime = date('Y-m-d H:i:s', strtotime('+1 minute'));
  $usms->uid = $uid;
  $usms->save();
  // send code via SMS API
}

switch ($_POST['action']) {
  case 'registerUserAndSendCode':
    $userData = [
      'email' => $_POST['email'],
      'fullname' => $_POST['fio'],
      'password' => $_POST['password'],
      'phone' => preg_replace('/\D/', '', $_POST['phone']),
      'spam' => $_POST['spam'] == 'false' ? 0 : 1,
    ];
    $q = $modx->newQuery('modUserProfile');
    $q->where([
      [
        'email' => $userData['email']
      ],
      [
        'hone' => $userData['phone']
      ]
    ], xPDOQuery::SQL_OR);

    if ($modx->getObject('modUserProfile', $q)) {
      $res = json_encode(['success' => false, 'error' => 'Пользователь с такими учетными данными уже существует.']);
      break;
    }

    $user = $modx->newObject('modUser');
    $user->set('username', $userData['email']);
    $user->set('password', $userData['password']);
    $user->set('active', 0);
    $user->save();

    $userhash = md5(json_encode($userData) + date('Ymdhis'));
    $profile = $modx->newObject('modUserProfile');
    $profile->set('fullname', $userData['fullname']);
    $profile->set('email', $userData['email']);
    $profile->set('phone', $userData['phone']);
    $profile->set('extended', json_encode(['allowSpam' => $userData['spam'], 'emailConfirmed' => 0, 'emailHash' => $userhash]));
    $user->addOne($profile);
    $profile->save();
    $user->joinGroup($modx->getOption('default_user_group'));
    $user->save();

    $confirmLink = $modx->getOption('email_confirm_base_url') . '?u=' . $profile->internalKey . '&hash=' . $userhash;

    sendMail($userData['email'], 'Для подтверждения почты перейдите по <a href="' . $confirmLink . '" target="_blank">ссылке</a>', 'Регистрация на сайте Lemarc.ru', $modx);

    // sms code
    createSMSCode($profile->internalKey, $modx);

    $res = json_encode(['success' => true, 'codesent' => true]);
    break;

  case 'sendPhoneCode':
    $phone = preg_replace('/\D/', '', $_POST['phone']);
    $profile = $modx->getObject('modUserProfile', ['phone' => $phone]);
    if (!$profile) {
      $res = json_encode(['success' => false, 'error' => 'Пользователя с таким телефоном не существует!']);
      break;
    }
    $code = $modx->getObject('userSMS', ['uid' => $profile->internalKey]);
    if ($code) {
      if ($code->refreshtime > date('Y-m-d H:i:s')) {
        $res = json_encode(['success' => false, 'error' => 'Мы уже отправили вам код, повторно запросить код можно через минуту после предыдушей попытки!']);
        break;
      }
      $modx->removeCollection('userSMS', ['uid' => $profile->internalKey]);
    }

    // sms code
    createSMSCode($profile->internalKey, $modx);
    // send code via API
    $res = json_encode(['success' => true, 'codesent' => true]);
    break;
  case 'checkPhoneCode':
    $continue = $_POST['mode'];
    $code2test = $_POST['code'];
    $phone = preg_replace('/\D/', '', $_POST['phone']);
    $profile = $modx->getObject('modUserProfile', ['phone' => $phone]);
    if (!$profile) {
      $res = json_encode(['success' => false, 'error' => 'Пользователя с таким телефоном не существует!']);
      break;
    }
    $code = $modx->getObject('userSMS', ['uid' => $profile->internalKey]);
    if ($code && $code->code == $code2test) {
      $user = $modx->getObject('modUser', ['id' => $profile->internalKey]);
      $user->active = 1;
      $user->save();
      $code->remove();
      $res = json_encode(['success' => true]);
      if ($continue == 'login') {
        $user->addSessionContext('web');
      }
      if ($continue == 'changepass') {
        $token = md5('slm' . date('Ymdhis'));
        $ext = $profile->get('extended');
        $ext['passwordToken'] = $token;
        $profile->set('extended', json_encode($ext));
        $res = json_encode(['success' => true, 'token' => $token]);
      }
      break;
    }
    $res = json_encode(['success' => false, 'error' => 'Неверный код подтверждения, убедитесь в правильности ввода или запросите новый код.']);
    break;
  case 'defaultAuth':
    $login = $_POST['login'];
    $pass = $_POST['password'];

    $p = $modx->getObject('modUserProfile', ['email' => $login]);
    if (!$p) {
      $p = $modx->getObject('modUserProfile', ['phone' => preg_replace('/\D/', '', $login)]);
    }

    if ($p) {
      $user = $modx->getObject('modUser', ['id' => $p->internalKey]);
      $authData = [
        'username' => $user->username,
        'password' => $pass,
        'rememberme' => 1,
        'login_context' => 'web',
      ];
      $response = $modx->runProcessor('/security/login', $authData);
      if ($response->isError()) {
        $res = json_encode(['success' => false, 'error' => $response->getMessage()]);
        break;
      }
      $res = json_encode(['success' => true]);
    } else {
      $res = json_encode(['success' => false, 'error' => $authFailMsg]);
    }
    break;
  case 'changePassword':
    $phone = preg_replace('/\D/', '', $_POST['phone']);
    $pass = $_POST['password'];
    $token = $_POST['token'];

    $p = $modx->getObject('modUserProfile', ['phone' => $phone]);

    if ($p) {
      $ext = $p->get('extended');
      if ($ext['passwordToken'] != $token) {
        $res = json_encode(['success' => false, 'error' => 'Токен смены пароля не совпадает, попрбуйте начать сначала.']);
      }
      $user = $modx->getObject('modUser', ['id' => $p->internalKey]);
      $user->set('password', $pass);
      $user->save();
      $user->addSessionContext('web');
      $res = json_encode(['success' => true]);
    } else {
      $res = json_encode(['success' => false, 'error' => 'Пользователь с указанным номером телефона не найден.']);
    }
    break;
}

if (!empty($res)) {
  die($res);
} else {
  die($res = json_encode(['success' => false, 'msg' => 'Нет такого ендпоинта.']));
}

@session_write_close();
