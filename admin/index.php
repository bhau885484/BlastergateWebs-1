<?php
include("conn-web/cw.php");
//include("function.php");
// if($_SESSION["tata_login_username"]){
//   header('location: dashboard.php'); 
// }
if($_COOKIE['username']){
  header('Location:dashboard.php'); 
}
?>

<!DOCTYPE html>
<html lang="en">
<meta http-equiv="content-type" content="text/html;charset=UTF-8" /><!-- /Added by HTTrack -->
<head>

    <meta charset="utf-8">
    <meta content="width=device-width, initial-scale=1, shrink-to-fit=no" name="viewport">
    <meta name="description" content="">
    <meta name="author" content="">
    <meta name="keywords" content="">
    <title>Admin </title>
    <link  id="style" href="<?php echo $base_url ?>/assets/plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet">

    <link href="<?php echo $base_url ?>/assets/plugins/web-fonts/icons.css" rel="stylesheet">
    <link href="<?php echo $base_url ?>/assets/plugins/web-fonts/font-awesome/font-awesome.min.css" rel="stylesheet">
    <link href="<?php echo $base_url ?>/assets/plugins/web-fonts/plugin.css" rel="stylesheet">

    <!-- STYLE CSS -->
    <link href="<?php echo $base_url ?>/assets/css/style.css" rel="stylesheet">
    <link href="<?php echo $base_url ?>/assets/css/plugins.css" rel="stylesheet">

    <!-- SWITCHER CSS -->
    <link href="<?php echo $base_url ?>/assets/switcher/css/switcher.css" rel="stylesheet">
    <link href="<?php echo $base_url ?>/assets/switcher/demo.css" rel="stylesheet">
        

    </head>

    <body class="ltr main-body leftmenu error-1">
      <div id="global-loader">
        <img src="<?php echo $base_url ?>/assets/img/loader.svg" class="loader-img" alt="Loader">
      </div>
   
      <div class="page main-signin-wrapper">
            
                
          <!-- Row -->
          <div class="row signpages text-center">
            <div class="col-md-12">
              <div class="card">
                <div class="row row-sm">
                  <div class="col-lg-6 col-xl-5 d-none d-lg-block text-center bg-primary details">
                    <div class="mt-5 pt-4 p-2 pos-absolute">
                      <img src="<?php echo $base_url ?>/assets/img/logo.png" class="header-brand-img mb-4" alt="logo">
                      <div class="clearfix"></div>
                      <!-- <img src="https://php.spruko.com/spruha/spruha/assets/img/svgs/user.svg" class="ht-100 mb-0" alt="user"> -->
                      <h5 class="mt-4 text-white">Login Your Account</h5>
                      <span class="tx-white-6 tx-13 mb-5 mt-xl-0">Login to create, discover and connect with the global community</span>
                      
                    </div>
                  </div>
                  <div class="col-lg-6 col-xl-7 col-xs-12 col-sm-12 login_form ">
                    <div class="main-container container-fluid">
                      <div class="row row-sm">
                        <div class="card-body mt-2 mb-2">
                          <img src="<?php echo $base_url ?>/assets/img/logo.png" class="d-lg-none header-brand-img text-start float-start mb-4 error-logo-light" alt="logo">
                          <img src="<?php echo $base_url ?>/assets/img/logo.png" class=" d-lg-none header-brand-img text-start float-start mb-4 error-logo" alt="logo">
                          <div class="clearfix"></div>
                          <!-- <form> -->
                            <h5 class="text-start mb-2">Signin to Your Account</h5>
                            <p class="mb-4 text-muted tx-13 ms-0 text-start">Signin to create, discover and connect with the global community</p>
                            <div id="error_invalid" class="error_msg_invalid" style="display: none"></div>
                            <div class="form-group text-start">
                              <label>Email</label>
                               <input type="text" name="username"  class="form-control" id="username" placeholder="Username/Email"  />
                                <div id="error_username" class="error_msg"></div>
                            </div>
                            <div class="form-group text-start">
                              <label>Password</label>
                              <input type="password" name="password"  class="form-control" id="password" placeholder="Password"  />
                                <div id="error_password" class="error_msg"></div>
                            </div>
                            <a href="javascript:void(0);" id="login_btn" class="btn btn-main-primary btn-block text-white">Sign In</a>
                          <!-- </form> -->
                          
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- End Row -->
      </div>
      
     <script src="<?php echo $base_url ?>/assets/plugins/jquery/jquery.min.js"></script>
     <script src="<?php echo $base_url ?>/assets/plugins/bootstrap/js/popper.min.js"></script>
     <script src="<?php echo $base_url ?>/assets/plugins/bootstrap/js/bootstrap.min.js"></script>

    <!-- <script src="<?php echo $base_url ?>/assets/plugins/perfect-scrollbar/perfect-scrollbar.min.js"></script> -->
    <script src="<?php echo $base_url ?>/assets/plugins/select2/js/select2.min.js"></script>
    <script src="<?php echo $base_url ?>/assets/js/select2.js"></script>
    <script src="<?php echo $base_url ?>/assets/js/themeColors.js"></script>
    <script src="<?php echo $base_url ?>/assets/js/custom.js"></script>
    <script src="<?php echo $base_url ?>/assets/switcher/js/switcher.js"></script>
</body>
</html>


  <script>
    $(document).ready(function() {
      // alert();
      $("#login_btn").click(function() {
        
        var error = 1;
        var username = $("#username").val();
        var password = $("#password").val();

        if((username == '') || (username == undefined)){
          $("#error_username").text("This field are required");
          error = 0;
        }else{
          $("#error_username").text("");
          
        }
        if((password == '') || (password == undefined)){
          $("#error_password").text("This field are required");
          error = 0;
        }else{
          $("#error_password").text("");
         
        }

        if(error == 1){

            $.ajax({
                url: '<?php echo $base_url;?>/ajax/login_page.php',
                type: 'post',
                data: {
                  username: username,
                  password: password
                },
                success: function(response) {
                  
                  
                  if (response == 1) {
                    // alert(response);
                   window.location.href = 'dashboard.php';
                  }else{
                    // alert('12345');
                    $('#error_invalid').css('display','block');
                    $("#error_invalid").text("Invalid Username or Password");
                  } 
                }
              });
        }
         

        
      });
    });
  </script>
