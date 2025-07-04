<?php
include("../conn-web/cw.php");


if(isset($_REQUEST['username']))

{

  	$username = $_REQUEST['username'];
	$password = md5($_REQUEST['password']);

  //echo "select * from  tbl_admin where password='$password' AND ((username='$username') OR (email='$username') ) ";
    $qr=mysqli_query($connect,"select * from  tbl_admin where password='$password' AND ((username='$username') OR (email='$username'))");
    
	$row=mysqli_num_rows($qr);
	// echo $row;
	if($row>0)
	{

		$rown=mysqli_fetch_array($qr);
		
		// $_SESSION['tata_login_username']=$rown['username'];
		// $_SESSION['tata_login_email']=$rown['email'];

		setcookie("username", $rown['username'], time() + 86400, "/"); // check syntax for function params
		setcookie("email", $rown['email'], time() + 86400, "/"); // check syntax for function params

		// echo $_SESSION['tata_login_username'];
		echo "1";

  }else{
  		echo "0";
  }

}

?>