<?php
include("../conn-web/cw.php");


$status=1;
$current_date = date('Y-m-d');



$event_name=mysqli_real_escape_string($connect,$_REQUEST['event_name']); 
$event_from_date=mysqli_real_escape_string($connect,$_REQUEST['event_from_date']); 
$event_to_date=mysqli_real_escape_string($connect,$_REQUEST['event_to_date']); 
$event_time=mysqli_real_escape_string($connect,$_REQUEST['event_time']); 
$lat = mysqli_real_escape_string($connect,$_REQUEST['lat']);
$lng=mysqli_real_escape_string($connect,$_REQUEST['lng']); 
$city_name=mysqli_real_escape_string($connect,$_REQUEST['city_name']); 
$place_id=mysqli_real_escape_string($connect,$_REQUEST['place_id']); 
$map_url=mysqli_real_escape_string($connect,$_REQUEST['map_url']); 
$formatted_address = mysqli_real_escape_string($connect,$_REQUEST['formatted_address']);
$event_price=mysqli_real_escape_string($connect,$_REQUEST['event_price']); 
$event_no_of_ticket=mysqli_real_escape_string($connect,$_REQUEST['event_no_of_ticket']); 
$event_email=mysqli_real_escape_string($connect,$_REQUEST['event_email']); 
$event_description=mysqli_real_escape_string($connect,$_REQUEST['event_description']); 
$event_type=mysqli_real_escape_string($connect,$_REQUEST['event_type']); 


if($_REQUEST['couple_male_female_swingers'] =='on'){
	$couple_male_female_swingers = '1';
}else{
	$couple_male_female_swingers = '0';
}

if($_REQUEST['couple_female_female_swingers'] =='on'){
	$couple_female_female_swingers = '1';
}else{
	$couple_female_female_swingers = '0';
}

if($_REQUEST['couple_male_male_swingers'] =='on'){
	$couple_male_male_swingers = '1';
}else{
	$couple_male_male_swingers = '0';
}

if($_REQUEST['couple_male_swingers'] =='on'){
	$couple_male_swingers = '1';
}else{
	$couple_male_swingers = '0';
}

if($_REQUEST['couple_female_swingers'] =='on'){
	$couple_female_swingers = '1';
}else{
	$couple_female_swingers = '0';
}

if($_REQUEST['couple_transgender_swingers'] =='on'){
	$couple_transgender_swingers = '1';
}else{
	$couple_transgender_swingers = '0';
}


$allowedExts = array("png","jpg","jpeg","gif");

$event_image_extension = end(explode(".", $_FILES["event_image"]["name"]));
if (($_FILES["event_image"]["type"] == "image/png") || ($_FILES["event_image"]["type"]=="image/jpeg") || ($_FILES["event_image"]["type"] == "image/jpg") && ($_FILES["event_image"] ["size"] < 7340032) && in_array($event_image_extension,  $allowedExts))
{
  if ($_FILES["event_image"]["error"] > 0)
  {
	$event_image = '';
  }
  else
  {
	   $filetmp_name=$_FILES ['event_image']['tmp_name'];
	   $name=$_FILES ['event_image']['name'];
	   $randomNumber = rand(15,35);
	   $rn = $randomNumber.'-';		
	   $ext = strtolower(substr($name, strpos($name, '.') +1));
	   $name = $rn.str_replace(' ','-',trim($name));
	   $event_image = $name;
	   
	   $path = $upload_image_path;
	   // echo $path.$event_image;
	   copy($filetmp_name,$path.$event_image);
	  	$event_image = $event_image;
  }
} else{
 $event_image = '';
}


echo $sql="insert into tbl_event(event_name,event_from_date,event_to_date,event_time,event_location,lat,lng,city_name,place_id,map_url,formatted_address,event_image,event_price,event_no_of_ticket,event_email,event_description,created,status,couple_male_female_swingers,couple_female_female_swingers,couple_male_male_swingers,couple_male_swingers,couple_female_swingers,couple_transgender_swingers,event_type)values('$event_name','$event_from_date','$event_to_date','$event_time','$event_location','$lat','$lng','$city_name','$place_id','$map_url','$formatted_address','$event_image','$event_price','$event_no_of_ticket','$event_email','$event_description','$current_date','$status','$couple_male_female_swingers','$couple_female_female_swingers','$couple_male_male_swingers','$couple_male_swingers','$couple_female_swingers','$couple_transgender_swingers','$event_type')"; 

$qrs=mysqli_query($connect,$sql);
header('Location:view.php?add=1'); 
Exit();		


	
?>