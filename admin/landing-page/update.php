<?php
include("../conn-web/cw.php");



$pid =$_REQUEST['pid'];



$getdata="select * from tbl_landing_page where id=$pid";  
$gdata=mysqli_query($connect,$getdata);
$single_data=mysqli_fetch_array($gdata);


$title=$connect->real_escape_string($_REQUEST['title']); 



// $allowedExts = array("png","jpg","jpeg","gif");

// $image_extension = end(explode(".", $_FILES["image"]["name"]));
// if (($_FILES["image"]["type"] == "image/png") || ($_FILES["image"]["type"]=="image/jpeg") || ($_FILES["image"]["type"] == "image/jpg") && ($_FILES["image"] ["size"] < 7340032) && in_array($image_extension,  $allowedExts))
// {
//   if ($_FILES["image"]["error"] > 0)
//   {
// 	$image = '';
//   }
//   else
//   {
// 	   $filetmp_name=$_FILES ['image']['tmp_name'];
// 	   $name=$_FILES ['image']['name'];
// 	   $randomNumber = rand(15,35);
// 	   $rn = $randomNumber.'-';		
// 	   $ext = strtolower(substr($name, strpos($name, '.') +1));
// 	   $name = $rn.str_replace(' ','-',trim($name));
// 	   $image = $name;
	   
// 	   $path = $upload_image_path;
// 	   // echo $path.$image;
// 	   copy($filetmp_name,$path.$image);
// 	  	$image = $image;
//   }
// } else{
//  $image = $single_data['image'];
// }

//upload Video

$allowedExts = array("ogg","mp4","mov","3gp");

$first_video_extension = end(explode(".", $_FILES["first_video"]["name"]));
if (($_FILES["first_video"]["type"] == "video/mp4") || ($_FILES["first_video"]["type"]=="video/ogg") || ($_FILES["first_video"]["type"] == "video/mov") || ($_FILES["first_video"]["type"]=="video/3gp") && ($_FILES["first_video"] ["size"] < 7340032) && in_array($first_video_extension,  $allowedExts))
{
  if ($_FILES["first_video"]["error"] > 0)
  {
	$video = '';
  }
  else
  {
	   $filetmp_name=$_FILES ['first_video']['tmp_name'];
	   $name=$_FILES ['first_video']['name'];
	   $randomNumber = rand(15,35);
	   $rn = $randomNumber.'-';		
	   $ext = strtolower(substr($name, strpos($name, '.') +1));
	   $name = $rn.str_replace(' ','-',trim($name));
	   $first_video = $name;
	   
	   $path = $upload_image_path;
	   // echo $path.$first_video;
	   copy($filetmp_name,$path.$first_video);
	  	$first_video = $first_video;
  }
} else{
 $first_video = $single_data['first_video'];
}


$allowedExts = array("ogg","mp4","mov","3gp");

$second_video_extension = end(explode(".", $_FILES["second_video"]["name"]));
if (($_FILES["second_video"]["type"] == "video/mp4") || ($_FILES["second_video"]["type"]=="video/ogg") || ($_FILES["second_video"]["type"] == "video/mov") || ($_FILES["second_video"]["type"]=="video/3gp") && ($_FILES["second_video"] ["size"] < 7340032) && in_array($second_video_extension,  $allowedExts))
{
  if ($_FILES["second_video"]["error"] > 0)
  {
	$video = '';
  }
  else
  {
	   $filetmp_name=$_FILES ['second_video']['tmp_name'];
	   $name=$_FILES ['second_video']['name'];
	   $randomNumber = rand(15,35);
	   $rn = $randomNumber.'-';		
	   $ext = strtolower(substr($name, strpos($name, '.') +1));
	   $name = $rn.str_replace(' ','-',trim($name));
	   $second_video = $name;
	   
	   $path = $upload_image_path;
	   // echo $path.$second_video;
	   copy($filetmp_name,$path.$second_video);
	  	$second_video = $second_video;
  }
} else{
 $second_video = $single_data['second_video'];
}

 $uploadDir = $upload_image_path;

// Create directory if it doesn't exist
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}



if(!empty(array_filter($_FILES['slider_image']['name']))){
	 $imageNames = [];
	foreach ($_FILES['slider_image']['tmp_name'] as $key => $tmpName) {
        $fileName = basename($_FILES['slider_image']['name'][$key]);
        $targetFilePath = $uploadDir . $fileName;

        // Check if the file is an image
        $fileType = pathinfo($targetFilePath, PATHINFO_EXTENSION);
        $allowedTypes = ['jpg', 'jpeg', 'png', 'gif'];

        if (in_array(strtolower($fileType), $allowedTypes)) {
            if (move_uploaded_file($tmpName, $targetFilePath)) {
            	 $imageNames[] = $fileName; 
                echo "File {$fileName} uploaded successfully.<br>";
            } else {
                echo "Failed to upload file {$fileName}.<br>";
            }
        } else {
            echo "File {$fileName} is not an allowed image type.<br>";
        }
    }

    $existingImages = explode(',', $single_data['slider_image']);
    // print_r($existingImages);
    $allImages = array_merge($existingImages, $imageNames);
   $updatedImageNames = implode(',', $allImages); 
   
    // $imageNamesString = implode(",", $imageNames);

}else{
	$updatedImageNames = $single_data['slider_image']; 
}




 $updt="update tbl_landing_page set title='$title',slider_image='$updatedImageNames',first_video='$first_video',second_video='$second_video' where id = $pid "; 
mysqli_query($connect,$updt);

header('Location:send.php'); 
Exit();
	
?>