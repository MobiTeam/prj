<?php 
  
function service_ping($host, $port, $timeout) {   

    $op = @fsockopen($host, $port, $errno, $errstr, $timeout);
    
    if (!$op) {	return 0; } 
    //DC is N/A
    else {
        fclose($op); //explicitly close open socket connection
        return 1; //DC is up & running, we can safely connect with ldap_connect
    }

}


// Login function on the LDAP server
function auth($login, $password, $ad) { 
	        
	if(($ldap = ldap_connect($ad['server'], $ad['port'])) && service_ping($ad['server'],$ad['port'],1)) {
	
        ldap_set_option($ldap, LDAP_OPT_PROTOCOL_VERSION, 3); //Enable ldap protocol version 3

		return @ldap_bind($ldap, $login, $password);

	} else {

		return 0;
	
    }					
	
}	  
				
?>