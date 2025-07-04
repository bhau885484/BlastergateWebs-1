<?php
// session_start();
// unset($_SESSION); 
// session_unset(); 

// unset($_COOKIE);
unset($_COOKIE['username']);
unset($_COOKIE['email']);
setcookie('username', '', -1, '/'); 
setcookie('email', '', -1, '/'); 

// print_r($_COOKIE);

header('location:index.php');
?> 
