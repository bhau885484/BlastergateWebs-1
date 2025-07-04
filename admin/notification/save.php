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
$useraarray=$_REQUEST['user']; 
$title=$_REQUEST['title']; 
$description = $_REQUEST['description'];


foreach ($useraarray as $user) {
  // echo "$user <br>";


	$getdata="select * from tbl_users where id=$user";  
	$gdata=mysqli_query($connect,$getdata);
	$single_data=mysqli_fetch_array($gdata);
	$user_email = $single_data['email'];
	$username = $single_data['username'];



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
	 $image = '';
	}


	 $sql="insert into tbl_event_notification(type,event_id,user_id,title,image,description,status,created,time,date_time)values('event','$event_id','$user','$title','$image','$description','$status','$current_date','$time','$date_time')"; 

	$qrs=mysqli_query($connect,$sql);


//  $mail = new PHPMailer;
//  $mail->isSMTP();
//  $mail->CharSet = 'UTF-8';
//  $mail->SMTPDebug = 2;
//  $mail->Host = 'smtp.hostinger.com';
//  $mail->Port = 587;
//  $mail->isHTML(true);
//  $mail->SMTPAuth = true;
//  $mail->Username = 'info@blastergate.com';
//  $mail->Password = 'Blastergate@12345#';
//  $mail->setFrom('info@blastergate.com', 'Event Notification');
//  $mail->addReplyTo($user_email, $username);
//  $mail->addAddress($user_email, $username);
// //  $mail->addReplyTo('bhavishyaswami0@gmail.com', 'manish');
// // $mail->addAddress('bhavishyaswami0@gmail.com', 'manish');
//  $mail->Subject = $title;
//  //$mail->msgHTML(file_get_contents('message.html'), __DIR__);
// $output .= '<table class="container container_full" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse: collapse; min-width: 100%;" role="presentation" bgcolor="#ecba78">
//     <tbody>
//       <tr>
//         <th valign="top" style="mso-line-height-rule: exactly;">
//           <center style="width: 100%;">
//             <table border="0" width="600" cellpadding="0" cellspacing="0" align="center" style="width: 600px; min-width: 600px; max-width: 600px; margin: auto;" class="email-container" role="presentation">
//               <tbody>
//                 <tr>
//                   <th valign="top" style="mso-line-height-rule: exactly;">
//                     <!-- BEGIN : SECTION : HEADER -->
//                     <table class="section_wrapper header" data-id="header" id="section-header" border="0" width="100%" cellpadding="0" cellspacing="0" align="center" style="min-width: 100%;" role="presentation" bgcolor="#ffffff">
//                       <tbody>
//                         <tr>
//                           <td class="section_wrapper_th" style="mso-line-height-rule: exactly; padding-top: 52px; padding-bottom: 26px;" bgcolor="#ffffff">
//                             <table border="0" width="100%" cellpadding="0" cellspacing="0" align="center" style="min-width: 100%;" role="presentation">
//                               <tbody>
//                                 <tr>
//                                   <th class="column_logo" style="mso-line-height-rule: exactly; padding-top: 13px; padding-bottom: 13px;" align="center" bgcolor="#ffffff">
//                                     <!-- Logo : BEGIN -->
//                                     <a href="https://blastergate.com" target="_blank" style="color: #c3c3c3; text-decoration: none !important; text-underline: none;">
//                                       <img src="https://blastergate.com/assets/img/logo.png" class="logo " width="96" border="0" style="width: 96px; height: auto !important; display: block; text-align: center; margin: auto;">
//                                     </a>
//                                     <!-- Logo : END -->
//                                   </th>
//                                 </tr>
//                               </tbody>
//                             </table>
//                           </td>
//                         </tr>
//                       </tbody>
//                     </table>
//                     <!-- END : SECTION : HEADER -->
//                     <!-- BEGIN : SECTION : MAIN -->
//                     <table class="section_wrapper main" data-id="main" id="section-main" border="0" width="100%" cellpadding="0" cellspacing="0" align="center" style="min-width: 100%;" role="presentation" bgcolor="#ffffff">
//                       <tbody>
//                         <tr>
//                           <td class="section_wrapper_th" style="mso-line-height-rule: exactly;" bgcolor="#ffffff">
//                             <table border="0" width="100%" cellpadding="0" cellspacing="0" align="center" style="min-width: 100%;" id="mixContainer" role="presentation">
//                               <!-- BEGIN SECTION: Heading -->
//                               <tbody>
//                                 <tr id="section-1468266" class="section heading">
//                                   <th style="mso-line-height-rule: exactly; color: #4b4b4b; padding: 26px 52px 13px;" bgcolor="#ffffff">
//                                     <table cellspacing="0" cellpadding="0" border="0" width="100%" role="presentation" style="color: #4b4b4b;" bgcolor="#ffffff">
//                                       <tbody>
//                                         <tr style="color: #4b4b4b;" bgcolor="#ffffff">
//                                           <th style="mso-line-height-rule: exactly; color: #4b4b4b;" bgcolor="#ffffff" valign="top">
//                                             <h1 data-key="1468266_heading" style="font-family: Georgia,serif; font-size: 28px; line-height: 46px; font-weight: 700; color: #4b4b4b; text-transform: none; background-color: #ffffff; margin: 0;text-align:center;">Event Notification</h1>
//                                           </th>
//                                         </tr>
//                                       </tbody>
//                                     </table>
//                                   </th>
//                                 </tr>
//                                 <!-- END SECTION: Heading -->
//                                 <!-- BEGIN SECTION: Introduction -->
//                                 <tr id="section-1468267" class="section introduction">
//                                   <th style="mso-line-height-rule: exactly; padding: 13px 52px;" bgcolor="#ffffff">

