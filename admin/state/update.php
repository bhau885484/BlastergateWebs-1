<?php
include("../conn-web/cw.php");
//include("function.php");
if(!$_SESSION["tata_login_username"]){
	header('location: index.php?mlogin=0'); 
}


$pid =$_REQUEST['pid'];


$modified = date('Y-m-d');

$country_id	=mysqli_real_escape_string($connect,$_REQUEST['country_id']); 

$my_str_arr = explode (",", $country_id);
$country_id = $my_str_arr[0];


$name=mysqli_real_escape_string($connect,$_REQUEST['state_name']); 
$state_code=mysqli_real_escape_string($connect,$_REQUEST['state_code']);  


$updt="update tbl_state set country_id='$country_id',name='$name',state_code='$state_code',modified='$modified' where id = $pid "; 
	mysqli_query($connect,$updt);

header('Location:view.php?add=2'); 
Exit();	



	
?>