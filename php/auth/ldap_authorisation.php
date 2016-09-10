<?php 
	
	session_start();

	// AD employees server global setting
	$ad_ugrasu = [
		"server" => "192.168.0.200", // address employees AD server
		"port" => "389", // port employees AD server 
		"domain" => "ugrasu.ru", // domain name of the employees AD server 
		"domain_short" => "ugrasu", // short domain name of the employees AD server 
		"search" => "OU=Университет, DC=ugrasu, DC=ru" // fio request
	];	

	$messages = [
				'succ' => [
							'text' => 'Успешная авторизация',
							'code' => '200'
						],
				'err'  => [
							'text' => 'Ошибка авторизации: Неправильные логин или пароль',
							'code' => '401'
						],
				'data' => [
							'text' => 'Ошибка выполнения запроса',
							'code' => '400'
						]
			];


	// default request
	$request = $messages['succ'];

	if(empty($_POST['login']) || empty($_POST['password'])) {
		$request = $messages['data'];
		die(json_encode($request, JSON_UNESCAPED_UNICODE));
	}

	require_once('ldap_functions.php');

	$clearLogin = $_POST['login'];
	
	if(($pos = strpos($clearLogin,"/")) !== false) {
		$clearLogin = substr($clearLogin, $pos + 1, strlen($clearLogin) - $pos);	
	} 								
		
	if(($pos = strpos($clearLogin,"@")) !== false){											
		$clearLogin = substr($clearLogin, 0, $pos);
	}

	if ((auth($clearLogin . "@" . $ad_ugrasu['domain'], $_POST['password'], $ad_ugrasu)==0)) {
	
		$request = $messages['err'];
		unset($_SESSION['u_login']);
		die(json_encode($request, JSON_UNESCAPED_UNICODE));
	
	} else {
		
		$_SESSION['u_login'] = $clearLogin;

		// authorisation example
		// TO-DO: get data from request
		
		$login  = 'a_gusakov';
		$passwd = 'a_gusakov';

		// configurate CURL connection
		$headers = array();
		$headers[] = 'Authorization: Basic ' . base64_encode ($login.":".$passwd);

		// ini curl connection
		$ch = curl_init();

		// $_SESSION['u_login'] = 'tey_d';

		curl_setopt($ch, CURLOPT_URL, 'http://192.168.0.60:8080/rpd/api/users/getByLogin?login=' . $_SESSION['u_login']);
		curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

		// exec request
		$server_output = curl_exec($ch);
		
		// closing connection
		curl_close ($ch);

		$request['userinfo'] = json_decode($server_output);	

	}

    echo(json_encode($request, JSON_UNESCAPED_UNICODE));

?>