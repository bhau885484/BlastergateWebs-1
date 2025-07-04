<?php
include("../conn-web/cw.php");



$pid =$_REQUEST['pid'];



$getdata="select * from tbl_extra_night_room where id=$pid";  
$gdata=mysqli_query($connect,$getdata);
$single_data=mysqli_fetch_array($gdata);

$title=mysqli_real_escape_string($connect,$_REQUEST['title']); 
$price=mysqli_real_escape_string($connect,$_REQUEST['price']); 
$people_available=mysqli_real_escape_string($connect,$_REQUEST['people_available']); 
$fee=mysqli_real_escape_string($connect,$_REQUEST['fee']); 

       

$updt="update tbl_extra_night_room set fee='$fee',title='$title',price='$price',people_available='$people_available' where id = $pid "; 
mysqli_query($connect,$updt);

header('Location:view.php?add=2'); 
Exit();
	
?>