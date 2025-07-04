<?php
include("../conn-web/cw.php");
if(!$_SESSION["tata_login_username"])
{
header('Location:index.php'); 
}


$pid=$_REQUEST['pid'];

		
mysqli_query($connect,"DELETE FROM tbl_promocode WHERE id='$pid'");
header('Location:view.php?delete=1'); 
Exit();
?>