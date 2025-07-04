<?php
include("../conn-web/cw.php");



$pid =$_REQUEST['pid'];


$price=mysqli_real_escape_string($connect,$_REQUEST['price']); 




 $updt="update tbl_pay_per_click_video_price set price='$price' where id = $pid "; 
mysqli_query($connect,$updt);

header('Location:view-video-price.php?add=2'); 
Exit();
	
?>