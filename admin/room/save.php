<?php
include("../conn-web/cw.php");


$status=1;
$current_date = date('Y-m-d');



$room_name=mysqli_real_escape_string($connect,$_REQUEST['room_name']); 
$price=mysqli_real_escape_string($connect,$_REQUEST['price']); 
$room_available=mysqli_real_escape_string($connect,$_REQUEST['room_available']); 
$fee=mysqli_real_escape_string($connect,$_REQUEST['fee']); 
$short_description=mysqli_real_escape_string($connect,$_REQUEST['short_description']); 
$full_description=mysqli_real_escape_string($connect,$_REQUEST['full_description']); 

$allowedExts = array("png","jpg","jpeg","gif");

$room_image_extension = end(explode(".", $_FILES["room_image"]["name"]));
if (($_FILES["room_image"]["type"] == "image/png") || ($_FILES["room_image"]["type"]=="image/jpeg") || ($_FILES["room_image"]["type"] == "image/jpg") && ($_FILES["room_image"] ["size"] < 7340032) && in_array($room_image_extension,  $allowedExts))
{
  if ($_FILES["room_image"]["error"] > 0)
  {
	$room_image = '';
  }
  else
  {
	   $filetmp_name=$_FILES ['room_image']['tmp_name'];
	   $name=$_FILES ['room_image']['name'];
	   $randomNumber = rand(15,35);
	   $rn = $randomNumber.'-';		
	   $ext = strtolower(substr($name, strpos($name, '.') +1));
	   $name = $rn.str_replace(' ','-',trim($name));
	   $room_image = $name;
	   
	   $path = $upload_image_path;
	   // echo $path.$room_image;
	   copy($filetmp_name,$path.$room_image);
	  	$room_image = $room_image;
  }
} else{
 $room_image = '';
}


echo $sql="insert into tbl_room(room_name,price,room_available,fee,room_image,short_description,full_description,created,status)values('$room_name','$price','$room_available','$fee','$room_image','$short_description','$full_description','$current_date','$status')"; 

$qrs=mysqli_query($connect,$sql);
header('Location:view.php?add=1'); 
Exit();		


	
?>