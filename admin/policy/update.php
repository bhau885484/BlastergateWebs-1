<?php
include("../conn-web/cw.php");



$pid =$_REQUEST['pid'];



$getdata="select * from tbl_policy where id=$pid";  
$gdata=mysqli_query($connect,$getdata);
$single_data=mysqli_fetch_array($gdata);

$title=mysqli_real_escape_string($connect,$_REQUEST['title']); 
$description=mysqli_real_escape_string($connect,$_REQUEST['description']); 

$updt="update tbl_policy set title='$title',description='$description' where id = $pid "; 
mysqli_query($connect,$updt);

header('Location:view.php?add=2'); 
Exit();
	
?>