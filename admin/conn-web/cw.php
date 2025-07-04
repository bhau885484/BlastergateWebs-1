<?php
ob_start();
session_start();
error_reporting(0);
date_default_timezone_set('America/New_York');
$dbhost ="localhost";
$dbuser="root";
$dbpwd="";
$dbname="blastergate";

// $dbuser="blastergate";
// $dbpwd="blastergate@12345678";
// $dbname="blastergate";


$connect=mysqli_connect($dbhost,$dbuser,$dbpwd,$dbname);

// $base_url= 'https://app.blastergate.com/admin';
// $image_url= 'https://app.blastergate.com/api/assets/images';
// $qr_url= 'https://app.blastergate.com/api/assets/qrcode';

$base_url= 'http://localhost/blastergate/admin';
$image_url= 'http://localhost/blastergate/api/assets/images';
$qr_url= 'http://localhost/blastergate/api/assets/qrcode';



$GOOGLE_MAP_RIDER_KEY = 'AIzaSyDTYoTj_UeBdzy9d3_-kNngDpwqQIzKDJk';


//mysql_select_db($dbname,$connect);
//$title="Nifno";
/*if(!$connect){
	echo 'not connected';
}else{
	echo 'connected';
}*/


?>