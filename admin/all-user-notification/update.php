<?php
include("../conn-web/cw.php");



$pid =$_REQUEST['pid'];



$getdata="select * from tbl_notification where id=$pid";  
$gdata=mysqli_query($connect,$getdata);
$single_data=mysqli_fetch_array($gdata);


$title=$_REQUEST['title']; 
$description = $_REQUEST['description'];



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

//upload Video

$allowedExts = array("ogg","mp4","mov","3gp");

$video_extension = end(explode(".", $_FILES["video"]["name"]));
if (($_FILES["video"]["type"] == "video/mp4") || ($_FILES["video"]["type"]=="video/ogg") || ($_FILES["video"]["type"] == "video/mov") || ($_FILES["video"]["type"]=="video/3gp") && ($_FILES["video"] ["size"] < 7340032) && in_array($video_extension,  $allowedExts))
{
  if ($_FILES["video"]["error"] > 0)
  {
	$video = '';
  }
  else
  {
	   $filetmp_name=$_FILES ['video']['tmp_name'];
	   $name=$_FILES ['video']['name'];
	   $randomNumber = rand(15,35);
	   $rn = $randomNumber.'-';		
	   $ext = strtolower(substr($name, strpos($name, '.') +1));
	   $name = $rn.str_replace(' ','-',trim($name));
	   $video = $name;
	   
	   $path = $upload_image_path;
	   // echo $path.$video;
	   copy($filetmp_name,$path.$video);
	  	$video = $video;
  }
} else{
 $video = $single_data['video'];
}
           

echo $updt="update tbl_all_user_notification set title='$title',image='$image',video='$video',description='$description' where id = $pid "; 
mysqli_query($connect,$updt);

header('Location:view.php?add=2'); 
Exit();
	
?>