//                                     <p style="mso-line-height-rule: exactly; font-family: -apple-system,BlinkMacSystemFont,Arial; font-size: 16px; line-height: 26px; font-weight: 400; color: #666363; margin: 0 0 13px;" align="center">
//                                       <span data-key="1468267_greeting_text" style="text-align: center; font-family: -apple-system,BlinkMacSystemFont; font-size: 16px; line-height: 26px; font-weight: 400; color: #666363;">
//                                         Hey
//                                       </span>
//                                       <b>'.$username.',</b>
//                                     </p>

//                                     <p data-key="1468267_introduction_text" class="text" style="mso-line-height-rule: exactly; font-family: -apple-system,BlinkMacSystemFont; font-size: 16px; line-height: 26px; font-weight: 400; color: #666363; margin: 13px 0;" align="center">vdgsg
//                                     </p>
                                   
//                                   </th>
//                                 </tr>
                                
                                
                               
//                                 <tr id="section-1468276" class="section closing_text">
//                                   <th data-key="1468276_closing_text" class="text" style="mso-line-height-rule: exactly; font-family: -apple-system,BlinkMacSystemFont; font-size: 16px; line-height: 26px; font-weight: 400; color: #666363; padding: 13px 52px 52px;" align="center" bgcolor="#ffffff">
//                                     <p style="mso-line-height-rule: exactly; font-family: -apple-system,BlinkMacSystemFont; font-size: 16px; line-height: 26px; font-weight: 400; color: #666363; margin: 0;" align="center">If you need help with anything please dont hesitate to drop us an email: info@blastergate.com</p>
//                                   </th>
//                                 </tr>
                               
                              
//                               </tbody>
//                             </table>
//                           </td>
//                         </tr>
//                       </tbody>
//                     </table>
                   
//                   </th>
//                 </tr>
//               </tbody>
//             </table>
//           </center>
//         </th>
//       </tr>
//     </tbody>
//   </table>';

//  $mail->Body = $output;
//   // print_r($mail);
//  //$mail->addAttachment('attachment.txt');
//  if (!$mail->send()) {
//      echo 'Mailer Error: ' . $mail->ErrorInfo;
//  } else {
//     echo 'The email message was sent.';
//  }

}

header('Location:view.php?add=1'); 
Exit();		


	
?>