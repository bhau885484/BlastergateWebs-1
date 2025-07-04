<?php
include("../conn-web/cw.php");

require '../vendor/autoload.php';
use PHPMailer\PHPMailer\PHPMailer;
use Mailtrap\Config;
use Mailtrap\EmailHeader\CategoryHeader;
use Mailtrap\EmailHeader\CustomVariableHeader;
use Mailtrap\Helper\ResponseHelper;
use Mailtrap\MailtrapClient;
use Symfony\Component\Mime\Address;
use Symfony\Component\Mime\Email;
use Symfony\Component\Mime\Header\UnstructuredHeader;


$status=1;
$current_date = date('Y-m-d');
$time = date('H:i:s');
$date_time = date('Y-m-d h:i:s');

$title=$_REQUEST['title']; 
$description = $_REQUEST['description'];


$allowedExts = array("png","jpg","jpeg","gif");

// Set maximum file size to 50MB (in bytes)
$image_extension = end(explode(".", $_FILES["image"]["name"]));
if (($_FILES["image"]["type"] == "image/png") || ($_FILES["image"]["type"]=="image/jpeg") || ($_FILES["image"]["type"] == "image/jpg") && ($_FILES["image"] ["size"] < 52428800) && in_array($image_extension,  $allowedExts))
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
 $image = '';
}

//upload Video

$allowedExts = array("ogg","mp4","mov","3gp");

$video_extension = end(explode(".", $_FILES["video"]["name"]));
if (($_FILES["video"]["type"] == "video/mp4") || ($_FILES["video"]["type"]=="video/ogg") || ($_FILES["video"]["type"] == "video/mov") || ($_FILES["video"]["type"]=="video/3gp") && ($_FILES["video"]["size"] < 52428800) && in_array($video_extension,  $allowedExts))
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
 $video = '';
}


echo	$sql="insert into tbl_notification(title,type,user_id,image,video,description,status,created,time,date_time)values('$title','user','0','$image','$video','$description','$status','$current_date','$time','$date_time')"; 

	$qrs=mysqli_query($connect,$sql);


header('Location:view.php?add=1'); 
Exit();		


	
?>