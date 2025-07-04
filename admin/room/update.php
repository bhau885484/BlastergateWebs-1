<?php
include("../conn-web/cw.php");



$pid =$_REQUEST['pid'];



$getdata="select * from tbl_room where id=$pid";  
$gdata=mysqli_query($connect,$getdata);
$single_data=mysqli_fetch_array($gdata);

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
 $room_image = $single_data['room_image'];
}
           

echo $updt="update tbl_room set fee='$fee',room_name='$room_name',price='$price',room_available='$room_available',room_image='$room_image',short_description='$short_description',full_description='$full_description' where id = $pid "; 
mysqli_query($connect,$updt);

header('Location:view.php?add=2'); 
Exit();
	
?>