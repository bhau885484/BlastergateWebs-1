<?php
include("../conn-web/cw.php");



$pid =$_REQUEST['pid'];



$getdata="select * from tbl_membership where id=$pid";  
$gdata=mysqli_query($connect,$getdata);
$single_data=mysqli_fetch_array($gdata);

$heading_title_name=mysqli_real_escape_string($connect,$_REQUEST['heading_title_name']); 
$heading_title_price=mysqli_real_escape_string($connect,$_REQUEST['heading_title_price']); 
$heading_title_plan=mysqli_real_escape_string($connect,$_REQUEST['heading_title_plan']); 
$sub_heading1_price=mysqli_real_escape_string($connect,$_REQUEST['sub_heading1_price']); 
$sub_heading1_title = mysqli_real_escape_string($connect,$_REQUEST['sub_heading1_title']);
$sub_heading2_price=mysqli_real_escape_string($connect,$_REQUEST['sub_heading2_price']); 
$sub_heading2_title=mysqli_real_escape_string($connect,$_REQUEST['sub_heading2_title']); 
$content=mysqli_real_escape_string($connect,$_REQUEST['content']); 

       

echo $updt="update tbl_membership set heading_title_name='$heading_title_name',heading_title_price='$heading_title_price',heading_title_plan='$heading_title_plan',sub_heading1_price='$sub_heading1_price',sub_heading1_title='$sub_heading1_title',sub_heading2_price='$sub_heading2_price',sub_heading2_title='$sub_heading2_title',content='$content' where id = $pid "; 
mysqli_query($connect,$updt);

header('Location:view.php?add=2'); 
Exit();
	
?>