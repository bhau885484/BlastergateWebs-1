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
// print_r($_REQUEST);
// $user_id = $_REQUEST['user'];

$event_id=$_REQUEST['event_id']; 
$title=$_REQUEST['title']; 
$description = $_REQUEST['description'];

$useraarray=$_REQUEST['user']; 

$userList = implode(',',$useraarray);


$getevent="select * from tbl_event where id=$event_id";  
$gevent=mysqli_query($connect,$getevent);
$single_event=mysqli_fetch_array($gevent);
$event_name = $single_event['event_name'];

// $getdata="select * from tbl_users where id=$user";  
// $gdata=mysqli_query($connect,$getdata);
// $single_data=mysqli_fetch_array($gdata);
// $user_email = $single_data['email'];
// $username = $single_data['username'];



	$allowedExts = array("png","jpg","jpeg","gif");

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
if (($_FILES["video"]["type"] == "video/mp4") || ($_FILES["video"]["type"]=="video/ogg") || ($_FILES["video"]["type"] == "video/mov") || ($_FILES["video"]["type"]=="video/3gp") && ($_FILES["video"] ["size"] < 52428800) && in_array($video_extension,  $allowedExts))
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



echo $sql="insert into tbl_notification(type,event_id,user_id,title,image,video,description,status,created,time,date_time)values('event','$event_id','$userList','$title','$image','$video','$description','$status','$current_date','$time','$date_time')"; 

$qrs=mysqli_query($connect,$sql);

foreach ($useraarray as $newuser) {
                                      // echo $newuser;
  $userdata="select * from tbl_users where id='$newuser'";
  $guser=mysqli_query($connect,$userdata);
  $rown_user=mysqli_fetch_array($guser);
  $newUserList = $rown_user['email'];
   

	$to = $newUserList;
	$subject = 'Blastergate Event Notification';
	$from = 'info@blastergate.com';
	$headers = "FROM: Blastergate <info@blastergate.com>\r\n";
	$headers .= "Content-Type: text/html; charset=UTF-8\r\n";
	$message = '<table width="710" align="center" style=" padding: 0 50px 10px; text-align:left;  table-layout:fixed; font-family:Arial, Helvetica, sans-serif;background-color: #FFFFFF;
                   border: 1px solid #DDDDDD;  ">
                <tr style="text-align: center;" >
                    <td valign="top">
                        <!-- Begin Header -->
                        <table width="100%" style="  border-bottom: 1px solid #EEEEEE; text-align: left; padding-top: 10px; ">
                            <!--#F76F24-->
                            <tr style="text-align: center;">
                                <td><a style="margin-left:0px" href="https://blastergate.com/#/home"><img style="margin-top: 20px;
                                   margin-bottom: 20px;" width="200px" src="https://blastergate.com/assets/img/logo.png" /></a></td>
                            </tr>
                        </table>
                        <!-- End Header -->
                    </td>
                </tr>

                <tr>
                    <td valign="top">
                        <!-- Begin Middle Content -->
                        <table width="100%" height="150px">
                            <tr>
                                <td valign="top" style="color: #000;font-size: 13px;padding: 10px 0 0;word-wrap: break-word;">
                                    
                                </td>
                            </tr>
                             
                                <tr>
                                    <td style="font-size:14px; color:#000; line-height:18px;">
                                        <p style="font-size: 18px;font-weight: bold;">Welcome to BlasteGate - '.$event_name.'</p>
                                        <p style="margin:10px 0 0;">'.$title.'</p>
                                        <p style="margin:10px 0 0;">'.$description.'</p>
                                        
                                       <p> Welcome aboard, and enjoy your journey with us!</p>
                                        <p>Best regards,</p>
                                       <p> The Blastergate Team inf@blastergate.com
                                        </p>
                                    </td>
                                </tr>
                           
                           
               
                          <tr>
                              <td style="font-size:12px;color:#000; line-height:18px;">
                                  <p style="margin:10px 0 0;">If you need any assistance, please submit an inquiry on the contact tab or email us at <a href="mailto:info@blastergate.com" style="color:#000; text-decoration: underline;">info@blastergate.com</a>.</p>
                                 

                              </td>
                          </tr>
                    </table>
                  </td>
            </tr>

          <tr>
              <td>
                  <!-- Begin Footer Notifications -->
                  <table width="100%" style="border-top:1px solid #ddd;">
                      <tr>
                          <td style="font-size:11px; line-height:18px;">
                              <p style="margin:10px 0 0;color:#000;">Thank you,</p>
                               <p>The Blastergate Team
                              </p>
                          </td>

                      </tr>
                  </table>
                  <!-- End Footer Notifications -->
              </td>
          </tr>

          <tr>
              <td valign="top">
                  <!-- Begin Footer -->
                  <table width="100%" style="border-top:1px solid #ddd; background-color:#242424;">
                      <!--#F76F24-->

                  </table>
                  <!-- End Footer -->
              </td>
          </tr>
          <tr style="text-align: center;" >
            <td >
               <!-- Begin Header -->
               <table width="100%" style="text-align: center; padding-top: 10px; ">
                  <!--#F76F24-->
                  <table align="center" >
                     <tr>
                        <td style="padding: 20px 10px;">
                           <a href="#"><img src="https://blastergate.com/assets/img/youtube.png" alt="Twitter" style="width: 50px;"></a>
                        </td>
                        <td style="padding: 20px 10px;">
                           <a href="#"><img src="https://blastergate.com/assets/img/social.png" alt="Facebook" style="width: 50px;"></a>
                        </td>
                        
                     </tr>
                  </table>
                  </td>
                  </tr>
               </table>
               <table  width="710" align="center" style=" padding: 30px 50px 10px; text-align:left;  table-layout:fixed; font-family:Arial, Helvetica, sans-serif;text-align: center; background: #4b0b0b;">
                  <tr style="text-align: center; ">
                     <td >
                        <!-- Begin Header -->
                        <table width="100%" style="text-align: center; padding-top: 10px; " >
                           <!--#F76F24-->
                           <tr>
                              <td style=" text-align: center; padding: 20px;">
                                 <p style="font-size: 16px; color: #fff; margin-bottom: 10px; font-weight: 500;">Download our BlasterGate App:</p>
                                 <a href="#"><img src="https://blastergate.com/assets/img/app.png" alt="App Store" style="margin-right: 10px;width:150px;" class="img-fluid"></a>
                                 <a href="#"><img src="https://blastergate.com/assets/img/play.png" alt="Google Play" class="img-fluid" style="width:150px;"></a>
                              </td>
                           </tr>
                        </table>
                        <!-- End Header -->
                     </td>
                  </tr>
                   
                   <tr>
                      <td style="font-size:14px; line-height:18px;">
                         <p style="margin:10px 10px 10px;color: #fff;">
                            You are receiving this email because someone used your email to signup on blastergate.com if you did not signup you can discard this email as unconfirmed accounts are removed from our system daily.
                         </p>
                      </td>
                   </tr>
                    
                     
               </table>
            </td>
         </tr>  
      </table>';

	if (mail($to, $subject, $message, $headers)) {
	    echo 'Mail sent successfully.';
	} else {
	    echo 'Unable to send mail. Please try again.';
	}

}



header('Location:view.php?add=1'); 
Exit();		


	
?>