<?php
include("../conn-web/cw.php");

$status=1;
$current_date = date('Y-m-d');

$title=mysqli_real_escape_string($connect,$_REQUEST['title']); 
$description=mysqli_real_escape_string($connect,$_REQUEST['description']); 

$sql="insert into tbl_policy(title,description,created,status)values('$title','$description','$current_date','$status')"; 

$qrs=mysqli_query($connect,$sql);
header('Location:view.php?add=1'); 
Exit();		
	
?>