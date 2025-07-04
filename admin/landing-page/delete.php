<?php
include("../conn-web/cw.php");


 $pid=$_REQUEST['pid'];
 $imageToDelete = $_REQUEST['image'];


		
// mysqli_query($connect,"DELETE FROM tbl_notification WHERE id='$pid'");


// Fetch the current value of the image_names column
// $sql = "SELECT * FROM tbl_landing_page WHERE id = $pid";
// $result = mysqli_query($sql);

$getdata="select * from tbl_landing_page where id=$pid";  
$gdata=mysqli_query($connect,$getdata);
$rown=mysqli_fetch_array($gdata);
$imageNames = $rown['slider_image'];

$imageArray = explode(',', $imageNames);

$updatedImageArray = array_filter($imageArray, function ($image) use ($imageToDelete) {
        return trim($image) !== $imageToDelete;
    });

$updatedImageNames = implode(',', $updatedImageArray);  

  

print_r($updatedImageNames);

echo $updt="update tbl_landing_page set slider_image='$updatedImageNames' where id = $pid "; 
mysqli_query($connect,$updt);


 

 $filePath = "../../api/assets/images/" . $imageToDelete;
        if (file_exists($filePath)) {
            unlink($filePath);
        }
echo "Image deleted successfully.";

header('Location:send.php'); 
Exit();
?>