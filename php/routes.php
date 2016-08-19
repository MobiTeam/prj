<?php
	
	// array of routes
	// default route include information 
	// about url adress, request method, and sending data

	return [
				'base' 	        => 'http://192.168.0.60:8080/rpd/api/',
				'allUsersInfo' 	=> [
									'url'    => 'users/getAll',
									'method' => 'GET',
							 	],
				'UserInfo'		=> [
									'url'	 => 'users/getById/{{id}}',
									'method' => 'GET',
								],
				'UserLogin'		=> [
									'url'	 => 'users/getByLogin',
									'method' => 'GET',
								]			

			]	

 ?>