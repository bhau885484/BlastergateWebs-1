<?php
include("../conn-web/cw.php");
//include("function.php");
if(!$_SESSION["tata_login_username"]){
	header('location: index.php?mlogin=0'); 
}




$status=1;
$created_by=1;
$created = date('Y-m-d');
$modified_by=1;
$modified = date('Y-m-d');

$country_id	=mysqli_real_escape_string($connect,$_REQUEST['country_id']); 

$my_str_arr = explode (",", $country_id);
$country_id = $my_str_arr[0];


$name=mysqli_real_escape_string($connect,$_REQUEST['state_name']); 
$state_code=mysqli_real_escape_string($connect,$_REQUEST['state_code']); 

 $sql="insert into tbl_state(country_id,name,state_code,status,created,created_by,modified,modified_by)values('$country_id','$name','$state_code','$status','$created','$created_by','$modified','$modified_by')"; 

$qrs=mysqli_query($connect,$sql);
header('Location:view.php?add=1'); 
Exit();	



	
?>