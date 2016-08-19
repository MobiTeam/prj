<?php 

	// get query parameters
	$queryPar = $_POST;

	// get routes parameters
	$_ROUTES = require_once('routes.php');

	// authorisation example
	// TO-DO: get data from request
	$login  = 'V_Petrochenko';
	$passwd = 'v_petrochenko';

	// configurate CURL connection
	$headers = array();
	$headers[] = 'Authorization: Basic ' . base64_encode ($login.":".$passwd);

	// ini curl connection
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $_ROUTES['base'] . $_ROUTES['UserInfo']['url']);
	curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

	// exec request
	$server_output = curl_exec ($ch);
	
	// closing connection
	curl_close ($ch);

	echo $server_output;

	// some trash
	// TO-DO: delete this

	// curl_setopt($ch, CURLOPT_POST, 1);
	// curl_setopt($ch, CURLOPT_POSTFIELDS,$vars);  //Post Fields
	// curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

	// $headers[] = 'X-Apple-Tz: 0';
	// $headers[] = 'X-Apple-Store-Front: 143444,12';
	// $headers[] = 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8';
	// $headers[] = 'Accept-Encoding: gzip, deflate';
	// $headers[] = 'Accept-Language: en-US,en;q=0.5';
	// $headers[] = 'Cache-Control: no-cache';
	// $headers[] = 'Content-Type: application/x-www-form-urlencoded; charset=utf-8';
	// $headers[] = 'Host: www.example.com';
	// $headers[] = 'Referer: http://www.example.com/index.php'; //Your referrer address
	// $headers[] = 'User-Agent: Mozilla/5.0 (X11; Ubuntu; Linux i686; rv:28.0) Gecko/20100101 Firefox/28.0';
	// $headers[] = 'X-MicrosoftAjax: Delta=true';


?>