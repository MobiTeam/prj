<?php
	
	// array of routes
	// default route include information 
	// about url adress, request method, and sending data

	return [
				'base' 	        => 'http://192.168.0.60:8080/rpd/api/',
				'allUsersInfo' 	=> [
									'url'  => 'users/getAll'									
							 	],
				'UserInfo'		=> [
									'url'  => 'users/getById/{{id}}'									
								],
				'UserLogin'		=> [
									'url'  => 'users/getByLogin'									
								],
				'OopCreate'		=> [
									'url'  => 'oop/create'									
								],
				'OopGet'		=> [
									'url'  => 'oop/getById?oopId={{oopId}}',
									'par'  => ['oopId'],
									'type' => 'GET'
								],
				'OopSave'		=> [
									'url'  		        => 'oop/update?oopId={{data.id}}',
									'par'  				=> ['data.id'],
									'type'				=> 'POST',
									'onlyJSON'          => true,
									'additionalHeaders' => ['Content-Type: application/json; charset=utf-8']
								],
				'OopDelete'		=> [
									'url'  => 'oop/delete?oopId={{oopId}}',
									'par'  => ['oopId'],
									'type' => 'DELETE'
								],
				'GetUserOop'	=> [
									'url'  => 'oop/getUserOop?userId={{userId}}',
									'par'  => ['userId'],
									'type' => 'GET'
								],
				'SetPractice'  => [
									'url'  		=> 'oop/setTraningPractice?oopId={{oopId}}',
									'par'  		=> ['oopId'],
									'type' 		=> 'POST',
									'onlyJSON'  => true,
									'additionalHeaders' => ['Content-Type: application/json; charset=utf-8']
								],
				'traningPracticeGet' => [
									'url'	=> 'traningPractice/getAll',
									'type'	=> 'GET'
								],								
				'UnsetPractice' => [
									'url'  		=> 'oop/unsetTraningPractice?oopId={{oopId}}',
									'par'  		=> ['oopId'],
									'type' 		=> 'POST',
									'onlyJSON'  => true,
									'additionalHeaders' => ['Content-Type: application/json; charset=utf-8']
								],
				'FindCompanyByName' => [
									'url'  => 'company/findByName?companyName={{term}}',
									'par'  => ['term'],
									'type' => 'GET'
								]
			]	
?>