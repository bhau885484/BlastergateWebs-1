<?php
include("../conn-web/cw.php");



$pid =$_REQUEST['pid'];



$getdata="select * from tbl_payment_getway where id=$pid";  
$gdata=mysqli_query($connect,$getdata);
$single_data=mysqli_fetch_array($gdata);


$name=mysqli_real_escape_string($connect,$_REQUEST['name']); 
$api_login_id=mysqli_real_escape_string($connect,$_REQUEST['api_login_id']); 
$transaction_key=mysqli_real_escape_string($connect,$_REQUEST['transaction_key']); 
$client_key=mysqli_real_escape_string($connect,$_REQUEST['client_key']); 
$environment = mysqli_real_escape_string($connect,$_REQUEST['environment']);


$allowedExts = array("png","jpg","jpeg","gif");

$image_extension = end(explode(".", $_FILES["image"]["name"]));
if (($_FILES["image"]["type"] == "image/png") || ($_FILES["image"]["type"]=="image/jpeg") || ($_FILES["image"]["type"] == "image/jpg") && ($_FILES["image"] ["size"] < 7340032) && in_array($image_extension,  $allowedExts))
{
  if ($_FILES["image"]["error"] > 0)
  {
	$image = '';
  }
  else
  {
	   $filetmp_name=$_FILES ['image']['tmp_name'];
	   $name=$_FILES ['image']['name'];
	   $randomNumber = rand(15,35);
	   $rn = $randomNumber.'-';		
	   $ext = strtolower(substr($name, strpos($name, '.') +1));
	   $name = $rn.str_replace(' ','-',trim($name));
	   $image = $name;
	   
	   $path = $upload_image_path;
	   // echo $path.$image;
	   copy($filetmp_name,$path.$image);
	  	$image = $image;
  }
} else{
 $image = $single_data['image'];
}




       

echo $updt="update tbl_payment_getway set name='$name',image='$image',api_login_id='$api_login_id',transaction_key='$transaction_key',client_key='$client_key',environment='$environment' where id = $pid "; 
mysqli_query($connect,$updt);

header('Location:view.php?add=2'); 
Exit();
	
?>