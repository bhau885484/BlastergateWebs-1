<?php
include("../conn-web/cw.php");
//include("function.php");
if(!$_SESSION["tata_login_username"]){
	header('location: index.php?mlogin=0'); 
}
$pid =$_REQUEST['pid'];
$status = $_REQUEST['status'];


 $updt="update tbl_room set status='$status' where id = $pid "; 
mysqli_query($connect,$updt);


	
header('Location:view.php?add=2'); 
Exit();		
?>