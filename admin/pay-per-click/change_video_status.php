<?php
include("../conn-web/cw.php");
//include("function.php");
// if(!$_SESSION["tata_login_username"]){
// 	header('location: index.php?mlogin=0'); 
// }
$pid =$_REQUEST['id'];
$status = $_REQUEST['status'];
$url = $_REQUEST['url'];
$page_id = $_REQUEST['page_id'];


$updt="update tbl_pay_per_click_video set status='$status' where id = $pid "; 
mysqli_query($connect,$updt);


$_SESSION['success'] = 'Video Status change successfully';
	
header('Location:'.$url.'?pid='.$page_id); 
Exit();		
?>