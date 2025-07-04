<?php
include("../conn-web/cw.php");


$status=1;
$current_date = date('Y-m-d');



$promo_code=mysqli_real_escape_string($connect,$_REQUEST['promo_code']); 
$promo_type=mysqli_real_escape_string($connect,$_REQUEST['promo_type']); 
$promo_price=mysqli_real_escape_string($connect,$_REQUEST['promo_price']); 
$user_limit=mysqli_real_escape_string($connect,$_REQUEST['user_limit']); 
$start_date = mysqli_real_escape_string($connect,$_REQUEST['start_date']);
$end_date=mysqli_real_escape_string($connect,$_REQUEST['end_date']); 
$description=mysqli_real_escape_string($connect,$_REQUEST['description']); 

echo $sql="insert into tbl_promocode(promo_code,promo_type,promo_price,user_limit,start_date,end_date,description,created,status)values('$promo_code','2','$promo_price','$user_limit','$start_date','$end_date','$description','$current_date','$status')"; 

$qrs=mysqli_query($connect,$sql);
header('Location:view.php?add=1'); 
Exit();		


	
?>