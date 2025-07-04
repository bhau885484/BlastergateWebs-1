<?php
include("../conn-web/cw.php");



$status=1;
$current_date = date('Y-m-d');



$title=mysqli_real_escape_string($connect,$_REQUEST['title']); 
$price=mysqli_real_escape_string($connect,$_REQUEST['price']); 
$people_available=mysqli_real_escape_string($connect,$_REQUEST['people_available']); 
$fee=mysqli_real_escape_string($connect,$_REQUEST['fee']); 

$sql="insert into tbl_extra_night_room(title,price,people_available,fee,created,status)values('$title','$price','$people_available','$fee','$current_date','$status')"; 

$qrs=mysqli_query($connect,$sql);
header('Location:view.php?add=1'); 
Exit();		


	
?>