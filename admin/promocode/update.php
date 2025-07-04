<?php
include("../conn-web/cw.php");



$pid =$_REQUEST['pid'];



$getdata="select * from tbl_promocode where id=$pid";  
$gdata=mysqli_query($connect,$getdata);
$single_data=mysqli_fetch_array($gdata);

$promo_code=mysqli_real_escape_string($connect,$_REQUEST['promo_code']); 
$promo_type=mysqli_real_escape_string($connect,$_REQUEST['promo_type']); 
$promo_price=mysqli_real_escape_string($connect,$_REQUEST['promo_price']); 
$user_limit=mysqli_real_escape_string($connect,$_REQUEST['user_limit']); 
$start_date = mysqli_real_escape_string($connect,$_REQUEST['start_date']);
$end_date=mysqli_real_escape_string($connect,$_REQUEST['end_date']); 
$description=mysqli_real_escape_string($connect,$_REQUEST['description']); 



echo $updt="update tbl_promocode set promo_code='$promo_code',promo_type='2',promo_price='$promo_price',user_limit='$user_limit',start_date='$start_date',end_date='$end_date',description='$description' where id = $pid "; 
mysqli_query($connect,$updt);

header('Location:view.php?add=2'); 
Exit();
	
?>