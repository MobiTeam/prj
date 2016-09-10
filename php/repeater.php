<?php 

	session_start();
	if(!isset($_POST)) die();

	function getArrayElementByString($array, $path) {

		$pathChunks = explode('.', $path);
		$basic = $array;

		for($i = 0; $i < count($pathChunks); $i++) {
			if(!empty($basic[$pathChunks[$i]])) {
				$basic = $basic[$pathChunks[$i]];
			}
		}
		return $basic;
	}

	// get routes parameters
	$_ROUTES = require_once('routes.php');

	$login  = $_SESSION['u_login'];
	$passwd = $_SESSION['u_login'];

	$that = $_POST['that'];
	
	// configurate CURL connection
	$headers = array();
	$headers[] = 'Authorization: Basic ' . base64_encode ($login.":".$passwd);
		
	// ini curl connection
	$ch = curl_init();
	
	if(!empty($_ROUTES[$that]['type'])) {
		curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $_ROUTES[$that]['type']);
	}

	$url_chunk = $_ROUTES[$that]['url'];

	if(!empty($_ROUTES[$that]['par'])) {
		// create query string
		foreach($_ROUTES[$that]['par'] as $par) {
			$url_chunk = str_replace("{{" . $par . "}}", getArrayElementByString($_POST, $par), $url_chunk);
		}
	} 

	curl_setopt($ch, CURLOPT_URL, $_ROUTES['base'] . $url_chunk);

	if(!empty($_ROUTES[$that]['type']) && $_ROUTES[$that]['type'] == "POST") {
		curl_setopt($ch, CURLOPT_POST, 1);
	}

	if(!empty($_ROUTES[$that]['onlyJSON'])) {
		curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($_POST['data']));
	} else curl_setopt($ch, CURLOPT_POSTFIELDS, $_POST);

	if(!empty($_ROUTES[$that]['additionalHeaders'])) {
		$headers = array_merge($headers, $_ROUTES[$that]['additionalHeaders']);
	}

	curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

	// exec request
	$server_output = curl_exec ($ch);
	
	// closing connection
	curl_close ($ch);

	echo $server_output;

?>