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


//include("function.php");
// if(!$_SESSION["tata_login_username"]){
// 	header('location: dashboard.php?mlogin=0'); 
// }

$pid =$_REQUEST['pid'];
$status = $_REQUEST['status'];
$user_id = $_REQUEST['user_id'];

$updt="update tbl_pay_per_click set status='$status' where id = $pid "; 
mysqli_query($connect,$updt);

if($status == '1'){
	$key = 'Approved';
}else{
	$key = 'Not Approved';
}

$image = 'logo.png';
$current_date = date('Y-m-d');
$time = date('H:i:s');
$date_time = date('Y-m-d h:i:s');

$title = $key.' Chocolate Factory Membership'; 
echo $sql1="insert into tbl_notification(type,user_id,title,image,description,status,created,time,date_time)values('chocolate_factory','$user_id','$title','$image','','1','$current_date','$time','$date_time')"; 
$qrs=mysqli_query($connect,$sql1);

  $userdata="select * from tbl_users where id='$user_id'";
  $guser=mysqli_query($connect,$userdata);
  $rown_user=mysqli_fetch_array($guser);
  $newUserList = $rown_user['email'];
  $username = $rown_user['username'];

 
   

	$to = $newUserList;
	$subject = 'Blastergate Chocolate Factory '.$key.' Membership';
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
                                        <p style="font-size: 18px;font-weight: bold;">Profile Approved</p>
                                        
                                        <p>Dear ['.$username.'],</p>
                                        <p>We’re excited to let you know that your profile has been successfully '.$key.'! Welcome to our Chocolate Factory Community!</p>

                                        <p>Now you can fully access all features, connect with others, and enjoy the benefits of your Chocolate Factory Membership.</p>

                                    </td>
                                </tr>

                                 <tr>
                                    <td style="font-size:14px; color:#000; line-height:18px;">
                                        <a href="#" style="text-decoration: none;">Your profile is waiting! Tap the button below to view and explore.</a>
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




	
header('Location:view.php?add=2'); 
Exit();		
?>