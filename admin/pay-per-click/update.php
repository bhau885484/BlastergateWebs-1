<?php
include("../conn-web/cw.php");
//include("function.php");
if(!$_SESSION["tata_login_username"]){
	header('location: index.php?mlogin=0'); 
}


$pid =$_REQUEST['pid'];

$getdata="select * from tbl_users where id=$pid";  
$gdata=mysqli_query($connect,$getdata);
$single_data=mysqli_fetch_array($gdata);
           
$f_name=mysqli_real_escape_string($connect,$_REQUEST['f_name']); 
$l_name=mysqli_real_escape_string($connect,$_REQUEST['l_name']); 
$email=mysqli_real_escape_string($connect,$_REQUEST['email']); 
$phone=mysqli_real_escape_string($connect,$_REQUEST['phone']);

$country_mobile_code = mysqli_real_escape_string($connect,$_REQUEST['country_mobile_code']);


$updt="update tbl_users set f_name='$f_name',l_name='$l_name',email='$email',phone='$phone',country_mobile_code='$country_mobile_code' where id = $pid "; 
mysqli_query($connect,$updt);

header('Location:view.php?add=2'); 
Exit();
	
?>