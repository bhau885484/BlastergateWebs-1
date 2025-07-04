<?php
include("../conn-web/cw.php");



$pid =$_REQUEST['pid'];


$user_commission=mysqli_real_escape_string($connect,$_REQUEST['user_commission']); 
$admin_commission=mysqli_real_escape_string($connect,$_REQUEST['admin_commission']); 




 $updt="update tbl_pay_per_click_admin_commission set user_commission='$user_commission',admin_commission='$admin_commission' where id = $pid "; 
mysqli_query($connect,$updt);

header('Location:view-admin-commission.php?add=2'); 
Exit();
	
?>