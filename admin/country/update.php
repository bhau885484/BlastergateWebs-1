<?php
include("../conn-web/cw.php");
//include("function.php");
if(!$_SESSION["tata_login_username"]){
	header('location: index.php?mlogin=0'); 
}


$pid =$_REQUEST['pid'];

$getdata="select * from tbl_countries where id=$pid";  
$gdata=mysqli_query($connect,$getdata);
$single_data=mysqli_fetch_array($gdata);



$modified = date('Y-m-d');

$country_name	=mysqli_real_escape_string($connect,$_REQUEST['country_name']); 
$country_code=mysqli_real_escape_string($connect,$_REQUEST['country_code']); 
$country_mobile_code=mysqli_real_escape_string($connect,$_REQUEST['country_mobile_code']); 


$updt="update tbl_countries set country_name='$country_name',country_code='$country_code',country_mobile_code='$country_mobile_code',modified='$modified' where id = $pid "; 
	mysqli_query($connect,$updt);

header('Location:view.php?add=2'); 
Exit();	



	
?>