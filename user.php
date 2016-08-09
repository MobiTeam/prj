<?php 
	echo get_current_user();
	echo getenv('USERNAME');
	echo getenv('USER');
	// $username = getenv('USERNAME') ?: getenv('USER');
	// echo $username; // e.g. root or www-data
?>