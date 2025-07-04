<?php
include("../conn-web/cw.php");


if(isset($_REQUEST['refrence_number']))

{

  	$refrence_number = $_REQUEST['refrence_number'];
	
	$qr=mysqli_query($connect,"select * from  tbl_truck_partner where refrence_number='$refrence_number'");
	$row=mysqli_num_rows($qr);
	if($row>0)
	{

		echo "1";

  }else{
  		echo "0";
  }

}

?>