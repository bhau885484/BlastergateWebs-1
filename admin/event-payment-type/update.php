<?php
include("../conn-web/cw.php");



$pid =$_REQUEST['pid'];

$getdata="select * from tbl_event_payment_type where id=$pid";  
$gdata=mysqli_query($connect,$getdata);
$single_data=mysqli_fetch_array($gdata);

$payment_fee=mysqli_real_escape_string($connect,$_REQUEST['payment_fee']); 
$payment_description=mysqli_real_escape_string($connect,$_REQUEST['payment_description']); 


 $updt="update tbl_event_payment_type set payment_fee='$payment_fee',payment_description='$payment_description' where id = $pid "; 
mysqli_query($connect,$updt);

header('Location:view.php?add=2'); 
Exit();
	
?>